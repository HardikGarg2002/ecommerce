const compareArrays = (a: any[], b: any[]) => {
	if (a.length !== b.length) return false;
	for (let i = 0; i < a.length; i++) {
		const aItem = a[i];
		const bItem = b[i];
		if (Array.isArray(aItem) && Array.isArray(bItem)) {
			if (!compareArrays(aItem, bItem)) return false;
		} else if (typeof aItem === 'object' && typeof bItem === 'object') {
			if (!compareObjects(aItem, bItem)) return false;
		} else if (aItem !== bItem) return false;
	}
	return true;
};

const compareObjects = (a: any, b: any) => {
	if (Object.keys(a).length !== Object.keys(b).length) return false;
	for (const key in a) {
		if (a[key] !== b[key]) return false;
	}
	return true;
};

export function clone<T>(data: T): T {
	return JSON.parse(JSON.stringify(data));
}
