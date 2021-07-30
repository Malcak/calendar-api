import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import path from 'path';

import { apiRouter } from './shared/infrastructure/api/api';
import dbConecction from './shared/infrastructure/database/mongooseConfig';

// Create Express server
const app = express();

// Create Database Connection
dbConecction()
  .then(() => console.log('\x1b[32m✔ \x1b[37m Connected to Database'))
  .catch(() =>
    console.log(
      '\x1b[31m✖ \x1b[37m error when trying to connect to the database'
    )
  );

// Express configuration
app.set('port', process.env.PORT || 4000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

app.use(
  express.static(path.join(__dirname, '../public'), { maxAge: 31557600000 })
);

app.use('/api', apiRouter);

export default app;
