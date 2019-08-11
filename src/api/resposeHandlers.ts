'use strict'

import { Request, Response, ErrorRequestHandler, NextFunction } from 'express'
import * as HttpStatus from 'http-status'

// Class that has the methods responsible for the API response

class Handlers {
  onError (res: Response, message: string, err: any) {
    console.log(`Error: ${err}`)
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(message)
  }

  onSucess (res: Response, data: any) {
    res.status(HttpStatus.OK).json({ payload: data })
  }

  errorHandlerApi (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
    console.error(`API error handler execute: ${err}`)
    res.status(500).json({
      errorCode: 'ERR-001',
      message: 'Internal Server Error'
    })
  }
}

export default new Handlers()
