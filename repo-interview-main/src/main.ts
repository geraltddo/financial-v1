import { createExpressServer, Middleware, Req, Res } from "routing-controllers";
import 'dotenv/config';

let PORT = 3002;

@Middleware({ type: "before" })
export class CorsMiddleware {
  use(@Req() req: any, @Res() res: any, next: (err?: any) => any) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  }
}

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
  //cors: true,
  routePrefix: "/bp", 
  middlewares: [
    CorsMiddleware
  ],
  controllers: [
    __dirname + "/controllers/*{.js,.ts}",
  ], // we specify controllers we want to use
});

// run express application on port 3000
app.listen(PORT, () => {
  console.log(`Servidor Iniciado`);
  console.log(`Host: http://localhost:${PORT}`);
  console.log(`Fecha/Hora: ${new Date().toLocaleString()}`);
});