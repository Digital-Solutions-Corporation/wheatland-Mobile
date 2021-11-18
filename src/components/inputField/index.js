import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Colors from '../../utils/colors';

export default function InputField({ fieldName = "", field = null, placeholder = "", textInputProps = {}, showOnly = false }) {
	return (
		<View style={styles.fieldContainer}>
			<Text style={styles.fieldName}>{fieldName}</Text>
			{showOnly && (
				<Text
					style={styles.showOnlyField}
				>{field.val}</Text>
			)}
			{!showOnly && (
				<TextInput
					value={field.val}
					placeholder={placeholder}
					style={[styles.field, {
						borderColor: field.err === "" ? Colors.primary : Colors.errorColor,
					}]}
					onChangeText={val => field.setVal(val)}
					{...textInputProps}
				/>
			)}
			{field.err !== "" && (
				<Text style={styles.error}>{field.err}</Text>
			)}
		</View> 
	);
}

export function useInputField(defaultValue) {
	const [val, setVal] = useState(defaultValue);
	const [err, setErr] = useState("");

	return {
		val, setVal, err, setErr
	};
}

const styles = StyleSheet.create({
	fieldContainer: {
		marginBottom: 32,
	},
	fieldName: {
		opacity: .5,
		color: Colors.secondary,
	},
	field: {
		position: 'relative',
		borderBottomWidth: 2,
		paddingBottom: 0,
		color: Colors.secondary,
	},
	showOnlyField: {
		position: 'relative',
		paddingBottom: 0,
		color: Colors.secondary,
		opacity: .75
	},
	error: {
		color: Colors.errorColor,
		opacity: .5
	}
});

