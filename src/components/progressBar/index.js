import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

export default function ProgressBar({ 
	value = 0,
	style,
	minValue = 0,
	maxValue = 100,
	children = [],
	colors = ["#fff"],
	offsets = [0.0],
	opacity = .5
}) {
	let perc = ((value - minValue) / (maxValue - minValue)) * 100.0;
	perc = Math.min(Math.max(perc, 0.0), 100.0);
	let col = colors[0] || "#fff";
	for (let i = 1; i < colors.length; i++) {
		if (value >= offsets[i]) col = colors[i];
	}

	return (
		<View style={[style, {
			position: 'relative',
			alignSelf: 'stretch',
			flexDirection: 'row'
		}]}>
			<View
				style={{
					position: 'absolute',
					flex: 1,
					borderRadius: 999,
					backgroundColor: col,
					opacity: opacity,
					top: 0,
					bottom: 0,
					left: 0,
					right: 0
				}}
			/>
			<View
				style={{
					position: 'absolute',
					borderRadius: 999,
					backgroundColor: col,
					top: 0,
					bottom: 0,
					left: 0,
					width: `${perc}%`
				}}
			/>
			<View style={{
				paddingHorizontal: 8,
				paddingVertical: 4
			}}>
				{children}
			</View>
		</View>
	);
}

