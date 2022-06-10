import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Separator from "../../components/Separator";
import Entypo from "react-native-vector-icons/Entypo";

import { styles } from "./styles";
import api from "../../services/api";

const Home = () => {
  const [onFocus, setOnFocus] = useState(false);
  const [userText, setUserText] = useState("");
  const [isRepsShown, setIsRepsShown] = useState(true);
  const [animShowReps] = useState(new Animated.Value(1));

  const navigation = useNavigation();

  // User infos
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);

  const search = async () => {
    const { data: userData } = await api.get(`/users/${userText}`);
    const { data: reposData } = await api.get(`/users/${userText}/repos`);
    setUser(userData);
    setRepos(reposData);
  };

  const showReps = () => {
    setIsRepsShown(!isRepsShown);
    Animated.timing(animShowReps, {
      toValue: isRepsShown ? 0 : 1,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Desafio Mobile React Native</Text>
      <Text style={styles.subtitle}>By: Igor Augusto</Text>

      <View style={styles.form}>
        <Text style={{ ...styles.subtitle, fontFamily: "Poppins-Bold" }}>
          GitHub API
        </Text>
        <Separator marginVertical={16} />
        <TextInput
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
          onChangeText={(_t) => setUserText(_t)}
          value={userText}
          style={{
            ...styles.textInput,
            borderBottomColor: onFocus
              ? "rgba(212,175,55, 0.75)"
              : "rgba(0,0,0,0.25)",
          }}
          allowFontScaling={false}
          placeholder="Digite um usuário do GitHub"
          placeholderTextColor={"rgba(0,0,0,0.25)"}
        />
        <TouchableOpacity
          onPress={search}
          activeOpacity={0.75}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Pesquisar</Text>
        </TouchableOpacity>
        {user.name && (
          <>
            <Separator marginVertical={32} />
            <View style={styles.userInfos}>
              <View style={styles.userBlock}>
                <Image
                  style={styles.userImage}
                  source={{
                    uri: user.avatar_url,
                  }}
                />
                <View style={styles.bio}>
                  <Text style={styles.bioText}>{user.bio}</Text>
                </View>
              </View>
              <Text style={styles.userName}>Usuário: {user.name}</Text>
              <View style={styles.repositories}>
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "flex-start",
                    flexDirection: "row",
                    marginBottom: 8,
                  }}
                  activeOpacity={0.75}
                  onPress={showReps}
                >
                  <Text
                    style={{
                      ...styles.subtitle,
                      fontSize: 20,
                      marginRight: 16,
                    }}
                  >
                    Repositórios (pressione)
                  </Text>
                  <Entypo
                    size={24}
                    name={isRepsShown ? "chevron-up" : "chevron-down"}
                    color={"rgba(0,0,0,0.75)"}
                  />
                </TouchableOpacity>
                <Animated.View
                  style={[
                    {
                      opacity: animShowReps.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                      }),
                    },
                    isRepsShown ? undefined : { height: 0 },
                  ]}
                >
                  {repos.map((rep) => {
                    return (
                      <TouchableOpacity
                        style={styles.userRep}
                        activeOpacity={0.5}
                        key={rep.id}
                        onPress={() => {
                          navigation.navigate("Details", rep);
                        }}
                      >
                        <Text style={styles.userRepText}>◉ {rep.name}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </Animated.View>
              </View>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default Home;
