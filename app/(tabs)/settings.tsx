import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {};

const Page = (props: Props) => {
  const [enabled, setEnabled] = useState(false);
  const toggleSwitch = () => setEnabled((previousState) => !previousState);
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
        }}
      />
      <View style={styles.container}>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnText}>About</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color={Colors.black}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnText}>Send Feedback</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color={Colors.black}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnText}>Privacy Policies</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color={Colors.black}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnText}>Terms of Use</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color={Colors.black}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn} onPress={toggleSwitch}>
          <Text style={styles.itemBtnText}>Dark Mode</Text>
          <Switch
            trackColor={{ false: Colors.darkGrey, true: Colors.tint }}
            thumbColor={Colors.white}
            ios_backgroundColor={Colors.darkGrey}
            onValueChange={toggleSwitch}
            value={enabled}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemBtn}
          onPress={() => {
            // Handle logout logic here
            console.log("Logout pressed");
            alert("Logout pressed");
          }}
        >
          <Text style={{ ...styles.itemBtnText, color: "red" }}>Logout</Text>
          <MaterialIcons name="logout" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 10,
    borderBottomColor: Colors.background,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  itemBtnText: {
    fontSize: 18,
    fontWeight: "500",
    color: Colors.black,
  },
});
