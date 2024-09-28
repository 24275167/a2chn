import { createConnection } from 'mysql2';
// MySQL connection
const mysql = createConnection({
  host: 'localhost',       
  user: 'root',
  password: '2002C09h@',
  database: 'crowdfunding_db',
}).promise();
export default mysql
