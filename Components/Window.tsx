import styled from "styled-components/native";
import { Image, useWindowDimensions } from "react-native";

const Section = styled.View`
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 15px;
  border-radius: 10px;
`;

const Box = styled.View`
  justify-content: center;
  align-items: center;
`;

const ImageBox = styled.View`
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
`;
const TagText = styled.Text`
  font-family: "Notosans";
  font-size: 13px;
  color: rgb(149, 151, 155);
`;

const MainBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const HeaderBox = styled.View``;
const HeaderText = styled.Text`
  font-family: "Notosans";
  font-size: 15px;
  color: rgb(55, 65, 81);
`;
const InfoBox = styled.View``;
const InfoText = styled.Text`
  font-family: "Notosans";
  font-size: 15px;
  color: rgb(55, 65, 81);
`;

export type IFeed = {
  id: number;
  name: string;
  photos: {
    id: number;
    url: string;
  }[];
  categories: {
    id: number;
    slug: string;
  }[];
  user: {
    id: number;
    username: string;
    avatarURL: string;
  };
};

export default function Window({ id, photos, categories, name, user }: IFeed) {
  const { width, height } = useWindowDimensions();
  return (
    <Section
      style={{
        shadowColor: "#a2a2a2",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.4,
        shadowRadius: 30,
        elevation: 10,
      }}
    >
      <ImageBox
        style={{
          shadowColor: "#525252",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.4,
          shadowRadius: 3,
          elevation: 10,
          width: width - 50,
          height: height / 5,
          marginTop: 10,
          borderRadius: 5,
        }}
      >
        <Image
          resizeMode="cover"
          style={{
            width: width - 50,
            height: height / 5,
            marginBottom: 0,
            borderRadius: 5,
          }}
          source={{ uri: photos[0].url }}
        />
      </ImageBox>
      <Box
        style={{
          width: width - 50,
          marginBottom: 8,
        }}
      >
        <TagText
          key={`${id}`}
          style={{
            width: width - 50,
            paddingLeft: 5,
            paddingTop: 5,
          }}
        >
          {categories.map(
            (i: { slug: string; id: number }) => i.slug + "\u00a0\u00a0"
          )}
        </TagText>
        <MainBox
          style={{
            width: width - 50,
            paddingLeft: 5,
            paddingRight: 5,
          }}
        >
          <HeaderBox>
            <HeaderText>{name}</HeaderText>
          </HeaderBox>
          <InfoBox>
            <InfoText>{user.username}</InfoText>
          </InfoBox>
        </MainBox>
      </Box>
    </Section>
  );
}
