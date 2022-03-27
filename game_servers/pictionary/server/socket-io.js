const socketio = require('socket.io');
let io;

exports.initIo = function initIo(httpServer) {
  io = socketio(httpServer, {
    allowEIO3: true,
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
      credentials: true
    }
  });
  return io;
}

exports.getIo = function getIo() {
  if (!io) throw 'io is not initialized';

  return io;
}
