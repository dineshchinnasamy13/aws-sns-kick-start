import * as AWS from 'aws-sdk'
import {SNS} from 'aws-sdk'
import {
    accessKeyId,
    secretAccessKey,
    region,
    snsTopicArn,
  } from '../../public/config.json';
import { IMessagePayload } from 'models/i-message-payload.js';


class Service  {

    private _sns: AWS.SNS; 

    constructor() {
        
        AWS.config.update({
            accessKeyId,
            secretAccessKey,
            region            
        });

        this._sns = new AWS.SNS();
    }
    
   
    public publishToSns = async (message: IMessagePayload) => {
        try{
            console.info(`Publish message to AWS-SNS ${snsTopicArn}`);

            const awsMessage: string = JSON.stringify(message);

            console.info(`Publish message to AWS-SNS ${awsMessage}`);

            const publishParams: SNS.PublishInput = {
                TopicArn: snsTopicArn,
                Message: awsMessage,
            }

            return this._sns.publish(publishParams).promise();
        }
        catch(error){
            console.error(`error in publishToSns: ${error}`);
            throw error;
        }
    }

        
        public async confirmSnsSubscription(data: any): Promise<void> {
            try {
                const params = {
                    Token: data.Token /* required */,
                    TopicArn: data.TopicArn /* required */,
                    // AuthenticateOnUnsubscribe: 'STRING_VALUE'
                };
    
                this._sns.confirmSubscription(
                    params,
                    (err: Error, resp: any): void => {
                        if (err) {
                            console.error(`error in _confirmSnsSubscription: ${err}, ${err.stack}`);
                        } else {
                            console.info(`subscription confirmed ${resp}`);
                        }
                    },
                );
            } catch (err) {
                console.error(`error in confirmSnsSubscription: ${err}`);
                throw err;
            }
        }

    public getUsers = () => {
        
        const users = [
            {
                id: 1,
                name: 'Rakesh'
            },
            {
                id: 2,
                name: 'Venkat'
            },
            {
                id: 3,
                name: 'Asharaf'
            }
        ]

        return users;
    }
}

export default Service;