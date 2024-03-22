import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ParentNavigation from './src/navigation';
import { ThemeProvider } from './src/components/ThemeContext';



export default function App() {
  return (
    <ThemeProvider>
      <ParentNavigation />
    </ThemeProvider>
  );
}
