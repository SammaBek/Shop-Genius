import Slider from "@react-native-community/slider";
import { View, Text } from "react-native";
import { useState } from "react";
function SliderVehicleComp() {
  const [sliderValue, setSliderValue] = useState(1000);
  return (
    <View className="">
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={1000}
        maximumValue={3000}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        step={100}
        onValueChange={(val) => setSliderValue(val)}
      />
      <Text className="text-center text-gray-100 ">{sliderValue} cc</Text>
    </View>
  );
}

export default SliderVehicleComp;
