import {
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import moment from "moment";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";

function ProfileComp(props) {
  const userName = useSelector((state) => state.sign.userName);
  const userPhone = useSelector((state) => state.sign.phone);
  const userEmail = useSelector((state) => state.sign.userEmail);
  const userAddress = useSelector((state) => state.sign.address);
  const userJoined = useSelector((state) => state.sign.joined);
  const userId = useSelector((state) => state.sign.userId);
  const isFocused = useIsFocused();
  const [products, setProducts] = useState();
  let cookie;
  useEffect(() => {
    if (isFocused) {
      const getData = async () => {
        try {
          // ${localStorage.getItem("token")}
          cookie = await AsyncStorage.getItem("token");
          const Req = await axios({
            method: "GET",

            url: `https://gabaaecom.onrender.com/api/products/myproducts/${userId}`,

            headers: { Authorization: `Bearer ${cookie}` },
          });
          console.log("use Effect Run");
          if (Req) {
            setProducts(Req.data.user.products);
          }
        } catch (err) {
          console.log(err.message);
        }
      };

      getData();
    }
  }, [isFocused]);

  function renderProducts(itemData) {
    return (
      <View className="ml-1 mr-2">
        <View className="h-32 ml-0 ">
          <Image
            className="object-cover w-56 h-48 rounded-lg "
            source={{
              uri: `https://52c35cf06edf44f062b0.ucr.io/-/preview/1080x1920/-/format/webp/-/quality/smart/-/progressive/yes/https://gabaa-app-resource.s3.amazonaws.com/${itemData.item.image[0]}`,
            }}
          />
          {/* <Text className="absolute text-lg font-bold text-white ">
            {itemData.item.name}
          </Text> */}
        </View>
      </View>
    );
  }
  return (
    <View className="">
      <View className=" gap-y-7">
        <View className="flex-row gap-2 mx-auto">
          <View className="py-5  rounded-xl w-[45%] border bg-gray-900">
            <View className="my-auto">
              <Text className="text-center">
                <Ionicons color="white" name="person-outline" size={24} />
              </Text>
              {props.edit ? (
                <TextInput
                  defaultValue={props.data.userName}
                  className="py-2 mx-auto text-lg text-white border-b border-gray-100 "
                />
              ) : (
                <Text className="px-2 text-lg text-center text-white">
                  {userName}
                </Text>
              )}
            </View>
          </View>
          <View className=" py-5 border w-[45%] rounded-xl bg-gray-900">
            <View className="my-auto">
              <Text className="text-center">
                <Ionicons name="call-outline" color="white" size={24} />
              </Text>
              {props.edit ? (
                <TextInput
                  defaultValue={props.data.phone.toString()}
                  className="py-2 mx-auto text-lg text-white border-b border-gray-100 "
                />
              ) : (
                <Text className="px-2 text-lg text-center text-white">
                  {userPhone}
                </Text>
              )}
            </View>
          </View>
        </View>

        <View className="flex-row gap-2 mx-auto">
          <View className=" border w-[45%]  py-3 bg-gray-900  rounded-xl">
            <View className="my-auto">
              <Text className="text-center">
                <Ionicons name="mail-outline" color="white" size={24} />
              </Text>
              {props.edit ? (
                <TextInput
                  defaultValue={props.data.userEmail}
                  className="py-2 mx-auto text-lg text-white border-b border-gray-100 "
                />
              ) : (
                <Text className="px-2 text-lg text-center text-white">
                  {userEmail}
                </Text>
              )}
            </View>
          </View>
          <View className=" border w-[45%] py-3 rounded-xl bg-gray-900">
            <View className="my-auto">
              <Text className="text-center">
                <Ionicons name="location-outline" color="white" size={24} />
              </Text>
              {props.edit ? (
                <TextInput
                  defaultValue={props.data.address}
                  className="py-2 mx-auto text-lg text-white border-b border-gray-100 "
                />
              ) : (
                <Text className="px-2 text-lg text-center text-white">
                  {userAddress}
                </Text>
              )}
            </View>
          </View>
        </View>
        {props.edit === false && (
          <View className="flex-row mx-auto">
            <View className=" py-5 border w-[45%] rounded-xl bg-gray-900">
              <View>
                <Text className="text-xl text-center text-white">
                  <Ionicons name="calendar-outline" color="white" size={24} />
                  (Joined)
                </Text>

                <Text className="px-2 text-lg text-center text-white">
                  {moment(userJoined).format("LL")}
                </Text>
              </View>
            </View>
          </View>
        )}

        {props.edit && (
          <View className="mt-10 ">
            <Pressable className="py-2 bg-cyan-900 rounded-xl w-[60%] mx-auto">
              <Text className="text-2xl text-center text-white">Save</Text>
            </Pressable>
          </View>
        )}
      </View>
      {!props.edit && (
        <View>
          <View className="h-10 mx-auto mt-4">
            <Text className="text-lg">{`Here are your Products (${
              products ? products.length : ""
            })`}</Text>
          </View>
          <View className="w-full h-52">
            <FlatList
              horizontal={true}
              data={products ? products.reverse() : []}
              renderItem={renderProducts}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      )}
    </View>
  );
}

export default ProfileComp;
