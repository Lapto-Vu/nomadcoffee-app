import Default from "../Screen/SignUp.Navigate";
import User from "../Screen/User";
import Home from "../Screen/Home.Navigate";
import Search from "../Screen/Search";
import { useReactiveVar } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import { logInVar } from "../apollo";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";

export default function TabNav() {
  const Tab = createBottomTabNavigator();
  const isLogInState = useReactiveVar(logInVar);
  return (
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
          headerShown: true,
          headerTransparent: true,
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="camera"
        component={View}
        listeners={({ navigation }) => {
          return {
            tabPress: (e) => {
              e.preventDefault();
              {
                isLogInState
                  ? navigation.navigate("upload")
                  : navigation.navigate("profile");
              }
            },
          };
        }}
        options={{
          headerShown: true,
          headerTransparent: true,
          tabBarIcon: ({ color }) => (
            <Ionicons name="camera" size={28} color={color} />
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
  );
}
