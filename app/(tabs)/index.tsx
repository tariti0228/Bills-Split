import { Text, useTheme } from 'react-native-paper';

export default function HomeScreen() {
  const theme = useTheme();
  return <Text style={{ color: theme.colors.onBackground }}>ホーム画面</Text>;
}
