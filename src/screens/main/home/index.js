import React, { useContext } from 'react';
import { StyleSheet, ScrollView, View, FlatList, TouchableOpacity, Image } from 'react-native';
import Header from '../../../components/header';
import TransactionPanel from '../../../components/transactionPanel';
import UserContext from '../../../context/userContext';
import Colors from '../../../utils/colors';
import Images from '../../../utils/images';

export default function Home({ navigation }) {
	const [user, setUser] = useContext(UserContext);

	const renderItem = ({ item }) => {
		return <TransactionPanel
			ong={item.ong}
			date={item.date}
			value={item.value}
			roundedValue={item.roundedValue}
			donateValue={item.donateValue}
		/>
	}

	const footer = () => {
		return (
			<TouchableOpacity style={styles.footer}>
				<Image source={Images.plus} style={styles.footerImage}/>
			</TouchableOpacity>
		);
	}

	return (
		<View style={styles.container}>
			<Header navigation={navigation} title="Home" />
			<FlatList
				style={styles.scrollView}
				data={user.donations}
				renderItem={renderItem}
				ListFooterComponent={footer}
				keyExtractor={(i, idx) => idx}
				contentContainerStyle={styles.scrollViewContainer}
			/>
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
	scrollView: {

	},
	scrollViewContainer: {
		flexDirection: 'column',
		alignItems: 'stretch',
		paddingHorizontal: 8,
	},
	footer: {
		backgroundColor: Colors.primary,
		padding: 16,
		alignItems: 'center',
		borderRadius: 16
	},
	footerImage: {
		width: 48,
		height: 48,
	}
});

