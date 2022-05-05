import {
  ApolloClient,
  InMemoryCache,
  makeVar,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createUploadLink } from "apollo-upload-client";
import { offsetLimitPagination } from "@apollo/client/utilities";

const TOKEN = "token";

export const logInVar = makeVar(false);
export const tokenVar = makeVar<string | null>("");

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem(TOKEN);
  return {
    headers: {
      ...headers,
      token: token,
    },
  };
});

const uploadLink = createUploadLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://coffee-backend-lapto.herokuapp.com/"
      : "http://192.168.0.48:4000",
});

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        seeCoffeeShops: {
          keyArgs: false,
          merge(exisiting = [], incoming = []) {
            return [...exisiting, ...incoming];
          },
        },
      },
    },
  },
});

export const client = new ApolloClient({
  link: ApolloLink.from([authLink, uploadLink]),
  cache,
});

export const setLogInTokenAndVar = async (token: string) => {
  await AsyncStorage.setItem(TOKEN, token);
  logInVar(true);
  tokenVar(token);
};

export const removeLogInTokenAndVar = async () => {
  await AsyncStorage.removeItem(TOKEN);
  logInVar(false);
  tokenVar(null);
};
