import { StyleSheet } from "react-native";

export const styles = (props) =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: 1,
      backgroundColor: "rgba(0,0,0,0.25)",
      marginVertical: props.marginVertical ? props.marginVertical : 8,
    },
  });
