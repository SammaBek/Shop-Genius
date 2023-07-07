import Slider from "@react-native-community/slider";
import { View, Text } from "react-native";
import { useState } from "react";
function SliderVehicleComp(props) {
  return (
    <View className="">
      <Slider
        value={props.engineSize}
        style={{ width: 200, height: 40 }}
        minimumValue={1000}
        maximumValue={3000}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        step={100}
        onValueChange={(val) => props.setEngineSize(val)}
      />
      <Text className="text-center text-gray-100 ">{props.engineSize} cc</Text>
    </View>
  );
}

export default SliderVehicleComp;
