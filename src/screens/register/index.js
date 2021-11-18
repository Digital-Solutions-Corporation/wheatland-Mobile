import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import InputField, { useInputField } from '../../components/inputField';
import { createUser, validEmail } from '../../utils';
import Colors from '../../utils/colors';
import Images from '../../utils/images';

export default function Register({ navigation }) {
	const nome = useInputField("");
	const email = useInputField("");
	const senha = useInputField("");
	const senha2 = useInputField("");
	const [err, setErr] = useState("");
	const [loading, setLoading] = useState(false);

	const onRegister = async () => {
		nome.setErr("");
		email.setErr("");
		senha.setErr("");
		senha2.setErr("");
		let localErr = false;
		if (!validEmail(email.val)) {
			email.setErr("Formato inválido, use algo como 'exemplo@email.com'");
			localErr = true;
		}
		if (nome.val === "") {
			nome.setErr("Nome não pode ser vazio");
			localErr = true;
		}
		if (email.val === "") {
			email.setErr("Email não pode ser vazio");
			localErr = true;
		}
		if (senha.val === "") {
			senha.setErr("Senha não pode ser vazia");
			localErr = true;
		}
		if (senha2.val === "") {
			senha2.setErr("Senha não pode ser vazia");
			localErr = true;
		}
		if (senha.val !== senha2.val) {
			senha.setErr("Senhas não conferem.");
			senha2.setErr("Senhas não conferem.");
			localErr = true;
		}
		if (localErr) return;
		setLoading(true);
		setErr("");
		try {
			const user = await createUser(nome.val, email.val, senha.val);
			navigation.reset({
				index: 0,
				routes: [{ name: "Main", params: { user } }]
			});
		} catch (e) {
			setErr(e.message);
			setLoading(false);
		}
	}

	const onLogin = () => {
		navigation.navigate("Login");
	}

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.scrollViewContainer}
		>
			<Image source={Images.logo} style={styles.logo} />
			<Text style={styles.logoType}>Wheatland</Text>
			{err !== "" && (
				<Text style={styles.error}>{err}</Text>
			)}
			<InputField
				fieldName="Nome"
				placeholder="Insira o seu nome aqui"
				field={nome}
			/>
			<InputField
				fieldName="Email"
				placeholder="Insira o seu email aqui"
				field={email}
			/>
			<InputField
				fieldName="Senha"
				placeholder="Insira a sua senha aqui"
				textInputProps={{
					secureTextEntry: true
				}}
				field={senha}
			/>
			<InputField
				fieldName="Confirmação da senha"
				placeholder="Confirme a senha, reinserindo-a aqui"
				textInputProps={{
					secureTextEntry: true
				}}
				field={senha2}
			/>
			<View style={{ marginBottom: 16 }} />
			{!loading && (
				<>
					<TouchableOpacity
						style={styles.button}
						onPress={() => onLogin()}
					>
						<Text style={styles.buttonText}>Já tenho uma conta</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={() => onRegister()}
					>
						<Text style={styles.buttonText}>Registrar</Text>
					</TouchableOpacity>
				</>
			)}
			{loading && (
				<ActivityIndicator
					style={styles.loadingIndicator}
					color={Colors.primary} size="large"
				/>
			)}

		</ScrollView>
	);
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white
	},
	scrollViewContainer: {
		flexDirection: 'column',
		alignItems: 'stretch',
		paddingHorizontal: 32,
		paddingVertical: 64
	},
	logo: {
		width: 160,
		height: 70,
		resizeMode: 'contain',
		alignSelf: 'center'
	},
	logoType: {
		alignSelf: 'center',
		fontSize: 32,
		color: Colors.secondary,
		opacity: .5,
		marginBottom: 16
	},
	error: {
		color: Colors.errorColor,
		marginBottom: 16
	},
	button: {
		minWidth: 256,
		marginTop: 8,
		alignSelf: 'center',
		backgroundColor: Colors.primary,
		color: Colors.secondary,
		paddingHorizontal: 32,
		paddingVertical: 8,
		borderRadius: 9999
	},
	buttonText: {
		color: Colors.secondary,
		fontSize: 20,
		textAlign: 'center'
	},
	loadingIndicator: {
		marginTop: 32,
		alignSelf: 'center'
	}
});