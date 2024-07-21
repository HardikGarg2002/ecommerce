import { Request, Response, NextFunction } from "express";
import StoreController from "../controller/store-controller";
import { IStore } from "../interface/store";
import { IUser } from "../interface/user";
const storeController = new StoreController();

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stores = await storeController.get();
    res.status(200).json(stores);
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
    const storeId = req.params.id;
    const store: IStore = await storeController.getById(storeId);
    res.status(200).json(store);
  } catch (err) {
    next(err);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: IUser = req.body.loggedInUser;
    const storeInput: IStore = req.body;
    storeInput.created = {
      ...user,
    };
    storeInput.updated = storeInput.created;
    const id = await storeController.create(storeInput);
    res.status(201).json({ message: "store created successfully", id });
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
    const user = req.body.loggedInUser;
    const storeId = req.params.id;
    const { name, desc, city_key, sort, reason } = req.body;
    await storeController.patch(storeId, user, name, desc, city_key, sort);
    res.status(200).json({ message: "store updated successfully" });
  } catch (err) {
    next(err);
  }
};

export const activate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body.loggedInUser;
    const storeId = req.params.id;
    const { is_active } = req.body;
    await storeController.patchStatus(storeId, is_active);
    res.status(200).json({ message: "store status updated successfully" });
  } catch (err) {
    next(err);
  }
};
