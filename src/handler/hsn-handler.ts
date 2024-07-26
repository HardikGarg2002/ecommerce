import { NextFunction, Request, Response } from "express";
import { IHsn } from "../interface/hsn";
import { IUser } from "../interface/user";
import HsnController from "../controller/hsn-controller";

const hsnController = new HsnController();

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const hsn = await hsnController.get();
    res.status(200).json(hsn);
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
    const id: string = req.params.id;
    const hsn = await hsnController.getById(id);
    res.status(200).json(hsn);
  } catch (error) {
    next(error);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: IUser = req.body.loggedInUser;
    const hsnInput: IHsn = req.body;
    hsnInput.created = { ...user };
    hsnInput.updated = hsnInput.created;
    const id = await hsnController.create(hsnInput);
    res.status(200).json({ message: "Hsn created Successfully", id });
  } catch (error) {
    next(error);
  }
};

export const patch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const user: IUser = req.body.loggedInUser;
    const { code, desc, gst, reason } = req.body;
    await hsnController.patch(id, { updated: user, code, desc, gst });
    res.status(200).json({ message: "hsn updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const activate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const user: IUser = req.body.loggedInUser;
    const { is_active, reason } = req.body;
    await hsnController.activate(id, { updated: user, is_active });
    res.status(200).json({ message: "hsn status change successfully" });
  } catch (error) {
    next(error);
  }
};
