import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Text, Card, List, useTheme, FAB } from 'react-native-paper';
import { router } from 'expo-router';
import { useEventsWithParticipants, type EventWithParticipants } from '@/app/lib/event';


export default function HomeScreen() {
  const theme = useTheme();

  const { data } = useEventsWithParticipants();

  const eventsWithParticipants = data?.reduce((acc, row) => {
    if (!acc.has(row.events.id)) {
      acc.set(row.events.id, {
        ...row.events,
        participants: []
      });
    }
    if (row.participants) {
      acc.get(row.events.id)?.participants.push(row.participants);
    }
    return acc;
  }, new Map<number, EventWithParticipants>());

  const events = Array.from(eventsWithParticipants?.values() || []);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    header: {
      padding: 16,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
    },
    content: {
      flex: 1,
      paddingTop: 4,
      paddingHorizontal: 16,
    },
    card: {
      marginBottom: 16,
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    },
    participants: {
      marginTop: 8,
      fontSize: 14,
      color: theme.colors.onSurfaceVariant,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ホーム画面</Text>
      </View>
      <ScrollView style={styles.content}>
        {events.map((event) => {
          return (
            <Card key={event.id} style={[styles.card, { backgroundColor: theme.colors.surface }]}>
              <Card.Content>
                <List.Item
                  title={event.name}
                  description={event.date}
                  titleStyle={{ color: theme.colors.onSurface }}
                  descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
                />
                <Text style={styles.participants}>
                  参加者: {event.participants.map(p => p.name).join(', ')}
                </Text>
              </Card.Content>
            </Card>
          );
        })}
      </ScrollView>
      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => router.push('/create-event')}
      />
    </SafeAreaView>
  );
}