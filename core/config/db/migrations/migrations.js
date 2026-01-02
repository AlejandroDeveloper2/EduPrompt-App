// This file is required for Expo/React Native SQLite migrations - https://orm.drizzle.team/quick-sqlite/expo

import journal from './meta/_journal.json';
import m0000 from './0000_wooden_epoch.sql';
import m0001 from './0001_wide_norrin_radd.sql';
import m0002 from './0002_overrated_red_ghost.sql';
import m0003 from './0003_acoustic_changeling.sql';
import m0004 from './0004_overrated_dragon_man.sql';
import m0005 from './0005_wakeful_thor_girl.sql';
import m0006 from './0006_sturdy_lockjaw.sql';

  export default {
    journal,
    migrations: {
      m0000,
m0001,
m0002,
m0003,
m0004,
m0005,
m0006
    }
  }
  