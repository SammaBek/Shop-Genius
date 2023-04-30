import { Picker } from "@react-native-picker/picker";
export function TvBrand({ tvBrand, setTvBrand }) {
  return (
    <Picker
      onValueChange={(value, itemIndex) => setTvBrand(value)}
      selectedValue={tvBrand}
    >
      <Picker.Item color="white" label="Sony" value="Sony" />
      <Picker.Item color="white" label="LG" value="LG" />
      <Picker.Item color="white" label="Samsung" value="Samsung" />
      <Picker.Item color="white" label="Hisense" value="Hisense" />
      <Picker.Item color="white" label="Panasonic" value="Panasonic" />
    </Picker>
  );
}

export function TvScreenSize({ tvScreenSize, setTvScreenSize }) {
  return (
    <Picker
      onValueChange={(value, itemIndex) => setTvScreenSize(value)}
      selectedValue={tvScreenSize}
    >
      <Picker.Item color="white" label="32" value="32" />
      <Picker.Item color="white" label="42" value="42" />
      <Picker.Item color="white" label="50" value="50" />
      <Picker.Item color="white" label="55" value="55" />
      <Picker.Item color="white" label="65" value="65" />
      <Picker.Item color="white" label="75" value="75" />
    </Picker>
  );
}

export function TvResolution({ tvResolution, setTvResolution }) {
  return (
    <Picker
      onValueChange={(value, itemIndex) => setTvResolution(value)}
      selectedValue={tvResolution}
    >
      <Picker.Item color="white" label="FHD" value="FHD" />
      <Picker.Item color="white" label="4K" value="4K" />
      <Picker.Item color="white" label="6K" value="6K" />
      <Picker.Item color="white" label="8K" value="8K" />
    </Picker>
  );
}
