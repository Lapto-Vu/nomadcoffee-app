import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { client, logInVar, tokenVar } from "./apollo";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "./Screen/Home";
import Search from "./Screen/Search";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Default from "./Screen/SignUp.Navigate";
import User from "./Screen/User";

export default function App() {
  const Tab = createBottomTabNavigator();
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const isLogInState = useReactiveVar(logInVar);
  async function preload(): Promise<any> {
    const ioniconsLoad = [Ionicons.font];
    const ioniconsPromises = ioniconsLoad.map((font) => Font.loadAsync(font));
    const fontPromises = await Font.loadAsync({
      Kaushan: require("./assets/KaushanScript.ttf"),
      Notosans: require("./assets/NotoSansKR.otf"),
    });
    const token = await AsyncStorage.getItem("token");

    if (token) {
      logInVar(true);
      tokenVar(token);
    }
    return Promise.all([fontPromises, ioniconsPromises]);
  }
  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#374151",
            tabBarShowLabel: false,
            tabBarStyle: {
              height: 90,
              position: "absolute",
              backgroundColor: "#ffffff",
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              borderTopColor: "white",
              paddingVertical: 10,
              paddingHorizontal: 15,
              shadowColor: "#e7e7e7",
              shadowOpacity: 0.6,
              shadowOffset: {
                width: 0,
                height: -7,
              },
              shadowRadius: 30,
              elevation: 30,
            },
          }}
        >
          <Tab.Screen
            name="home"
            component={Home}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="home" size={28} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="search"
            component={Search}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="search" size={28} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="profile"
            component={isLogInState ? User : Default}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="person" size={28} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
