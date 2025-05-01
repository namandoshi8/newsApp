import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { NewsDataType } from "@/types";
import { Colors } from "@/constants/Colors";
import Loading from "./Loading";
import { Link } from "expo-router";

type Props = {
  newsList: Array<NewsDataType>;
};

const NewsList = ({ newsList }: Props) => {
  return (
    <View style={styles.container}>
      {newsList.length == 0 ? (
        <Loading />
      ) : (
        newsList.map((item, index) => (
          <Link href={`/news/${item.article_id}`} asChild key={index}>
            <TouchableOpacity>
              <NewsItem item={item} />
            </TouchableOpacity>
          </Link>
        ))
      )}
    </View>
  );
};

export default NewsList;

export function NewsItem({ item }: { item: NewsDataType }) {
  return (
    <View style={styles.itemContainer}>
      <Image style={styles.itemImg} source={{ uri: item.image_url }} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemCategory}>{item.category}</Text>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <View style={styles.itemSourceInfo}>
          <Image
            source={{ uri: item.source_icon }}
            style={styles.itemSourceIcon}
          />
          <Text style={styles.sourceName}>{item.source_name}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignContent: "center",
    marginBottom: 20,
    flex: 1,
    gap: 10,
  },
  itemImg: {
    width: 90,
    height: 100,
    borderRadius: 20,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
    gap: 10,
    justifyContent: "space-between",
  },
  itemCategory: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.darkGrey,
    textTransform: "capitalize",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.black,
    textTransform: "capitalize",
  },
  itemSourceInfo: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  itemSourceIcon: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  sourceName: {
    fontSize: 10,
    fontWeight: "400",
    color: Colors.darkGrey,
  },
});
