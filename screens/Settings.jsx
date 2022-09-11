import {useState, useEffect, useRef} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Animated} from 'react-native';
import {useColorScheme} from 'nativewind';

export default function Settings({navigation}) {
	const {colorScheme, setColorScheme} = useColorScheme();
	return (
		<View className="flex-1 justify-center items-start p-4 dark:bg-[#121212]">
			<Text className="dark:text-white">Hello</Text>
		</View>
	);
}