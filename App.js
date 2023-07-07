import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";
import { store } from "./store/store";

import BottomTab from "./route/BottomTab";

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
