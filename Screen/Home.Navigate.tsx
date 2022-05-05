import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Feed from "./Home.Feed";
import Shop from "./Shared.Shop";

const Stack = createNativeStackNavigator();

export default function Home() {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        name="feed"
        component={Feed}
        options={{
          title: "Coffeegram",
          headerTitleStyle: {
            fontFamily: "Kaushan",
            fontSize: 22,
          },
        }}
      />
      <Stack.Screen
        name="shop"
        options={{
          headerShown: false,
        }}
        component={Shop}
      />
    </Stack.Navigator>
  );
}
