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
