import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../utils/colors';

export default function TransactionPanel({ong, date, value, roundedValue, donateValue}) {
	const d = new Date(date);

	return (
		<View style={styles.container}>
			<View style={styles.field}>
				<Text style={styles.fieldName}>ONG:</Text>
				<Text style={[styles.fieldValue, styles.fieldValueColor1]}>{ong}</Text>
			</View>
			<View style={styles.spacer} />
			<View style={styles.field}>
				<Text style={styles.fieldName}>Data:</Text>
				<Text style={[styles.fieldValue, styles.fieldValueColor1]}>{d.getDay()}/{d.getMonth()}/{d.getFullYear()}</Text>
			</View>
			<View style={styles.spacer} />
			<View style={styles.field}>
				<Text style={styles.fieldName}>Valor da transação:</Text>
				<Text style={[styles.fieldValue, styles.fieldValueColor1]}>R$ {value.toFixed(2)}</Text>
			</View>
			<View style={styles.spacer} />
			<View style={styles.field}>
				<Text style={styles.fieldName}>Valor arredondado:</Text>
				<Text style={[styles.fieldValue, styles.fieldValueColor1]}>R$ {roundedValue.toFixed(2)}</Text>
			</View>
			<View style={styles.spacer} />
			<View style={styles.field}>
				<Text style={styles.fieldName}>Valor doado:</Text>
				<Text style={[styles.fieldValue, styles.fieldValueColor2]}>R$ {donateValue.toFixed(2)}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		backgroundColor: Colors.primary,
		marginBottom: 16,
		borderRadius: 16
	},
	field: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	fieldName: {
		width: 128
	},
	fieldValue: {
		flex: 1,
		backgroundColor: Colors.black,
		paddingHorizontal: 12,
		paddingVertical: 4,
		borderRadius: 999
	},
	fieldValueColor1: {
		color: '#E3FF94'
	},
	fieldValueColor2: {
		color: '#72FFBB'
	},
	spacer: {
		height: 4
	}
});

/*
const styles = StyleSheet.create({
	image: {
		width: 24,
		height: 24
	}
})

*/ 


