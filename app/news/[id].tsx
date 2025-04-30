import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { NewsDataType } from "@/types";
import axios from "axios";
import Loading from "@/components/Loading";
import { Colors } from "@/constants/Colors";
import Moment from "moment";
type Props = {};

const NewsDetils = (props: Props) => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getNewsData();
  }, []);

  async function getNewsData() {
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_NEWS_API_KEY}&id=${id}`;
      const response = await axios.get(URL);
      const data = response.data;
      if (data) {
        setNews(data.results);
        // console.log("Data fetched successfully: \n", data.results);
        console.log(id);
        setIsLoading(false);
      } else {
        console.log("No data found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name="heart-outline" size={24} />
            </TouchableOpacity>
          ),
          title: "",
        }}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          style={styles.container}
        >
          <Text style={styles.title}>{news[0].title}</Text>
          <View style={styles.newsInfoWrapper}>
            <Text style={styles.newsInfo}>
              {Moment(news[0].pubDate).format("YYYY MMMM DD, HH:mm a")}
            </Text>
            <Text style={styles.newsInfo}>{news[0].source_name}</Text>
          </View>
          <Image source={{ uri: news[0].image_url }} style={styles.newsImg} />
          <Text style={styles.newsContent}>{news[0]?.description}</Text>
          <Text style={styles.newsContent}>{news[0]?.content}</Text>
          <Text style={styles.newsContent}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore
            iusto iste asperiores maiores at nobis animi laudantium optio
            aliquam voluptatibus magni eum maxime vitae eos velit, culpa nam
            perferendis cum.
          </Text>
        </ScrollView>
      )}
    </>
  );
};

export default NewsDetils;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.black,
    marginVertical: 5,
    letterSpacing: 0.5,
  },
  newsImg: {
    width: "100%",
    height: 250,
    borderRadius: 20,
    marginBottom: 20,
  },
  newsInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  newsInfo: {
    fontSize: 12,
    color: Colors.darkGrey,
  },
  newsContent: {
    fontSize: 14,
    color: Colors.darkGrey,
    lineHeight: 20,
    marginBottom: 20,
    letterSpacing: 0.9,
    textAlign: "justify",
  },
});
