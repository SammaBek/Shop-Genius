import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Provider, useSelector } from "react-redux";
import { store } from "./store/store";

import tw from "twrnc";

// Section for Screen Imports

import HomePage from "./screens/HomePage";
import ProdDetailPage from "./screens/ProdDetailPage";
import SignInPage from "./screens/SignInPage";
import SignUpPage from "./screens/SignUpPage";
import AddProductPage from "./screens/AddProductPage";
import UserPage from "./screens/UserPage";

// Section for Component Imports
const Tab = createBottomTabNavigator();

function BottomTab() {
  const isLoggedIn = useSelector((state) => state.sign.isLoggedIn);
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Ionicons name="home-outline" color="black" size={24} />
          ),
        }}
        name="Home"
        component={HomePage}
      />
      {/* <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Ionicons name="person-circle-outline" color="black" size={28} />
          ),
        }}
        name="Sign In"
        component={SignInPage}
      /> */}
      {/* <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Ionicons name="person-add-outline" color="black" size={28} />
          ),
        }}
        name="Sign Up"
        component={SignUpPage}
      /> */}
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Ionicons name="person-circle-outline" color="black" size={28} />
          ),
        }}
        name="User"
        component={isLoggedIn ? UserPage : SignInPage}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Ionicons color="black" name="server-outline" size={28} />
          ),
        }}
        name="Add Product"
        component={AddProductPage}
      />
    </Tab.Navigator>
  );
}
export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerMode: "screen",
              headerTintColor: "white",
              headerStyle: { backgroundColor: "#263238" },
            }}
            initialRouteName="BottomTab"
          >
            {/* <Stack.Screen name="Home" component={HomePage} /> */}
            <Stack.Screen name="Product Detail" component={ProdDetailPage} />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Sign In"
              component={SignInPage}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Sign Up"
              component={SignUpPage}
            />

            <Stack.Screen
              options={{ headerShown: false, title: "Home" }}
              component={BottomTab}
              name="BottomTab"
            />
            {/* <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Add Product"
            component={AddProductPage}
          /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
