import {
  Text,
  View,
  TextInput,
  Image,
  FlatList,
  Pressable,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import {
  NavigationContainer,
  useRoute,
  useNavigation,
} from "@react-navigation/native";

// imports of Custom Components

import ProdOverviewComp from "../components/ProdOverviewComp";
import FilterComponent from "../components/FilterComponent";
import FilterScreen from "./FilterScreen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function HomePage() {
  const [mealData, setMealData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState();
  const navigation = useNavigation();
  useEffect(() => {
    async function getData() {
      try {
        const mealData = await axios({
          method: "get",
          url: "https://gabaaecom.onrender.com/api/products",
        });
        setMealData(mealData.data.meal);
      } catch {
        console.log("encountered Error");
      }
    }
    getData();
  }, []);

  // if (mealData.length != 0) {
  //   console.log(mealData[0]);
  // }

  function renderProduct(itemData) {
    return <ProdOverviewComp data={itemData.item} />;
  }

  function filterHandler() {
    console.log("Filter Clicked");
    setModalVisible(true);
  }

  async function searchHandle(key) {
    console.log("Clicked");

    navigation.navigate("Searched Page");
    // if (search) {
    //   try {
    //     console.log(search);
    //     const Data = await axios({
    //       method: "get",
    //       url: `https://gabaaecom.onrender.com/api/products/getByName/${search}`,
    //       headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    //     });
    //     console.log(Data);
    //     setMealData(Data.data.meal);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
  }

  function searchInputHandler(input) {
    setSearch(input);
  }
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="pt-10 bg-gray-100 pb-28">
          <View className="mt-5">
            <View className="flex-row gap-2 mx-auto">
              <Text className="text-3xl font-bold text-center text-gray-900 ">
                Home
              </Text>
              <Text className="text-6xl font-bold text-center text-blue-900 transform -translate-y-2 ">
                /
              </Text>
              <Text className="text-3xl font-bold text-center text-green-800 ">
                Shop Genius
              </Text>
            </View>
          </View>
          <View className="mt-5 ">
            <View>
              <TextInput
                placeholder="Search ShopGenius"
                className="px-10 text-xl w-[85%] h-12 text-center  border mx-auto rounded-lg"
                // onKeyPress={searchHandle}
                onSubmitEditing={searchHandle}
                returnKeyType="search"
                onChangeText={searchInputHandler}
                value={search}
              />
            </View>
            <Pressable
              onPress={filterHandler}
              className="absolute w-auto my-2 transform translate-x-12 translate-y-0.5 rounded-lg"
            >
              <Ionicons name="options-outline" color="blue" size={28} />
            </Pressable>
          </View>
          <View className="pt-4 pb-44">
            <FlatList data={mealData} renderItem={renderProduct} />
          </View>

          <Modal
            animationType="slide"
            visible={modalVisible}
            transparent={true}
          >
            <Pressable
              onPress={() => setModalVisible(false)}
              className="flex-1"
            ></Pressable>

            <View className=" rounded-xl absolute w-[100%] pt-2 pb-16 top-10 h-screen bg-gray-900">
              <View>
                <FilterScreen setModalVisible={setModalVisible} />
              </View>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

export default HomePage;
