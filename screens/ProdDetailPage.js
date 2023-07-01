import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  NavigationContainer,
  useRoute,
  useNavigation,
} from "@react-navigation/native";

import SendMessageScreen from "./SendMessageScreen";

import tw from "twrnc";

function ProdDetailPage() {
  const Route = useRoute();
  const [indexPic, setIndexPic] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const userId = useSelector((state) => state.sign.userId);
  const navigation = useNavigation();

  function pressHandler(direction) {
    const count = data.image.length;
    if (count > 1) {
      if (direction === "forward") {
        setIndexPic((prev) => (prev + 1 <= count - 1 ? prev + 1 : 0));
      } else {
        setIndexPic((prev) => (prev - 1 < 0 ? count - 1 : prev - 1));
      }
    }
  }

  const data = Route.params.data;
  const key = Object.keys(data.specs);
  console.log(key);

  console.log("Here is the date");
  console.log(data);

  function chatShowHandler() {
    // setModalVisible(true);
    navigation.navigate("MessageNav", {
      params: {
        data: {
          name: data.owner.userName,
          bidder: data.owner.id,
          userId: userId,
        },
      },
      screen: "Message",
    });
  }

  return (
    <>
      <StatusBar animated style="light" />
      <ScrollView className="pt-5 mb-10">
        <View className="w-full h-64 mx-auto ">
          <Image
            className="object-fit mx-auto  w-[95%] h-[90%] rounded-lg "
            source={{
              uri: `https://52c35cf06edf44f062b0.ucr.io/-/preview/1080x1920/-/format/webp/-/quality/smart_retina/https://gabaa-app-resource.s3.amazonaws.com/${data.image[indexPic]}`,
            }}
          />
        </View>
        <View className="w-full">
          <View className="flex-row py-2 justify-evenly ">
            <Pressable
              onPress={() => {
                pressHandler("backward");
              }}
              className={` `}
            >
              <Ionicons name="arrow-back-circle" size={38} color="black" />
            </Pressable>

            <Pressable
              onPress={() => {
                pressHandler("forward");
              }}
              className={` `}
            >
              <Ionicons name="arrow-forward-circle" size={38} color="black" />
            </Pressable>
          </View>
        </View>
        <View className="mt-4 ml-3">
          <View className="gap-y-2">
            <Text className="text-lg font-semibold">{data.name}</Text>
            <Text className="text-lg font-semibold">${data.price}</Text>
            <Text className="text-lg font-semibold">{data.description}</Text>
          </View>
        </View>

        <View className="mt-7 ml-4  w-[90%]">
          <Text className="text-xl w-[90%] font-semibold mb-1">Specs</Text>
          <View className="mb-3 border-t-2"></View>

          <View className="flex-row gap-x-10">
            <View className="">
              {key.map((key) => {
                return (
                  <View key={key}>
                    <Text className="mt-1 text-lg">{key}:</Text>
                  </View>
                );
              })}
            </View>
            <View className="">
              {key.map((key) => {
                return (
                  <View key={key}>
                    <Text className="mt-1 text-lg ">{data.specs[key]}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        <View className="flex-row mt-5 mb-10 justify-evenly">
          <Pressable className="w-[30%] bg-cyan-900 rounded-lg py-1">
            <Text className="text-lg text-center text-white">Call</Text>
          </Pressable>
          <Pressable
            onPress={chatShowHandler}
            className="w-[30%] bg-cyan-900 rounded-lg py-1"
          >
            <Text className="text-lg text-center text-white">Chat</Text>
          </Pressable>
        </View>

        {/* <Modal animationType="slide" visible={modalVisible} transparent={true}>
          <Pressable
            onPress={() => setModalVisible(false)}
            className="flex-1"
          ></Pressable>

          <View className=" rounded-xl absolute bottom-0 w-[100%] pt-2 h-[80%] bg-gray-900">
            <View>
              <SendMessageScreen
                name={data.owner.userName}
                bidder={data.owner.id}
                userId={userId}
              />
            </View>
          </View>
        </Modal> */}
      </ScrollView>
    </>
  );
}

export default ProdDetailPage;
