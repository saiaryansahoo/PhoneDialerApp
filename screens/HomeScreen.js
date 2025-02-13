import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch, Alert, Linking } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { MaterialIcons, Ionicons } from '@expo/vector-icons'; 


const HomeScreen = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('US');
  const [callingCode, setCallingCode] = useState('1');
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handlePress = (value) => {
    setPhoneNumber(phoneNumber + value);
  };

  const handleBackspace = () => {
    setPhoneNumber(phoneNumber.slice(0, -1));
  };

  const handleCall = () => {
    if (phoneNumber.length === 0) {
      Alert.alert('Error', 'Please enter a phone number');
      return;
    }

    const phoneUrl = `tel:${phoneNumber}`;
    Linking.openURL(phoneUrl).catch(() => {
      Alert.alert('Error', 'Failed to make the call');
    });
  };

  return (
    <View style={[styles.container, darkMode ? styles.darkContainer : styles.lightContainer]}>
      <View style={styles.header}>
        <Text style={styles.title}>Dialer</Text>
        <View style={styles.darkModeToggle}>
          <Text style={styles.darkModeText}>Dark Mode</Text>
          <Switch value={darkMode} onValueChange={toggleDarkMode} />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={() => setCountryPickerVisible(true)} style={styles.countryCode}>
          <Text style={styles.countryCodeText}>+{callingCode}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.numberInput}
          value={phoneNumber}
          editable={false}
          placeholder="Enter Number"
          placeholderTextColor={darkMode ? '#ccc' : '#888'}
        />
      </View>

      <CountryPicker
        visible={countryPickerVisible}
        withCallingCode
        withFilter
        withFlag
        withEmoji
        onSelect={(country) => {
          setCountryCode(country.cca2);
          setCallingCode(country.callingCode[0]);
          setCountryPickerVisible(false);
        }}
        onClose={() => setCountryPickerVisible(false)}
        countryCode={countryCode}
      />

      <View style={styles.dialPad}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((num, index) => (
          <TouchableOpacity key={index} style={styles.dialButton} onPress={() => handlePress(num)}>
            <Text style={styles.dialButtonText}>{num}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.dialButton} onPress={handleBackspace}>
          <Ionicons name="backspace" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.callButton} onPress={handleCall}>
        <MaterialIcons name="call" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  darkContainer: { backgroundColor: '#121212' },
  lightContainer: { backgroundColor: '#F5F5F5' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  darkModeToggle: { flexDirection: 'row', alignItems: 'center' },
  darkModeText: { marginRight: 10, color: '#333' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 8, padding: 10, backgroundColor: '#fff' },
  countryCode: { marginRight: 10 },
  countryCodeText: { fontSize: 18, color: '#333' },
  numberInput: { flex: 1, fontSize: 18, color: '#333' },
  dialPad: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 20 },
  dialButton: { width: '30%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 50, backgroundColor: '#E0E0E0', marginVertical: 10 },
  dialButtonText: { fontSize: 24, fontWeight: 'bold' },
  callButton: { position: 'absolute', bottom: 30, right: 30, width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: 'green' },
});

export default HomeScreen;
