import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateAccount from "./SignUp.Create";
import UserLogIn from "./SignUp.LogIn";
import Welcome from "./SignUp.Welcome";

const Stack = createNativeStackNavigator();

export default function Default() {
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: "modal",
        headerShown: false,
      }}
    >
      <Stack.Screen name="welcome" component={Welcome} />
      <Stack.Screen name="userlogin" component={UserLogIn} />
      <Stack.Screen name="createaccount" component={CreateAccount} />
    </Stack.Navigator>
  );
}
