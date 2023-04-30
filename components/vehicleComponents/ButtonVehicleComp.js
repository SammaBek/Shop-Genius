import { Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
function ButtonVehicleComp({ setModalName, setModalVisible, spec, specValue }) {
  return (
    <Pressable
      onPress={() => {
        console.log(`${spec} Pressed`);
        setModalName(spec);
        setModalVisible(true);
      }}
      className="py-1 border border-gray-100 rounded-md"
    >
      <Text className="text-lg text-center text-gray-100">
        {specValue}
        <Ionicons name="chevron-down-outline" size={21} />
      </Text>
    </Pressable>
  );
}

export default ButtonVehicleComp;
