import { View, Text, Pressable, SafeAreaView, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ElectronicSpecPage from "../screens/ElectronicsSpecPage";
import { useState } from "react";
import VehiclesSpecPage from "../screens/VehiclesSpecPage";
function FilterComponent(props) {
  const [category, setCategories] = useState();

  function closeHandler() {
    props.setModalVisible(false);
  }

  function setCategoriesHandler(cat) {
    setCategories(cat);
  }

  return (
    <ScrollView className="px-10 pt-3 mb-10 gap-y-5">
      <Pressable className={`w-10 `} onPress={closeHandler}>
        <Ionicons name="close-outline" color="white" size={36} />
      </Pressable>
      <View className="pb-8 border-b-4 border-gray-100 gap-y-5">
        <View className="flex-row gap-x-10">
          <Pressable
            onPress={setCategoriesHandler.bind(this, "Vehicles")}
            className={`flex-row gap-x-3 ${
              category === "Vehicles" ? "border-b-2 border-gray-100" : ""
            }`}
          >
            <Ionicons name="car-sport-outline" color="white" size={36} />
            <Text className="my-auto text-xl text-white ">Vehicles</Text>
          </Pressable>

          <Pressable
            onPress={setCategoriesHandler.bind(this, "Electronics")}
            className={`flex-row gap-x-3 ${
              category === "Electronics" ? "border-b-2 border-gray-100" : ""
            }`}
          >
            <Ionicons name="laptop-outline" color="white" size={36} />
            <Text className="my-auto text-xl text-white">Electronics</Text>
          </Pressable>
        </View>

        <View className="flex-row gap-x-10">
          <Pressable
            onPress={setCategoriesHandler.bind(this, "Clothing")}
            className={`flex-row gap-x-3 ${
              category === "Clothing" ? "border-b-2 border-gray-100" : ""
            }`}
          >
            <Ionicons name="shirt-outline" color="white" size={36} />
            <Text className="my-auto text-xl text-white ">Clothing</Text>
          </Pressable>

          <Pressable
            onPress={setCategoriesHandler.bind(this, "Gym")}
            className={`flex-row gap-x-3 ${
              category === "Gym" ? "border-b-2 border-gray-100" : ""
            }`}
          >
            <Ionicons name="barbell-outline" color="white" size={36} />
            <Text className="my-auto text-xl text-white">Gym</Text>
          </Pressable>
        </View>
        <View className="flex-row gap-x-10">
          <Pressable
            onPress={setCategoriesHandler.bind(this, "Furniture")}
            className={`flex-row gap-x-3 ${
              category === "Furniture" ? "border-b-2 border-gray-100" : ""
            }`}
          >
            <Ionicons name="bed-outline" color="white" size={36} />
            <Text className="my-auto text-xl text-white ">Furniture</Text>
          </Pressable>

          <Pressable
            onPress={setCategoriesHandler.bind(this, "Beauty")}
            className={`flex-row gap-x-3 ${
              category === "Beauty" ? "border-b-2 border-gray-100" : ""
            }`}
          >
            <Ionicons name="color-palette-outline" color="white" size={36} />
            <Text className="my-auto text-xl text-white">Beauty</Text>
          </Pressable>
        </View>
      </View>

      {category === "Electronics" && <ElectronicSpecPage />}
      {category === "Vehicles" && <VehiclesSpecPage />}

      <Pressable className=" bg-cyan-900 w-[50%] mx-auto rounded-lg py-2 mb-5">
        <Text className="text-xl text-center text-white">Search</Text>
      </Pressable>
    </ScrollView>
  );
}

export default FilterComponent;
