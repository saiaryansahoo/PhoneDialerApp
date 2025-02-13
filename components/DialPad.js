// dialpad.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DialPad = ({ onPress, onBackspace }) => {
  const dialButtons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

  return (
    <View style={styles.dialPad}>
      {dialButtons.map((num, index) => (
        <TouchableOpacity key={index} style={styles.dialButton} onPress={() => onPress(num)}>
          <Text style={styles.dialButtonText}>{num}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.dialButton} onPress={onBackspace}>
        <Ionicons name="backspace" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dialPad: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 20 },
  dialButton: { width: '30%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 50, backgroundColor: '#E0E0E0', marginVertical: 10 },
  dialButtonText: { fontSize: 24, fontWeight: 'bold' },
});

export default DialPad;
