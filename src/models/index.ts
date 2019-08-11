import mongoose from 'mongoose'
require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

class Database {
  public connect () {
    mongoose.connect(process.env.DBURL, { useNewUrlParser: true, useCreateIndex: true })
    mongoose
      .connection
      .on('connected', this.log.bind(this, `Mongoose connected to ${process.env.DBNAME}`))
      .on('error', this.log.bind(this, `Mongoose connection error:`))
      .on('disconnected', this.log.bind(this, `Mongoose disconnected from ${process.env.DBNAME}`))
  }

  public closeConnection () {
    mongoose.connection.close()
  }

  private log (message: string, aditionalInfo?: any) {
    const msg = (!!message && !!aditionalInfo) ? `${message} ${aditionalInfo}` : `${message}`
    console.log(msg)
  }
}

export default new Database()
