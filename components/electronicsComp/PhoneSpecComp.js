import { Text, View } from "react-native";
import ButtonElectronicComp from "./ButtonElectronicComp";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";

export function PhoneStorage({ phoneStorage, setPhoneStorage }) {
  return (
    <Picker
      onValueChange={(value, itemIndex) => setPhoneStorage(value)}
      selectedValue={phoneStorage}
    >
      <Picker.Item color="white" label="4" value="4" />
      <Picker.Item color="white" label="6" value="6" />
      <Picker.Item color="white" label="8" value="8" />
      <Picker.Item color="white" label="16" value="16" />
      <Picker.Item color="white" label="32" value="32" />
      <Picker.Item color="white" label="64" value="64" />
      <Picker.Item color="white" label="64" value="128" />
      <Picker.Item color="white" label="64" value="256" />
      <Picker.Item color="white" label="512" value="512" />
      <Picker.Item color="white" label="1TB" value="1TB" />
    </Picker>
  );
}

export function PhoneType({ phoneType, setPhoneType }) {
  return (
    <Picker
      onValueChange={(value, itemIndex) => setPhoneType(value)}
      selectedValue={phoneType}
    >
      <Picker.Item color="white" label="Iphone" value="Iphone" />
      <Picker.Item color="white" label="Samsung" value="Samsung" />
      <Picker.Item color="white" label="Huawei" value="Huawei" />
    </Picker>
  );
}
