import {useState, useEffect, useRef} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Animated, AsyncStorage, Switch} from 'react-native';
import {useColorScheme} from 'nativewind';

export default function Settings({navigation}) {
	const {colorScheme, setColorScheme} = useColorScheme();
	console.log(colorScheme)
	
	const changeColorScheme = () => {
		const newTheme = colorScheme == 'light' ? 'dark' : 'light';
		setColorScheme(newTheme);
		AsyncStorage.setItem('theme', newTheme)
	}
	
	return (
		<View className="flex-1 justify-center items-start p-4 dark:bg-[#121212]">
			<TouchableOpacity onPress={changeColorScheme}>
				<Text className="text-red-500">Change theme</Text>
			</TouchableOpacity>
		</View>
	);
}