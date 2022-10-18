import express from 'express';
import env from './config.env';
import sequelize from './database/config/connection';


const app = express();
const PORT = env.PORT;


app.listen(PORT, async() => {
    console.log(`SERVER RUNNING ON ${PORT}`);

    try {
        await sequelize.authenticate();
        console.log('DB CONNECTED');
    } catch (error) {
        console.error(error);
        console.log('DB CONNECTION FAIL');
    }
});