import { Request, Response, NextFunction } from "express";
import AliasController from "../controller/alias-controller";
import { IAlias } from "../interface/alias";
import { IUser } from "../interface/user";
// import { IUser } from '../interface/user';
const aliasController = new AliasController();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: IUser = req.body.loggedInUser;
    const aliasInput: IAlias = req.body;
    aliasInput.created = {
      ...user,
    };

    aliasInput.updated = aliasInput.created;
    const id = await aliasController.create(aliasInput);
    res.status(201).json({ message: "alias created successfully", id });
  } catch (err) {
    next(err);
  }
};
