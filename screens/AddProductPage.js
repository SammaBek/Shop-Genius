import {
  Text,
  TextInput,
  View,
  Image,
  Pressable,
  Modal,
  ScrollView,
  StatusBar,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import pic1 from "../assets/images/shoping.png";
import CategoryComp from "../components/CategoryComp";
import VehiclesSpecPage from "./VehiclesSpecPage";
import ElectronicsSpecPage from "./ElectronicsSpecPage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";

function AddProductPage() {
  const [radio, setRadio] = useState("New");
  const [image, setImage] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState("Select Category");
  const [prodCategoryVisible, setProdCategoryVisible] = useState(true);
  const [prodSpec, setProdSpec] = useState();
  const navigation = useNavigation();

  const [productOverview, setProductOverView] = useState({
    name: "",
    description: "",
    price: "",
  });

  function inputHandler(identifier, value) {
    setProductOverView((prevValue) => {
      return {
        ...prevValue,
        [identifier]: value,
      };
    });
  }

  const [indexPic, setIndexPic] = useState(0);

  function pressHandler(direction) {
    const count = image.length;
    if (count > 1) {
      if (direction === "forward") {
        setIndexPic((prev) => (prev + 1 <= count - 1 ? prev + 1 : 0));
      } else {
        setIndexPic((prev) => (prev - 1 < 0 ? count - 1 : prev - 1));
      }
    }
  }

  function radioHandler(radio) {
    setRadio(radio);
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      allowsMultipleSelection: true,
      quality: 1,
      base64: true,
      selectionLimit: 4,
    });

    // console.log(result.assets);
    console.log(pic1.URL);

    if (!result.canceled) {
      setImage(result.assets);
    }
  };

  function fetchCategory(category) {
    setCategory(category);
  }

  async function addProductHandler() {
    console.log("Add clicked");
    // console.log(Object.keys(prodSpec));

    let cookie;
    cookie = await AsyncStorage.getItem("token");

    let product = {};
    let finalProduct = {};

    const keys = Object.keys(prodSpec);
    let errorVal;

    keys.map((key) => {
      if (prodSpec[key]) {
        product[key] = prodSpec[key];
      } else {
        errorVal = true;
      }
    });

    if (errorVal) {
      console.log("error encountered");
    } else {
      let finalProduct = {
        ...product,
        ...productOverview,
        status: radio,
        productCatagory: category,
      };

      const formData = new FormData();

      image.map((image) => {
        formData.append(`images`, {
          uri: image.uri,
          name: image.fileName,
          type: image.type,
        });
      });

      for (var key in finalProduct) {
        formData.append(key, finalProduct[key]);
      }

      console.log(formData);
      try {
        const Req = await axios({
          method: "POST",
          url: `https://gabaaecom.onrender.com/api/products/addproduct`,
          headers: {
            Authorization: `Bearer ${cookie}`,
            "Content-Type": "multipart/form-data",
          },
          data: { formData },
          transformRequest: (data, headers) => {
            return formData; // this is doing the trick
          },
        });

        if (Req.data) {
          console.log(Req.data);
          setCategory("Select Category");
          setImage([]);
          setIndexPic(0);
          setModalVisible(false);
          setProdCategoryVisible(false);
          setProdSpec(null);
          setRadio("New");
          setProductOverView({
            name: "",
            description: "",
            price: "",
          });

          navigation.navigate("Home");
        }
      } catch (err) {
        console.log(err.response.data);
      }
    }
  }

  return (
    <>
      <KeyboardAwareScrollView className="flex-1 ">
        <StatusBar barStyle="dark-content" />
        <View className="gap-5 pt-20 ">
          <View>
            <View className="flex-row gap-2 mx-auto">
              <Text className="text-3xl font-bold text-center text-gray-900 ">
                Add Product
              </Text>
              <Text className="text-6xl font-bold text-center text-blue-900 transform -translate-y-2 ">
                /
              </Text>
              <Text className="text-3xl font-bold text-center text-green-800 ">
                Shop Genius
              </Text>
            </View>
          </View>

          <View>
            <TextInput
              onChangeText={inputHandler.bind(this, "name")}
              value={productOverview.name}
              multiline={true}
              placeholder="Name"
              className=" border-2 h-12 items-center text-lg  px-3 my-auto rounded-lg w-[80%] ml-6"
            />
          </View>

          <View>
            <TextInput
              multiline={true}
              onChangeText={inputHandler.bind(this, "description")}
              value={productOverview.description}
              placeholder="Product Description"
              className=" border-2 h-12 text-lg items-center px-3 my-auto rounded-lg w-[80%] ml-6"
            />
          </View>
          <View>
            <TextInput
              keyboardType="number-pad"
              onChangeText={inputHandler.bind(this, "price")}
              value={productOverview.price}
              placeholder="Price"
              className=" border-2 h-12 text-lg items-center px-3 my-auto  rounded-lg w-[40%] ml-6"
            />
          </View>
          <View className="flex-row mt-5 ml-6">
            <Text className="ml-6 text-xl">Catagories:</Text>
            <Pressable
              onPress={() => {
                setProdCategoryVisible(true);
                setModalVisible(true);
              }}
              className="border w-[45%] rounded-md ml-4 "
            >
              <Text className="text-lg text-center">
                {category}
                <Ionicons name="chevron-down-outline" size={21} />
              </Text>
            </Pressable>
          </View>
          <View className="flex-row gap-x-6">
            <View>
              <Text className="text-lg">New</Text>
              <Ionicons
                onPress={() => {
                  radioHandler("New");
                }}
                name={radio === "New" ? "radio-button-on" : "radio-button-off"}
                size={25}
                color="black"
              />
            </View>
            <View>
              <Text className="text-lg">Used</Text>
              <Ionicons
                onPress={() => {
                  radioHandler("Used");
                }}
                name={radio === "Used" ? "radio-button-on" : "radio-button-off"}
                size={25}
                color="black"
              />
            </View>
          </View>
          <View className="px-6 ">
            <View className="w-[65%] ">
              <View>
                <Image
                  source={
                    image.length <= 0
                      ? pic1
                      : {
                          uri: image[indexPic].uri,
                        }
                  }
                  className="w-full border-2 rounded-lg h-44"
                />
                <View className="absolute mx-auto">
                  <Pressable
                    onPress={pickImage}
                    className="px-1 py-1 mt-2 transform translate-x-56 -translate-y-5 bg-gray-900 rounded-lg "
                  >
                    <Ionicons name="camera-outline" size={32} color="white" />
                  </Pressable>
                </View>
              </View>

              <View
                className={`w-full ${image.length <= 0 ? "opacity-50" : ""}`}
              >
                <View className="flex-row py-2 justify-evenly ">
                  <Pressable
                    onPress={() => {
                      pressHandler("backward");
                    }}
                    className={` `}
                  >
                    <Ionicons
                      name="arrow-back-circle"
                      size={38}
                      color="black"
                    />
                  </Pressable>

                  <Pressable
                    onPress={() => {
                      pressHandler("forward");
                    }}
                    className={` `}
                  >
                    <Ionicons
                      name="arrow-forward-circle"
                      size={38}
                      color="black"
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>

        <Modal animationType="slide" visible={modalVisible} transparent={true}>
          <Pressable
            onPress={() => setModalVisible(false)}
            className="flex-1"
          ></Pressable>

          <View className="bg-gray-500 bottom-0 absolute w-[100%] h-auto ">
            <CategoryComp onCategorySelect={fetchCategory} />
          </View>
        </Modal>

        <Modal
          animationType="slide"
          visible={
            category !== "Select Category" &&
            prodCategoryVisible &&
            !modalVisible
          }
          transparent={true}
        >
          <Pressable
            onPress={() => setProdCategoryVisible(false)}
            className="flex-1 bg-gray-400 opacity-90"
          ></Pressable>
          <ScrollView className="bg-gray-800  bottom-0 rounded-xl absolute w-[100%] h-[85%] ">
            {category === "Vehicles" && (
              <VehiclesSpecPage prodSpec={prodSpec} setProdSpec={setProdSpec} />
            )}
            {category === "Electronics" && (
              <ElectronicsSpecPage
                prodSpec={prodSpec}
                setProdSpec={setProdSpec}
              />
            )}
          </ScrollView>
        </Modal>

        <Pressable
          onPress={addProductHandler}
          className="rounded-lg bg-cyan-900 w-[60%] py-2 mt-6 mx-auto"
        >
          <Text className="text-xl text-center text-white ">ADD PRODUCT</Text>
        </Pressable>
      </KeyboardAwareScrollView>
    </>
  );
}

export default AddProductPage;
