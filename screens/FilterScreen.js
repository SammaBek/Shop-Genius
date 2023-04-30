import { Text, View, Pressable, ScrollView } from "react-native";
import FilterComponent from "../components/FilterComponent";

function FilterScreen(props) {
  return (
    <View className="pt-2 pb-2">
      <FilterComponent setModalVisible={props.setModalVisible} />
    </View>
  );
}

export default FilterScreen;
