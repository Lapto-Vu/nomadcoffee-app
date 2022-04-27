import {
  ApolloClient,
  InMemoryCache,
  makeVar,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { offsetLimitPagination } from "@apollo/client/utilities";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN = "token";

export const logInVar = makeVar(false);
export const tokenVar = makeVar<string | null>("");

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://coffee-backend-lapto.herokuapp.com/"
      : "http://192.168.0.48:4000",
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem(TOKEN);
  return {
    headers: {
      ...headers,
      token: token,
    },
  };
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
  link: authLink.concat(httpLink),
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
