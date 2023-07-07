import { Pressable, Text, View, Modal, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Make,
  Fuel,
  Transmission,
} from "../components/vehicleComponents/VehicleSpecComp";
import ButtonVehicleComp from "../components/vehicleComponents/ButtonVehicleComp";
import SliderVehicleComp from "../components/vehicleComponents/SliderVehicleComp";

function VehiclesSpecPage(props) {
  const [engineSize, setEngineSize] = useState(
    `${props.prodSpec ? props.prodSpec.engineSize : 1000}`
  );
  const [make, setMake] = useState(
    `${props.prodSpec ? props.prodSpec.make : ""}`
  );
  const [milage, setMilage] = useState(
    `${props.prodSpec ? props.prodSpec.milage : 0}`
  );
  const [fuel, setFuel] = useState(
    `${props.prodSpec ? props.prodSpec.fuel : ""}`
  );
  const [transmission, setTransmission] = useState(
    `${props.prodSpec ? props.prodSpec.transmission : ""}`
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [modalName, setModalName] = useState(undefined);

  useEffect(() => {
    if (milage || make || fuel || transmission || engineSize) {
      props.setProdSpec({
        milage,
        make,
        fuel,
        transmission,
        engineSize,
      });
    }
  }, [milage, make, fuel, transmission, engineSize]);

  function milageHandler(inp) {
    setMilage(inp);
    console.log(inp);
  }

  return (
    <KeyboardAwareScrollView className="">
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
                  value={milage}
                  onChangeText={milageHandler}
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
                  <SliderVehicleComp
                    engineSize={engineSize}
                    setEngineSize={setEngineSize}
                  />
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
    </KeyboardAwareScrollView>
  );
}

export default VehiclesSpecPage;
