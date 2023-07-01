import { View, Image, Text, Pressable } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
function ProdOverviewComp({ data }) {
  const Route = useRoute();
  const navigation = useNavigation();

  function pressHandler() {
    navigation.navigate("NavInsideBottom", {
      params: { data: data },

      screen: "Product Detail",
    });
  }
  return (
    <Pressable
      onPress={pressHandler}
      className="flex-row py-2 m-2 mt-2 mb-3 bg-white rounded-lg shadow-2xl"
    >
      <View className=" ml-0 h-32 w-[40%]">
        <Image
          className="object-cover w-full h-full rounded-lg "
          source={{
            uri: `https://52c35cf06edf44f062b0.ucr.io/-/preview/1080x1920/-/format/webp/-/quality/smart_retina/-/progressive/yes/https://gabaa-app-resource.s3.amazonaws.com/${data.image[0]}`,
          }}
        />
      </View>

      <View className="gap-y-2 my-auto w-[55%] ml-4">
        <Text className="text-base font-semibold">{data.name}</Text>
        <Text className="text-base font-semibold">Price {data.price}</Text>

        <Text className="text-base font-semibold">
          {data.description.length > 28
            ? data.description.slice(0, 26).padEnd(28, ".")
            : data.description}
        </Text>
      </View>
    </Pressable>
  );
}

export default ProdOverviewComp;
