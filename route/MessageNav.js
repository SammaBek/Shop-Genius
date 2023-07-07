import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

import MessageScreen from "../screens/MessageScreen";
import SendMessageScreen from "../screens/SendMessageScreen";
function MessageNav() {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "screen",
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#263238" },
        initialRouteName: "MessageList",
      }}
    >
      <Stack.Screen
        options={{
          headerShown: false,
          title: "Messages",
        }}
        name="MessageList"
        component={MessageScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          title: "Chats",
        }}
        name="Message"
        component={SendMessageScreen}
      />
    </Stack.Navigator>
  );
}

export default MessageNav;
