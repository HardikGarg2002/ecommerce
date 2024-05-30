import { Request, Response, NextFunction } from "express";
import * as featureService from "../service/feature-service";
import { IUser } from "../interface/user";
import { IFeature } from "../interface/feature";

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const features = await featureService.get();
    res.status(200).json(features);
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
    const featureId = req.params.id;
    const feature = await featureService.getById(featureId);
    res.status(200).json(feature);
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
    const featureInput: IFeature = req.body;
    featureInput.createdBy = user.name;
    featureInput.updatedBy = featureInput.createdBy;
    const id = await featureService.create(featureInput);
    res.status(201).json({ message: "feature created successfully", id });
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
    const id = req.params.id;
    const { name, desc, sort } = req.body;
    await featureService.patch(id, { name, desc, sort });
    res.status(200).json({ message: "feature updated successfully" });
  } catch (err) {
    next(err);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body.loggedInUser;
    const id = req.params.id;
    await featureService.remove(id);
    res.status(200).json({ message: "feature deleted successfully" });
  } catch (err) {
    next(err);
  }
};
