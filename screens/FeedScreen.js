import React, { useEffect, useState } from "react";
import axios from "axios";
import { Text, StyleSheet, FlatList, Image} from "react-native";

export default function FeedScreen() {
  const [serverImagesUrls, setServerImagesUrls] = useState([]);
  useEffect(() => {
    (async () => {
      const filesUrl = await axios.get(
        "https://wildstagram.nausicaa.wilders.dev/list"
      );
      console.log("filesurls", filesUrl.data);
      setServerImagesUrls(filesUrl.data);
    })();
  }, []);
  return serverImagesUrls.length > 0 ? (
    <FlatList
      data={serverImagesUrls}
      keyExtractor={(serverImageURI) => serverImageURI}
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
