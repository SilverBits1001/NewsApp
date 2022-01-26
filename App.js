import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from 'react-native-elements';
import OpenArticle from './components/OpenArticle';


import theme from './styles/theme.style';
import Home from './components/Home';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator

      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Trending') {
            iconName = focused
              ? 'trending-up'
              : 'trending-up-outline';
          } else if (route.name === 'Explore') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon type='ionicon' name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.PRIMARY_COLOR,
        tabBarInactiveTintColor: theme.SECONDARY_COLOR,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.TAB_BAR_BACKGROUND_COLOR,
          borderTopColor: 'transparent',
          position: 'absolute',
          height: 100,
          paddingBottom: 60,
          paddingTop: 5,
          bottom: -50
        },

      })}
    >
      <Tab.Screen name="Trending" component={Home} />
      <Tab.Screen name="Explore" component={Home} />
      <Tab.Screen name="Account" component={Home} />
    </Tab.Navigator>
  )
}


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          initialRoute='Home'
          screenOptions={{
            headerShown: false,
            backgroundColor: 'green'
          }}>
          <Stack.Screen name='Home' component={MyTabs} />
          <Stack.Screen name='Article' component={OpenArticle} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    borderTopWidth: 0,
    elevation: 0
  },
});
