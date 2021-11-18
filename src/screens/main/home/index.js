import { Picker } from '@react-native-picker/picker';
import React, { useContext, useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Image, ScrollView, Text, ActivityIndicator } from 'react-native';
import Header from '../../../components/header';
import InputField, { useInputField } from '../../../components/inputField';
import TransactionPanel from '../../../components/transactionPanel';
import UserContext from '../../../context/userContext';
import { asyncAlert, generateTicket, listONGs, ticketDonateToONG, userAlreadyUsedTicket, validTransactionCode } from '../../../utils';
import Colors from '../../../utils/colors';
import Images from '../../../utils/images';

export default function Home({ navigation }) {
	const [user, setUser] = useContext(UserContext);
	const [transactionState, setTransactionState] = useState(0);
	const [transaction, setTransaction] = useState({});
	const [ongs, setOngs] = useState([]);
	const [selectedOng, setSelectedOng] = useState(0);
	const code = useInputField("");

	if (transactionState === 0) {
		const renderItem = ({ item }) => {
			return <TransactionPanel
				ong={item.ong}
				date={item.date}
				value={item.value}
				roundedValue={item.roundedValue}
				donateValue={item.donateValue}
			/>
		}

		const footer = () => {
			return (
				<TouchableOpacity style={styles.footer} onPress={() => setTransactionState(1)}>
					<Image source={Images.plus} style={styles.footerImage} />
				</TouchableOpacity>
			);
		}
		return (
			<View style={styles.container}>
				<Header navigation={navigation} title="Home" />
				<FlatList
					style={styles.scrollView}
					data={user.donations}
					renderItem={renderItem}
					ListFooterComponent={footer}
					keyExtractor={(i, idx) => idx}
					contentContainerStyle={styles.scrollViewContainer}
				/>
			</View>
		);
	} else {
		const searchTransaction = async () => {
			code.setErr("");
			let localErr = false;
			if (!validTransactionCode(code.val)) {
				code.setErr("Formato inválido, use algo como 'XXXX.XXXX.XXXX.XXXX-XX'");
				localErr = true;
			}
			if (code.val === "") {
				code.setErr("Código não pode ser vazio");
				localErr = true;
			}
			if (localErr) return;
			setTransactionState(2);
			try {
				const currentOngs = await listONGs();
				setOngs(currentOngs);
				setSelectedOng(0);
				if (userAlreadyUsedTicket(user, code.val)) {
					setTransactionState(1);
					code.setErr("Esse código já foi usado");
				} else {
					const t = generateTicket(code.val);
					setTransaction(t);
					setTransactionState(3);
				}
			} catch (e) {
				console.log(e);
				setTransactionState(1);
			}
		}

		const confirmTransaction = async () => {
			setTransactionState(4);
			try {
				transaction.ong = ongs[selectedOng].name;
				await ticketDonateToONG(user, selectedOng, transaction);
				await asyncAlert(`Muito obrigado!`, `${ongs[selectedOng].name} agradece pela sua doação!`, `De nada!`);
				setTransactionState(0);
				setTransaction({});
				code.setVal("");
				code.setErr("");
			} catch (e) {
				console.log(e);
				setTransactionState(3);
			}
		}

		const changeCode = () => {
			setTransactionState(1);
			setTransaction({});
		}

		const cancel = () => {
			setTransactionState(0);
			setTransaction({});
			code.setVal("");
			code.setErr("");
		}

		const Dropdown = () => {
			return (
				<Picker
					selectedValue={selectedOng}
					onValueChange={(itemValue, itemIndex) => setSelectedOng(itemIndex)}
				>
					{ongs.map((ong, idx) => {
						return <Picker.Item
							key={idx}
							label={ong.name}
							value={idx}
						/>
					})}
				</Picker>
			)
		}

		const tDate = new Date(transaction.date || 0);

		return (
			<View style={styles.container}>
				<ScrollView
					contentContainerStyle={styles.scrollViewContainer}
				>
					<InputField
						fieldName="Código da transação"
						placeholder="XXXX.XXXX.XXXX.XXXX-XX"
						field={code}
						showOnly={transactionState !== 1}
					/>
					{transactionState === 1 && (
						<View style={styles.rowFlex}>
							<TouchableOpacity style={[styles.btn, styles.btnCancel]} onPress={() => cancel()}>
								<Text>Cancel</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.btn} onPress={() => searchTransaction()}>
								<Text>Procurar transação</Text>
							</TouchableOpacity>
						</View>
					)}
					{(transactionState === 3 || transactionState === 4) && (
						<>
							<View style={styles.field}>
								<Text style={styles.fieldName}>Data:</Text>
								<Text style={styles.fieldValue}>{tDate.getDay()}/{tDate.getMonth()}/{tDate.getFullYear()}</Text>
							</View>
							<View style={styles.field}>
								<Text style={styles.fieldName}>Valor:</Text>
								<Text style={styles.fieldValue}>R$ {transaction.value.toFixed(2)}</Text>
							</View>
							<View style={styles.field}>
								<Text style={styles.fieldName}>Valor arredondado:</Text>
								<Text style={styles.fieldValue}>R$ {transaction.roundedValue.toFixed(2)}</Text>
							</View>
							<View style={styles.field}>
								<Text style={styles.fieldName}>Valor da doação:</Text>
								<Text style={styles.fieldValue}>R$ {transaction.donateValue.toFixed(2)}</Text>
							</View>
							<Dropdown />
							{transactionState === 3 && (
								<View style={styles.rowFlex}>
									<TouchableOpacity style={styles.btn} onPress={() => changeCode()}>
										<Text>Mudar código</Text>
									</TouchableOpacity>
									<TouchableOpacity style={styles.btn} onPress={() => confirmTransaction()}>
										<Text>Confirmar doação</Text>
									</TouchableOpacity>
								</View>
							)}
						</>
					)}
					{(transactionState === 2 || transactionState === 4) && (
						<ActivityIndicator
							style={styles.loadingIndicator}
							color={Colors.primary} size="large"
						/>
					)}
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
	scrollView: {

	},
	scrollViewContainer: {
		flexDirection: 'column',
		alignItems: 'stretch',
		paddingHorizontal: 8,
	},
	footer: {
		backgroundColor: Colors.primary,
		padding: 16,
		alignItems: 'center',
		borderRadius: 16
	},
	footerImage: {
		width: 48,
		height: 48,
	},
	btn: {
		marginTop: 8,
		alignSelf: 'center',
		backgroundColor: Colors.primary,
		color: Colors.secondary,
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 9999
	},
	btnCancel: {
		backgroundColor: Colors.errorColor,
	},
	rowFlex: {
		marginTop: 16,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	loadingIndicator: {

	},
	field: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 8,
	},
	fieldName: {
		width: 128
	},
	fieldValue: {
		flex: 1,
		backgroundColor: Colors.black,
		paddingHorizontal: 12,
		paddingVertical: 4,
		borderRadius: 999,
		color: Colors.white
	},
});

