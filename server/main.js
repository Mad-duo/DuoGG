import express from "express";
import session from 'express-session';
import bodyParser from 'body-parser';

import router from './routes/index';
import userRouter from './routes/user';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(session({
    // https://www.guidgenerator.com/
    secret: '22d3d77b-bb0f-45da-b968-8990b17b6de8',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 360
    }
}));

app.use('/', router);
app.use('/user', userRouter);

app.listen(PORT, function (){
    console.log(`Listening on: http://localhost:${PORT}`);
});