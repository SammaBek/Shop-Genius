import { View, Text, Pressable, TextInput, Modal } from "react-native";
import { useState } from "react";
import ButtonElectronicComp from "../components/electronicsComp/ButtonElectronicComp";
import {
  LaptopBrand,
  LaptopProcessor,
  LaptopScreenSize,
  LaptopStorage,
} from "../components/electronicsComp/LaptopSpecComp";

function LaptopSpecPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalName, setModalName] = useState(undefined);
  const [laptopBrand, setLaptopBrand] = useState("Laptop Brand");
  const [laptopScreenSize, setLaptopScreenSize] = useState("Screen Size");
  const [laptopProcessor, setLaptopProcessor] = useState("Processor");
  const [laptopStorage, setLaptopStorage] = useState("Laptop");
  return (
    <View className="gap-y-10">
      <View className="flex-row gap-x-2">
        <Text className="text-xl text-gray-100 w-[40%] ">Laptop Brand:</Text>
        <View className="w-[50%]">
          <ButtonElectronicComp
            setModalName={setModalName}
            spec="laptopBrand"
            specValue={laptopBrand}
            setModalVisible={setModalVisible}
          />
        </View>
      </View>

      <View className="flex-row gap-x-2">
        <Text className="text-xl text-gray-100 w-[40%]">Storage (GB):</Text>
        <View className="w-[50%]">
          <ButtonElectronicComp
            setModalName={setModalName}
            spec="laptopStorage"
            specValue={laptopStorage}
            setModalVisible={setModalVisible}
          />
        </View>
      </View>

      <View className="flex-row gap-x-2">
        <Text className="text-xl text-gray-100 w-[40%]">Screen Size:</Text>
        <View className="w-[50%]">
          <ButtonElectronicComp
            setModalName={setModalName}
            spec="laptopScreenSize"
            specValue={laptopScreenSize}
            setModalVisible={setModalVisible}
          />
        </View>
      </View>

      <View className="flex-row gap-x-2">
        <Text className="text-xl text-gray-100 w-[40%]">Laptop Processor:</Text>
        <View className="w-[50%]">
          <ButtonElectronicComp
            setModalName={setModalName}
            spec="laptopProcessor"
            specValue={laptopProcessor}
            setModalVisible={setModalVisible}
          />
        </View>
      </View>

      <View className="flex-row gap-x-2">
        <Text className="text-xl text-gray-100 w-[40%]">Laptop RAM (GB):</Text>
        <TextInput
          inputMode="numeric"
          className="px-4  text-gray-100 text-xl w-[50%] border border-gray-100 rounded-md py-1"
        />
      </View>
      <View className="flex-row gap-x-2">
        <Text className="text-xl text-gray-100 w-[40%]">Laptop Model:</Text>
        <TextInput
          inputMode="numeric"
          className="px-4  text-gray-100 text-xl w-[50%] border border-gray-100 rounded-md py-1"
        />
      </View>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <Pressable
          className="flex-1"
          onPress={() => setModalVisible(false)}
        ></Pressable>
        <View className="absolute bottom-0 w-[100%] bg-slate-400 h-auto">
          {modalName === "laptopStorage" && (
            <LaptopStorage
              laptopStorage={laptopBrand}
              setLaptopStorage={setLaptopStorage}
            />
          )}
          {modalName === "laptopBrand" && (
            <LaptopBrand
              laptopBrand={laptopBrand}
              setLaptopBrand={setLaptopBrand}
            />
          )}
          {modalName === "laptopScreenSize" && (
            <LaptopScreenSize
              laptopScreenSize={laptopScreenSize}
              setLaptopScreenSize={setLaptopScreenSize}
            />
          )}
          {modalName === "laptopProcessor" && (
            <LaptopProcessor
              laptopProcessor={laptopProcessor}
              setLaptopProcessor={setLaptopProcessor}
            />
          )}
        </View>
      </Modal>
    </View>
  );
}

export default LaptopSpecPage;
