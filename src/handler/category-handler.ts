import { Request, Response, NextFunction } from "express";
import * as CategoryService from "../service/category-service";
import { IUser } from "../interface/user";
import { ICategory } from "../interface/category";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: IUser = req.body.loggedInUser;
    const categoryInput: ICategory = req.body;
    categoryInput.createdBy = user.name;

    categoryInput.updatedBy = categoryInput.createdBy;
    const id = await CategoryService.create(categoryInput);
    res.status(201).json({ message: "category created successfully", id });
  } catch (err) {
    next(err);
  }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await CategoryService.get();
    res.status(200).json(categories);
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
    const catId = req.params.id;
    const category = await CategoryService.getById(catId);
    res.status(200).json(category);
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
    const catId = req.params.id;
    const { name, desc, img_url, sort } = req.body;
    await CategoryService.patch(catId, { user, name, desc, img_url, sort });
    res.status(200).json({ message: "category updated successfully" });
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
    const catId = req.params.id;
    const { is_active } = req.body;
    await CategoryService.patchStatus(catId, is_active);
    res.status(200).json({ message: "category status updated successfully" });
  } catch (err) {
    next(err);
  }
};
