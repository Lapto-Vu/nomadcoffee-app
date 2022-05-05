import { Camera } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Alert, Image, StatusBar, TouchableOpacity, Text } from "react-native";
import Slider from "@react-native-community/slider";
import styled from "styled-components/native";
import * as MediaLibrary from "expo-media-library";
import { useIsFocused } from "@react-navigation/core";

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const Actions = styled.View`
  flex: 0.35;
  padding: 0px 50px;
  align-items: center;
  justify-content: space-around;
`;

const ButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  margin-bottom: 15px;
  justify-content: space-between;
  align-items: center;
`;

const TakePhotoBtn = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  background-color: #252525;
  border-color: #bbbbbb;
  border-width: 5px;
  border-radius: 50px;
`;

const SliderContainer = styled.View`
  margin-top: 10px;
`;
const ActionsContainer = styled.View`
  flex-direction: row;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const PhotoActions = styled(Actions)`
  flex-direction: row;
`;

const PhotoAction = styled.TouchableOpacity`
  background-color: #ffffff;
  height: 30%;
  width: 100px;
  padding: 10px 25px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
`;

export default function TakePhoto({ navigation }: any) {
  const camera = useRef<any>();
  const [takenPhoto, setTakenPhoto] = useState("");
  const [cameraReady, setCameraReady] = useState(false);
  const [ok, setOk] = useState(false);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [zoom, setZoom] = useState(0);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const getPermissions = async () => {
    const { granted } = await Camera.requestCameraPermissionsAsync();
    setOk(granted);
  };
  useEffect(() => {
    getPermissions();
  }, []);
  const onCameraSwitch = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };
  const onZoomValueChange = (e: any) => {
    setZoom(e);
  };
  const onFlashChange = () => {
    if (flashMode === Camera.Constants.FlashMode.off) {
      setFlashMode(Camera.Constants.FlashMode.on);
    } else if (flashMode === Camera.Constants.FlashMode.on) {
      setFlashMode(Camera.Constants.FlashMode.auto);
    } else if (flashMode === Camera.Constants.FlashMode.auto) {
      setFlashMode(Camera.Constants.FlashMode.off);
    }
  };
  const goToUpload = async (save: any) => {
    if (save) {
      await MediaLibrary.saveToLibraryAsync(takenPhoto);
    }
    navigation.navigate("uploadform", {
      uri: takenPhoto,
      system: "takenphoto.jpg",
    });
  };
  const onUpload = () => {
    Alert.alert("업로드 하시겠습니까?", "사진 저장 후 업로드 하시겠습니까?", [
      {
        text: "사진 저장 후 업로드 하기",
        onPress: () => goToUpload(true),
      },
      {
        text: "그냥 업로드 하기",
        onPress: () => goToUpload(false),
      },
    ]);
  };
  const onCameraReady = () => setCameraReady(true);
  const takePhoto = async () => {
    if (camera.current && cameraReady) {
      const { uri } = await camera.current.takePictureAsync({
        quality: 1,
        exif: true,
      });
      setTakenPhoto(uri);
    }
  };
  const onDismiss = () => setTakenPhoto("");
  const isFocused = useIsFocused();
  return (
    <Container>
      {isFocused ? <StatusBar hidden={true} /> : null}
      {takenPhoto === "" ? (
        <Camera
          type={cameraType}
          style={{ flex: 1 }}
          zoom={zoom}
          flashMode={flashMode}
          ref={camera}
          onCameraReady={onCameraReady}
        >
          <CloseButton onPress={() => navigation.navigate("tabnav")}>
            <Ionicons name="close" color="black" size={24} />
          </CloseButton>
        </Camera>
      ) : (
        <Image source={{ uri: takenPhoto }} style={{ flex: 1 }} />
      )}
      {takenPhoto === "" ? (
        <Actions>
          <SliderContainer>
            <Slider
              style={{ width: 200, height: 20 }}
              value={zoom}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#050505"
              maximumTrackTintColor="#050505"
              onValueChange={onZoomValueChange}
            />
          </SliderContainer>
          <ButtonsContainer>
            <TakePhotoBtn
              onPress={takePhoto}
              style={{
                shadowColor: "#c6c6c6",
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 0.43,
                shadowRadius: 20,
                elevation: 24,
              }}
            />
            <ActionsContainer>
              <TouchableOpacity
                onPress={onFlashChange}
                style={{ marginRight: 30 }}
              >
                <Ionicons
                  size={30}
                  name={
                    flashMode === Camera.Constants.FlashMode.off
                      ? "flash-off"
                      : flashMode === Camera.Constants.FlashMode.on
                      ? "flash"
                      : flashMode === Camera.Constants.FlashMode.auto
                      ? "eye"
                      : undefined
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={onCameraSwitch}>
                <Ionicons
                  size={30}
                  name={
                    cameraType === Camera.Constants.Type.front
                      ? "camera-reverse"
                      : "camera"
                  }
                />
              </TouchableOpacity>
            </ActionsContainer>
          </ButtonsContainer>
        </Actions>
      ) : (
        <PhotoActions>
          <PhotoAction
            onPress={onDismiss}
            style={{
              shadowColor: "#c6c6c6",
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.43,
              shadowRadius: 20,
              elevation: 24,
            }}
          >
            <Text>취소</Text>
          </PhotoAction>
          <PhotoAction
            onPress={onUpload}
            style={{
              shadowColor: "#c6c6c6",
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.43,
              shadowRadius: 20,
              elevation: 24,
            }}
          >
            <Text style={{ color: "#ff5c84" }}>선택</Text>
          </PhotoAction>
        </PhotoActions>
      )}
    </Container>
  );
}
