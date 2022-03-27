const R = require('ramda');
const User = require('./user');

class Users {

  constructor() {
    this.users = {};
    this.drawerIndex = 0;
  }

  addUser(id) {
    this.users[id] = new User(id);
  };

  removeUser(id) {
    delete this.users[id];
  };

  find(id) {
    return this.users[id];
  };

  switchReady(id) {
    this.users[id].isReady = !this.users[id].isReady;
  }

  nextDrawer() {
    let list = this.getUserList();
    let drawer = list[this.drawerIndex];
    this.drawerIndex += 1;
    if (this.drawerIndex === list.length) this.drawerIndex = 0;
    return drawer;
  };

  getUserList() {
    return R.values(this.users);
  };

  allReady() {
    let userArray = this.getUserList();
    let isReady = R.propEq('isReady', true);
    return R.all(isReady)(userArray);
  };

  unReadyAll() {
    Object.keys(this.users).forEach(id => this.users[id].isReady = false);
  };
}

let users;
exports.Users = Users;
exports.UsersInstance = (function () {
  return function () {
    if (!users) users = new Users();
    return users;
  }
})();