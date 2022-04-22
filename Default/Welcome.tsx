import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f8fafc;
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

const Button = styled.View`
  height: 70px;
  width: 280px;
  margin-top: 60px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

const LowBox = styled.View`
  margin-top: 30px;
  margin-bottom: 60px;
`;

export default function Welcome({ navigation }: any) {
  return (
    <Container>
      <Header>Coffegram</Header>
      <TouchableOpacity onPress={() => navigation.navigate("createaccount")}>
        <Button
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
          <Main>새 계정 만들기</Main>
        </Button>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("userlogin")}>
        <LowBox>
          <Main>로그인</Main>
        </LowBox>
      </TouchableOpacity>
    </Container>
  );
}
