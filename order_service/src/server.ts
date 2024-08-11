import exppressApp from './express-app'
import { logger } from './utils';

const PORT = process.env.PORT || 4001;

export const StartServer = async () => {
  exppressApp.listen(PORT, () => {
    logger.info(`App is Listening to port  ${PORT} `);
  })

  // handle exception in case the server not respones or time out ...
  process.on('uncaughtException', async (err) => {
    logger.error(err);
    process.exit(1)

  })

}

StartServer().then(() => {
  logger.info('server is up');

})