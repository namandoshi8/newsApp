import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router, Stack, useLocalSearchParams } from "expo-router";
import { NewsDataType } from "@/types";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Loading from "@/components/Loading";
import { NewsItem } from "@/components/NewsList";

type Props = {};

const Search = (props: Props) => {
  const { query, category, country } = useLocalSearchParams<{
    query: string;
    category: string;
    country: string;
  }>();

  const [news, setNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { top: safeTop } = useSafeAreaInsets();

  useEffect(() => {
    getNews();
  }, [query, category, country]);
  async function getNews() {
    try {
      let categoryString = "";
      let countryString = "";
      let queryString = "";
      if (category) {
        categoryString = `&category=${category}`;
      }
      if (country) {
        countryString = `&country=${country}`;
      }
      if (query) {
        queryString = `&q=${query}`;
      }
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_NEWS_API_KEY}&language=en&image=1&removeduplicate=1&size=10${categoryString}${countryString}${queryString}`;
      console.log("URL: ", URL);
      const response = await axios.get(URL);
      const data = response.data;
      if (data) {
        setNews(data.results);
        // console.log("Data fetched successfully: \n", data.results);
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
          title: "Search",
        }}
      />
      <View style={styles.container}>
        {isLoading ? (
          <>
            {/* <Text>Loading...</Text> */}
            <Loading />
          </>
        ) : (
          <>
            <FlatList
              data={news}
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

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
  },
});
