import { View, Text, Pressable, TextInput, Modal } from "react-native";
import { useState } from "react";
import ButtonElectronicComp from "../components/electronicsComp/ButtonElectronicComp";
import {
  TvBrand,
  TvResolution,
  TvScreenSize,
} from "../components/electronicsComp/TvSpecComp";

function TvSpecPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalName, setModalName] = useState(undefined);
  const [tvBrand, setTvBrand] = useState("TV Brand");
  const [tvResolution, setTvResolution] = useState("TV Resolution");
  const [tvScreenSize, setTvScreenSize] = useState("Screen Size");
  return (
    <View className="gap-y-10">
      <View className="flex-row gap-x-2">
        <Text className="text-xl text-gray-100 w-[40%]">TV Brand:</Text>
        <View className="w-[50%]">
          <ButtonElectronicComp
            setModalName={setModalName}
            spec="tvBrand"
            specValue={tvBrand}
            setModalVisible={setModalVisible}
          />
        </View>
      </View>

      <View className="flex-row gap-x-2">
        <Text className="text-xl text-gray-100 w-[40%]">Screen Size:</Text>
        <View className="w-[50%]">
          <ButtonElectronicComp
            setModalName={setModalName}
            spec="tvScreenSize"
            specValue={tvScreenSize}
            setModalVisible={setModalVisible}
          />
        </View>
      </View>

      <View className="flex-row gap-x-2">
        <Text className="text-xl text-gray-100 w-[40%]">Tv Resolution:</Text>
        <View className="w-[50%]">
          <ButtonElectronicComp
            setModalName={setModalName}
            spec="tvResolution"
            specValue={tvResolution}
            setModalVisible={setModalVisible}
          />
        </View>
      </View>

      <View className="flex-row gap-x-2">
        <Text className="text-xl text-gray-100 w-[40%]">Model:</Text>
        <TextInput className="px-4  text-gray-100 text-xl w-[50%] border border-gray-100 rounded-md py-1" />
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <Pressable
          className="flex-1"
          onPress={() => setModalVisible(false)}
        ></Pressable>
        <View className="absolute bottom-0 w-[100%] bg-slate-400 h-auto">
          {modalName === "tvBrand" && (
            <TvBrand tvBrand={tvBrand} setTvBrand={setTvBrand} />
          )}
          {modalName === "tvScreenSize" && (
            <TvScreenSize
              tvScreenSize={tvScreenSize}
              setTvScreenSize={setTvScreenSize}
            />
          )}
          {modalName === "tvResolution" && (
            <TvResolution
              tvResolution={tvResolution}
              setTvResolution={setTvResolution}
            />
          )}
        </View>
      </Modal>
    </View>
  );
}

export default TvSpecPage;
