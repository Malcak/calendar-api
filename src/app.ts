import express from 'express';
import helmet from 'helmet';
import path from 'path';
import dbConecction from './shared/infrastructure/database/mongooseConfig';
import { apiRouter } from './shared/infrastructure/api/api';

// Create Express server
const app = express();

// Create Database Connection
dbConecction().then(() =>
  console.log('\x1b[32m✔ \x1b[37m Connected to Database')
);

// Express configuration
app.set('port', process.env.PORT || 4000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use(
  express.static(path.join(__dirname, '../public'), { maxAge: 31557600000 })
);

app.use('/api', apiRouter);

export default app;
