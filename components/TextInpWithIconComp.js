import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function TextInpWithIconComp({
  inputStyle,
  placeholder,
  placeholderColor,
  iconStyle,
  iconColor,
  iconName,
  iconSize,
}) {
  return (
    <View className="mb-4">
      <TextInput
        className={`${inputStyle}`}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
      />
      <View className={`${iconStyle}`}>
        <Ionicons color={iconColor} name={iconName} size={iconSize} />
      </View>
    </View>
  );
}

export default TextInpWithIconComp;
