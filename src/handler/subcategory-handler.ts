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

export const patch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: IUser = req.body.loggedInUser;
    const subcatId = req.params.id;
    const { name, desc, img_url, category_code, sort, reason } = req.body;
    console.log(user);
    await subcategoryController.patch(
      subcatId,
      reason,
      user,
      name,
      desc,
      img_url,
      category_code,
      sort
    );
    res.status(200).json({ message: "subcategory updated successfully" });
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
    const user: IUser = req.body.loggedInUser;
    const subcatId = req.params.id;
    const reason = req.body.reason;
    await subcategoryController.remove(subcatId, reason, user);
    res.status(200).json({ message: "subcategory deleted successfully" });
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
    const subcatId = req.params.id;
    const { is_active, reason } = req.body;
    await subcategoryController.activate(subcatId, reason, user, is_active);
    res
      .status(200)
      .json({ message: "subcategory status updated successfully" });
  } catch (err) {
    next(err);
  }
};
