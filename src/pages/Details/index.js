import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  Animated,
  TouchableOpacity,
  Linking,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";

import Separator from "../../components/Separator";
import Entypo from "react-native-vector-icons/Entypo";

import { useRoute } from "@react-navigation/native";

import api from "../../services/api";
import { styles } from "./styles";

const Details = () => {
  let colors = useRef([
    "rgb(57, 115, 103)",
    "rgb(78, 160, 153)",
    "rgb(99, 204, 202)",
    "rgb(96, 184, 178)",
    "rgb(93, 163, 153)",
    "rgb(80, 148, 147)",
    "rgb(66, 133, 140)",
    "rgb(60, 95, 100)",
    "rgb(57, 76, 80)",
    "rgb(53, 57, 60)",
    "rgb(175,43,165)",
    "rgb(64,23,132)",
    "rgb(32,158,101)",

    "rgb(60, 30, 100)",
    "rgb(57, 46, 80)",
    "rgb(53, 27, 60)",
    "rgb(175,13,165)",
    "rgb(54,3,132)",
    "rgb(32,128,101)",
  ]);
  let [usedColors, setUsedColors] = useState([]);

  const { params } = useRoute();

  const [issues, setIssues] = useState([]);
  const [langs, setLangs] = useState([]);

  const [isIssuesShown, setIsIssuesShown] = useState(true);
  const [animShowIssues] = useState(new Animated.Value(1));

  const navigation = useNavigation();

  const showIssues = () => {
    setIsIssuesShown(!isIssuesShown);
    Animated.timing(animShowIssues, {
      toValue: isIssuesShown ? 0 : 1,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const getData = async () => {
    try {
      const { data: issuesData } = await api.get(
        `${params.issues_url.slice(0, -9)}`,
        {
          baseURL: "",
        }
      );
      const { data: langsData } = await api.get(`${params.languages_url}`, {
        baseURL: "",
      });

      setIssues(issuesData);

      let newLangsData = [];
      let totalAmount = 0;

      for (let _key in langsData) {
        totalAmount += langsData[_key];
      }

      let exists = false;

      for (let key in langsData) {
        let color =
          colors.current[Math.floor(Math.random() * colors.current.length)];
        exists = usedColors.includes(color);

        while (!exists) {
          if (!usedColors.includes(color)) {
            exists = true;
            setUsedColors([...usedColors, color]);
          } else {
            color =
              colors.current[Math.floor(Math.random() * colors.current.length)];
          }
        }

        let amount = Number(
          parseFloat((langsData[key] / totalAmount) * 100).toFixed(2)
        );

        newLangsData.push({
          name: key,
          amount,
          color,
          legendFontColor: color,
          legendFontSize: 12,
          legendFontWeight: "bold",
          legendFontStrokeWidth: 0.1,
          legendFontStroke: "black",
        });
      }
      setLangs(newLangsData);
    } catch (error) {
      // Nao apliquei tratativa de erro

      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          activeOpacity={0.75}
        >
          <Entypo name="back" color="rgba(0,0,0,0.85)" size={24} />
        </TouchableOpacity>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            marginHorizontal: 18,
          }}
          source={{
            uri: params.owner.avatar_url,
          }}
        />
        <Text style={styles.title}>{params.name}</Text>
      </View>
      <Separator marginVertical={16} />
      <Text style={styles.subtitle}>
        <Text style={{ fontFamily: "Poppins-Bold" }}>Descrição: </Text>
        {params.description}
      </Text>
      <Text style={styles.subtitle}>
        <Text style={{ fontFamily: "Poppins-Bold" }}>Owner login: </Text>
        {params.owner.login}
      </Text>
      <Text style={styles.subtitle}>
        <Text style={{ fontFamily: "Poppins-Bold" }}>Avatar URL: </Text>
        {params.owner.avatar_url}
      </Text>
      <Separator marginVertical={16} />
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "flex-start",
          flexDirection: "row",
          paddingHorizontal: 12,
          paddingVertical: 18,
        }}
        activeOpacity={0.75}
        onPress={showIssues}
      >
        <Text style={{ ...styles.title, fontFamily: "Poppins-Bold" }}>
          Issues (pressione)
        </Text>
        <Entypo
          size={24}
          name={isIssuesShown ? "chevron-up" : "chevron-down"}
          color={"rgba(0,0,0,0.75)"}
        />
      </TouchableOpacity>

      <Animated.View
        style={[
          {
            opacity: animShowIssues.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
          isIssuesShown ? undefined : { height: 0 },
          {
            paddingHorizontal: 16,
          },
        ]}
      >
        {issues.length === 0 && (
          <Text
            style={{
              color: "rgba(0,0,0,0.75)",
            }}
          >
            Esse repositório não possui issues.
          </Text>
        )}
        {issues.map((i) => {
          return (
            <TouchableOpacity
              style={{
                marginVertical: 8,
              }}
              activeOpacity={0.5}
              key={i.id}
              onPress={() => {
                Linking.openURL(i.html_url);
              }}
            >
              <Text
                style={{
                  color: "rgba(0,0,0,0.75)",
                }}
              >
                ◉ ({i.number}) {i.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </Animated.View>
      <Separator marginVertical={16} />

      {langs.length > 0 && (
        <View style={{ marginBottom: 32 }}>
          <Text style={{ ...styles.subtitle, fontFamily: "Poppins-Bold" }}>
            Linguagens usadas (%)
          </Text>
          <PieChart
            data={langs}
            width={Dimensions.get("window").width * 0.8}
            height={200}
            chartConfig={{
              color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
              labelColor: "black",
            }}
            accessor={"amount"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            absolute
          />
        </View>
      )}
    </ScrollView>
  );
};

export default Details;
