// components/ContactItem.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppContext } from '../context/AppContext';

const ContactItem = ({ contact }) => {
  const { blockedNumbers, blockNumber, unblockNumber } = useAppContext();

  const isBlocked = blockedNumbers.includes(contact.number);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name}>{contact.name}</Text>
        <Text style={styles.number}>{contact.number}</Text>
      </View>
      <TouchableOpacity
        style={styles.blockButton}
        onPress={() => (isBlocked ? unblockNumber(contact.number) : blockNumber(contact.number))}
      >
        <Text style={styles.blockText}>{isBlocked ? '🚫 Unblock' : '⛔ Block'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  number: {
    fontSize: 14,
    color: '#666',
  },
  blockButton: {
    padding: 8,
    backgroundColor: '#FFCCCC',
    borderRadius: 5,
  },
  blockText: {
    fontSize: 14,
    color: '#D80000',
  },
});

export default ContactItem;
