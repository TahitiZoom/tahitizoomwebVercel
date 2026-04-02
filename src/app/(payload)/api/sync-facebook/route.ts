import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

interface FacebookPost {
  id: string
  message?: string
  created_time: string
  full_picture?: string
  permalink_url: string
}

interface FacebookApiResponse {
  data: FacebookPost[]
  paging?: {
    cursors: { before: string; after: string }
    next?: string
  }
  error?: {
    message: string
    type: string
    code: number
  }
}

interface SyncResult {
  success: boolean
  imported: number
  skipped: number
  errors: string[]
}

function createLexicalContent(text: string): object {
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim())

  // Add signature paragraph
  paragraphs.push('✍ Stéphane Sayeb')

  const children = paragraphs.map(paragraph => ({
    children: [
      {
        detail: 0,
        format: 0,
        mode: 'normal',
        style: '',
        text: paragraph.trim(),
        type: 'text',
        version: 1,
      },
    ],
    direction: null,
    format: 'start',
    indent: 0,
    type: 'paragraph',
    version: 1,
    textFormat: 0,
    textStyle: '',
  }))

  return {
    root: {
      children,
      direction: null,
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  }
}

async function downloadImage(url: string): Promise<{ buffer: Buffer; contentType: string } | null> {
  try {
    const response = await fetch(url, { redirect: 'follow' })
    if (!response.ok) return null

    const contentType = response.headers.get('content-type') || 'image/jpeg'
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    return { buffer, contentType }
  } catch {
    return null
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<SyncResult>> {
  const result: SyncResult = {
    success: false,
    imported: 0,
    skipped: 0,
    errors: [],
  }

  try {
    const payload = await getPayload({ config })

    // Check authentication via cookies
    const authResult = await payload.auth({ headers: request.headers })
    if (!authResult.user) {
      return NextResponse.json(
        { ...result, errors: ['Non authentifié. Veuillez vous connecter.'] },
        { status: 401 }
      )
    }

    // Get Facebook credentials from environment
    const pageAccessToken = process.env.FB_PAGE_ACCESS_TOKEN || process.env.FACEBOOK_PAGE_ACCESS_TOKEN
    const pageId = process.env.FB_PAGE_ID || process.env.FACEBOOK_PAGE_ID

    if (!pageAccessToken || !pageId) {
      return NextResponse.json(
        { ...result, errors: ['Variables Facebook manquantes (FB_PAGE_ACCESS_TOKEN, FB_PAGE_ID)'] },
        { status: 500 }
      )
    }

    // Fetch posts from Facebook Graph API
    const fbUrl = `https://graph.facebook.com/v22.0/${pageId}/posts?fields=id,message,created_time,full_picture,permalink_url&limit=50&access_token=${pageAccessToken}`

    const fbResponse = await fetch(fbUrl)

    if (!fbResponse.ok) {
      const errorText = await fbResponse.text()
      if (fbResponse.status === 401) {
        return NextResponse.json(
          { ...result, errors: ['Token Facebook invalide ou expiré'] },
          { status: 401 }
        )
      }
      if (fbResponse.status === 429) {
        return NextResponse.json(
          { ...result, errors: ['Rate limit Facebook atteint. Réessayez plus tard.'] },
          { status: 429 }
        )
      }
      return NextResponse.json(
        { ...result, errors: [`Erreur API Facebook: ${errorText}`] },
        { status: fbResponse.status }
      )
    }

    const fbData: FacebookApiResponse = await fbResponse.json()

    if (fbData.error) {
      return NextResponse.json(
        { ...result, errors: [`Erreur Facebook: ${fbData.error.message}`] },
        { status: 400 }
      )
    }

    // Find the author "Stéphane Sayeb"
    let authorId: number | null = null
    try {
      const usersResult = await payload.find({
        collection: 'users',
        where: {
          name: { equals: 'Stéphane Sayeb' },
        },
        limit: 1,
      })
      if (usersResult.docs.length > 0) {
        authorId = usersResult.docs[0].id
      }
    } catch {
      // Author not found, continue without
    }

    // Process each Facebook post
    for (const fbPost of fbData.data) {
      try {
        // Check if post already exists by facebookId
        const existingPost = await payload.find({
          collection: 'posts',
          where: {
            facebookId: { equals: fbPost.id },
          },
          limit: 1,
        })

        if (existingPost.docs.length > 0) {
          result.skipped++
          continue
        }

        // Download and create media if image exists
        let mediaId: number | null = null
        if (fbPost.full_picture) {
          const imageData = await downloadImage(fbPost.full_picture)
          if (imageData) {
            try {
              const filename = `facebook-${fbPost.id}.jpg`
              const mediaDoc = await payload.create({
                collection: 'media',
                data: {
                  alt: fbPost.message?.slice(0, 100) || 'Image Facebook',
                },
                file: {
                  data: imageData.buffer,
                  mimetype: imageData.contentType,
                  name: filename,
                  size: imageData.buffer.length,
                },
              })
              mediaId = mediaDoc.id
            } catch (mediaError) {
              result.errors.push(`Erreur upload image pour ${fbPost.id}: ${mediaError instanceof Error ? mediaError.message : 'Erreur inconnue'}`)
            }
          }
        }

        // Generate title from message
        const message = fbPost.message || ''
        const title = message.length > 0
          ? message.slice(0, 80) + (message.length > 80 ? '...' : '')
          : 'Post Facebook'

        // Create the post
        const postData: Record<string, unknown> = {
          title,
          content: message ? createLexicalContent(message) : createLexicalContent(''),
          facebookUrl: fbPost.permalink_url,
          facebookId: fbPost.id,
          publishedAt: fbPost.created_time,
          _status: 'published',
          meta: {
            title: `${title} | Tahiti Zoom — Stéphane Sayeb`,
          },
        }

        if (mediaId) {
          postData.coverImage = mediaId
        }

        if (authorId) {
          postData.authors = [authorId]
        }

        await payload.create({
          collection: 'posts',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data: postData as any,
          draft: false,
        })

        result.imported++
      } catch (postError) {
        result.errors.push(`Erreur création post ${fbPost.id}: ${postError instanceof Error ? postError.message : 'Erreur inconnue'}`)
      }
    }

    result.success = true
    return NextResponse.json(result)
  } catch (error) {
    result.errors.push(`Erreur générale: ${error instanceof Error ? error.message : 'Erreur inconnue'}`)
    return NextResponse.json(result, { status: 500 })
  }
}
