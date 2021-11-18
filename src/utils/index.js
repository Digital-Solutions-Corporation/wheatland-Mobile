import { Alert } from "react-native";
import { insertString, insertObject, getString, getObject, hasKey, removeKey } from "./asyncstorage";

// https://stackoverflow.com/a/47593316/12707218
export const mulberry32 = (a) => {
	return function (normalized = true) {
		var t = a += 0x6D2B79F5;
		t = Math.imul(t ^ t >>> 15, t | 1);
		t ^= t + Math.imul(t ^ t >>> 7, t | 61);
		var ret = ((t ^ t >>> 14) >>> 0);
		return normalized ? ret / 4294967296 : ret;
	}
}

// https://stackoverflow.com/a/1349426/12707218
export const randomID = (len) => {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < len; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

export const hashString = (str = "") => {
	let res = 0;
	for (let i = 0; i < str.length; i++) {
		res += str.charCodeAt(i) * Math.pow(10, i);
	}
	return res;
}

export const generateTicket = (code = "") => {
	const rng = mulberry32(hashString(code));
	const end = Date.now();
	// Five days before
	const start = end - 4e8;
	const date = start + rng() * (end - start);
	const value = 10.0 + rng() * 490.0;
	const roundedValue = Math.ceil(value);
	const donateValue = roundedValue - value;

	return {
		date,
		value,
		roundedValue,
		donateValue,
		code
	};
}

export const validEmail = (email = "") => {
	return (/^\S+@\S+$/).test(email);
}

export const validTransactionCode = (code = "") => {
	return (/^\S{4}\.\S{4}\.\S{4}\.\S{4}-\S{2}$/).test(code);
}

export const asyncAlert = async (title, message, okMessage = 'ok') => new Promise((resolve, reject) => {
	Alert.alert(
		title,
		message,
		[
			{
				text: okMessage,
				onPress: () => {
					resolve('YES');
				},
			},
		],
		{ cancelable: false },
	);
});

export const updateONGs = async () => {
	try {
		const randomFounded = () => 20000000 + 60000000 * Math.random();
		let ongs = await getObject("ongs");
		if (!ongs) {
			ongs = [
				{
					"name": "A Growing Culture",
					"founded": randomFounded(),
					"img_url": "https://www.agrowingculture.org/wp-content/uploads/2016/10/advocacy.png"
				},
				{
					"name": "Groundswell International",
					"founded": randomFounded(),
					"img_url": "https://pbs.twimg.com/profile_images/1265369441971437579/vcwcTj79_400x400.jpg"
				}
			]
		} else {
			for (let ong of ongs) {
				ong.founded += 100 + 500 * Math.random()
			}
		}

		await insertObject("ongs", ongs);
	} catch (e) {
		throw e;
	}
}

export const listONGs = async () => {
	try {
		return await getObject("ongs");
	} catch (e) {
		throw e;
	}
}

export const createUser = async (nome, email, senha) => {
	try {
		const users = await getObject("users", {});
		const ids = Object.keys(users);
		if (Object.values(users).find(u => u.email === email)) {
			throw new Error("Esse email já foi usado");
		}
		let id = randomID(8);
		while (id in ids) id = randomID(8);
		const user = {
			nome,
			email,
			senha,
			id,
			donations: []
		};
		users[id] = user;
		await insertObject("users", users);
		return user;
	} catch (e) {
		throw e;
	}
}

export const getUserByEmailSenha = async (email, senha) => {
	try {
		const users = await getObject("users", {});
		const user = Object.values(users).find(u => u.email === email);
		if (!user) {
			throw new Error("Não existe um usuário com esse email");
		}
		if (user.senha !== senha) {
			throw new Error("Senha incorreta");
		}
		user.donations = user.donations || [];
		user.donations = [];

		return user;
	} catch (e) {
		throw e;
	}
}

export const userAlreadyUsedTicket = (user, ticketCode) => {
	return user.donations.find(d => d.code === ticketCode) !== undefined;
}

export const ticketDonateToONG = async (user, id, ticket) => {
	try {
		const ongs = await getObject("ongs");
		ongs[id].founded += ticket.value;
		await insertObject("ongs", ongs);
		user.donations.push(ticket);
		await updateUser(user);
	} catch (e) {
		throw e;
	}
}

export const updateUser = async (user) => {
	try {
		const users = await getObject("users", []);
		users[user.id] = user;
		await insertObject("users", users);
	} catch (e) {
		throw e;
	}
}

export const deleteUser = async (user) => {
	try {
		const users = await getObject("users", []);
		delete users[users.id];
		await insertObject("users", users);
	} catch (e) {
		throw e;
	}
}

export const clearUsers = async () => {
	try {
		await removeKey("users");
	} catch (e) {
		throw e;
	}
}



