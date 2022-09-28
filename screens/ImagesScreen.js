import * as FileSystem from "expo-file-system";
import React, { useEffect, useState } from "react";
import { StyleSheet, Image, FlatList, Button, Alert } from "react-native";
import singleFileUploader from "single-file-uploader";
import Constants from "expo-constants";
import { deleteAsync } from "expo-file-system";

export default function ImagesScreen() {
  const [imagesURI, setImagesURI] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = () => {
    (async () => {
        const images = await FileSystem.readDirectoryAsync(
          FileSystem.cacheDirectory + "ImageManipulator"
        );
        setImagesURI(images);
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

  const createAlert = () =>
    Alert.alert(" Uploaded ", "You have uploaded your pic!", [
      { text: "Good", onPress: () => console.log("Good pressed") },
    ]);

  return imagesURI.length > 0 ? (
    <FlatList
      data={imagesURI}
      keyExtractor={(imageURI) => imageURI}
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
                  FileSystem.cacheDirectory +
                  "ImageManipulator/" +
                  itemData.item,
              }}
            />
            <Button
              title="UPLOAD"
              onPress={async () => {
                try {
                  await singleFileUploader({
                    distantUrl:
                      "https://wildstagram.nausicaa.wilders.dev/upload",
                    expectedStatusCode: 201,
                    filename: itemData.item,
                    filetype: "image/jpeg",
                    formDataName: "fileData",
                    localUri:
                      FileSystem.cacheDirectory +
                      "ImageManipulator/" +
                      itemData.item,
                    token: Constants.manifest.extra.token,
                  });
                  createAlert();
                } catch (err) {
                  alert("Error");
                }
              }}
            />
            <Button
              title="DELETE"
              onPress={async () => {
                try {
                  await deleteAsync(imageURI);
                  alert("Deleted");
                } catch (err) {
                  alert("Error");
                }
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
