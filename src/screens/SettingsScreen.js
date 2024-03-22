import { View, Text, Switch } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '../components/ThemeContext';

export default function SettingsScreen() {
  const { isDarkMode, toggleTheme } = useTheme(); // Access the theme and toggleTheme function
  const [isEnabled, setIsEnabled] = useState(isDarkMode); // Set the initial state of the switch

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState); // Toggle the switch state
    toggleTheme(); // Toggle the app theme
  };

  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? 'black' : 'white', paddingHorizontal: 20, paddingTop: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ color: isDarkMode ? 'white' : 'black', fontSize: 20 }}>Dark Mode</Text>
        <Switch
          onValueChange={toggleSwitch}
          trackColor={{
            true: 'white',
            false: 'gray'
          }}
          value={isEnabled}
        />
      </View>
      <View
        style={{
          borderBottomColor: isDarkMode ? 'white' : 'black',
          borderBottomWidth: 0.5,
        }} />
      {/* Add more settings here */}
    </View>
  );
}
