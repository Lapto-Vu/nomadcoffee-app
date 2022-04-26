import { gql, useQuery } from "@apollo/client";
import styled from "styled-components/native";
import { removeLogInTokenAndVar } from "../apollo";

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

export const CURRENT_USER_QR = gql`
  query currentUser {
    currentUser {
      ok
      error
      user {
        id
        name
        username
        email
        avatarURL
      }
    }
  }
`;

export default function User({ navigation }: any) {
  const { data, loading } = useQuery(CURRENT_USER_QR, {
    fetchPolicy: "network-only",
  });

  const userLogoutAndRouteToHome = () => {
    removeLogInTokenAndVar();
    navigation.navigate("profile");
  };

  return (
    <Container>
      {!loading ? (
        <Section>
          <Box>
            <Header>아이디</Header>
            <Words>{data?.currentUser?.user.username}</Words>
          </Box>
          <Box>
            <Header>성명</Header>
            <Words>{data?.currentUser?.user.name}</Words>
          </Box>
          <Box>
            <Header>이메일</Header>
            <Words>{data?.currentUser?.user.email}</Words>
          </Box>
        </Section>
      ) : null}
      <Button
        onPress={() => userLogoutAndRouteToHome()}
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
