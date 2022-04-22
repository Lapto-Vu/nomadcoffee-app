import { gql, useMutation } from "@apollo/client";
import React from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f8fafc;
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
  color: rgb(255, 120, 140);
`;

const HeaderBox = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;

const Header = styled.Text`
  font-family: "Kaushan";
  font-size: 50px;
  color: rgb(55, 65, 81);
  padding: 5px;
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
  email: string;
  username: string;
  name: string;
  password: string;
  passwordAgain: string;
  internal: string;
}

const CREATE_ACCOUNT_MT = gql`
  mutation createAccount(
    $username: String!
    $name: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      username: $username
      password: $password
      name: $name
      email: $email
    ) {
      ok
      error
      type
    }
  }
`;

interface IResultData {
  createAccount: {
    ok: boolean;
    error?: string;
    type: "username" | "email" | "internal";
  };
}

export default function CreateAccount({ navigation }: any) {
  const {
    control,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm<IFormValues>({ mode: "onBlur" });
  const onCompleted = (data: IResultData) => {
    const {
      createAccount: { ok, error, type },
    } = data;
    if (!ok) {
      setError(type, { message: error });
    } else {
      navigation.navigate("userlogin", {
        state: "정상적으로 가입되었습니다. 로그인하세요.",
      });
    }
  };
  const [createAccount] = useMutation(CREATE_ACCOUNT_MT, {
    onCompleted,
  });
  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    const { name, password, username, email } = data;
    createAccount({ variables: { name, password, username, email } });
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container behavior="padding">
        <HeaderBox>
          <Header>SignUp</Header>
        </HeaderBox>
        <ErrorBox>
          <ErrorText>
            {errors?.email?.message ||
              errors?.name?.message ||
              errors?.username?.message ||
              errors?.password?.message ||
              errors?.passwordAgain?.message ||
              errors?.internal?.message}
          </ErrorText>
        </ErrorBox>
        <Controller
          control={control}
          rules={{
            required: "이메일을 형식에 맞춰 작성해 주십시오.",
            pattern: {
              value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
              message: "이메일 형식에 맞춰 작성해 주십시오.",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="이메일"
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
                borderWidth: errors?.email ? 1 : 0,
                borderColor: "pink",
              }}
            />
          )}
          name="email"
        />
        <Controller
          control={control}
          rules={{
            required: "성명을 반드시 작성해야 합니다.",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
              placeholder="성명"
              placeholderTextColor="#c6c6c6"
              style={{
                shadowColor: "#f2f2f2",
                shadowOffset: {
                  width: 10,
                  height: 15,
                },
                shadowOpacity: 0.43,
                shadowRadius: 20,
                elevation: 24,
                borderWidth: errors?.name ? 1 : 0,
                borderColor: "pink",
              }}
            />
          )}
          name="name"
        />
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
              autoCapitalize="none"
              placeholder="아이디"
              placeholderTextColor="#c6c6c6"
              style={{
                shadowColor: "#f2f2f2",
                shadowOffset: {
                  width: 10,
                  height: 15,
                },
                shadowOpacity: 0.43,
                shadowRadius: 20,
                elevation: 24,
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
            required: "비밀번호는 8자 이상, 숫자와 특수문자를 포함해야 합니다.",
            pattern: {
              value:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              message:
                "비밀번호는 8자 이상, 숫자와 특수문자를 포함해야 합니다.",
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
        <Controller
          control={control}
          rules={{
            required: "비밀번호가 같지 않습니다.",
            validate: (value) =>
              value === getValues("password") || "비밀번호가 같지 않습니다.",
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
                borderWidth: errors?.passwordAgain ? 1 : 0,
                borderColor: "pink",
              }}
            />
          )}
          name="passwordAgain"
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
            <Main>회원가입</Main>
          </Button>
        </HeaderBox>
      </Container>
    </TouchableWithoutFeedback>
  );
}
