import { Request, Response, NextFunction } from "express";
import ProductController from "../controller/product-controller";
import {
  IProduct,
  IProductFeatures,
  IProductPrices,
} from "../interface/product";
import { IUser } from "../interface/user";

const productController = new ProductController();

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await productController.get();
    res.status(200).json(products);
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
    const productId = req.params.id;
    const product = await productController.getById(productId);
    res.status(200).json(product);
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
    const productInput: IProduct = req.body;
    productInput.created = user;
    productInput.updated = productInput.created;
    if (!Array.isArray(productInput.tags)) {
      productInput.tags = [];
    }
    const id = await productController.create(productInput);
    res.status(201).json({ message: "Product created successfully", id });
  } catch (err) {
    next(err);
  }
};
