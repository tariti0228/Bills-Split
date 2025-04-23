import { Tabs } from 'expo-router';
import { Icon, useTheme } from 'react-native-paper';
import { useThemeContext } from '../_layout';

export default function TabLayout() {
  const theme = useTheme();
  const { isDarkMode } = useThemeContext();

  return (
    <Tabs screenOptions={{ 
      tabBarShowLabel: true,
      tabBarActiveTintColor: isDarkMode ? theme.colors.primary : 'red',
      tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
      tabBarStyle: {
        backgroundColor: theme.colors.surface,
      },
      headerShown: false,
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'カレンダー',
          tabBarIcon: ({ color, size }) => (
            <Icon source="calendar-month-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: '設定',
          tabBarIcon: ({ color, size }) => (
            <Icon source="cog" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
