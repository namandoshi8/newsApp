import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NewsDataType } from "@/types";
import Animated, { SharedValue } from "react-native-reanimated";
import { Colors } from "@/constants/Colors";

type Props = {
  items: NewsDataType[];
  paginationIndex: number;
  scrollX: SharedValue<number>;
};

const Pagination = ({ items, paginationIndex, scrollX }: Props) => {
  return (
    <View style={styles.container}>
      {/* <Text>Pagination</Text> */}
      {items.map((_, index) => {
        const isActive = index === paginationIndex;
        const dotStyle = {
          backgroundColor: isActive ? Colors.tint : "#ccc",
          width: isActive ? 12 : 8,
          height: isActive ? 12 : 8,
        };
        return <Animated.View key={index} style={[styles.dot, dotStyle]} />;
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 8,
    backgroundColor: "#333",
    marginHorizontal: 5,
  },
});
