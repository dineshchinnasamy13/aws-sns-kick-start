import * as express from 'express'
import { Application } from 'express'


class App {
    public app: Application
    public port: number

    constructor(appInit: { port: number; middleWares: any; controllers: any;}) {
        this.app = express()
        this.port = appInit.port

        this.modify()
        this.middlewares(appInit.middleWares)
        this.routes(appInit.controllers)
        this.assets()
        this.template()
    }

    private modify(){
        this.app.use(function(Request,Response,NextFunction){
            if (Request.get('x-amz-sns-message-type')) {
                Request.headers['content-type'] = 'application/json';
            }
            NextFunction();
        });
    }

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach(middleWare => {

            this.app.use(middleWare)
        })
    }

    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router)
        })
    }

    private assets() {
        this.app.use(express.static('public'))
        this.app.use(express.static('views'))
     
    }

    private template() {
        this.app.set('view engine', 'pug')
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`)
        })
    }
}

export default App