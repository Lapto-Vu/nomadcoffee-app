import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SelectPhoto from "./Upload.SelectPhoto";
import { Ionicons } from "@expo/vector-icons";
import TakePhoto from "./Upload.TakePhoto";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

export default function Upload({ navigation }: any) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          shadowColor: "white",
        },
        tabBarIndicatorStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Tab.Screen name="selectphototab">
        {() => (
          <Stack.Navigator
            screenOptions={{
              presentation: "card",
            }}
          >
            <Stack.Screen
              name="selectphoto"
              options={{
                headerShadowVisible: false,
                headerTitle: "사진을 선택해주세요",
                headerLeft: () => (
                  <Ionicons
                    name="close"
                    size={24}
                    onPress={() => navigation.goBack()}
                  />
                ),
              }}
              component={SelectPhoto}
            />
            <Stack.Screen name="takephoto" component={TakePhoto} />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="takephoto" component={TakePhoto} />
    </Tab.Navigator>
  );
}
