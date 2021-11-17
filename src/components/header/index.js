import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Images from '../../utils/images';
import NavigationButton from '../navigationButton';

export default function Header({ navigation, title }) {
	return (
	<View style={styles.header}>
		<View style={{ flexDirection: 'row', alignItems: 'center' }}>
			<NavigationButton navigation={navigation} />
			<Text
				style={styles.title}
			>{title}</Text>
		</View>
		<Image source={Images.logo} style={styles.logo} />
	</View>
	)
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: '100',
		marginLeft: 24
	},
	logo: {
		width: 48,
		height: 24,
		resizeMode: 'contain',
	},
});