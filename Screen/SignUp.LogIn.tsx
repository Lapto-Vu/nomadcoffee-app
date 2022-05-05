import { useForm, Controller, SubmitHandler } from "react-hook-form";
import styled from "styled-components/native";
import { gql, useMutation } from "@apollo/client";
import { setLogInTokenAndVar } from "../apollo";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f8fafc;
  padding-bottom: 40px;
`;

const ErrorBox = styled.View`
  height: 20px;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
`;

const ErrorText = styled.Text`
  font-family: "Notosans";
  font-size: 12px;
  color: #ff788c;
`;

const HeaderBox = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Header = styled.Text`
  font-family: "Kaushan";
  font-size: 50px;
  color: rgb(55, 65, 81);
`;

const Main = styled.Text`
  font-family: "Notosans";
  font-size: 15px;
  color: rgb(55, 65, 81);
`;

const TextInput = styled.TextInput`
  background-color: white;
  font-family: "Notosans";
  color: #374151;
  height: 50px;
  width: 280px;
  margin: 8px;
  padding-left: 15px;
  border-radius: 15px;
`;

const Button = styled.TouchableOpacity`
  height: 70px;
  width: 280px;
  margin-top: 30px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

interface IFormValues {
  username: string;
  password: string;
  internal: string;
}

const LOGIN_MT = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      error
      token
      type
    }
  }
`;

interface IResultData {
  login: {
    ok: boolean;
    error?: string;
    token?: string;
    type: "username" | "password" | "internal";
  };
}

export default function UserLogIn({ route, navigation }: any) {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IFormValues>({ mode: "onChange" });
  const onCompleted = async (data: IResultData) => {
    const {
      login: { ok, error, token, type },
    } = data;

    if (!ok) {
      setError(type, { message: error });
    }
    if (token) {
      setLogInTokenAndVar(token);
      navigation.goBack();
      navigation.navigate("profile");
    }
  };
  const [login] = useMutation(LOGIN_MT, { onCompleted });
  const onSubmit: SubmitHandler<IFormValues> = (data) =>
    login({
      variables: { ...data },
    });
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container behavior="padding">
        <ErrorBox
          style={{
            marginBottom: 20,
          }}
        >
          <ErrorText
            style={{
              color: "#4e914e",
            }}
          >
            {route?.params?.message}
          </ErrorText>
        </ErrorBox>
        <HeaderBox>
          <Header>Login</Header>
        </HeaderBox>
        <ErrorBox>
          <ErrorText>
            {errors?.username?.message ||
              errors?.password?.message ||
              errors?.internal?.message}
          </ErrorText>
        </ErrorBox>
        <Controller
          control={control}
          rules={{
            required: "아이디는 적어도 3자 이상이어야 합니다.",
            minLength: {
              value: 3,
              message: "아이디는 적어도 3자 이상이어야 합니다.",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="아이디"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#c6c6c6"
              style={{
                shadowColor: "#f2f2f2",
                shadowOffset: {
                  width: 10,
                  height: 15,
                },
                shadowOpacity: 0.43,
                shadowRadius: 20,
                elevation: 20,
                borderWidth: errors?.username ? 1 : 0,
                borderColor: "pink",
              }}
            />
          )}
          name="username"
        />
        <Controller
          control={control}
          rules={{
            required: "비밀번호는 적어도 8자 이상이어야 합니다.",
            minLength: {
              value: 8,
              message: "비밀번호는 적어도 8자 이상이어야 합니다.",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="비밀번호"
              placeholderTextColor="#c6c6c6"
              secureTextEntry={true}
              style={{
                shadowColor: "#f2f2f2",
                shadowOffset: {
                  width: 10,
                  height: 15,
                },
                shadowOpacity: 0.43,
                shadowRadius: 20,
                elevation: 24,
                borderWidth: errors?.password ? 1 : 0,
                borderColor: "pink",
              }}
            />
          )}
          name="password"
        />
        <HeaderBox>
          <Button
            onPress={handleSubmit(onSubmit)}
            style={{
              shadowColor: "#c6c6c6",
              shadowOffset: {
                width: 10,
                height: 15,
              },
              shadowOpacity: 0.43,
              shadowRadius: 20,
              elevation: 24,
            }}
          >
            <Main>로그인</Main>
          </Button>
        </HeaderBox>
      </Container>
    </TouchableWithoutFeedback>
  );
}
