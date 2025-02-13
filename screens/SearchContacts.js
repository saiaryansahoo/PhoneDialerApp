// screens/SearchContacts.js
import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import { useAppContext } from '../context/AppContext';
import ContactItem from '../components/ContactItem';

const SearchContacts = () => {
  const { contacts } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search contacts by name"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {filteredContacts.length > 0 ? (
        <FlatList
          data={filteredContacts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <ContactItem contact={item} />}
        />
      ) : (
        <Text style={styles.noResults}>No contacts found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  noResults: { textAlign: 'center', marginTop: 20, color: 'gray' },
});

export default SearchContacts;
