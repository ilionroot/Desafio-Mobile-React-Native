import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { setCustomText, setCustomTextInput } from "react-native-global-props";

const AppStack = createStackNavigator();

// Pages

import Home from "./src/pages/Home";
import Details from "./src/pages/Details";

const AppRoutes = () => {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AppStack.Screen name="Home" component={Home} />
      <AppStack.Screen name="Details" component={Details} />
    </AppStack.Navigator>
  );
};

const App = () => {
  const customTextProps = {
    style: {
      fontFamily: "Poppins-Regular",
    },
  };

  useEffect(() => {
    setCustomText(customTextProps);
    setCustomTextInput(customTextProps);
  }, []);

  return (
    <NavigationContainer>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={"rgba(255,255,255,0.94)"}
      />
      <AppRoutes />
    </NavigationContainer>
  );
};

export default App;
