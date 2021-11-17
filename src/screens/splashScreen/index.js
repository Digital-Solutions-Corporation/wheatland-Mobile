import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import Colors from '../../utils/colors';
import Images from '../../utils/images';

export default function SplashScreen({ navigation }) {
	const scaleAnim = useRef(new Animated.Value(1.0)).current;
	const opacityAnim = useRef(new Animated.Value(1.0)).current;

	useEffect(() => {
		setTimeout(() => {
			navigation.reset({
				index: 0,
				routes: [{ name: "Login"}]
			});
		}, 5000);

		Animated.parallel([
			Animated.loop(
				Animated.sequence([
					Animated.timing(scaleAnim, {
						toValue: 2.0,
						duration: 1500.0,
						useNativeDriver: true
					}),
					Animated.timing(scaleAnim, {
						toValue: 0.0,
						duration: 0.0,
						useNativeDriver: true
					}),
				])
			),
			Animated.loop(
				Animated.sequence([
					Animated.timing(opacityAnim, {
						toValue: 0.0,
						duration: 1500.0,
						useNativeDriver: true
					}),
					Animated.timing(opacityAnim, {
						toValue: 1.0,
						duration: 0.0,
						useNativeDriver: true
					}),
				])
			)
		]).start();
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.logo}>
				<Animated.View style={[styles.pulse, {
					transform: [{ scale: scaleAnim }],
					opacity: opacityAnim,
				}]} />
				<Image source={Images.logo} style={styles.image} />
			</View>
		</View>
	);
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		padding: 64,
		alignItems: 'center',
		justifyContent: 'center',
	},
	logo: {
		position: 'relative',
		width: 64,
		height: 64
	},
	pulse: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundColor: Colors.primary,
		borderRadius: 999
	},
	image: {
		width: 64,
		height: 64,
	}
});