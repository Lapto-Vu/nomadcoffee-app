import {
  ApolloClient,
  InMemoryCache,
  makeVar,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN = "token";

export const isLoggedInVar = makeVar(Boolean(AsyncStorage.getItem(TOKEN)));

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://coffee-backend-lapto.herokuapp.com/"
      : "http://192.168.0.48:4000",
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem(TOKEN);
  console.log("authToken:", token);
  return {
    headers: {
      ...headers,
      token: token ? token : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const LogUserIn = async (token: string) => {
  console.log(token);
  await AsyncStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const LogUserOut = async () => {
  await AsyncStorage.removeItem(TOKEN);
  isLoggedInVar(false);
};
