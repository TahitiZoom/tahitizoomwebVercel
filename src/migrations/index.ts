import * as migration_20260327_223153 from './20260327_223153';
import * as migration_20260329_212818 from './20260329_212818';

export const migrations = [
  {
    up: migration_20260327_223153.up,
    down: migration_20260327_223153.down,
    name: '20260327_223153',
  },
  {
    up: migration_20260329_212818.up,
    down: migration_20260329_212818.down,
    name: '20260329_212818'
  },
];
