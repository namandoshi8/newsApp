import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import axios from "axios";

import { NewsDataType } from "@/types";
import Header from "@/components/Header";
import Searchbar from "@/components/Searchbar";
import BreakingNews from "@/components/BreakingNews";

type Props = {};

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();
  const [newsData, setNewsData] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getNewsData();
  }, []);

  async function getNewsData() {
    const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_NEWS_API_KEY}&country=in&language=en&image=1&removeduplicate=1&size=5`;
    try {
      const response = await axios.get(URL);
      const data = response.data;
      if (data) {
        setNewsData(data.results);
        console.log("Data fetched successfully: \n", data.results);
        setIsLoading(false);
      } else {
        console.log("No data found");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={[styles.container, { paddingTop: safeTop }]}>
      <Header />
      <Searchbar />
      {isLoading ? (
        <>
          <Text style={{ textAlign: "center", marginTop: 20 }}>Loading...</Text>
          <ActivityIndicator size="large" />
        </>
      ) : (
        <BreakingNews newsList={newsData} />
      )}
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
