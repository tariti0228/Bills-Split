import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Text, Card, Switch, List, useTheme } from 'react-native-paper';
import { router } from 'expo-router';
import { useThemeContext } from '../_layout';

export default function SettingsScreen() {
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useThemeContext();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.title, { color: theme.colors.onSurface ,fontSize: 45}]}>設定</Text>
      </View>
      <ScrollView style={styles.content}>
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <List.Item
              title="ダークモード"
              description="画面の表示を暗くします"
              titleStyle={{ color: theme.colors.onSurface }}
              descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
              left={props => <List.Icon {...props} icon="theme-light-dark" color={theme.colors.onSurface} />}
              right={() => <Switch value={isDarkMode} onValueChange={toggleTheme} />}
            />
          </Card.Content>
        </Card>

        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <List.Item
              title="利用規約"
              description="アプリの利用に関する規約を確認"
              titleStyle={{ color: theme.colors.onSurface }}
              descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
              left={props => <List.Icon {...props} icon="file-document" color={theme.colors.onSurface} />}
              right={props => <List.Icon {...props} icon="chevron-right" color={theme.colors.onSurface} />}
              onPress={() => router.push('/terms')}
            />
            <List.Item
              title="プライバシーポリシー"
              description="個人情報の取り扱いについて"
              titleStyle={{ color: theme.colors.onSurface }}
              descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
              left={props => <List.Icon {...props} icon="shield-lock" color={theme.colors.onSurface} />}
              right={props => <List.Icon {...props} icon="chevron-right" color={theme.colors.onSurface} />}
              onPress={() => router.push('/privacy')}
            />
          </Card.Content>
        </Card>

        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <List.Item
              title="アプリについて"
              description="バージョン 1.0.0"
              titleStyle={{ color: theme.colors.onSurface }}
              descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
              left={props => <List.Icon {...props} icon="information" color={theme.colors.onSurface} />}
            />
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
});
