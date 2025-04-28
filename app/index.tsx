import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import Animated, { FadeInRight, FadeInUp } from "react-native-reanimated";

const Page = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require("@/assets/images/getting-started.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <View style={styles.wrapper}>
          <Animated.Text
            style={styles.title}
            entering={FadeInRight.delay(300).duration(500)}
          >
            Stay Updated!
          </Animated.Text>
          <Animated.Text
            style={styles.description}
            entering={FadeInUp.delay(600).duration(500)}
          >
            Get the latest news and personalised updated directly to your feed!
          </Animated.Text>
          <Animated.View entering={FadeInUp.delay(900).duration(500)}>
            <TouchableOpacity
              onPress={() => router.replace("/(tabs)")}
              style={styles.btn}
            >
              <Text style={styles.btnText}>Go to Home Screen</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  wrapper: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 50,
    gap: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  title: {
    color: Colors.white,
    fontSize: 30,
    fontWeight: "600",
    letterSpacing: 1.5,
    lineHeight: 40,
    textAlign: "center",
  },
  description: {
    color: Colors.white,
    fontSize: 16,
    // fontWeight: "500",
    letterSpacing: 1.2,
    lineHeight: 30,
    textAlign: "center",
  },
  btn: {
    backgroundColor: Colors.tint,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
