import { View, Text, Pressable, TextInput, Modal } from "react-native";
import { useState, useEffect } from "react";
import ButtonElectronicComp from "../components/electronicsComp/ButtonElectronicComp";
import {
  PhoneStorage,
  PhoneType,
  PhoneModel,
} from "../components/electronicsComp/PhoneSpecComp";

function PhoneSpecPage(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalName, setModalName] = useState(undefined);
  const [phoneModel, setPhoneModel] = useState(
    `${
      props.phoneSpec && props.phoneSpec.phoneModel
        ? props.phoneSpec.phoneModel
        : ""
    }`
  );
  const [phoneBrand, setPhoneBrand] = useState(
    `${
      props.phoneSpec && props.phoneSpec.phoneBrand
        ? props.phoneSpec.phoneBrand
        : ""
    }`
  );
  const [phoneStorage, setPhoneStorage] = useState(
    `${
      props.phoneSpec && props.phoneSpec.PhoneStorage
        ? props.phoneSpec.phoneStorage
        : ""
    }`
  );

  const [ramCam, setRamCam] = useState({
    phoneCamera: `${
      props.phoneSpec && props.phoneSpec.phoneCamera
        ? props.phoneSpec.phoneCamera
        : ""
    }`,
    phoneRam: `${
      props.phoneSpec && props.phoneSpec.phoneRam
        ? props.phoneSpec.phoneRam
        : ""
    }`,
  });

  function inputHandler(identifier, value) {
    setRamCam((prevValue) => {
      return {
        ...prevValue,
        [identifier]: value,
      };
    });
  }

  useEffect(() => {
    if (ramCam.phoneCamera || ramCam.phoneRam || phoneStorage || phoneBrand) {
      props.setPhoneSpec({
        phoneStorage,
        phoneBrand,
        phoneCamera: ramCam.phoneCamera,
        phoneRam: ramCam.phoneRam,
        phoneModel,
      });
    }
  }, [ramCam, phoneStorage, phoneBrand]);

  return (
    <View className="gap-y-10">
      <View className="flex-row gap-x-2">
        <Text className="text-xl text-gray-100 w-[40%]">Phone Brand:</Text>
        <View className="w-[50%]">
          <ButtonElectronicComp
            setModalName={setModalName}
            spec="phoneBrand"
            specValue={phoneBrand}
            setModalVisible={setModalVisible}
          />
        </View>
      </View>
      {phoneBrand && (
        <View className="flex-row gap-x-2">
          <Text className="text-xl text-gray-100 w-[40%]">Phone Model:</Text>
          <View className="w-[50%]">
            <ButtonElectronicComp
              setModalName={setModalName}
              spec="phoneModel"
              specValue={phoneModel}
              setModalVisible={setModalVisible}
            />
          </View>
        </View>
      )}

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
          onChangeText={inputHandler.bind(this, "phoneRam")}
          value={ramCam.phoneRam}
          className="px-4  text-gray-100 text-center text-xl w-[50%] border border-gray-100 rounded-md py-1"
        />
      </View>
      <View className="flex-row gap-x-2 ">
        <Text className="text-xl text-gray-100 w-[40%]">CAMERA (MP):</Text>
        <TextInput
          inputMode="numeric"
          onChangeText={inputHandler.bind(this, "phoneCamera")}
          value={ramCam.phoneCamera}
          className="px-4 text-center  text-gray-100 text-xl w-[50%] border border-gray-100 rounded-md py-1"
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
          {modalName === "phoneBrand" && (
            <PhoneType phoneType={phoneBrand} setPhoneBrand={setPhoneBrand} />
          )}
          {modalName === "phoneModel" && (
            <PhoneModel
              phoneBrand={phoneBrand}
              phoneModel={phoneModel}
              setPhoneModel={setPhoneModel}
            />
          )}
        </View>
      </Modal>
    </View>
  );
}

export default PhoneSpecPage;
