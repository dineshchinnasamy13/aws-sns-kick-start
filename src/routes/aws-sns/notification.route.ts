import * as express from 'express';
import { Request, Response, NextFunction} from 'express';
import Service from '../../service/service';

class NotificationRoute {
    
    public router = express.Router();
    protected service:Service; 
    
    constructor() {
        this.service = new Service();
        this.router.post('/publish', this.publishToSns);
        this.router.post('/', this.confirmSubscription);
    }

    private publishToSns = (req: Request, res: Response) => {
        try{
        
            const result = this.service.publishToSns(req.body);

            res.send(result);
        }
        catch(error){
            throw error;
        }
    }

    private confirmSubscription = async (
            req: Request,
            res: Response,
            next: NextFunction,
    ) => {
        try {
            console.log("***confirm subscription***");
            console.log(req.body)

            console.log("arn" + req.get("x-amz-sns-topic-arn"));
            console.log("token" + req.get("x-amz-sns-message-id"));

            const data = {
                Token: req.get("x-amz-sns-message-id"),
                TopicArn: req.get("x-amz-sns-topic-arn")
            }
              
            if (req.get('x-amz-sns-message-type') === 'SubscriptionConfirmation') {

                 
                const subscription = await this.service.confirmSnsSubscription(req.body);
    
                res.json(subscription);
            }
    
            if (req.get('x-amz-sns-message-type') === 'Notification') {
                   
                console.info('***Message from AWS-SNS***');
                const message = JSON.parse(req.body.Message)
                console.info(message);
    
            }

        } catch (error) {
            throw Error;
        }
    };
}

export default NotificationRoute