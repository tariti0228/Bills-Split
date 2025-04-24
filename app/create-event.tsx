import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Text, TextInput, Button, useTheme, Appbar } from 'react-native-paper';
import { router } from 'expo-router';
import { createEvent } from '@/app/lib/event';

export default function CreateEventScreen() {
  const theme = useTheme();
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [participants, setParticipants] = useState('');

  const handleCreateEvent = async () => {
    try {
      const participantArray = participants.split(',')
        .map(name => name.trim())
        .filter(name => name.length > 0);
      
      await createEvent(eventName, eventDate, participantArray);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: 16,
    },
    input: {
      marginBottom: 16,
    },
  });

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: theme.colors.surface, elevation: 0 }}>
        <Appbar.BackAction onPress={() => router.back()} color={theme.colors.onSurface} />
        <Appbar.Content title="イベント作成" titleStyle={{ color: theme.colors.onSurface }} />
      </Appbar.Header>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.content}>
          <TextInput
            label="イベント名"
            value={eventName}
            onChangeText={setEventName}
            style={styles.input}
          />
          <TextInput
            label="日付 (YYYY-MM-DD)"
            value={eventDate}
            onChangeText={setEventDate}
            style={styles.input}
          />
          <TextInput
            label="参加者 (カンマ区切り)"
            value={participants}
            onChangeText={setParticipants}
            style={styles.input}
            multiline
          />
          <Button mode="contained" onPress={handleCreateEvent}>
            イベントを作成
          </Button>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
} 