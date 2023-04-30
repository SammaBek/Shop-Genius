import { View, Image, Pressable, Text, ScrollView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

import ProfileComp from "../components/userPageComp/ProfileComp";
import ResetPasswordComp from "../components/userPageComp/ResetPasswordComp";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
function UserPage() {
  const userImage = useSelector((state) => state.sign.userImage);
  const fullData = useSelector((state) => state.sign.fullData);
  const [showPage, setShowPage] = useState("Profile");
  console.log(userImage);
  console.log(showPage);

  console.log("on User Page");
  console.log(fullData);

  return (
    <>
      <StatusBar style="light" />
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <View className="bg-gray-900 ">
          <View className="">
            <Pressable className="absolute flex-row w-32 px-2 mt-16 bg-red-900 right-5 rounded-xl gap-x-1">
              <Ionicons name="log-out-outline" color="white" size={24} />
              <Text className="text-lg text-white">Sign Out</Text>
            </Pressable>
          </View>

          <View className="z-50 flex w-screen transform pt-14 translate-y-14">
            <View className="w-40 h-40 mx-auto border-2 border-gray-100 rounded-full ">
              <Image
                className="object-cover w-full h-full rounded-full "
                source={{
                  uri: `https://gabaa-app-resource.s3.amazonaws.com/${userImage}`,
                }}
              />
            </View>
          </View>

          <View className="w-screen h-full bg-white rounded-t-3xl">
            <View className="mt-20 rounded-xl">
              <ScrollView
                horizontal={true}
                className=" w-[95%] gap-x-3 ml-2 py-2 rounded-xl"
              >
                <Pressable
                  onPress={() => setShowPage("Profile")}
                  className={`py-1.5 ${
                    showPage === "Profile"
                      ? "bg-green-700"
                      : "bg-transparent border"
                  } rounded-xl px-5 `}
                >
                  <Text
                    className={`text-xl text-center ${
                      showPage === "Profile" ? "text-gray-100" : "text-black"
                    } `}
                  >
                    Profile
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setShowPage("Edit Profile")}
                  className={`py-1.5 ${
                    showPage === "Edit Profile"
                      ? "bg-green-700"
                      : "bg-transparent border"
                  } rounded-xl px-5 `}
                >
                  <Text
                    className={`text-xl text-center ${
                      showPage === "Edit Profile"
                        ? "text-gray-100"
                        : "text-black"
                    } `}
                  >
                    Edit Profile
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setShowPage("Reset Password")}
                  className={`py-1.5 ${
                    showPage === "Reset Password"
                      ? "bg-green-700"
                      : "bg-transparent border"
                  } rounded-xl px-5 `}
                >
                  <Text
                    className={`text-xl text-center ${
                      showPage === "Reset Password"
                        ? "text-gray-100"
                        : "text-black"
                    } `}
                  >
                    Reset Password
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setShowPage("My Products")}
                  className={`py-1.5 ${
                    showPage === "My Products"
                      ? "bg-green-700"
                      : "bg-transparent border"
                  } rounded-xl px-5 `}
                >
                  <Text
                    className={`text-xl text-center ${
                      showPage === "My Products"
                        ? "text-gray-100"
                        : "text-black"
                    } `}
                  >
                    My Products
                  </Text>
                </Pressable>
              </ScrollView>
            </View>

            <View className="mt-3 justify-items-center">
              {showPage === "Profile" && <ProfileComp />}
              {showPage === "Reset Password" && (
                <View className="mt-14">
                  <ResetPasswordComp />
                </View>
              )}
              {showPage === "Edit Profile" && (
                <ProfileComp edit={true} data={fullData} />
              )}
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}

export default UserPage;
