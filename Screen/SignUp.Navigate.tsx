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
      <Stack.Screen
        options={{ title: "로그인" }}
        name="userlogin"
        component={UserLogIn}
      />
      <Stack.Screen
        options={{ title: "회원가입" }}
        name="createaccount"
        component={CreateAccount}
      />
    </Stack.Navigator>
  );
}
