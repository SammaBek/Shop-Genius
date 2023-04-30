import { Pressable, Text, TextInput, View } from "react-native";

function ResetPasswordComp() {
  return (
    <View className="w-[80%] mx-auto">
      <View className="w-full mx-auto gap-y-3">
        <View className=" gap-y-2">
          <Text className="text-xl font-bold">Current Password</Text>
          <TextInput
            className="border-2 rounded-lg w-[100%] py-3 text-xl px-3"
            placeholder="Current Password"
          />
        </View>
        <View className=" gap-y-2">
          <Text className="text-xl font-bold">New Password</Text>
          <TextInput
            className="border-2 rounded-lg w-[100%] py-3 text-xl px-3"
            placeholder="New Password"
          />
        </View>
      </View>
      <View className="mt-5">
        <Pressable className="py-2 rounded-lg bg-cyan-900">
          <Text className="text-xl text-center text-gray-100">
            Reset Password
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default ResetPasswordComp;
