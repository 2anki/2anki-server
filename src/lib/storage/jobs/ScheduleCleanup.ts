import { Knex } from 'knex';

import deleteOldUploads, {
  MS_21,
  MS_24_HOURS,
} from './helpers/deleteOldUploads';
import { runFileSystemCleanup } from './helpers/runFileSystemCleanup';

export const ScheduleCleanup = (db: Knex) => {
  setInterval(() => runFileSystemCleanup(db), MS_21);

  setInterval(
    () => deleteOldUploads(db).then(() => console.info('deleted old uploads')),
    MS_24_HOURS
  );
};
