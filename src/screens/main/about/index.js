import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import Colors from '../../../utils/colors';
import Header from '../../../components/header';

export default function About({ navigation }) {
	return (
		<View style={styles.container}>
			<Header navigation={navigation} title="Sobre"/>
			<ScrollView
				contentContainerStyle={styles.scrollViewContainer}
			>
				<Text style={styles.text}>
					{`Com apontamento de algumas pesquisas e opiniões embasadas de pessoas da área, torna-se clara a enorme demanda que surgiu no mercado para máscaras de proteção. Outra grande alta recente no mercado, devido a pandemia COVID-19, foi a de tecnológicos em geral. 

Naturalmente, pensa-se em unir ambas as demandas e, com a evolução da tecnologia de forma cada vez mais caseira - lâmpadas e trancas de portas inteligentes, é natural a indução da tecnologia para a solução de um problema globalmente avançado. Alguns titãs da indústria já estão desenvolvendo as suas, mas como em qualquer mercado jovem, as inovações mais inesperadas surgem de pequenos projetos. 

O projeto da smartmask compõe o desenvolvimento de uma máscara e de um aplicativo. A máscara contém uma placa TinyPICO Nano, uma das menores placas de desenvolvimento com conexões Bluetooth e WiFi, e alguns sensores acoplados nela, como sensores de umidade, temperatura e proximidade.
`}
				</Text>
				<View style={styles.field}>
					<Text style={styles.fieldName}>Email de contato</Text>
					<Text style={styles.fieldValue}>digitalsolutionsfiap@gmail.com</Text>
				</View>

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
	scrollViewContainer: {
		flexDirection: 'column',
		alignItems: 'stretch',
		paddingHorizontal: 8
	},
	text: {
		fontSize: 16
	},
	field: {
		marginTop: 16
	},
	fieldName: {
		color: Colors.primary,
		fontSize: 16,
	},
	fieldValue: {
		color: Colors.primary,
		fontSize: 14,
		opacity: .75
	}
});

