import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import React, { useState } from 'react';
import { Text } from 'react-native';
import UserContext from '../../context/userContext';
import Colors from '../../utils/colors';
import About from './about';
import PanelsContainer from './panels';
import User from './user';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
	return (
		<DrawerContentScrollView {...props}>
			<DrawerItemList {...props} />
			<DrawerItem label={() => <Text style={{ color: Colors.errorColor }}>Sair</Text>}
				onPress={() => props.resetApp()}
			/>
		</DrawerContentScrollView>
	);
}

export default function AppMain({ route, navigation }) {
	const [user, setUser] = useState(route.params.user);

	const resetApp = () => {
		navigation.reset({
			index: 0,
			routes: [{ name: "Login" }]
		});
	}

	return (
		<UserContext.Provider value={[user, setUser]}>
			<Drawer.Navigator
				drawerContent={props => <CustomDrawerContent {...props} resetApp = {resetApp} />}
				initialRouteName="Panels"
				screenOptions={{
					headerShown: false
				}}
			>
				<Drawer.Screen
					name="Panels"
					component={PanelsContainer}
					options={{
						title: "Home"
					}}
				/>
				<Drawer.Screen
					name="User"
					component={User}
					options={{
						title: "Perfil"
					}}
				/>
				<Drawer.Screen
					name="About"
					component={About}
					options={{
						title: "Sobre"
					}}
				/>
			</Drawer.Navigator>
		</UserContext.Provider>
	);
}

