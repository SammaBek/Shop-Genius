import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import NavInsideBottom from "./NavInsideBottom";
import MessageNav from "./MessageNav";

import HomePage from "../screens/HomePage";
import ProdDetailPage from "../screens/ProdDetailPage";
import SignInPage from "../screens/SignInPage";
import SignUpPage from "../screens/SignUpPage";
import AddProductPage from "../screens/AddProductPage";
import UserPage from "../screens/UserPage";
import SearchedPage from "../screens/SearchedPage";
import SendMessageScreen from "../screens/SendMessageScreen";

function BottomTab() {
  const Tab = createBottomTabNavigator();
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

export default BottomTab;
