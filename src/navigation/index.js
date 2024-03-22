import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../components/ThemeContext';

// Import your screen components
import TodayScreen from '../screens/TodayScreen'; // assuming you have TodayScreen.js
import UpdatesScreen from '../screens/UpdatesScreen'; // assuming you have TomorrowScreen.js
import SettingsScreen from '../screens/SettingsScreen'; // assuming you have SettingsScreen.js

export default function ParentNavigation() {
    const Tab = createBottomTabNavigator();
    const { isDarkMode } = useTheme(); // Access the theme

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Today"
                screenOptions={{
                    // tabBarActiveTintColor: '#4d4dff',
                    tabBarActiveTintColor: isDarkMode ? 'white' : 'black',
                    tabBarInactiveTintColor: isDarkMode ? '#696969' : '#A9A9A9',
                    tabBarStyle: {
                        backgroundColor: isDarkMode ? '#222' : '#f9f9f9', // Background color of the bottom tabs
                    },
                    headerStyle: {
                        backgroundColor: isDarkMode ? '#333' : '#f9f9f9', // Background color of the header
                        borderBottomColor: isDarkMode ? '#444' : '#ccc', // Bottom border color of the header
                        borderBottomWidth: 1, // Bottom border width of the header
                    },
                    headerTitleStyle: {
                        color: isDarkMode ? 'white' : 'black', // Text color of the header title
                        fontSize: 20, // Font size of the header title
                        fontWeight: 'bold', // Font weight of the header title
                    },
                }}>
                <Tab.Screen name="Today" component={TodayScreen}
                    options={{
                        headerTitleAlign: 'center',
                        headerTitleAllowFontScaling: true,
                        tabBarLabel: 'Today',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="calendar-today" color={color} size={size} />
                        ),
                    }} />
                <Tab.Screen name="Updates" component={UpdatesScreen}
                    options={{
                        headerTitleAlign: 'center',
                        headerTitleAllowFontScaling: true,
                        tabBarLabel: 'Updates',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="autorenew" color={color} size={size} />
                        ),
                    }} />
                <Tab.Screen name="Settings" component={SettingsScreen}
                    options={{
                        headerTitleAlign: 'center',
                        headerTitleAllowFontScaling: true,  
                        tabBarLabel: 'Settings',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="cog" color={color} size={size} />
                        ),
                    }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
