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

export function PhoneType({ phoneBrand, setPhoneBrand }) {
  return (
    <Picker
      onValueChange={(value, itemIndex) => setPhoneBrand(value)}
      selectedValue={phoneBrand}
    >
      <Picker.Item color="white" label="Iphone" value="Iphone" />
      <Picker.Item color="white" label="Samsung" value="Samsung" />
      <Picker.Item color="white" label="Huawei" value="Huawei" />
    </Picker>
  );
}

export function PhoneModel({ phoneBrand, phoneModel, setPhoneModel }) {
  if (phoneBrand === "Iphone") {
    return (
      <Picker
        onValueChange={(value, itemIndex) => setPhoneModel(value)}
        selectedValue={phoneModel}
      >
        <Picker.Item color="white" label="Iphone-13" value="Iphone-13" />
        <Picker.Item color="white" label="Iphone-12" value="Iphone-12" />
        <Picker.Item color="white" label="Iphone-11" value="Iphone-11" />
        <Picker.Item color="white" label="Iphone-X" value="Iphone-X" />
        <Picker.Item color="white" label="Iphone-8" value="Iphone-8" />
      </Picker>
    );
  } else if (phoneBrand === "Huawei") {
    return (
      <Picker
        onValueChange={(value, itemIndex) => setPhoneModel(value)}
        selectedValue={phoneModel}
      >
        <Picker.Item color="white" label="Huawei-p50" value="Huawei-p50" />
        <Picker.Item
          color="white"
          label="Huawei-Mate40"
          value="Huawei-Mate40"
        />
        <Picker.Item
          color="white"
          label="Huawei-NovaY60"
          value="Huawei-NovaY60"
        />
      </Picker>
    );
  } else {
    return (
      <Picker
        onValueChange={(value, itemIndex) => setPhoneModel(value)}
        selectedValue={phoneModel}
      >
        <Picker.Item color="white" label="Samsung-S22" value="Samsung-S22" />
        <Picker.Item color="white" label="Samsung-S20" value="Samsung-S20" />
        <Picker.Item color="white" label="Samsung-A20" value="Samsung-A20" />
        <Picker.Item
          color="white"
          label="Galaxy-Note20"
          value="Galaxy-Note20"
        />
        <Picker.Item
          color="white"
          label="Galaxy-Tab-S7"
          value="Galaxy-Tab-S7"
        />
      </Picker>
    );
  }
}
