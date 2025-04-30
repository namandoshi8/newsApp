import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { NewsDataType } from "@/types";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";

type Props = {
  slideItem: NewsDataType;
  index: number;
  scrollX: SharedValue<number>;
};

const { width } = Dimensions.get("screen");

const SliderItem = ({ slideItem, index, scrollX }: Props) => {
  const rnStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.15, 0, width * 0.15],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });
  return (
    <Link href={`/news/${slideItem.article_id}`} asChild>
      <TouchableOpacity>
        <Animated.View style={[styles.itemWrapper, rnStyle]}>
          <Image style={styles.image} source={{ uri: slideItem.image_url }} />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.5)"]}
            style={styles.gradient}
          >
            <View style={styles.sourceInfo}>
              {slideItem.source_icon && (
                <Image
                  source={{ uri: slideItem.source_icon }}
                  style={styles.sourceIcon}
                />
              )}
              <Text style={styles.sourceName}>{slideItem.source_name}</Text>
            </View>

            <Text style={styles.title} numberOfLines={2}>
              {slideItem.title}
            </Text>
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  itemWrapper: {
    position: "relative",
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width - 60,
    height: 180,
    borderRadius: 20,
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 30,
    right: 0,
    bottom: 0,
    width: width - 60,
    height: 180,
    borderRadius: 20,
    padding: 20,
  },
  sourceIcon: {
    width: 25,
    height: 25,
    borderRadius: 20,
  },
  sourceInfo: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    gap: 10,
    top: 85,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sourceName: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
  title: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
    top: 120,
    position: "absolute",
    paddingHorizontal: 20,
  },
});
