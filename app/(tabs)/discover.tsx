import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Searchbar from "@/components/Searchbar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import newsCategoryList from "@/constants/Categories";
import Checkbox from "@/components/Checkbox";
import useNewsCategories from "@/hooks/useNewsCategories";
import CountryList from "@/constants/CountryList";
import useNewsCountry from "@/hooks/useNewsCountry";
import { Link } from "expo-router";

type Props = {};

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();
  const { categories, toggleNewsCategory } = useNewsCategories();
  const { country, toggleNewsCountry } = useNewsCountry();
  const [countries, setCountries] = useState("");
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View style={[styles.container, { paddingTop: safeTop + 20 }]}>
      <Searchbar
        withHorrizontalPadding={false}
        setSearchQuery={setSearchQuery}
      />
      <Text style={styles.title}>Categories</Text>
      <View style={styles.listContainer}>
        {categories.map((category) => (
          <Text key={category.id} style={{ marginBottom: 10 }}>
            {/* {category.title}
             */}
            <Checkbox
              key={category.id}
              label={category.title}
              checked={category.selected}
              onPress={() => {
                toggleNewsCategory(category.id);
                setCategory(category.slug);
              }}
            />
          </Text>
        ))}
      </View>
      <Text style={styles.title}>Country</Text>
      <View style={styles.listContainer}>
        {country.map((country, index) => (
          <Text key={country.code} style={{ marginBottom: 10 }}>
            {/* {category.title}
             */}
            <Checkbox
              key={index}
              label={country.name}
              checked={country.selected}
              onPress={() => {
                toggleNewsCountry(index);
                setCountries(country.code);
              }}
            />
          </Text>
        ))}
      </View>
      <Link
        href={{
          pathname: `/news/Search`,
          params: {
            query: searchQuery,
            category,
            country: countries,
          },
        }}
        asChild
        style={styles.searchBtn}
      >
        <TouchableOpacity style={styles.searchBtn}>
          <Text style={styles.searchBtnText}>Search</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.black,
    marginLeft: 20,
    marginBottom: 10,
  },
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 12,
    marginBottom: 20,
  },
  searchBtn: {
    backgroundColor: Colors.tint,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  searchBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
