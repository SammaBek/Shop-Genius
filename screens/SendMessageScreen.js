import {
  Pressable,
  Text,
  TextInput,
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from "react-native";
import { useContext, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useHttp from "../hooks/use-http";
import axios from "axios";
import Cookies from "js-cookie";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "twrnc";
import SendMessageComp from "../components/SendMessageComp";
import {
  KeyboardAwareScrollView,
  KeyboardAwareFlatList,
} from "react-native-keyboard-aware-scroll-view";
import { io } from "socket.io-client";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SignActions } from "../store/signIn-slice";

function SendMessageScreen() {
  const userId = useSelector((state) => state.sign.userId);
  const refreshPage = useSelector((state) => state.sign.userId);
  const userImage = useSelector((state) => state.sign.userImage);
  const [chats, setChat] = useState([]);
  const [message, setMessage] = useState();
  const { sendRequest } = useHttp();
  const Route = useRoute();
  const data = Route.params.data;
  console.log("Here is Data");
  console.log(data);
  const scrollRef = useRef();

  let cookie;

  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io(`${"https://gabaaecom.onrender.com"}`);
    if (userId) {
      socket.emit("register", userId);
      socket.on("messageFromServer", (data) => {
        setChat((prevState) => [...prevState, data]);
        console.log(data);
        dispatch(
          SignActions.refreshPage({
            refreshPage: !refreshPage,
          })
        );
      });
    }
  }, [userId]);

  useEffect(() => {
    const getChat = async () => {
      try {
        cookie = await AsyncStorage.getItem("token");
        console.log(`Bearer ${cookie}`);
        const chat = await axios({
          method: "POST",
          url: `https://gabaaecom.onrender.com/api/users/getChat`,
          headers: { Authorization: `Bearer ${cookie}` },
          data: { user1: data.bidder, user2: data.userId },
        });
        if (chat) {
          setChat([...chat.data.chat].reverse());
          console.log(chat.data.chat);
        }
      } catch (err) {
        if (err) {
          console.log(err.response.data.message);
        }
      }
      // socket.emit("register", userId);
    };
    getChat();
  }, []);

  const applyData = (user) => {
    setChat((prevState) => [...prevState, user.Chat]);
    dispatch(
      SignActions.refreshPage({
        refreshPage: !refreshPage,
      })
    );

    console.log(user.Chat);
    // message.current.value = "";
  };

  const sendHandler = async (event) => {
    event.preventDefault();
    const msg = {
      message: message,
      users: [data.userId, data.bidder],
      sender: userId,
      image: userImage,
    };
    let ch;

    sendRequest(
      {
        method: "POST",
        url: `https://gabaaecom.onrender.com/api/users/sendMessage`,
        data: msg,
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      },

      applyData
    );

    setMessage("");
  };

  // console.log("Props here");
  // console.log(props);

  function inputHander(inp) {
    setMessage(inp);
    console.log(inp);
  }

  function renderMessage(itemData) {
    return (
      <View className="">
        <View
          style={[
            tw` max-w-[80%] mx-2 mb-4 mt-2 px-3 py-1 ${
              itemData.item.sender === userId
                ? `bg-blue-900 rounded-tr-none rounded-xl`
                : "bg-gray-500 rounded-tl-none rounded-xl"
            }`,
            {
              alignSelf: `${
                itemData.item.sender === userId ? "flex-end" : "flex-start"
              }`,
            },
          ]}
        >
          <View className="w-auto rounded ">
            <Text className="text-base text-white">
              {itemData.item.message}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="pt-10 pb-4">
        <Text className="text-2xl font-bold text-center text-black">
          {`Chat with ${data.name}`}
        </Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1`}
        keyboardVerticalOffset={10}
        className=""
      >
        <View className="flex-1">
          {chats.length !== 0 && (
            <FlatList
              className=""
              ref={scrollRef}
              data={chats}
              renderItem={renderMessage}
              keyExtractor={(item) => item._id}
              initialScrollIndex={-1}
              onContentSizeChange={() => scrollRef.current.scrollToEnd()}
            />
          )}
        </View>

        <View className="bottom-0 flex flex-row items-center justify-between pb-4 ">
          <TextInput
            className="py-2 shadow-2xl px-4 max-h-36    rounded-3xl w-[80%] text-black text-lg border  border-gray-800   mx-auto"
            multiline={true}
            onChangeText={inputHander}
            value={message}
            placeholder="Send Message ..."
            placeholderTextColor="gray"
          />
          <View className="w-[10%]">
            {/* <Pressable
                onPress={sendHandler}
                className="items-center justify-between rounded-lg"
              >
                <Text className="text-2xl text-center text-gray-700">Send</Text>
              </Pressable> */}
            <Pressable onPress={sendHandler}>
              <Ionicons size={28} name="send-outline" />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default SendMessageScreen;
