import React from "react";
import { View } from "react-native";
import { styles } from "./styles";

const Separator = (props) => {
  return <View style={styles(props).container} />;
};

export default Separator;
