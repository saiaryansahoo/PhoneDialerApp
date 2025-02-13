// components/Contacts.js
import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useAppContext } from '../context/AppContext';
import ContactItem from './ContactItem';

const ContactsComponent = () => {
  const { contacts, addContact } = useAppContext();
  const [newContact, setNewContact] = useState({ name: '', number: '' });

  const handleSave = async () => {
    if (newContact.name && newContact.number) {
      // Save to device contacts
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const contact = {
          [Contacts.Fields.Name]: newContact.name,
          [Contacts.Fields.PhoneNumbers]: [{ number: newContact.number }]
        };
        await Contacts.addContactAsync(contact);
      }
      
      // Save to app state
      addContact({
        id: Date.now().toString(),
        ...newContact
      });
      setNewContact({ name: '', number: '' });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={newContact.name}
          onChangeText={text => setNewContact({ ...newContact, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={newContact.number}
          onChangeText={text => setNewContact({ ...newContact, number: text })}
          keyboardType="phone-pad"
        />
        <Button title="Save Contact" onPress={handleSave} />
      </View>

      <FlatList
        data={contacts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ContactItem contact={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  form: { marginBottom: 20 },
  input: { 
    height: 40, 
    borderColor: '#ccc', 
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 5
  }
});

export default ContactsComponent;