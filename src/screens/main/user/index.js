import React, { useContext, useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Colors from '../../../utils/colors';
import Header from '../../../components/header';
import Images from '../../../utils/images';
import UserContext from '../../../context/userContext';
import InputField, { useInputField } from '../../../components/inputField';
import { updateUser } from '../../../utils';

export default function User({ navigation }) {
	const [editMode, setEditMode] = useState(false);
	const [saving, setSaving] = useState(false);
	const [err, setErr] = useState("");
	const [user, setUser] = useContext(UserContext);
	const nome = useInputField(user.nome);
	const email = useInputField(user.email);

	if (editMode) {
		const save = async () => {
			nome.setErr("");
			email.setErr("");
			let localErr = false;
			if (nome.val === "") {
				nome.setErr("Nome não pode ser vazio");
				localErr = true;
			}
			if (email.val === "") {
				email.setErr("Email não pode ser vazia");
				localErr = true;
			}
			if (localErr) return;
			setSaving(true);
			setErr("");
			try {
				user.nome = nome.val;
				user.email = email.val;
				await updateUser(user);
				setSaving(false);
				setEditMode(false);
				setUser(user);
			} catch (e) {
				setErr(e.message);
				setSaving(false);
			}
		}

		return (
			<View style={styles.container}>
				{!saving && (
					<TouchableOpacity
						style={styles.editProfileBtn}
						onPress={() => save()}
					>
						<Text style={styles.editProfileBtnTxt}>Salvar</Text>
					</TouchableOpacity>
				)}
				{saving && (
					<ActivityIndicator
						style={styles.savingIndicator}
						color={Colors.secondary} size="large"
					/>
				)}

				<ScrollView
					contentContainerStyle={styles.scrollViewContainer}
				>
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
				</ScrollView>
			</View>
		);
	} else {
		return (
			<View style={styles.container}>
				<Header navigation={navigation} title="Perfil" />
				<TouchableOpacity
					style={styles.editProfileBtn}
					onPress={() => setEditMode(true)}
				>
					<Text style={styles.editProfileBtnTxt}>Editar Perfil</Text>
				</TouchableOpacity>
				<ScrollView
					contentContainerStyle={styles.scrollViewContainer}
				>
					<View style={styles.top}>
						<View style={styles.profileFrame}>
							<View style={styles.profileImageContainer}>
								<Image style={styles.profileImage} source={Images.userPhoto} />
							</View>
						</View>
						<View style={styles.userInfo}>
							<Text style={styles.userName}>{user.nome}</Text>
							
						</View>
					</View>
					<View style={styles.profileField}>
						<Text style={styles.profileFieldName}>Email</Text>
						<Text style={styles.profileFieldValue}>{user.email}</Text>
					</View>
					{/* TODO: List of transactions */}
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.white,
		flex: 1,
		paddingHorizontal: 16,
		paddingVertical: 16
	},
	editProfileBtn: {
		alignSelf: 'flex-end',
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderWidth: 2,
		borderColor: Colors.secondary,
		borderRadius: 999,
		marginBottom: 16,
	},
	editProfileBtnTxt: {
		color: Colors.secondary
	},
	savingIndicator: {
		alignSelf: 'flex-end',
		paddingVertical: 10
	},
	scrollViewContainer: {
		flexDirection: 'column',
		alignItems: 'stretch',
		paddingHorizontal: 8
	},
	top: {
		flexDirection: 'row',
		marginBottom: 16,
	},
	profileFrame: {
		width: 100,
		height: 100,
		padding: 8,
		backgroundColor: Colors.secondary,
		borderRadius: 999
	},
	profileImageContainer: {
		width: "100%",
		height: "100%",
		borderRadius: 999,
		overflow: 'hidden'
	},
	profileImage: {
		width: "100%",
		height: "100%",
	},
	userInfo: {
		marginLeft: 16
	},
	userName: {
		fontSize: 24,
		color: Colors.secondary
	},
	userAge: {
		fontSize: 16,
		color: Colors.secondary,
		opacity: .8
	},
	profileField: {
		marginBottom: 16
	},
	profileFieldName: {
		color: Colors.secondary,
		fontSize: 24,
	},
	profileFieldValue: {
		color: Colors.secondary,
		fontSize: 16,
		opacity: .75
	}
});