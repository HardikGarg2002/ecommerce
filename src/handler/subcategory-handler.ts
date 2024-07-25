import { Request, Response, NextFunction } from "express";
import SubcategoryController from "../controller/subcategory-controller";
import { ISubcategory } from "../interface/subcategory";
import { IUser } from "../interface/user";
const subcategoryController = new SubcategoryController();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: IUser = req.body.loggedInUser;
    const subcategoryInput: ISubcategory = req.body;
    subcategoryInput.created = {
      ...user,
    };
    subcategoryInput.updated = subcategoryInput.created;
    const id = await subcategoryController.create(subcategoryInput);
    res.status(201).json({ message: "subcategory created successfully", id });
  } catch (err) {
    next(err);
  }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const subcategories = await subcategoryController.get();
    res.status(200).json(subcategories);
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
    const subcatId = req.params.id;
    const subcategory = await subcategoryController.getById(subcatId);
    res.status(200).json(subcategory);
  } catch (err) {
    next(err);
  }
};
