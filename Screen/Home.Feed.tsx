import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { ActivityIndicator, FlatList, useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import Window from "../Components/Window";

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

type IFeed = {
  item: {
    id: number;
    name: string;
    photos: {
      id: number;
      url: string;
    }[];
    categories: {
      slug: string;
    }[];
    user: {
      id: number;
      username: string;
      avatarURL: string;
    };
  };
};

export default function Feed() {
  const { data, refetch, fetchMore } = useQuery(SEE_COFFEESHOPS_QR, {
    variables: { page: 0 },
  });
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const [refreshing, setRefreshing] = useState(false);
  const renderFeed = ({ item }: IFeed) => {
    return <Window {...item} key={item.id} />;
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
        onEndReached={() =>
          fetchMore({
            variables: {
              page: data?.seeCoffeeShops?.length,
            },
          })
        }
        keyExtractor={(photo) => "" + photo.id}
        showsVerticalScrollIndicator={false}
        data={data?.seeCoffeeShops}
        renderItem={renderFeed}
      />
    </Container>
  );
}
