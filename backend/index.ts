import express from 'express';
import bodyParser from 'body-parser';
import config from './src/config';
import newsRoutes from './src/routes/newsPosts'
import cors from 'cors'
import path from 'path';

const main = async () => {
  const app = express();
  const host = config.get('HOST')
  const port = config.get('PORT')

  app.use(cors())
  app.use(bodyParser.json());
  app.use('/', newsRoutes)
  app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/public/index.html'));
  });
  
  app.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });
}

main().catch((error) => {
  console.error(error);
});


