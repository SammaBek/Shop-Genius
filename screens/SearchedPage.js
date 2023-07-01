import { Text, View, SafeAreaView, FlatList, TextInput } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import ProdOverviewComp from "../components/ProdOverviewComp";
import { useState } from "react";

function SearchedPage() {
  const Route = useRoute();
  const [search, setSearch] = useState();
  const navigation = useNavigation();

  const data = Route.params;
  function renderProduct(itemData) {
    return <ProdOverviewComp data={itemData.item} />;
  }

  async function searchHandle(key) {
    if (search) {
      try {
        console.log(search);
        const Data = await axios({
          method: "get",
          url: `https://gabaaecom.onrender.com/api/products/getByName/${search}`,
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        });
        console.log("Searched Result Now");
        console.log(Data.data);
        // setSearchedResult(Data.data.meal);
        navigation.navigate("NavInsideBottom", {
          screen: "Searched Page",
          params: { data: Data.data.meal },
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  function searchInputHandler(input) {
    setSearch(input);
  }

  return (
    <SafeAreaView>
      <View className="mt-5 ">
        <View>
          <TextInput
            placeholder="Search ShopGenius"
            className="px-10 text-xl w-[85%] h-12 text-center  border mx-auto rounded-lg"
            // onKeyPress={searchHandle}
            onSubmitEditing={searchHandle}
            returnKeyType="search"
            onChangeText={searchInputHandler}
            value={search}
          />
        </View>
        {/* <Pressable
          onPress={filterHandler}
          className="absolute w-auto my-2 transform translate-x-12 translate-y-0.5 rounded-lg"
        >
          <Ionicons name="options-outline" color="blue" size={28} />
        </Pressable> */}
      </View>
      <View className="pt-10">
        <View className="flex-row gap-2 mx-auto">
          <Text className="text-3xl font-bold text-center text-gray-900 ">
            Results
          </Text>
          <Text className="text-6xl font-bold text-center text-blue-900 transform -translate-y-2 ">
            /
          </Text>
          <Text className="text-3xl font-bold text-center text-green-800 ">
            For Your Search
          </Text>
        </View>
      </View>
      <View className="pt-4 pb-44">
        <FlatList data={data.data} renderItem={renderProduct} />
      </View>
    </SafeAreaView>
  );
}

export default SearchedPage;
