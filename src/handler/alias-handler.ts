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

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const aliases = await aliasController.get();
    res.status(200).json(aliases);
  } catch (err) {
    next(err);
  }
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const aliasId = req.params.id;
    const alias = await aliasController.getById(aliasId);
    res.status(200).json(alias);
  } catch (err) {
    next(err);
  }
};

export const patch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: IUser = req.body.loggedInUser;
    const aliasId = req.params.id;
    const { name, reason } = req.body;
    await aliasController.patch(aliasId, reason, user, name);
    res.status(200).json({ message: "alias updated successfully" });
  } catch (err) {
    next(err);
  }
};

export const patchStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: IUser = req.body.loggedInUser;
    const aliasId = req.params.id;
    const { reason, is_active } = req.body;
    await aliasController.activate(aliasId, reason, user, is_active);
    res.status(200).json({ message: "alias status updated successfully" });
  } catch (err) {
    next(err);
  }
};
