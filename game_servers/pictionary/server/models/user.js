class User {
  constructor(id) {
    this.id = id;
    this.name = id;
    this.isReady = false;
    this.score = 0;
  }
};

User.prototype.usedImage = [];

module.exports = User;
