import { View, Text, Modal, Pressable } from "react-native";
import ButtonElectronicComp from "../components/electronicsComp/ButtonElectronicComp";
import PhoneSpecPage from "./PhoneSpecPage";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import TvSpecPage from "./TvSpecPage";
import LaptopSpecPage from "./LaptopSpecPage";
import {
  PhoneStorage,
  PhoneType,
} from "../components/electronicsComp/PhoneSpecComp";
import { useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function ElectronicsSpecPage(props) {
  const [elecType, setElecType] = useState(
    `${props.prodSpec ? props.prodSpec.ElectronicType : ""}`
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [phoneSpec, setPhoneSpec] = useState();
  const [tvSpec, setTvSpec] = useState();

  useEffect(() => {
    if (phoneSpec && elecType) {
      console.log("Phone Spec Here");
      console.log(phoneSpec);
      props.setProdSpec({
        ...phoneSpec,
        ElectronicType: elecType,
      });
    }
  }, [phoneSpec, elecType]);

  useEffect(() => {
    if (tvSpec && elecType) {
      console.log("Tv Spec Here");
      console.log(tvSpec);
      props.setProdSpec({
        ...tvSpec,
        ElectronicType: elecType,
      });
    }
  }, [tvSpec, elecType]);

  function ElecPicker() {
    return (
      <Picker
        onValueChange={(value, itemIndex) => setElecType(value)}
        selectedValue={elecType}
      >
        <Picker.Item color="white" label="Phone" value="Phone" />
        <Picker.Item color="white" label="TV" value="TV" />
        <Picker.Item color="white" label="Laptop" value="Laptop" />
      </Picker>
    );
  }
  return (
    <KeyboardAwareScrollView>
      <Text className="mt-10 mb-16 text-xl font-bold text-center text-gray-100">
        Electronics Page
      </Text>
      <View className="ml-5 gap-y-10">
        <View className="flex-row gap-x-2">
          <Text className="text-xl text-gray-100 w-[40%]">ElectronicType:</Text>
          <View className="w-[50%]">
            <Pressable
              onPress={() => setModalVisible(true)}
              className="flex-row py-1 border border-gray-100 rounded-md"
            >
              <Text className="mx-auto text-lg text-gray-100">
                {elecType}
                <Ionicons color="white" name="chevron-down-outline" size={21} />
              </Text>
            </Pressable>
          </View>
        </View>
        {elecType === "Phone" && (
          <View>
            <PhoneSpecPage
              phoneSpec={props.prodSpec}
              setPhoneSpec={setPhoneSpec}
            />
          </View>
        )}
        {elecType === "TV" && (
          <View>
            <TvSpecPage tvSpec={props.prodSpec} setTvSpec={setTvSpec} />
          </View>
        )}
        {elecType === "Laptop" && (
          <View>
            <LaptopSpecPage />
          </View>
        )}
      </View>
      <Modal animationType="slide" visible={modalVisible} transparent={true}>
        <Pressable
          onPress={() => setModalVisible(false)}
          className="flex-1"
        ></Pressable>
        <View className=" absolute bottom-0 w-[100%] bg-slate-400 h-auto">
          <ElecPicker />
        </View>
      </Modal>
    </KeyboardAwareScrollView>
  );
}

export default ElectronicsSpecPage;
