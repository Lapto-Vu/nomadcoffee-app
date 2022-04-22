import styled from "styled-components/native";
import { LogUserOut } from "../apollo";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
  background-color: #f8fafc;
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

const Main = styled.Text`
  font-family: "Notosans";
  font-size: 15px;
  color: rgb(55, 65, 81);
`;

const Section = styled.View`
  height: 300px;
  width: 280px;
  justify-content: center;
  padding: 20px;
`;
const Box = styled.View`
  height: 100px;
  width: 280px;
  justify-content: center;
`;
const Header = styled.Text`
  font-family: "Notosans";
  font-size: 18px;
  margin-bottom: 10px;
  color: rgb(21, 25, 33);
`;
const Words = styled.Text`
  font-family: "Notosans";
  font-size: 15px;
  padding-left: 2px;
  color: rgb(55, 65, 81);
`;

type IUser = {
  userId: number;
  name: string;
  username: string;
  email: string;
};

export default function User({ userId, name, username, email }: IUser) {
  return (
    <Container>
      <Section>
        <Box>
          <Header>아이디</Header>
          <Words>{username}</Words>
        </Box>
        <Box>
          <Header>성명</Header>
          <Words>{name}</Words>
        </Box>
        <Box>
          <Header>이메일</Header>
          <Words>{email}</Words>
        </Box>
      </Section>
      <Button
        onPress={() => LogUserOut()}
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
        <Main>로그아웃</Main>
      </Button>
    </Container>
  );
}
