'use strict'

import { Application } from 'express'
import PostController from '../modules/dev/controller'

// Class responsible for starting the API routes, request authentication
// and call the modules responsible for executing the route

class Routes {
  constructor () {}

  initRoutes (app: Application): void{
    app.route('/api/devs/create').post(PostController.create)
    app.route('/api/devs/:id/likes').post(PostController.like)
    app.route('/api/devs/:id/dislikes').post(PostController.dislike)
    app.route('/api/devs/all').get(PostController.getDevs)
  }
}

export default new Routes()
