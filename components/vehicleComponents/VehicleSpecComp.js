import { Picker } from "@react-native-picker/picker";
export function Make({ make, setMake }) {
  return (
    <Picker
      onValueChange={(value, itemIndex) => setMake(value)}
      selectedValue={make}
    >
      <Picker.Item color="white" label="BMW" value="BMW" />
      <Picker.Item color="white" label="Nissan" value="Nissan" />
      <Picker.Item color="white" label="Ferrari" value="Ferrari" />
      <Picker.Item color="white" label="Ford" value="Ford" />
      <Picker.Item color="white" label="Toyota" value="Toyota" />
      <Picker.Item color="white" label="Tesla" value="Tesla" />
    </Picker>
  );
}

export function Fuel({ fuel, setFuel }) {
  return (
    <Picker
      onValueChange={(value, itemIndex) => setFuel(value)}
      selectedValue={fuel}
    >
      <Picker.Item color="white" label="Electric" value="Electric" />
      <Picker.Item color="white" label="Diesel" value="Diesel" />
      <Picker.Item color="white" label="Hybrid" value="Hybrid" />
      <Picker.Item color="white" label="Petrol" value="Petrol" />
    </Picker>
  );
}

export function Transmission({ transmission, setTransmission }) {
  return (
    <Picker
      onValueChange={(value, itemIndex) => setTransmission(value)}
      selectedValue={transmission}
    >
      <Picker.Item color="white" label="Manual" value="Manual" />
      <Picker.Item color="white" label="Automatic" value="Automatic" />
    </Picker>
  );
}
