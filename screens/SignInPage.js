import React from "react";
import { View, Text, TextInput, Pressable, Image } from "react-native";
import shoping from "../assets/images/shoping.png";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import { StatusBar } from "expo-status-bar";
import useHttp from "../hooks/use-http";
import { useRef, useState } from "react";
import { SignActions } from "../store/signIn-slice";
import { useDispatch, useSelector } from "react-redux";

function SignInPage() {
  const { sendRequest } = useHttp();
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.sign.userName);
  const [logInValue, setLogInValue] = useState({
    email: "",
    password: "",
  });

  function inputHandler(identifier, value) {
    setLogInValue((prevValue) => {
      return {
        ...prevValue,
        [identifier]: value,
      };
    });
  }

  async function applyData(user) {
    console.log("Here is User");
    console.log(user);
    dispatch(
      SignActions.signIn({
        token: user.token,
        userId: user.theUser.id,
        userImage: user.theUser.image,
        userName: user.theUser.userName,
        userEmail: user.theUser.email,
        phone: user.theUser.phone,
        joined: user.theUser.createdAt,
        address: user.theUser.address,
      })
    );

    console.log(userName);
  }

  function signInHandler() {
    sendRequest(
      {
        method: "POST",
        url: "https://gabaaecom.onrender.com/api/users/login",
        data: logInValue,
      },
      applyData
    );
  }
  return (
    <>
      <StatusBar style="light" />
      <View className="bg-gray-900 ">
        <View className="py-10">
          <Image source={shoping} className=" w-[50%] h-72 mx-auto" />
          <View className="flex-row gap-2 mx-auto transform -translate-y-5">
            <Text className="text-3xl font-bold text-center text-gray-300 ">
              Welcome
            </Text>
            <Text className="text-6xl font-bold text-center text-gray-300 transform -translate-y-2 ">
              /
            </Text>
            <Text className="text-3xl font-bold text-center text-green-800 ">
              Shop Genius
            </Text>
          </View>

          <View className="mt-4">
            <TextInput
              value={logInValue.email}
              onChangeText={inputHandler.bind(this, "email")}
              placeholder="Email"
              placeholderTextColor="#757575"
              className=" py-3 px-10 text-xl  transform text-gray-100 rounded-lg border border-gray-100 w-[80%] mx-auto "
            />
            <View className="absolute transform translate-y-4 translate-x-14">
              <Ionicons name="person-outline" size={24} color="white" />
            </View>
          </View>

          <View>
            <TextInput
              value={logInValue.password}
              onChangeText={inputHandler.bind(this, "password")}
              placeholder="Password"
              placeholderTextColor="#757575"
              secureTextEntry={true}
              className="py-3 rounded-lg px-10 my-auto text-gray-100 text-xl border border-gray-100 w-[80%] mx-auto mt-8"
            />
            <View className="absolute transform -translate-x-0.5 translate-y-4">
              <View className="absolute transform translate-y-8 translate-x-14">
                <Ionicons name="lock-closed-outline" size={24} color="white" />
              </View>
            </View>
          </View>

          <Pressable
            onPress={signInHandler}
            className="w-[80%] h-12 mx-auto bg-orange-800 rounded-lg mt-10 "
          >
            <Text className="py-2 my-auto text-xl font-semibold text-center text-gray-100">
              SIGN IN
            </Text>
          </Pressable>
          <Pressable className="flex-row gap-4 mx-auto w-[80%] mt-10">
            <Text className="text-lg text-gray-100">
              Don't have an account?
            </Text>
            <Text className="text-lg text-blue-600">Sign Up Here</Text>
          </Pressable>
          <Pressable className="w-[80%] mt-16 mx-auto">
            <Text className="text-lg text-center text-gray-100">
              Forgot Password ?
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

export default SignInPage;
