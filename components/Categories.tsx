import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { Colors } from "@/constants/Colors";
import newsCategoryList from "@/constants/Categories";

type Props = {
  onCategoryChange: (category: string) => void;
};

const Categories = ({ onCategoryChange }: Props) => {
  const scrollRef = useRef<ScrollView>(null);
  const itemRef = useRef<TouchableOpacity[] | null[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  function handleSelectCategor(index: number) {
    const selected = itemRef.current[index];
    setActiveIndex(index);
    selected?.measure((x) => {
      scrollRef.current?.scrollTo({
        x: x - 20,
        y: 0,
        animated: true,
      });
    });
    onCategoryChange(newsCategoryList[index].slug);
  }
  return (
    <View>
      <Text style={styles.title}>Trending Right Now</Text>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.itemWrapper}
      >
        {newsCategoryList.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.item, activeIndex === index && styles.itemActive]}
            ref={(ref) => (itemRef.current[index] = ref)}
            onPress={() => handleSelectCategor(index)}
          >
            <Text
              style={[
                styles.itemText,
                activeIndex === index && styles.itemTextActive,
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "600",
    // marginVertical: 10,
    // paddingHorizontal: 10,
    color: Colors.black,
    marginBottom: 10,
    marginLeft: 20,
  },
  itemWrapper: {
    gap: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    // backgroundColor: Colors.lightGrey,
    borderWidth: 1,
    borderColor: Colors.darkGrey,
  },
  itemText: {
    fontSize: 14,
    // fontWeight: "500",
    color: Colors.darkGrey,
    letterSpacing: 0.5,
  },
  itemActive: {
    backgroundColor: Colors.tint,
    borderColor: Colors.tint,
  },
  itemTextActive: {
    color: Colors.white,
    fontWeight: "600",
  },
});
