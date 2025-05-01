import CountryList from "@/constants/CountryList";
import { useCallback, useState } from "react";

export default function useNewsCountry() {
  const [country, setCountry] = useState(CountryList);

  const toggleNewsCountry = useCallback((id: number) => {
    setCountry((prev) => {
      return prev.map((item, index) => {
        if (index === id) {
          return { ...item, selected: !item.selected };
        }
        return item;
      });
    });
  }, []);

  return { country, toggleNewsCountry };
}
