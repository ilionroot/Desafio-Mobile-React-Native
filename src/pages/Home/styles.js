import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },
  title: {
    fontSize: 32,
    fontFamily: "Poppins-Bold",
    color: "rgba(0,0,0,0.85)",
  },
  subtitle: {
    fontSize: 18,
    color: "rgba(0,0,0,0.75)",
  },
  form: {
    flex: 1,
    paddingTop: 48,
    paddingBottom: 48,
  },
  textInput: {
    borderBottomWidth: 1,
    marginVertical: 24,
    padding: 12,
    color: "rgba(0,0,0,0.85)",
  },
  button: {
    backgroundColor: "rgba(212,175,55, 0.75)",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  buttonText: {
    fontSize: 18,
    color: "rgba(255,255,255,0.9)",
  },
  userInfos: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "rgba(212,175,55, 0.5)",
  },
  userName: {
    fontSize: 18,
    alignSelf: "flex-start",
    color: "rgba(0,0,0,0.75)",
    fontFamily: "Poppins-Bold",
  },
  repositories: {
    paddingTop: 24,
    width: "100%",
  },
  userRep: {
    marginVertical: 8,
  },
  userRepText: {
    marginVertical: 4,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "rgba(0,0,0,0.75)",
  },
  userBlock: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",

    marginBottom: 16,
  },
  bio: {
    width: "55%",
  },
  bioText: {
    fontSize: 11,
    color: "rgba(0,0,0,0.85)",
  },
});
