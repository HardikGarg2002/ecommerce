import { Request, Response, NextFunction } from 'express';
import ProductController from '../controller/product-controller';
import { IProduct, IProductFeatures, IProductPrices } from '../interface/product';
import { IUser } from '../interface/user';

const productController = new ProductController();

export const get = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const filters = req.query.filters;
		const pagination = req.query.pagination;
		let sort = req.query.sort as string;
		if (!sort) {
			sort = 'sort:asc';
		}
		console.log('filters in get product apis reqjuest', filters, pagination);
		const products = await productController.get(filters, pagination, sort);
		res.status(200).json(products);
	} catch (err) {
		next(err);
	}
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const productId = req.params.id;
		const product = await productController.getById(productId);
		res.status(200).json(product);
	} catch (err) {
		next(err);
	}
};
export const getbyIds = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.query;
		const arrIds = (id as string)?.trim().split(',');
		const products = await productController.getByIds(arrIds);

		res.status(200).json(products);
	} catch (error) {
		next(error);
	}
};

export const search = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const filters = req.query.filters;
		const pagination = req.query.pagination;
		let sort = req.query.sort as string;
		if (!sort) {
			sort = 'sort:asc';
		}
		const searchText = req.query.searchText as string;
		const searchResult = await productController.search(filters, pagination, sort, searchText);
		res.status(200).json(searchResult);
	} catch (e) {
		next(e);
	}
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user: IUser = req.body.loggedInUser;
		const productInput: IProduct = req.body;
		productInput.created = { ...user };
		productInput.updated = productInput.created;
		if (!Array.isArray(productInput.tags)) {
			productInput.tags = [];
		}
		const id = await productController.create(productInput);
		res.status(201).json({ message: 'Product created successfully', id });
	} catch (err) {
		next(err);
	}
};
