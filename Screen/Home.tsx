import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f8fafc;
`;

const Main = styled.Text`
  font-family: "Notosans";
  font-size: 15px;
  color: rgb(55, 65, 81);
`;

export default function Home() {
  return (
    <Container>
      <Main>"홈페이지창" 작업중에 있습니다.</Main>
    </Container>
  );
}
