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

export const patch = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user: IUser = req.body.loggedInUser;
		const productId = req.params.id;
		const { reason } = req.body;
		const { name, desc, sku, sort, category_code, subcategory_code }: Partial<IProduct> = req.body;
		await productController.patch(productId, user, reason, { name, desc, sku, sort, category_code, subcategory_code });
		res.status(200).json({ message: 'Product updated successfully' });
	} catch (err) {
		next(err);
	}
};

export const activate = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user: IUser = req.body.loggedInUser;
		const productId = req.params.id;
		const { reason, is_active } = req.body;

		await productController.activate(productId, user, reason, is_active);
		res.status(200).json({ message: 'Product status updated successfully' });
	} catch (err) {
		next(err);
	}
};

export const patchOffer = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user: IUser = req.body.loggedInUser;
		const productId = req.params.id;
		const { reason, offer } = req.body;

		await productController.patchOffer(productId, user, reason, offer);
		res.status(200).json({ message: 'Product offer status updated successfully' });
	} catch (err) {
		next(err);
	}
};
export const patchPrice = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user: IUser = req.body.loggedInUser;
		const productId = req.params.id;
		const priceDetails: IProductPrices = req.body.prices;
		const { hsn_code, reason } = req.body;

		await productController.patchPrice(productId, user, reason, priceDetails, hsn_code);
		res.status(200).json({ message: 'Product prices updated successfully' });
	} catch (err) {
		next(err);
	}
};

export const patchOos = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user: IUser = req.body.loggedInUser;
		const productId = req.params.id;
		const { oos } = req.body;

		await productController.patchOos(productId, user, oos);
		res.status(200).json({ message: 'Product stock availability status updated successfully' });
	} catch (err) {
		next(err);
	}
};
