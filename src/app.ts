import express from 'express';


const app = express();
const PORT = 3030;


app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON ${PORT}`);
});