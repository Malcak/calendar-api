import app from './app';

/**
 * Start Express server.
 */
const server = app.listen(app.get('port'), () => {
  console.log(
    `🚀 Server is running at \x1b[1mhttp://localhost:${app.get(
      'port'
    )}\x1b[0m in \x1b[1m${app.get('env')}\x1b[0m mode`
  );
});

export default server;
