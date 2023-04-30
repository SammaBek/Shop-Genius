import { View } from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import tw from "twrnc";

function CategoryComp({ onCategorySelect }) {
  const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <View>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedLanguage(itemValue);
          onCategorySelect(itemValue);
        }}
        style={tw`text-gray-100 `}
      >
        <Picker.Item color="white" label="Vehicles" value="Vehicles" />
        <Picker.Item color="white" label="Electronics" value="Electronics" />
        <Picker.Item color="white" label="Clothing" value="Clothing" />
        <Picker.Item
          color="white"
          label="Gym-Equipment"
          value="Gym-Equipment"
        />
        <Picker.Item
          color="white"
          label="Home Appliance"
          value="Home Appliance"
        />
      </Picker>
    </View>
  );
}

export default CategoryComp;
