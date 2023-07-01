import { View, Image, Pressable, Text, ScrollView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector, useStore } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

import ProfileComp from "../components/userPageComp/ProfileComp";
import ResetPasswordComp from "../components/userPageComp/ResetPasswordComp";
import { useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import { SignActions } from "../store/signIn-slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useHttp from "../hooks/use-http";
import axios from "axios";
import shoping from "../assets/images/shoping.png";
function UserPage() {
  const fullData = useSelector((state) => state.sign.fullData);
  const [showPage, setShowPage] = useState("Profile");
  const [image, setImage] = useState();
  const [imageData, setImageData] = useState();
  const [cancel, setCancel] = useState(false);
  const { sendRequest } = useHttp();
  const [user, setUser] = useState();

  const dispatch = useDispatch();
  const navigation = useNavigation();

  console.log(showPage);

  console.log("on User Page");
  // console.log(fullData);

  // useEffect(() => {
  //   console.log("User-Image from UseEffect", fullData.userImage);
  //   setImage(fullData.userImage);
  // }, [fullData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) {
        dispatch(
          SignActions.signIn({
            token: user.token,
            userId: user.id,
            userImage: user.image,
            userName: user.userName,
            userEmail: user.email,
            phone: user.phone,
            joined: user.createdAt,
            address: user.address,
          })
        );
        console.log("This will run after 10 second!");

        console.log(user);
        setImage(null);
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [user]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
      setCancel(true);
      console.log(result.assets[0]);
      // console.log("res : " + JSON.stringify(result));
    }
  };

  function signOutHandler() {
    console.log("sign out");
    dispatch(SignActions.signOut());

    navigation.navigate("NavInsideBottom", {
      screen: "Home",
    });
  }

  async function saveHandler() {
    let cookie;
    console.log("Save handled");
    cookie = await AsyncStorage.getItem("token");

    const formData = new FormData();
    formData.append("image", {
      uri: image.uri,
      name: image.fileName,
      type: image.type,
    });

    try {
      // const response = await fetch(
      //   `http://localhost:8000/api/users/updateData`,
      //   {
      //     method: "PATCH",
      //     body: formData,
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //       Authorization: `Bearer ${cookie}`,
      //     },
      //   }
      // );

      const Req = await axios({
        method: "PATCH",
        url: `http://localhost:8000/api/users/updateData`,
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
        console.log("Image uploaded successfully!");
        console.log("Here is User");
        // const data = await response.json();

        const user = Req.data.Data;
        setUser({ ...user, token: Req.data.token });
        console.log(user);
        setCancel(false);
        navigation.navigate("User");
      } else {
        console.log("Image upload failed.");
      }
    } catch (error) {
      console.log("Error uploading image:", error);
    }
  }

  function cancelImageHandler() {
    setImage(null);
    setCancel(false);
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={{ flex: 1 }}>
        <View className="bg-gray-900 ">
          <View className="">
            <Pressable
              onPress={signOutHandler}
              className="absolute flex-row w-32 px-2 mt-16 bg-red-900 right-5 rounded-xl gap-x-1"
            >
              <Ionicons name="log-out-outline" color="white" size={24} />
              <Text className="text-lg text-white">Sign Out</Text>
            </Pressable>

            {cancel && (
              <Pressable
                onPress={saveHandler}
                className="absolute px-2 mt-16 rounded-lg w-28 left-5 gap-x-1"
              >
                <Text className="text-xl text-center text-white">Save</Text>
              </Pressable>
            )}
          </View>

          <View className="z-50 flex w-screen h-40 mt-16 transform translate-y-14">
            <View className="w-40 h-40 mx-auto border-2 border-gray-100 rounded-full ">
              <Image
                className="object-cover w-full h-full rounded-full "
                source={{
                  uri:
                    cancel || image
                      ? image.uri
                      : `https://52c35cf06edf44f062b0.ucr.io/-/preview/1080x1920/-/format/webp/-/quality/smart/https://gabaa-app-resource.s3.amazonaws.com/${fullData.userImage}`,
                }}
              />
              {!cancel && (
                <Pressable
                  onPress={pickImage}
                  className="absolute right-0 z-50 p-0.5 transform -translate-x-3 bg-white rounded-full"
                >
                  <Ionicons size={28} color="black" name="camera-outline" />
                </Pressable>
              )}

              {cancel && (
                <Pressable
                  onPress={cancelImageHandler}
                  className="absolute right-0 z-50 p-0.5 transform -translate-x-3 bg-white rounded-full"
                >
                  <Ionicons size={28} color="black" name="close-outline" />
                </Pressable>
              )}
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
                  className={` max-h-7 justify-center ${
                    showPage === "Profile"
                      ? "bg-gray-900"
                      : "bg-transparent border border-gray-500"
                  } rounded-2xl px-2 `}
                >
                  <Text
                    className={`text-lg  text-center ${
                      showPage === "Profile" ? "text-gray-100" : "text-black"
                    } `}
                  >
                    Profile
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setShowPage("Edit Profile")}
                  className={`max-h-7 justify-center ${
                    showPage === "Edit Profile"
                      ? "bg-gray-900"
                      : "bg-transparent border border-gray-500"
                  } rounded-xl px-2 `}
                >
                  <Text
                    className={`text-lg text-center ${
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
                  className={`max-h-7 justify-center ${
                    showPage === "Reset Password"
                      ? "bg-gray-900"
                      : "bg-transparent border border-gray-500"
                  } rounded-xl px-2 `}
                >
                  <Text
                    className={`text-lg text-center ${
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
                  className={`max-h-7 justify-center ${
                    showPage === "My Products"
                      ? "bg-gray-900"
                      : "bg-transparent border border-gray-500"
                  } rounded-xl px-2 `}
                >
                  <Text
                    className={`text-lg text-center ${
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

            <View className="mt-5 justify-items-center">
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
      </View>
    </>
  );
}

export default UserPage;
