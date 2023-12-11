import { Request, Response } from "express";
import UsersSchema from "../schemas/sUser";

const userExist = async (req: Request, res: Response) => {
  try {
    const dataUser = await UsersSchema.findOne({
      $and: [{ _email: req.body._email, }, { _password: req.body._password }]
    });

    dataUser ? res.send(dataUser) : res.send(false);
  } catch (err) {
    console.log(err);
  }
};

const insertUser = async (req: Request, res: Response) => {
  try {

    let user = await UsersSchema.findOne({
      $or: [{ _email: req.body._email }, { _fullName: req.body._fullName }]
    });

    if (user) return res.send(false)

    const dataUser = await new UsersSchema(req.body);
    await dataUser.save();

    dataUser ? res.send(dataUser) : res.send(false);
  } catch (err) {
    console.log(err);
  }
};

export { userExist, insertUser };
