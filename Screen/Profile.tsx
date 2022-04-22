import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo";
import useUser from "../Hooks/useUser";
import Default from "../Profile/Default";
import User from "../Profile/User";

export default function Profile() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const currentUser = useUser(isLoggedIn);
  console.log(currentUser);
  return (
    <>
      {currentUser && currentUser?.username && isLoggedIn ? (
        <User
          userId={currentUser.id}
          name={currentUser.name}
          email={currentUser.email}
          username={currentUser.username}
        />
      ) : (
        <Default />
      )}
    </>
  );
}
