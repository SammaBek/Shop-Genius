import { Pressable, Text, View, Modal, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Make,
  Fuel,
  Transmission,
} from "../components/vehicleComponents/VehicleSpecComp";
import ButtonVehicleComp from "../components/vehicleComponents/ButtonVehicleComp";
import SliderVehicleComp from "../components/vehicleComponents/SliderVehicleComp";

function VehiclesSpecPage() {
  const [make, setMake] = useState("Set Make");
  const [fuel, setFuel] = useState("Set Fuel");
  const [transmission, setTransmission] = useState("Set Transmission");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalName, setModalName] = useState(undefined);

  return (
    <View className="">
      <Text className="mt-16 text-xl font-bold text-center text-gray-100">
        Vehicles Specificatioin
      </Text>
      <View>
        <View className="flex mt-10 ml-6 ">
          <View className=" gap-y-14">
            <View className="flex-row">
              <Text className="text-xl text-gray-100 w-[40%]">Make:</Text>
              <View className="w-[50%]">
                <ButtonVehicleComp
                  setModalName={setModalName}
                  spec="Make"
                  specValue={make}
                  setModalVisible={setModalVisible}
                />
              </View>
            </View>

            <View className="flex-row ">
              <Text className="text-xl text-gray-100 w-[40%]">Fuel:</Text>
              <View className="w-[50%]">
                <ButtonVehicleComp
                  setModalName={setModalName}
                  spec="Fuel"
                  specValue={fuel}
                  setModalVisible={setModalVisible}
                />
              </View>
            </View>
            <View className="flex-row ">
              <Text className="text-xl text-gray-100 w-[40%]">
                Transmission:
              </Text>
              <View className="w-[50%]">
                <ButtonVehicleComp
                  setModalName={setModalName}
                  spec="Transmission"
                  specValue={transmission}
                  setModalVisible={setModalVisible}
                />
              </View>
            </View>

            <View className="flex-row">
              <Text className="text-xl text-gray-100 w-[40%]">Milage:</Text>

              <View className="w-[50%]">
                <TextInput
                  inputMode="numeric"
                  className="h-10 px-4 py-1 my-auto text-xl text-gray-100 border border-gray-100 rounded-lg"
                />
              </View>
            </View>

            <View className="flex-row">
              <Text className="text-xl text-gray-100 w-[40%]">
                Engine Size:
              </Text>
              <View className="w-[50%] gap-y-12">
                <View>
                  <SliderVehicleComp />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <Modal
        visible={modalVisible && modalName != undefined}
        animationType="slide"
        transparent={true}
      >
        <Pressable
          onPress={() => {
            setModalVisible(false);
            console.log("Cancel");
          }}
          className="flex-1 "
        ></Pressable>
        <View className="absolute bottom-0 w-[100%] bg-slate-400 h-auto">
          {modalName === "Make" && <Make make={make} setMake={setMake} />}
          {modalName === "Fuel" && <Fuel fuel={fuel} setFuel={setFuel} />}
          {modalName === "Transmission" && (
            <Transmission
              transmission={transmission}
              setTransmission={setTransmission}
            />
          )}
        </View>
      </Modal>
    </View>
  );
}

export default VehiclesSpecPage;
