import * as express from 'express'
import { Request, Response } from 'express'
import Service from '../../service/service';

class HomeRoute  {

    protected router = express.Router();
    protected service:Service; 
    
    constructor() {
        this.router.get('/', this.getUsers)
        this.service = new Service();

    }
    
    private getUsers = (req: Request, res: Response) => {

        const result = this.service.getUsers();
        
        res.send( result );
    }
}

export default HomeRoute