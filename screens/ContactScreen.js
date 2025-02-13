// screens/ContactScreen.js
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Contacts from '../components/Contacts';
import { useNavigation } from '@react-navigation/native';


const ContactScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Button title="Search Contacts" onPress={() => navigation.navigate('SearchContacts')} />
      <Contacts />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
});

export default ContactScreen;
