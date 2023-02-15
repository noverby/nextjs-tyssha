import { useEffect, useState } from "react";
import { useQuery, User } from "../gqty/";

const FriendComp = ({ user, nest }: { user: User; nest: number }) => {
  return nest > 0 ? (
    <>
      <li key={user.id}>{user.name}</li>
      {user?.friends?.()?.map((friend) => (
        <FriendComp key={friend.id ?? 0} user={friend} nest={nest - 1} />
      ))}
    </>
  ) : null;
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
  return query;
};

export default function Component() {
  const query = useQueryRefetch();
  const [friendsVisible, setFriendsVisible] = useState(false);

  return (
    <>
      <div className="hidden text-white">
        {friendsVisible && <FriendComp user={query.me} nest={8} />}
      </div>

      <button
        className="rounded bg-gray(300 hover:400 active:500) text-black px-3 py-1"
        onClick={() => {
          setFriendsVisible((v) => !v);
        }}
      >
        Toggle Friends
      </button>
    </>
  );
}
