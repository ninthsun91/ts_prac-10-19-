import { createConnection } from 'mysql2';
import env from '../../config.env';


const connection =  createConnection({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
});


(() => {
    console.log('CREATE DATABASE');
    connection.query(`SHOW DATABASES LIKE '${env.DB_NAME}'`, (err, result)=>{
        console.log(result.toString());
        if (err) {
            console.error(err);
            connection.end();
        }
        if (!result.toString()) {
            connection.query(`CREATE DATABASE IF NOT EXISTS ${env.DB_NAME}`);
            console.log('DB CREATED');
        } else {
            connection.query(`DROP DATABASE ${env.DB_NAME}`);
            console.log('DB DROPPED');
            connection.query(`CREATE DATABASE IF NOT EXISTS ${env.DB_NAME}`);
            console.log('DB CREATED');
        }
        connection.end();
    });
})();