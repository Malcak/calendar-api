import express from 'express';
import helmet from 'helmet';
import path from 'path';

import { loadApiEndpoints } from './controllers/api';

// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 4000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use(
  express.static(path.join(__dirname, '../public'), { maxAge: 31557600000 })
);

loadApiEndpoints(app);

export default app;
