import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  FlatList,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from "react-native";
import { SvgUri } from "react-native-svg";
import styled from "styled-components/native";

const SEARCH_SHOP = gql`
  query searchCoffeeShop($keyword: String) {
    searchCoffeeShop(keyword: $keyword) {
      id
      name
      photos {
        id
        url
      }
      user {
        id
        username
        avatarURL
      }
      createdAt
    }
  }
`;

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f8fafc;
`;

const MessageContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const MessageText = styled.Text`
  font-size: 15px;
  margin-top: 160px;
  font-family: "Notosans";
  color: #374151;
`;

const Input = styled.TextInput<{ width: number }>`
  width: ${(props) => props.width / 1.5}px;
  background-color: white;
  font-family: "Notosans";
  color: #374151;
  height: 50px;
  margin: 10px;
  margin-top: 30px;
  padding-left: 15px;
  border-radius: 15px;
`;

const ImageBox = styled.View``;

interface IFormValues {
  keyword: string;
}

export default function Search({ navigation }: any) {
  const numColumns = 2;
  const { width } = useWindowDimensions();
  const { control, handleSubmit } = useForm<IFormValues>();
  const [startQueryFn, { data }] = useLazyQuery(SEARCH_SHOP);
  const onSubmit: SubmitHandler<IFormValues> = ({ keyword }) => {
    startQueryFn({
      variables: {
        keyword,
      },
    });
  };
  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
  }, []);
  const SearchBox = () => (
    <Controller
      control={control}
      name="keyword"
      render={({ field: { onChange, value } }) => (
        <Input
          width={width}
          placeholder="검색해주세요"
          autoCapitalize="none"
          returnKeyType="search"
          autoCorrect={false}
          value={value}
          onChangeText={onChange}
          onSubmitEditing={handleSubmit(onSubmit)}
          placeholderTextColor="#c6c6c6"
          style={{
            shadowColor: "#e3e3e3",
            shadowOffset: {
              width: 10,
              height: 15,
            },
            shadowOpacity: 0.43,
            shadowRadius: 20,
            elevation: 20,
          }}
        />
      )}
    />
  );
  const renderItem = ({ item }: any) => {
    return (
      <ImageBox
        style={{
          width: width / numColumns - 20,
          borderRadius: 5,
          height: 120,
          shadowColor: "#525252",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.4,
          shadowRadius: 3,
          elevation: 10,
        }}
      >
        <Image
          resizeMode="cover"
          source={{ uri: item.photos[0].url }}
          style={{
            width: width / numColumns - 20,
            borderRadius: 5,
            height: 120,
          }}
        />
      </ImageBox>
    );
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <SvgUri
          width="60%"
          height="100%"
          opacity="0.3"
          style={{
            zIndex: -1,
            position: "absolute",
          }}
          uri={"http://192.168.0.48:4000/static/undraw-House.svg"}
        />
        {data?.searchCoffeeShop !== undefined ? (
          data?.searchCoffeeShop?.length === 0 ? (
            <MessageContainer>
              <MessageText>찾을 수 없습니다</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              style={{
                width: "100%",
                paddingTop: 130,
              }}
              numColumns={numColumns}
              data={data?.searchCoffeeShop}
              keyExtractor={(item) => "" + item.id}
              renderItem={renderItem}
              columnWrapperStyle={{
                justifyContent: "space-between",
                margin: 14,
                marginTop: 0,
              }}
            />
          )
        ) : null}
      </Container>
    </TouchableWithoutFeedback>
  );
}
