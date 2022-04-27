import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Feed from "./Home.Feed";
import Shop from "./Home.Shop";

const Stack = createNativeStackNavigator();

export default function Home() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="feed" component={Feed} />
      <Stack.Screen name="shop" component={Shop} />
    </Stack.Navigator>
  );
}
