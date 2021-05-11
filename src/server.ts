import App from './app'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import loggerMiddleware from './middleware/logger'

import HomeRoute from './routes/home/home.route'
import NotificationRoute from './routes/aws-sns/notification.route'


const app = new App({
    port: 5000,
    controllers: [
        new HomeRoute(),
        new NotificationRoute()

    ],
    middleWares: [

        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware
    ],
})



app.listen()

