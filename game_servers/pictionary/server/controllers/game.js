const { UsersInstance, GameInstance } = require('../models');

module.exports = class Game {
  constructor(io, socket) {
    this.users = UsersInstance();
    this.game = GameInstance();
    this.io = io;
    this.socket = socket;
  }
  
  useList(list) {
    this.game.useList = list;
  }

  canStart() {
    return (this.users.allReady()
    && !this.game.isPlaying
    && this.users.getUserList().length > 1);
  }

  checkReadyStatus() {
    if (this.users.allReady() && !this.isPlaying() && this.users.getUserList().length <= 1) {
      this.io.emit('game:status', 'Le jeu commencera quand il y aura 2 joueurs ou plus');
    }

    if (!this.users.allReady() && !this.isPlaying()) {
      this.io.emit('game:status', 'Le jeu commence quand tout le monde est prêt');
    }
  }

  emitDrawer() {
    this.socket.emit('game:start', this.game.drawer);
  }

  gameStart() {
    this.game.drawer = this.users.nextDrawer();
    let drawerId = this.game.drawer.id;
    this._countDown();
    this.game.start(() => {
      this.gameEnd();
    });

    this.io.emit('game:start', this.game.drawer);
    this.io.to(drawerId).emit('game:answer', this.game.answer);
  }

  gameEnd(winner) {
    this.users.unReadyAll();
    this.game.end();
    clearInterval(this.game.interval);
    this.io.emit('game:end', { user: winner, message: `Answer is ${this.game.answer}` });
  }

  getDrawerId() {
    return this.game.drawer.id;
  }

  isPlaying() {
    return this.game.isPlaying;
  }

  newUser(id) {
    this.users.addUser(id);
    this.userId = id;
  }

  onSetUsername(name) {
    this.user.name = name;
    this.io.emit('game:userList', this.users.getUserList(this.userId));
  }

  onUser() {
    const user = this.users.find(this.userId);
    this.socket.emit('game:user', user);
  }

  onUserList() {
    this.socket.emit('game:userList', this.users.getUserList(this.userId));
  }

  switchReady() {
    this.users.switchReady(this.userId);
    this.checkReadyStatus();
    this.io.emit('game:userList', this.users.getUserList(this.userId));
  }

  userQuit(id) {
    const user = this.users.find(id);

    if(user) {
      if (this.users.getUserList().length === 0) {
        this.gameEnd();
      }
      if (this.game.drawer === user) {
        this.io.emit('game:end', { message: 'Drawer has left the game' });
        this.gameEnd();
      }
      this.users.removeUser(id);
      this.io.emit('game:userList', this.users.getUserList());
    }
  }


  _countDown() {
    let time = this.game._TIME / 1000;
    this.io.emit('game:timeLeft', time);
    
    this.game.interval = setInterval(() => {
      time = time - 1;
      this.io.emit('game:timeLeft', time);
    }, 1000);
  }
}
