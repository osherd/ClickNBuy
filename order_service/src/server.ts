import exppressApp from './express-app'

const PORT = process.env.PORT || 4001;

export const StartServer = async () => {
  exppressApp.listen(PORT, () => {
    console.log(`App is Listening to port  ${PORT} `);
  })

  // handle exception in case the server not respones or time out ...
  process.on('uncaughtException', async (err) => {
    console.log(err);
    process.exit(1)

  })

}

StartServer().then(() => {
  console.log('server is up');

})