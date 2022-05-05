import { gql, useMutation } from "@apollo/client";
import { ReactNativeFile } from "apollo-upload-client";
import React, { useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";

const Container = styled.KeyboardAvoidingView`
  padding-top: 10px;
  flex: 1;
  background-color: #f8fafc;
`;
const Photo = styled.Image`
  height: 50%;
`;
const BottomWrapper = styled.View`
  width: 100%;
  height: 50%;
  margin-top: 5px;
  align-items: center;
`;

const Section = styled.View`
  justify-content: center;
  margin-top: 10px;
`;

const CaptionBox = styled.View`
  flex-direction: row;
`;

const CaptionText = styled.Text`
  font-family: "Notosans";
  font-size: 12px;
  color: #374151;
  margin-bottom: 5px;
  height: 100%;
  padding-top: 4px;
`;

const TextInput = styled.TextInput`
  background-color: white;
  font-family: "Notosans";
  color: #374151;
  height: 40px;
  width: 280px;
  padding-left: 15px;
  margin-top: 5px;
  border-radius: 15px;
  font-size: 12px;
`;

const HeaderRightText = styled.Text`
  color: #ff5c84;
  font-size: 16px;
  margin-right: 7px;
`;

const ErrorBox = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 5px;
`;

const ErrorText = styled.Text`
  font-family: "Notosans";
  font-size: 12px;
  color: #ff788c;
`;

interface IFormValues {
  name: string;
  categories: string;
  latitude: string;
  longitude: string;
  internal: string;
  photoFiles: string;
}

const CREATE_COFFEESHOP_MT = gql`
  mutation createCoffeeShop(
    $name: String!
    $latitude: String
    $longitude: String
    $photoFiles: [Upload]
    $categories: String
  ) {
    createCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      photoFiles: $photoFiles
      categories: $categories
    ) {
      ok
      error
      type
    }
  }
`;

interface IResultData {
  createCoffeeShop: {
    ok: boolean;
    error?: string;
    type: "internal";
  };
}

export default function UploadForm({ route, navigation }: any) {
  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    const [name, type] = route.params.system.split(".");
    const photoFiles = new ReactNativeFile({
      uri: route.params.uri,
      name: route.params.system,
      type: `image/${type.toLowerCase()}`,
    });
    createCoffeeShop({
      variables: { ...data, photoFiles },
    });
  };
  const onCompleted = async (data: IResultData) => {
    const {
      createCoffeeShop: { ok, error, type },
    } = data;
    if (!ok) {
      setError(type, { message: error });
    } else {
      navigation.navigate("tabnav");
    }
  };

  const [createCoffeeShop, { loading }] = useMutation(CREATE_COFFEESHOP_MT, {
    onCompleted,
  });

  const HeaderRight = () => (
    <TouchableOpacity onPress={handleSubmit(onSubmit)}>
      <HeaderRightText>업로드</HeaderRightText>
    </TouchableOpacity>
  );

  const HeaderLeft = () => (
    <Ionicons name="close" size={24} onPress={() => navigation.goBack()} />
  );

  const HeaderLoading = () => (
    <ActivityIndicator size="small" color="white" style={{ marginRight: 10 }} />
  );
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<IFormValues>({ mode: "onChange" });

  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderLoading : HeaderRight,
      headerLeft: loading ? HeaderLoading : HeaderLeft,
    });
  }, [loading]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container behavior="padding" keyboardVerticalOffset={280}>
        <Photo resizeMode="contain" source={{ uri: route.params.uri }} />
        <BottomWrapper>
          <Section>
            <CaptionBox>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="pencil"
                  style={{
                    marginRight: 10,
                    color: "#374151",
                  }}
                  size={12}
                />
              </View>
              <CaptionText>커피숍의 이름을 알려주세요.</CaptionText>
            </CaptionBox>
            <Controller
              control={control}
              rules={{
                required: "커피숍의 이름을 적어야 합니다.",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="이름"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholderTextColor="#c6c6c6"
                  returnKeyType="done"
                  style={{
                    shadowColor: "#f2f2f2",
                    shadowOffset: {
                      width: 10,
                      height: 15,
                    },
                    shadowOpacity: 0.43,
                    shadowRadius: 20,
                    elevation: 20,
                    borderWidth: errors?.name ? 1 : 0,
                    borderColor: "pink",
                  }}
                />
              )}
              name="name"
            />
          </Section>
          <Section>
            <CaptionBox>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="pricetag"
                  style={{
                    marginRight: 10,
                    color: "#374151",
                  }}
                  size={12}
                />
              </View>
              <CaptionText>카테고리를 정해주세요.</CaptionText>
            </CaptionBox>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="카테고리"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholderTextColor="#c6c6c6"
                  returnKeyType="done"
                  style={{
                    shadowColor: "#f2f2f2",
                    shadowOffset: {
                      width: 10,
                      height: 15,
                    },
                    shadowOpacity: 0.43,
                    shadowRadius: 20,
                    elevation: 20,
                    borderWidth: errors?.categories ? 1 : 0,
                  }}
                />
              )}
              name="categories"
            />
          </Section>
          <Section>
            <CaptionBox>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="location"
                  style={{
                    marginRight: 10,
                    color: "#374151",
                  }}
                  size={12}
                />
              </View>
              <CaptionText>정확한 위치를 알려주세요.</CaptionText>
            </CaptionBox>
            <Controller
              control={control}
              rules={{
                pattern: {
                  value:
                    /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/,
                  message: "정확한 위도를 적어야 합니다.",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="위도"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholderTextColor="#c6c6c6"
                  returnKeyType="done"
                  style={{
                    shadowColor: "#f2f2f2",
                    shadowOffset: {
                      width: 10,
                      height: 15,
                    },
                    shadowOpacity: 0.43,
                    shadowRadius: 20,
                    elevation: 20,
                    borderWidth: errors?.latitude ? 1 : 0,
                  }}
                />
              )}
              name="latitude"
            />
            <Controller
              control={control}
              rules={{
                pattern: {
                  value:
                    /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/,
                  message: "정확한 경도를 적어야 합니다.",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="경도"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholderTextColor="#c6c6c6"
                  returnKeyType="done"
                  style={{
                    shadowColor: "#f2f2f2",
                    shadowOffset: {
                      width: 10,
                      height: 15,
                    },
                    shadowOpacity: 0.43,
                    shadowRadius: 20,
                    elevation: 20,
                    borderWidth: errors?.longitude ? 1 : 0,
                  }}
                />
              )}
              name="longitude"
            />
          </Section>
          <ErrorBox>
            <ErrorText>
              {errors?.name?.message ||
                errors?.latitude?.message ||
                errors.longitude?.message ||
                errors?.internal?.message}
            </ErrorText>
          </ErrorBox>
        </BottomWrapper>
      </Container>
    </TouchableWithoutFeedback>
  );
}
