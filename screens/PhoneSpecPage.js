import { View, Text, Pressable, TextInput, Modal } from "react-native";
import { useState } from "react";
import ButtonElectronicComp from "../components/electronicsComp/ButtonElectronicComp";
import {
  PhoneStorage,
  PhoneType,
} from "../components/electronicsComp/PhoneSpecComp";

function PhoneSpecPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalName, setModalName] = useState(undefined);
  const [phoneType, setPhonetype] = useState("Phone Type");
  const [phoneStorage, setPhoneStorage] = useState("Phone Storage");
  return (
    <View className="gap-y-10">
      <View className="flex-row gap-x-2">
        <Text className="text-xl text-gray-100 w-[40%]">Phone Type:</Text>
        <View className="w-[50%]">
          <ButtonElectronicComp
            setModalName={setModalName}
            spec="phoneType"
            specValue={phoneType}
            setModalVisible={setModalVisible}
          />
        </View>
      </View>

      <View className="flex-row gap-x-2">
        <Text className="text-xl text-gray-100 w-[40%]">Storage (GB):</Text>
        <View className="w-[50%]">
          <ButtonElectronicComp
            setModalName={setModalName}
            spec="phoneStorage"
            specValue={phoneStorage}
            setModalVisible={setModalVisible}
          />
        </View>
      </View>

      <View className="flex-row gap-x-2">
        <Text className="text-xl text-gray-100 w-[40%]">RAM (GB):</Text>
        <TextInput
          inputMode="numeric"
          className="px-4  text-gray-100 text-xl w-[50%] border border-gray-100 rounded-md py-1"
        />
      </View>
      <View className="flex-row gap-x-2 ">
        <Text className="text-xl text-gray-100 w-[40%]">CAMERA (MP):</Text>
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
          {modalName === "phoneStorage" && (
            <PhoneStorage
              phoneStorage={phoneStorage}
              setPhoneStorage={setPhoneStorage}
            />
          )}
          {modalName === "phoneType" && (
            <PhoneType phoneType={phoneType} setPhoneType={setPhonetype} />
          )}
        </View>
      </Modal>
    </View>
  );
}

export default PhoneSpecPage;
