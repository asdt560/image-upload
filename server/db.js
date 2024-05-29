import 'dotenv/config'
import pgPromise from 'pg-promise';

const pgp = pgPromise();

const pg = pgp(process.env.CONNECTIONSTRING)

export default pg;