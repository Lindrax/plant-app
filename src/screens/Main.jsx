import React, {useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; 
import PlantViewScreen from './PlantScreen';
import { TouchableOpacity, Text, View } from 'react-native';

import ListScreen from './ListScreen';
import ScanScreen from './ScanScreen';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';
import PlantScreen from './PlantScreen';

import { ThemeContext } from '../context/ThemeContext';
import getColors from '../styles/themeColors';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ListStackNavigator = () => {
  const { theme } = useContext(ThemeContext);
  const colors = getColors(theme)
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListView" component={ListScreen}
      options={{ 
        title: 'My Plants',
        headerStyle: { backgroundColor: colors.background }, 
        headerTintColor: colors.font,  
      }}/>

      <Stack.Screen name="PlantView" component={PlantScreen} 
      options={{ 
        title: 'Plant Details',
        headerStyle: { backgroundColor: colors.background }, 
        headerTintColor: colors.font,  
      }}/>

      <Stack.Screen name="ScanView" component={ScanScreen} 
      options={{ title: 'Add Plant', 
        headerStyle: { backgroundColor: colors.background }, 
        headerTintColor: colors.font, 
      }}/>
    </Stack.Navigator>
  );
};


const TabNavigator = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
   const colors = getColors(theme)

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Plants') {
            iconName = 'list';
          } if (route.name === 'Settings') {
            iconName = 'settings';
          } else if (route.name === 'Profile') {
            iconName = 'person-circle-outline'
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: colors.background },
      })}
    >
      <Tab.Screen name="Plants" component={ListStackNavigator} 
      options={{ 
        headerShown: false,  
        headerStyle: { backgroundColor: colors.background }, 
        headerTintColor: colors.font,  
        }}/>

      <Tab.Screen name="Settings" component={SettingsScreen} 
      options={{ 
        title: 'Settings',
        headerStyle: { backgroundColor: colors.background }, 
        headerTintColor: colors.font,
      }} />

      <Tab.Screen name="Profile" component={ProfileScreen} 
      options={{ 
        title: 'Profile',
        headerStyle: { backgroundColor: colors.background }, 
        headerTintColor: colors.font,  
      }}/>
      
      <Tab.Screen
        name="ThemeToggle"
        component={View}
        options={{
          tabBarButton: () => (
            <TouchableOpacity
              onPress={toggleTheme}
              style={{
                backgroundColor: colors.background,
                padding: 10,
              }}
            >
              <Ionicons name={theme === 'dark' ? 'sunny' : 'moon'} size={24} color={ colors.font} />
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Main =() => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
export default Main