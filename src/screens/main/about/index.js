import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import Header from '../../../components/header';
import Colors from '../../../utils/colors';

export default function About({ navigation }) {
	return (
		<View style={styles.container}>
			<Header navigation={navigation} title="Sobre"/>
			<ScrollView
				contentContainerStyle={styles.scrollViewContainer}
			>
				<Text style={styles.text}>
					{`A magnitude do problema da fome no mundo é inestimável e suas causas
são diversas. Um estudo publicado pela FAO (Food and Agriculture
Organization) aponta que a produção global de alimentos é suficiente para
suprir a demanda das mais de 7 bilhões de pessoas do mundo. Apesar disso,
aproximadamente 11% das pessoas passam fome.
Esses dados indicam que há algumas coisas de errado no processo que
ocorre entre a produção de alimentos e a sua distribuição. Um dos
principais problemas é o desperdício de alimentos. É estimado que, em
alguns países, 40% dos alimentos produzidos são desperdiçados no início do
processo devido a deterioração. Isso se dá pela pobreza e pelas condições
precárias de infraestrutura de muitos fazendeiros e agricultores de pequeno
e médio porte.

Considerando essas questões, criamos o wheatland, uma colaboração na
solução desse problema complexo que é a fome. O wheatland é um
conglomerado de e-commerce que, através da organização de sites de
venda online e uma parceria com o PayPal, aproxima o usuário de suas
compras. A cada compra, o wheatland arredonda o valor da sua compra
para cima e doa essa diferença para ONGs engajadas em ajudar pequenos
fazendeiros, ajudando-os a melhorar a infraestrutura e, consequentemente,
diminuir o desperdício de comida.

Como exemplo, em uma compra de mercado que resultou R$18,27, o valor
pago pelo cliente do wheatland seria R$19,00 e os 73 centavos de diferença
são acumulados no fundo de doação.

O projeto do wheatland é composto de um aplicativo mobile e de uma
página web. O usuário cadastrado no sistema pode acessar uma listagem de
ONGs relacionadas ao problema da fome e escolher uma para ser o
recipiente de sua doação. Além da listagem de ONGs, o usuário tem acesso
ao histórico de doações em geral, podendo filtrá-las pelo seu nome de
usuário ou pela ONG receptora. `}
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
		backgroundColor: Colors.white,
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
		color: Colors.secondary,
		fontSize: 16,
	},
	fieldValue: {
		color: Colors.secondary,
		fontSize: 14,
		opacity: .75
	}
});

