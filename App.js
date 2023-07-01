import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store/store";
import { io } from "socket.io-client";
import { SocketActions } from "./store/socket-slice";
import MessageScreen from "./screens/MessageScreen";
import { useEffect } from "react";

import tw from "twrnc";

// Section for Screen Imports

import HomePage from "./screens/HomePage";
import ProdDetailPage from "./screens/ProdDetailPage";
import SignInPage from "./screens/SignInPage";
import SignUpPage from "./screens/SignUpPage";
import AddProductPage from "./screens/AddProductPage";
import UserPage from "./screens/UserPage";
import SearchedPage from "./screens/SearchedPage";
import SendMessageScreen from "./screens/SendMessageScreen";
// Section for Component Imports
const Tab = createBottomTabNavigator();

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
          // headerLeft: () => (
          //   <>
          //     <Ionicons
          //       onPress={() =>
          //         navigation.navigate("MessageNav", {
          //           screen: "MessageList",
          //         })
          //       }
          //       size={28}
          //       color="white"
          //       name="arrow-back-outline"
          //     />
          //     <View>
          //       <Text className="justify-center ml-2 text-lg text-white">
          //         Message
          //       </Text>
          //     </View>
          //   </>
          // ),
        }}
        name="Message"
        component={SendMessageScreen}
      />
    </Stack.Navigator>
  );
}

function BottomTab() {
  const isLoggedIn = useSelector((state) => state.sign.isLoggedIn);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="NavInsideBottom"
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
            <Ionicons name="person-circle-outline" color="black" size={28} />
          ),
          tabBarItemStyle: {
            display: "none",
          },
        }}
        name="Sign Up"
        component={SignInPage}
      />

      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Ionicons color="black" name="server-outline" size={28} />
          ),
          title: "Add Product",
        }}
        name="Add Product"
        component={AddProductPage}
      />

      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Ionicons color="black" name="server-outline" size={28} />
          ),
          title: "Hidden Nav",
          tabBarItemStyle: {
            display: "none",
          },
        }}
        name="NavInsideBottom"
        component={NavInsideBottom}
      />

      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Ionicons color="black" name="chatbox-outline" size={28} />
          ),
          title: "Chats",
        }}
        name="MessageNav"
        component={MessageNav}
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
          <BottomTab />
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
