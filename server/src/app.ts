import express, { Request, Response } from 'express';
import bodyParser, { json } from 'body-parser';
import cors from 'cors';
import routes from './routes';

const app = express();
app.use(json());
app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);
app.all('*', (req: Request, res: Response) => {
    console.log('Route Not found');
});

export { app };
