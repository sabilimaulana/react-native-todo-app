import React from "react";
import { View } from "react-native";

const Container = ({ children }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {children}
    </View>
  );
};

export default Container;
