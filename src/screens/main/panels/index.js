import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import Colors from '../../../utils/colors';
import Header from '../../../components/header';
import Panel from '../../../components/panel';
import ProgressBar from '../../../components/progressBar';

export default function PanelsContainer({ navigation }) {
	return (
		<View style={styles.container}>
			<Header navigation={navigation} title="Home" />
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollViewContainer}
			>
				<Panel title="Umidade">
					<ProgressBar
						value={50.0}
						colors={[Colors.safeColor, Colors.warningColor, Colors.unsafeColor]}
						offsets={[0.0, 45.0, 90.0]}
					>
						<Text>50%</Text>
					</ProgressBar>
					<Text style={styles.panelText}>
						Umidade relativa é de 50%, acima de 90% é recomendado a troca da máscara
					</Text>
				</Panel>
				<Panel title="Temperatura interna">
					<ProgressBar
						value={37.4}
						minValue={36.0}
						maxValue={39.0}
						colors={[Colors.safeColor, Colors.warningColor, Colors.unsafeColor]}
						offsets={[37.0, 37.5, 38.0]}
					>
						<Text>37.4°C</Text>
					</ProgressBar>
					<Text style={styles.panelText}>
						Temperatura interna da máscara é de 37.4°C, acima de 38.0°C é recomendado a troca da máscara
					</Text>
				</Panel>
				<Panel title="Passos">
					<View style={styles.textContainer}>
						<Text style={styles.textBig}>217</Text>
						<Text style={styles.textSmall}>/dia</Text>
					</View>
					<Text style={styles.panelText}>
						É importante manter a saúde em dia, caminhe regularmente para manter a forma durante a pandemia
					</Text>
				</Panel>
				<Panel title="Distância para a Smartmask">
					<View style={styles.textContainer}>
						<Text style={styles.textBig}>1.0</Text>
						<Text style={styles.textSmall}>m</Text>
					</View>
					<Text style={styles.panelText}>
						Mantenha sua máscara sempre perto de você, preferencialmente use-a quando estiver fora de casa
					</Text>
				</Panel>
				<Panel title="Tempo de uso">
					<View style={styles.textContainer}>
						<Text style={styles.textBig}>2h</Text>
						<Text style={styles.textSmall}>/dia</Text>
					</View>
					<Text style={styles.panelText}>
						Use sempre a smartmask para um monitoramento inteligente da sua máscara
					</Text>
				</Panel>
				<Panel empty={true}/>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
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
	panelText: {
		color: 'white',
		fontSize: 12,
		color: 'rgba(255,255,255,.75)'
	},
	textContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'flex-end'
	},
	textBig: {
		color: '#FCA311',
		fontSize: 32,
		textAlignVertical: 'bottom'
	},
	textSmall: {
		color: 'white',
		fontSize: 16,
		opacity: .5,
		marginLeft: 2,
		textAlignVertical: 'bottom'
	}
});

