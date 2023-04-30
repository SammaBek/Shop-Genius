import { Text, View } from "react-native";
import ButtonElectronicComp from "./ButtonElectronicComp";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";

export function LaptopStorage({ laptopStorage, setLaptopStorage }) {
  return (
    <Picker
      onValueChange={(value, itemIndex) => setLaptopStorage(value)}
      selectedValue={laptopStorage}
    >
      <Picker.Item color="white" label="128" value="128" />
      <Picker.Item color="white" label="256" value="256" />
      <Picker.Item color="white" label="512" value="512" />
      <Picker.Item color="white" label="1TB" value="1TB" />
      <Picker.Item color="white" label="2TB" value="2TB" />
    </Picker>
  );
}

export function LaptopBrand({ laptopBrand, setLaptopBrand }) {
  return (
    <Picker
      onValueChange={(value, itemIndex) => setLaptopBrand(value)}
      selectedValue={laptopBrand}
    >
      <Picker.Item color="white" label="Apple" value="Apple" />
      <Picker.Item color="white" label="Dell" value="Dell" />
      <Picker.Item color="white" label="Lenovo" value="Lenovo" />
      <Picker.Item color="white" label="Acer" value="Acer" />
      <Picker.Item color="white" label="Samsung" value="Samsung" />
      <Picker.Item color="white" label="Asus" value="Asus" />
      <Picker.Item
        color="white"
        label="Microsoft Surface"
        value="Microsoft Surface"
      />
    </Picker>
  );
}

export function LaptopScreenSize({ LaptopScreenSize, setLaptopScreenSize }) {
  return (
    <Picker
      onValueChange={(value, itemIndex) => setLaptopScreenSize(value)}
      selectedValue={LaptopScreenSize}
    >
      <Picker.Item color="white" label="14" value="14" />
      <Picker.Item color="white" label="15" value="15" />
      <Picker.Item color="white" label="16" value="16" />
      <Picker.Item color="white" label="17" value="17" />
    </Picker>
  );
}

export function LaptopProcessor({ laptopProcessor, setLaptopProcessor }) {
  return (
    <Picker
      onValueChange={(value, itemIndex) => setLaptopProcessor(value)}
      selectedValue={laptopProcessor}
    >
      <Picker.Item color="white" label="Apple M1" value="Apple M1" />
      <Picker.Item color="white" label="Apple M1-Pro" value="Apple M1-Pro" />
      <Picker.Item color="white" label="Intel-Core-i5" value="Intel-Core-i5" />
      <Picker.Item color="white" label="Intel-Core-i7" value="Intel-Core-i7" />
      <Picker.Item color="white" label="Intel-Core-i9" value="Intel-Core-i9" />
    </Picker>
  );
}
