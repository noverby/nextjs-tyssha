import { Suspense, useEffect, useState } from "react";
import { useQuery, User } from "../gqty/";

const FriendComp = ({ user, nest }: { user: User; nest: number }) => {
  console.log(user.name);

  // delay 500 ms 
  const waitTill = new Date(new Date().getTime() + 1000);
  while (waitTill > new Date()) {}

  return (
    <>
      <li key={user.id}>{user.name}</li>
      {nest > 0 &&
        user
          ?.friends?.()
          ?.map((friend) => (
            <FriendComp key={friend.id ?? 0} user={friend} nest={nest - 1} />
          ))}
    </>
  );
};

const useQueryRefetch = () => {
  const query = useQuery();
  useEffect(() => {
    const interval = setInterval(() => {
      query.$refetch();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  query.__typename;
  return query;
};

const ComponentSuspense = () => {
  const query = useQueryRefetch();

  return <FriendComp user={query.me} nest={0} />;
};

export default function Component() {
  const [friendsVisible, setFriendsVisible] = useState(false);

  return (
    <>
      <button
        className="rounded bg-gray(300 hover:400 active:500) text-black px-3 py-1"
        onClick={() => {
          setFriendsVisible((v) => !v);
        }}
      >
        Toggle Friends
      </button>
      <Suspense fallback="suspense">
        {friendsVisible && <ComponentSuspense />}
      </Suspense>
    </>
  );
}
