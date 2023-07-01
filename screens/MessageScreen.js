import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

function MessageScreen() {
  const [message, setMessage] = useState([]);
  const userId = useSelector((state) => state.sign.userId);
  const refreshPage = useSelector((state) => state.sign.refreshPage);
  const navigation = useNavigation();
  let cookie;

  function ClickHandler(data) {
    navigation.navigate("MessageNav", {
      screen: "Message",
      params: {
        data: {
          name: data.name,
          bidder: `${
            data.participants[0] === userId
              ? data.participants[1]
              : data.participants[0]
          }`,
          userId: userId,
        },
      },
    });
  }

  function renderMessage(itemData) {
    const message = `${
      itemData.item.message.length > 48
        ? itemData.item.message.slice(0, 47).padEnd(50, ".")
        : itemData.item.message
    }`;
    return (
      <View className="justify-center h-20 ml-2">
        <Pressable
          onPress={ClickHandler.bind(this, itemData.item)}
          className="flex flex-row items-center h-16 gap-3"
        >
          <Image
            className="object-cover w-12 h-12 rounded-full"
            source={{
              uri: `https://52c35cf06edf44f062b0.ucr.io/-/preview/-/resize/300x/-/format/webp/-/quality/smart_retina/https://gabaa-app-resource.s3.amazonaws.com/${itemData.item.image}`,
            }}
          />
          <View className="flex flex-col ">
            <Text className="font-bold text-black">{itemData.item.name}</Text>
            <Text className="text-base text-gray-700">{message}</Text>
          </View>
        </Pressable>
      </View>
    );
  }
  useEffect(() => {
    const getData = async () => {
      try {
        cookie = await AsyncStorage.getItem("token");
        console.log(`Bearer ${cookie}`);
        console.log(userId);

        const Req = await axios({
          method: "POST",
          url: `https://gabaaecom.onrender.com/api/users/getChats`,
          headers: { Authorization: `Bearer ${cookie}` },
          data: { myUser: userId },
        });

        if (Req) {
          console.log(Req.data.arr);
          setMessage(Req.data.arr);
        }
      } catch (err) {
        console.log(err.response.data.message);
      }
    };

    getData();
  }, [refreshPage]);

  return (
    <SafeAreaView className="flex-1 ">
      <Text className="text-2xl font-bold text-center text-cyan-900">
        Chats
      </Text>
      <View className="h-[90%]">
        {message.length !== 0 && (
          <FlatList
            className=""
            data={message}
            renderItem={renderMessage}
            keyExtractor={(item) => item._id}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

export default MessageScreen;
