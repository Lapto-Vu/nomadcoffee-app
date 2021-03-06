import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import Window, { IFeed } from "../Components/Window";

const Container = styled.SafeAreaView`
  height: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f8fafc;
`;

export const SEE_COFFEESHOPS_QR = gql`
  query seeCoffeeShops($page: Int) {
    seeCoffeeShops(page: $page) {
      id
      name
      photos {
        id
        url
      }
      categories {
        id
        slug
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

export default function Feed() {
  const { data, refetch, fetchMore } = useQuery(SEE_COFFEESHOPS_QR, {
    variables: { page: 0 },
  });
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const refreshAndFetchMore = async () => {
    await fetchMore({
      variables: {
        page: data?.seeCoffeeShops?.length,
      },
    });
  };

  const [refreshing, setRefreshing] = useState(false);

  const passRenderComp = ({ item }: { item: IFeed }) => {
    return <Window {...item} />;
  };
  return (
    <Container>
      <FlatList
        onRefresh={refresh}
        refreshing={refreshing}
        style={{
          width: "100%",
          height: "100%",
        }}
        onEndReachedThreshold={0.02}
        onEndReached={() => refreshAndFetchMore()}
        keyExtractor={(item, index) => {
          return "" + index;
        }}
        showsVerticalScrollIndicator={false}
        data={data?.seeCoffeeShops}
        renderItem={passRenderComp}
      />
    </Container>
  );
}
