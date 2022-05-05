import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApolloProvider } from "@apollo/client";
import { client, logInVar, tokenVar } from "./apollo";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TabNav from "./Screen/Tab.Navigate";
import Upload from "./Screen/Upload.Navigate";
import UploadForm from "./Screen/Upload.Form";

export default function App({ navigation }: any) {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const Stack = createNativeStackNavigator();
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
        <Stack.Navigator
          screenOptions={{
            presentation: "fullScreenModal",
          }}
        >
          <Stack.Screen
            name="tabnav"
            options={{ headerShown: false }}
            component={TabNav}
          />
          <Stack.Screen
            name="upload"
            options={{ headerShown: false }}
            component={Upload}
          />
          <Stack.Screen
            name="uploadform"
            options={{
              title: "새 커피숍 만들기",
            }}
            component={UploadForm}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
