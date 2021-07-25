import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";

const Error = ({ getTodos }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>500 || Internal Server Error</Text>
      <TouchableOpacity onPress={getTodos}>
        <Text style={{ padding: 50 }}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Error;
