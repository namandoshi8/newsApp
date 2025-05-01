import newsCategoryList from "@/constants/Categories";
import { useCallback, useState } from "react";

export default function useNewsCategories() {
  const [categories, setCategories] = useState(newsCategoryList);

  const toggleNewsCategory = useCallback((id: number) => {
    setCategories((prev) => {
      return prev.map((category) => {
        if (category.id === id) {
          return { ...category, selected: !category.selected };
        }
        return category;
      });
    });
  }, []);

  return { categories, toggleNewsCategory };
}
