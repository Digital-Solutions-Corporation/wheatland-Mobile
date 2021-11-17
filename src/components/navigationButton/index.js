import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Images from '../../utils/images';

export default function NavigationButton({ navigation }) {
	return (
		<TouchableOpacity
			onPress={() => navigation.toggleDrawer()}
		>
			<Image source={Images.sandwich} style={styles.image}/>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	image: {
		width: 24,
		height: 24
	}
})

