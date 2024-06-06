import { NextFunction, Request, Response } from "express";
import * as tagService from "../service/tag-service";
import { IUser } from "../interface/user";
import { ITag } from "../interface/tag";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: IUser = req.body.loggedInUser;
    const tagInput: ITag = req.body;
    tagInput.createdBy = user.name;
    tagInput.updatedBy = tagInput.createdBy;
    const _id = await tagService.create(tagInput);
    res.status(200).json({ message: "Tag created Successfully", id: _id });
  } catch (error) {
    next(error);
  }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tags = await tagService.get();
    res.status(200).json(tags);
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
    const tag = await tagService.getById(id);
    res.status(200).json(tag);
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
    const user: IUser = req.body.loggedInUser;
    const id: string = req.params.id;
    const { is_active } = req.body;
    await tagService.patchStatus(id, is_active);
    res.status(200).json({ message: "tag updated successfully" });
  } catch (error) {
    next(error);
  }
};
