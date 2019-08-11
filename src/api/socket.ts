'use strict'
import SocketIo from 'socket.io'

class Socket {
    public io: SocketIO.Server;

    constructor () {}

    public initIo (server) {
      this.io = SocketIo(server)

      this.io.on('connection', (socket) => {
        console.log('a user connected')
        // whenever we receive a 'message' we log it out
        socket.on('message', (message) => {
          console.log(message)
        })
      })
    }

    public closeIo () {
      this.io.close()
    }
}

export default new Socket()
