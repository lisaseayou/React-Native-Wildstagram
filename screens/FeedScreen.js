import React, { useEffect, useState } from "react";
import axios from "axios";
import { Text, StyleSheet, FlatList, Image} from "react-native";

export default function FeedScreen() {
  const [serverImagesUrls, setServerImagesUrls] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

 const fetchData = () => {
    (async () => {
        const filesUrl = await axios.get(
          "https://wildstagram.nausicaa.wilders.dev/list"
        );
        console.log("filesurls", filesUrl.data);
        setServerImagesUrls(filesUrl.data);
      })();
 }
  useEffect(() => {
   fetchData();
  }, []);

  const onRefresh = () => {
    setIsFetching(true);
    fetchData(); 
    setTimeout(() => { setIsFetching(false), 2000})

    console.log("refreshed");
  };
  return serverImagesUrls.length > 0 ? (
    <FlatList
      data={serverImagesUrls}
      keyExtractor={(serverImageURI) => serverImageURI}
      onRefresh={onRefresh}
      refreshing={isFetching}
      renderItem={(itemData) => {
        console.log("item", itemData);
        return (
          <>
            <Image
              style={styles.image}
              source={{
                uri:
                  "https://wildstagram.nausicaa.wilders.dev/files/" +
                  itemData.item,
              }}
            />
          </>
        );
      }}
    />
  ) : null;
}

const styles = StyleSheet.create({
  image: {
      //resizeMode: "cover",
      height: 500,
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
  },
});
