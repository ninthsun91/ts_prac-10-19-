import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import env from './config.env';
import sequelize from './database/config/connection';
import association from './database/config/association';

import userRouter from './routes/user';
import postRouter from './routes/post';


const app = express();
const PORT = env.PORT;


app.use(express.json());
app.use(cookieParser());
app.use(session({
    'secret': 'WEEK5'
}));

app.use('/', userRouter);
app.use('/post', postRouter);


app.listen(PORT, async() => {
    console.log(`SERVER RUNNING ON ${PORT}`);

    try {
        await sequelize.authenticate();
        association.associate();
        console.log('DB CONNECTED');
    } catch (error) {
        console.error(error);
        console.log('DB CONNECTION FAIL');
    }
});