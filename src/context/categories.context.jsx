import { createContext, useState, useEffect } from "react";

// import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";
// import SHOP_DATA from "../shop-data.js";

// actual value you want to access
export const CategoriesContext = createContext({
  categoriesMap: {},
});

// provider: the actual functional component
// its return must wrap around any components that need access to the values inside
export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    };

    getCategoriesMap();
  }, []);

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {" "}
      {children}{" "}
    </CategoriesContext.Provider>
  );
};

// one-off effect to push data to firebase DB and add collection and documents
// useEffect(() => {
//   addCollectionAndDocuments('categories', SHOP_DATA);
// }, []);
