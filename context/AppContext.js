// context/AppContext.js
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [callLogs, setCallLogs] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [blockedNumbers, setBlockedNumbers] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Theme settings for dark and light mode
  const theme = {
    dark: {
      background: '#1A1A1A',
      text: '#FFFFFF',
      dialButton: '#333333',
    },
    light: {
      background: '#FFFFFF',
      text: '#000000',
      dialButton: '#F0F0F0',
    },
  };

  // Add call log entry (keep the last 50 logs)
  const addCallLog = (log) => {
    setCallLogs([log, ...callLogs.slice(0, 49)]);
  };

  // Add new contact
  const addContact = (contact) => {
    setContacts([...contacts, contact]);
  };

  // Block a number
  const blockNumber = (number) => {
    if (!blockedNumbers.includes(number)) {
      setBlockedNumbers([...blockedNumbers, number]);
    }
  };

  // Unblock a number
  const unblockNumber = (number) => {
    setBlockedNumbers(blockedNumbers.filter((n) => n !== number));
  };

  // Toggle dark mode
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <AppContext.Provider
      value={{
        callLogs,
        contacts,
        blockedNumbers,
        isDarkMode,
        theme: isDarkMode ? theme.dark : theme.light,
        addCallLog,
        addContact,
        blockNumber,
        unblockNumber,
        toggleDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
