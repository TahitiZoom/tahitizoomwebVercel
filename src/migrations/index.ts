import * as migration_20260327_223153 from './20260327_223153';
import * as migration_20260329_212818 from './20260329_212818';
import * as migration_20260331_044933 from './20260331_044933';
import * as migration_20260331_052413 from './20260331_052413';
import * as migration_20260331_072112 from './20260331_072112';

export const migrations = [
  {
    up: migration_20260327_223153.up,
    down: migration_20260327_223153.down,
    name: '20260327_223153',
  },
  {
    up: migration_20260329_212818.up,
    down: migration_20260329_212818.down,
    name: '20260329_212818',
  },
  {
    up: migration_20260331_044933.up,
    down: migration_20260331_044933.down,
    name: '20260331_044933',
  },
  {
    up: migration_20260331_052413.up,
    down: migration_20260331_052413.down,
    name: '20260331_052413',
  },
  {
    up: migration_20260331_072112.up,
    down: migration_20260331_072112.down,
    name: '20260331_072112'
  },
];
