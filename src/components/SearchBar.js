import { View, TextInput } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';

export default function SearchBar({isDarkMode, searchKeyword, setSearchKeyword}) {
    return (
        <View className='mt-2'>
            <TextInput
                style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 0.3,
                    marginBottom: 5,
                    borderRadius: 5,
                    paddingHorizontal: 10,
                    color: isDarkMode ? 'white' : 'black', // Adjust text color based on dark mode
                    paddingRight: 40 // Add space for the search icon
                }}
                onChangeText={setSearchKeyword}
                value={searchKeyword}
                placeholder="Search team"
                placeholderTextColor={isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'} // Adjust placeholder text color based on dark mode
            />
            <View style={{ position: 'absolute', right: 15, top: 5 }}>
                <MaterialIcons name="search" size={24} color={isDarkMode ? 'white' : 'black'} onPress={setSearchKeyword} />
            </View>
        </View>
    )
}