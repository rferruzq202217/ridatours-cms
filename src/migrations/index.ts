import * as migration_20251212_202546 from './20251212_202546';
import * as migration_20251218_163536 from './20251218_163536';

export const migrations = [
  {
    up: migration_20251212_202546.up,
    down: migration_20251212_202546.down,
    name: '20251212_202546',
  },
  {
    up: migration_20251218_163536.up,
    down: migration_20251218_163536.down,
    name: '20251218_163536'
  },
];
