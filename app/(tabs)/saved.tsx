import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Link, Stack } from "expo-router";
import Loading from "@/components/Loading";
import { NewsItem } from "@/components/NewsList";
import { useIsFocused } from "@react-navigation/native";

type Props = {};

const Page = (props: Props) => {
  const [bookmarkNews, setBookmarkNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchBookmark();
  }, [isFocused]);

  async function fetchBookmark() {
    await AsyncStorage.getItem("bookmark").then(async (token) => {
      const res = JSON.parse(token);
      setIsLoading(true);
      if (res) {
        console.log("Bookmark data: ", res);
        let query_string = res.join(",");
        console.log("Query string: ", query_string);

        const response = await axios.get(
          `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_NEWS_API_KEY}&id=${query_string}`
        );
        const data = response.data;
        if (data) {
          setBookmarkNews(data.results);
          // console.log("Data fetched successfully: \n", data.results);
          setIsLoading(false);
        } else {
          console.log("No data found");
          setBookmarkNews([]);
          setIsLoading(false);
        }
      }
    });
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Saved NEWS",
        }}
      />
      <View style={styles.container}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <FlatList
              data={bookmarkNews}
              keyExtractor={(_, index) => `list_item${index}`}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <Link
                    href={`/news/${item.article_id}`}
                    asChild
                    key={item.article_id}
                  >
                    <TouchableOpacity>
                      <NewsItem item={item} />
                    </TouchableOpacity>
                  </Link>
                );
              }}
            />
          </>
        )}
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
});
