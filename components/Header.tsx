import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type Props = {};

const Header = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/lego/1.jpg" }}
          style={styles.image}
        />
        <View style={{ gap: 3 }}>
          <Text style={styles.welcomeText}>Welcome!</Text>
          <Text style={styles.userName}>@johndoe</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => {}} />

      <Ionicons name="notifications-outline" size={32} color={Colors.black} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  welcomeText: {
    fontSize: 14,
    color: Colors.darkGrey,
  },
  userName: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.black,
  },
});
