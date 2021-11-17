import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Colors from '../../utils/colors';

export default function InputField({ fieldName = "", field = null, placeholder = "", textInputProps = {} }) {
	return (
		<View style={styles.fieldContainer}>
			<Text style={styles.fieldName}>{fieldName}</Text>
			<TextInput
				value={field.val}
				placeholder={placeholder}
				style={[styles.field, {
					borderColor: field.err === "" ? Colors.primary : Colors.errorColor,
				}]}
				onChangeText={val => field.setVal(val)}
				{...textInputProps}
			/>
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
		paddingHorizontal: 8,
	},
	fieldName: {
		opacity: .5,
		color: Colors.secondary,
	},
	field: {
		position: 'relative',
		borderBottomWidth: 2,
		paddingBottom: 0,
	},
	error: {
		color: Colors.errorColor,
		opacity: .5
	}
});

