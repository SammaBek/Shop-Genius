import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomePage from "../screens/HomePage";
import ProdDetailPage from "../screens/ProdDetailPage";
import SignInPage from "../screens/SignInPage";

import SearchedPage from "../screens/SearchedPage";
import SendMessageScreen from "../screens/SendMessageScreen";

function NavInsideBottom() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "screen",
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#263238" },
        initialRouteName: "Home",
      }}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={HomePage}
      />
      <Stack.Screen name="Product Detail" component={ProdDetailPage} />
      <Stack.Screen
        options={{ title: "Searched Result" }}
        name="Searched Page"
        component={SearchedPage}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Sign In"
        component={SignInPage}
      />
    </Stack.Navigator>
  );
}

export default NavInsideBottom;
