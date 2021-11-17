import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import Colors from '../../utils/colors';
import Images from '../../utils/images';

export default function Panel({ title = "", children = [], empty = false }) {
	const [slide, setSlide] = useState(0);

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (slide === 0) {
				setSlide(1);
			}
			else if (slide === 1) {
				setSlide(0);
			}
		}, 4000);
		return () => {
			clearTimeout(timeout);
		}
	}, [slide]);

	const animateChild = (child, id, current) => {
		const fadeAnim = useRef(new Animated.Value(current ? 1.0 : 0.0)).current;

		useEffect(() => {
			Animated.timing(fadeAnim, {
				toValue: current ? 1.0 : 0.0,
				duration: 200,
				useNativeDriver: false,
				delay: current ? 200 : 0.0
			}).start();
		}, [current]);

		return (
			<Animated.View key={id} style={[styles.child, {
				opacity: fadeAnim
			}]}>
				{child}
			</Animated.View>
		)
	}

	if (empty) {
		return (
			<View style={styles.containerEmpty}>
				<Image source={Images.plus} style={styles.plusButton}/>
			</View>
		)
	} else {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>{title}</Text>
				{children.map((child, idx) => animateChild(child, idx, idx === slide))}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		backgroundColor: Colors.primary,
		borderRadius: 8,
		marginBottom: 8,
		padding: 10,
		height: 100,
	},
	containerEmpty: {
		position: 'relative',
		backgroundColor: Colors.primary,
		borderRadius: 8,
		height: 64,
		justifyContent: 'center',
		alignItems: 'center'
	},
	child: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		top: 32,
		padding: 10,
		justifyContent: 'flex-end'
	},
	title: {
		color: 'white',
		marginBottom: 8,
		fontSize: 20
	},
	plusButton: {
		width: 32,
		height: 32,
		resizeMode: 'contain'
	}
});

