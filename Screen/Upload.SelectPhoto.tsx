import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components/native";
import {
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

const Container = styled.View`
  flex: 1;
`;

const Top = styled.View`
  flex: 1;
`;

const Bottom = styled.View`
  flex: 1;
`;

const ImageContainer = styled.TouchableOpacity``;
const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 0px;
`;

const HeaderRightText = styled.Text`
  color: #ff5c84;
  font-size: 16px;
  margin-right: 7px;
`;

export default function SelectPhoto({ navigation }: any) {
  const [ok, setOk] = useState(false);
  const [photos, setPhotos] = useState<any>([]);
  const [photoLocal, setPhotoLocal] = useState<any>("");
  const [chosenPhoto, setChosenPhoto] = useState<any>({});

  const getPhotos = async () => {
    const { assets: photos } = await MediaLibrary.getAssetsAsync();
    const assetInfo = await MediaLibrary.getAssetInfoAsync(photos[0].id);
    setPhotoLocal(assetInfo.localUri);
    setPhotos(photos);
    setChosenPhoto(photos[0]);
  };

  const choosePhoto = async (photo: any) => {
    const assetInfo = await MediaLibrary.getAssetInfoAsync(photo.id);
    setPhotoLocal(assetInfo.localUri);
    setChosenPhoto(photo);
  };

  const getPermissions = async () => {
    const { accessPrivileges, canAskAgain } =
      await MediaLibrary.getPermissionsAsync();
    if (accessPrivileges === "none" && canAskAgain) {
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
      if (accessPrivileges !== "none") {
        setOk(true);
        getPhotos();
      }
    } else if (accessPrivileges !== "none") {
      setOk(true);
      getPhotos();
    }
  };

  const HeaderRight = () => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("uploadform", {
          uri: photoLocal,
          system: chosenPhoto.filename,
        })
      }
    >
      <HeaderRightText>선택</HeaderRightText>
    </TouchableOpacity>
  );
  useEffect(() => {
    getPermissions();
  }, []);
  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, [chosenPhoto, photoLocal]);
  const numColumns = 4;
  const { width } = useWindowDimensions();
  const renderItem = ({ item: photo }: any) => {
    return (
      <ImageContainer onPress={() => choosePhoto(photo)}>
        <Image
          source={{ uri: photo.uri }}
          style={{ width: width / numColumns, height: 100 }}
        />
        <IconContainer>
          <Ionicons
            name="checkmark-circle"
            size={18}
            color={photo.uri === chosenPhoto.uri ? "#ff5c84" : "white"}
          />
        </IconContainer>
      </ImageContainer>
    );
  };
  return (
    <Container>
      <StatusBar hidden={false} />
      <Top>
        {chosenPhoto !== "" ? (
          <Image
            source={{ uri: chosenPhoto.uri }}
            style={{ width, height: "100%" }}
          />
        ) : null}
      </Top>
      <Bottom>
        <FlatList
          data={photos}
          numColumns={numColumns}
          keyExtractor={(photo) => photo.id}
          renderItem={renderItem}
        />
      </Bottom>
    </Container>
  );
}
