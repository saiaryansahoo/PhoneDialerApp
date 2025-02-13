import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import CallLogs from 'react-native-call-log';

const CallHistory = () => {
  const [callLogs, setCallLogs] = useState([]);
  const [hasPermission, setHasPermission] = useState(false);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    const requestCallLogPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
          {
            title: 'Call Log Permission',
            message: 'This app needs access to your call logs.',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setHasPermission(true);
        } else {
          console.warn('Call log permission denied.');
        }
      } catch (err) {
        console.error('Permission error:', err);
      }
    };

    requestCallLogPermission();
  }, []);

  useEffect(() => {
    const fetchCallLogs = async () => {
      if (hasPermission) {
        try {
          const logs = await CallLogs.load(50); // Fetch the latest 50 call logs
          const formattedLogs = logs.map((log) => ({
            id: log.timestamp,
            number: log.phoneNumber || 'Unknown',
            type: log.type.toUpperCase(),
            timestamp: new Date(parseInt(log.timestamp)).toISOString(),
          }));
          setCallLogs(formattedLogs);
        } catch (err) {
          console.error('Error fetching call logs:', err);
        }
      }
    };

    fetchCallLogs();
  }, [hasPermission]);

  const filteredLogs = callLogs.filter((log) =>
    filter === 'ALL' ? true : log.type === filter
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {['ALL', 'INCOMING', 'OUTGOING', 'MISSED'].map((type) => (
          <TouchableOpacity
            key={type}
            style={[styles.filterButton, filter === type && styles.activeFilter]}
            onPress={() => setFilter(type)}
          >
            <Text style={[styles.filterText, filter === type && { color: '#FFF' }]}>
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredLogs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.logItem, item.type === 'MISSED' && styles.missedCall]}>
            <Text style={styles.number}>{item.number}</Text>
            <View style={styles.details}>
              <Text style={styles.type}>{item.type}</Text>
              <Text style={styles.time}>
                {new Date(item.timestamp).toLocaleDateString()}{' '}
                {new Date(item.timestamp).toLocaleTimeString()}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  filterContainer: { flexDirection: 'row', padding: 10, justifyContent: 'space-around' },
  filterButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#EEE',
  },
  activeFilter: { backgroundColor: '#007AFF' },
  filterText: { color: '#000', fontWeight: '500' },
  logItem: { padding: 15, borderBottomWidth: 1, borderColor: '#EEE' },
  missedCall: { backgroundColor: '#FFEBEE' },
  number: { fontSize: 16, fontWeight: '500' },
  details: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  type: { color: '#666', fontSize: 14 },
  time: { color: '#999', fontSize: 12 },
});

export default CallHistory;
