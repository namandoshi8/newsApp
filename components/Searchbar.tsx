import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type Props = {
  withHorrizontalPadding: boolean;
  setSearchQuery: Function;
};

const Searchbar = ({ withHorrizontalPadding, setSearchQuery }: Props) => {
  return (
    <View
      style={[
        styles.container,
        withHorrizontalPadding && { paddingHorizontal: 20 },
      ]}
    >
      <View style={styles.searchbar}>
        <Ionicons name="search-outline" size={24} color={Colors.black} />
        <TextInput
          placeholder="Search"
          style={styles.searchText}
          placeholderTextColor={Colors.lightGrey}
          autoCapitalize="none"
          onChangeText={(e) => {
            setSearchQuery(e);
          }}
        />
      </View>
    </View>
  );
};

export default Searchbar;

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  searchbar: {
    backgroundColor: "#E4E4e4",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: "row",
    gap: 10,
  },
  searchText: {
    fontSize: 16,
    color: Colors.darkGrey,
    flex: 1,
    fontWeight: "500",
  },
});
