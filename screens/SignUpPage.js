import React from "react";
import { TextInput, View, Image, Pressable, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import profilepic from "../assets/images/profilepic.jpg";
import TextInputWithIcon from "../components/TextInpWithIconComp";
import tw from "twrnc";

function SignUpPage() {
  return (
    <>
      <StatusBar backgroundColor="black" style="light" />
      <View className="flex-1 bg-gray-900 ">
        <View className="pt-24">
          <Image
            className="mx-auto rounded-full w-36 h-36 "
            source={profilepic}
          />
          <Pressable className="mx-auto mt-4">
            <Text className="text-lg text-gray-200 underline">
              Choose Profile Pic
            </Text>
          </Pressable>
        </View>

        <View className="py-8 ml-10  w-[80%]">
          <TextInputWithIcon
            inputStyle="h-12 px-10 py-2 text-xl text-gray-200 border-b border-b-gray-200"
            placeholder="Name"
            placeholderColor="grey"
            iconStyle="absolute transform translate-y-3"
            iconName="person-outline"
            iconSize={25}
            iconColor="white"
          />
          <TextInputWithIcon
            inputStyle="h-12 px-10 py-2 text-xl text-gray-200 border-b border-b-gray-200"
            placeholder="Email"
            placeholderColor="grey"
            iconStyle="absolute transform translate-y-3"
            iconName="mail-outline"
            iconSize={25}
            iconColor="white"
          />
          <TextInputWithIcon
            inputStyle="h-12 px-10 py-2 text-xl text-gray-200 border-b border-b-gray-200"
            placeholder="Address"
            placeholderColor="grey"
            iconStyle="absolute transform translate-y-3"
            iconName="location-outline"
            iconSize={25}
            iconColor="white"
          />

          <TextInputWithIcon
            inputStyle="h-12 px-10 py-2 text-xl text-gray-200 border-b border-b-gray-200"
            placeholder="Phone"
            placeholderColor="grey"
            iconStyle="absolute transform translate-y-3"
            iconName="call-outline"
            iconSize={25}
            iconColor="white"
          />

          <TextInputWithIcon
            inputStyle="h-12 px-10 py-2 text-xl text-gray-200 border-b border-b-gray-200"
            placeholder="Password"
            placeholderColor="grey"
            iconStyle="absolute transform translate-y-3"
            iconName="lock-open-outline"
            iconSize={25}
            iconColor="white"
          />
        </View>
        <Pressable className=" bg-orange-800 w-[70%] mx-auto rounded-lg mt-5">
          <Text className="py-3 text-2xl text-center text-white">Sign Up</Text>
        </Pressable>

        <Pressable className="mt-10">
          <Text className="text-lg text-center text-gray-200 underline">
            Already Have An Account ? Sign In
          </Text>
        </Pressable>
      </View>
    </>
  );
}

export default SignUpPage;
