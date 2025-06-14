process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import errorHandler from 'errorhandler'
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from 'config';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { connect, set } from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { dbConnection } from '@databases';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import { Env, STAGE } from '@/configs/env';
import cloudinary from 'cloudinary';
import ip from 'ip'
import { versionMiddleware } from './middlewares/versionMiddleware';



class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = Env.PORT;
    this.env = Env.STAGE;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
    // this.initializeFirebase();
    // this.configCloudinary()
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${ip.address()}:${this.port}`);
      // logger.info(`🚀 App listening on the port server ip:${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    if (Env.STAGE !== STAGE.PRODUCTION) {
      this.app.use(errorHandler()); 
    }
    // dbConnection.options
    await connect(dbConnection.url).catch(err => {
      console.log(err);
    });

    console.log('mongod connected');
  }

  private configCloudinary() {
    // Setting up cloudinary config
    cloudinary.v2.config({
      cloud_name: Env.CLOUDINARY_CLOUD_NAME,
      api_key: Env.CLOUDINARY_API_KEY,
      api_secret: Env.CLOUDINARY_API_SECRET
    })
  }

  private initializeMiddlewares() {
    // this.app.use(errorHandler({ log: true }));
    this.app.use(errorMiddleware); 
    this.app.use(morgan(config.get('log.format'), { stream }));
    this.app.use(cors({ origin: config.get('cors.origin'), credentials: config.get('cors.credentials') }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json({ limit: '50mb' }));
    this.app.use(express.urlencoded({ limit: '50mb', extended: true }));
    this.app.use(cookieParser());
    this.app.use(versionMiddleware);

    process.on('unhandledRejection', (error, promise) => {
      console.log(' Oh Lord! We forgot to handle a promise rejection here: ', promise);
      console.log(' The error was: ', error);
    });
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  // private initializeFirebase() {
  //   admin.initializeApp({
  //     credential: admin.credential.cert(require(Env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH)),
  //   });
  // }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'Node-Boilerplate - REST API',
          version: '1.0.0',
          description: 'Example docs',
          contact: {
            name: "Mohammed Mishab p", // your name
            email: "", // your email
            url: "osperb.com",
          }
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }


}

  // Handle uncaught exceptions (sync code errors)
  process.on('uncaughtException', (err) => {
    console.error('🧨 Uncaught Exception:', err);
    process.exit(1); // Optional: Exit and restart using PM2 or Docker
  });

export default App;
