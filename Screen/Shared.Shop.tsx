import { gql, useQuery } from "@apollo/client";
import styled from "styled-components/native";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f8fafc;
`;

const SEE_COFFEESHOP_QR = gql`
  query seeCoffeeShop($id: Int!) {
    seeCoffeeShop(id: $id) {
      ok
      error
      coffeeShop {
        id
        name
        longitude
        latitude
        categories {
          slug
        }
        photos {
          id
          url
        }

        user {
          id
          username
        }
      }
    }
  }
`;

const Image = styled.Image`
  width: 100%;
  height: 50%;
`;
const Box = styled.View`
  padding: 30px;
  width: 100%;
  height: 50%;
`;

const Section = styled.View`
  width: 100%;
  height: 40%;
  align-items: center;
  justify-content: space-around;
`;

const Main = styled.Text`
  font-family: "Notosans";
  font-size: 36px;
  color: rgb(55, 65, 81);
`;

const Categories = styled.Text`
  font-family: "Notosans";
  font-size: 12px;
  color: rgb(55, 65, 81);
`;

const Name = styled.Text`
  font-family: "Notosans";
  font-size: 16px;
  color: rgb(55, 65, 81);
`;

export default function Shop({ route }: any) {
  const { data, loading } = useQuery(SEE_COFFEESHOP_QR, {
    variables: { id: route.params.shopId },
  });
  return (
    <Container>
      <Image source={{ uri: data?.seeCoffeeShop?.coffeeShop.photos[0].url }} />
      <Box>
        <Section>
          <Main>{data?.seeCoffeeShop?.coffeeShop.name}</Main>
          <Categories>
            {data?.seeCoffeeShop?.coffeeShop?.categories?.map(
              (i: { slug: string }) => i.slug + "\u00a0\u00a0"
            )}
          </Categories>
          <Name>{data?.seeCoffeeShop?.coffeeShop?.user?.username}</Name>
        </Section>
      </Box>
    </Container>
  );
}
