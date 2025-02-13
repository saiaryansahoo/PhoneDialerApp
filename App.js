// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AppProvider } from './context/AppContext';
import HomeScreen from './screens/HomeScreen';
import ContactScreen from './screens/ContactScreen';
import SearchContacts from './screens/SearchContacts';
import CallHistory from './components/CallHistory';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const ContactStack = createStackNavigator();

const ContactStackScreen = () => (
  <ContactStack.Navigator>
    <ContactStack.Screen name="ContactScreen" component={ContactScreen} options={{ title: 'Contacts' }} />
    <ContactStack.Screen name="SearchContacts" component={SearchContacts} options={{ title: 'Search Contacts' }} />
  </ContactStack.Navigator>
);

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              switch (route.name) {
                case 'Home': iconName = 'dialpad'; break;
                case 'History': iconName = 'history'; break;
                case 'Contacts': iconName = 'contacts'; break;
              }
              return <MaterialIcons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="History" component={CallHistory} />
          <Tab.Screen name="Contacts" component={ContactStackScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
