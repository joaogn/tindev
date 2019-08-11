import { Request, Response } from 'express'
import * as _ from 'lodash'
import Handlers from '../../api/resposeHandlers'
import Dev from './service'

// the controler class is used to make the connection between the UserRouter class and the Service class
// And returns the result of the promisses of the service class methods.

class PostController {
  constructor () {};

  create (req: Request, res: Response) {
    Dev
      .create(req.body.user)
      .then(_.partial(Handlers.onSucess, res))
      .catch(_.partial(Handlers.onError, res, 'Error create new dev'))
  }

  like (req: Request, res: Response) {
    Dev
      .like(req.params.id, req.headers.user)
      .then(_.partial(Handlers.onSucess, res))
      .catch(_.partial(Handlers.onError, res, 'Error like dev'))
  }

  dislike (req: Request, res: Response) {
    Dev
      .dislike(req.params.id, req.headers.user)
      .then(_.partial(Handlers.onSucess, res))
      .catch(_.partial(Handlers.onError, res, 'Error dislke dev'))
  }

  getDevs (req: Request, res: Response) {
    Dev
      .getDevs(req.headers.user)
      .then(_.partial(Handlers.onSucess, res))
      .catch(_.partial(Handlers.onError, res, 'Error get devs'))
  }
}

export default new PostController()
