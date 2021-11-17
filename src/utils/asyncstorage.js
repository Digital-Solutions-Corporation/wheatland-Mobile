import AsyncStorage from "@react-native-async-storage/async-storage";

export const insertString = async (key, value, callback = null) => {
	try {
		await AsyncStorage.setItem(key, value, callback);
	} catch (e) {
		throw e;
	}
}

export const insertObject = async (key, obj, callback = null) => {
	try {
		const json = JSON.stringify(obj);
		await AsyncStorage.setItem(key, json, callback);
	} catch (e) {
		throw e;
	}
}

export const getString = async (key, def = null, callback = null) => {
	try {
		return await AsyncStorage.getItem(key, callback) || def;
	} catch (e) {
		throw e;
	}
}

export const getObject = async (key, def = null, callback = null) => {
	try {
		const json = await AsyncStorage.getItem(key);
		if (json) return JSON.parse(json);
		return def;
	} catch (e) {
		throw e;
	}
}

export const hasKey = async (key, callback = null) => {
	try {
		return await AsyncStorage.getItem(key, callback) !== null;
	} catch (e) {
		throw e;
	}
}

export const removeKey = async (key, callback = null) => {
	try {
		await AsyncStorage.removeItem(key, callback);
	} catch (e) {
		throw e;
	}
}


