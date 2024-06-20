import express from 'express';
import { engine } from 'express-handlebars';
import pathObj from 'path';
import morgan from 'morgan';
import fileUpload from 'express-fileupload'

import { router as views } from './routes/views.js';
import { router as inscritos } from './routes/inscritos.js';
import { router as auth } from './routes/auth.js';

const app = express();
app.use(express.json());
app.use("/assets", express.static("assets"));
app.use(fileUpload());

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use("/", views);
app.use("/inscritos", inscritos);
app.use("/auth", auth);


app.listen(3000, () =>
{
    console.log("Conectado al puerto 3000");
});