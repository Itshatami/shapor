import autoBind from "auto-bind";
import User from "./user.model.js";

class UserController {
  #model;
  #service;
  constructor() {
    autoBind(this);
    this.#model = User;
  }

  whoami(req, res, next) {
    const user = req.user;
    return res.json(user);
  }
}

const userController = new UserController();

export default userController;
