import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react';
import { useTheme } from './ThemeContext';

export default function Loading() {
    const { isDarkMode } = useTheme(); // Access the theme

    return (
        <View className='flex-1 justify-center items-center' style={{ backgroundColor: isDarkMode ? 'black' : 'white', }}>
            <ActivityIndicator size={'large'} />
            <Text style={{ color: isDarkMode ? 'white' : 'black', }} className="text-500">Please wait...</Text>
        </View>
    )
}