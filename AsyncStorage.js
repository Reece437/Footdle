/* This is needed because of no top level
* in react react native
*/

import { AsyncStorage, useColorScheme } from 'react-native';

AsyncStorage.getItem('theme').then(data => {
	if (data == null) {
		AsyncStorage.setItem('theme', useColorScheme());
	}
})