import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../../screens/splashScreen';
import Login from '../../screens/login';
import AppMain from '../../screens/main';
import Register from '../../screens/register';

const Stack = createNativeStackNavigator();

export default function Navigation() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="SplashScreen"
				screenOptions={{
					headerShown: false
				}}
			>
				<Stack.Screen
					name="SplashScreen"
					component={SplashScreen}
					options={{
						title: "Splash Screen"
					}}
				/>
				<Stack.Screen
					name="Login"
					component={Login}
					options={{
						title: "Login"
					}}
				/>
				<Stack.Screen
					name="Register"
					component={Register}
					options={{
						title: "Register"
					}}
				/>
				<Stack.Screen
					name="Main"
					component={AppMain}
					options={{
						title: "Main"
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}