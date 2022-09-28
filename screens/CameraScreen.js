import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from '@expo/vector-icons'; 


export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const cameraRef = useRef(null);

  //requestCameraPermissionsAsync est une méthode du module Camera permettant à ton application d'obtenir et vérifier l'accès à la caméra de ton téléphone.
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  return (
    <>
      <Camera style={styles.camera} ref={cameraRef} type={type}>
        <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
        <AntDesign name="retweet" size={24} color="black" />
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
        </View>
      </Camera>
      <Button
        title="Take a Picture"
        onPress={async () => {
          const pictureMetadata = await cameraRef.current.takePictureAsync();
          console.log("pictureMetadata", pictureMetadata);
          console.log(
            await ImageManipulator.manipulateAsync(pictureMetadata.uri, [
              { resize: { width: 800 } },
            ])
          );
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  button: {
    backgroundColor: 'white',
    padding: 10, 
    //flex: 1,
    alignItems: 'center',
    width: 150,
    borderRadius: 5,
    marginTop: 5,
  }, 
  container: {
     alignItems: 'center',
  }, 
  text : {
    color: 'black'
  }
});
