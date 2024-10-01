import Banner from '../model/banner';

export async function create(bannerInput: any) {
	const newBanner = new Banner(bannerInput);
	return await newBanner.save();
}

export async function get() {
	return await Banner.find();
}

export async function getById(bannerId: string) {
	return await Banner.findById(bannerId);
}

export async function patch(bannerId: string, bannerInput: any) {
	await Banner.findByIdAndUpdate(bannerId, bannerInput);
}

export async function patchStatus(bannerId: string, isActive: boolean) {
	await Banner.findByIdAndUpdate(bannerId, { is_active: isActive });
}
