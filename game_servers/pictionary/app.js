const express = require('express');
const http = require('http');
const { Drawing, Game } = require('./server/controllers');
const { initIo } = require('./server/socket-io');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');

require('dotenv').config();

let app = express();
let server = http.createServer(app);
let io = initIo(server);

// const API_OPTIONS = {
//   host: "localhost",
//   port: 8000
// }

app.use('/node_modules', express.static(__dirname + '/node_modules'));

io.use(function(socket, next){
  const cookies = cookie.parse(socket.handshake.headers.cookie);
  const auth_token = cookies.jwt_access;

  if (auth_token){
    jwt.verify(auth_token, process.env.JWT_PUBLIC_KEY, function(err, decoded) {
      if (err) return next(new Error('Authentication error'));
      socket.decoded = decoded;
      next();
    });
  }
  else {
    next(new Error('Authentication error'));
  }    
}).on('connection', function (socket) {

  let drawing = new Drawing(io, socket);
  let game = new Game(io, socket);

  // Get logged-in user and set as a new user
  let userId = socket.decoded.user;

  if(!game.users.find(userId)) {
    game.newUser(userId);
  } else if (!game.userId) {
    game.userId = userId;
  }

  // Drawing
  socket.on('drawing:clear', () => drawing.onClear());
  socket.on('drawing:mouseDown', (pos) => drawing.onMouseDown(pos));
  socket.on('drawing:mouseDrag', (pos) => drawing.onMouseDrag(pos));
  socket.on('drawing:brushChange', (brush) => drawing.onBrushChange(brush));

  // Game
  socket.on('game:setUsername', (name) => {
    return game.onSetUsername(name);
  });
  socket.on('game:user', () => game.onUser());
  socket.on('game:userList', () => game.onUserList());
  socket.on('game:useList', (list) => game.useList(list));

  socket.on('game:ready', () => {
    game.switchReady();
    if (game.isPlaying()) {
      game.emitDrawer();
      drawing.load();
    }

    game.checkReadyStatus();

    if (game.canStart()) {
      game.gameStart();
      drawing.notifyDrawer(game.getDrawerId());
    }
  });

  // Chat
  socket.on('chat:newMessage', (msg) => {
    if (game.game.match(msg)) {
      game.user.score += 1;
      game.gameEnd(game.user);
    } else {
      socket.broadcast.emit('chat:newMessage', { user: game.user, message: msg });
    }
  });
  
  // Disconnect
  socket.on('disconnect', () => game.userQuit(userId));
});


const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Pictionary! Listening to ${port}...`)
});
