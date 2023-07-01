import tw from "twrnc";
import { View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
function SendMessageComp({ Data }) {
  const userId = useSelector((state) => state.sign.userId);
  return (
    <View className="">
      <View
        style={[
          tw`rounded-r-lg rounded-bl-2xl w-auto mx-2 mb-4 mt-2 px-3 py-1 ${
            Data.item.sender === userId ? `bg-gray-600` : "bg-gray-300 "
          }`,
          { alignSelf: "flex-start", marginLeft: "auto" },
        ]}
      >
        <View className="w-auto rounded ">
          <Text className="text-base text-white">{Data.item.message}</Text>
        </View>
      </View>
    </View>
  );
}

export default SendMessageComp;
