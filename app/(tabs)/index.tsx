import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import axios from "axios";

import { NewsDataType } from "@/types";
import Header from "@/components/Header";
import Searchbar from "@/components/Searchbar";
import BreakingNews from "@/components/BreakingNews";
import Categories from "@/components/Categories";
import NewsList from "@/components/NewsList";
import Loading from "@/components/Loading";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

type Props = {};

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();
  const [newsData, setNewsData] = useState<NewsDataType[]>([]);
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getNewsData();
    getNews();
  }, []);

  async function getNewsData() {
    const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_NEWS_API_KEY}&language=en&image=1&removeduplicate=1&size=5`;
    try {
      const response = await axios.get(URL);
      const data = response.data;
      if (data) {
        setNewsData(data.results);
        // console.log("Data fetched successfully: \n", data.results);
        setIsLoading(false);
      } else {
        console.log("No data found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getNews(category: string = "") {
    try {
      let categoryString = "";
      if (category.length !== 0) {
        categoryString = `&category=${category}`;
      }
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_NEWS_API_KEY}&language=en&image=1&removeduplicate=1&size=10${categoryString}`;
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

  function onCatChange(category: string) {
    console.log(category);
    setNews([]);
    getNews(category);
    // setIsLoading(true);
  }
  return (
    <ScrollView style={[styles.container, { paddingTop: safeTop }]}>
      <Header />
      <Searchbar />
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <BreakingNews newsList={newsData} />
      )}

      <Categories onCategoryChange={onCatChange} />
      <NewsList newsList={news} />
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
