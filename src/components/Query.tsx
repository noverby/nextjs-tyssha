import { useEffect, useState } from "react";
import { useQuery } from "../gqty/";

export default function Component() {
  const query = useQuery();
  const [friendsVisible, setFriendsVisible] = useState(false);

  console.log("buu");
  useEffect(() => {
    const tmId = setInterval(() => {
      console.log("buu");
      query.$refetch();
    }, 1000);

    return () => {
      clearInterval(tmId);
    };
  }, [query]);

  return (
    <>
      <div className="hidden text-white">
        Hello {query.me.name}!
        {friendsVisible && (
          <ol>
            {query.me.friends({ skip: 1, size: 10 }).map((user) => {
              user.friends({ skip: 1, size: 10 }).map((user) => {
                return <li key={user.id}>{user.name}</li>;
              });
            })}
          </ol>
        )}
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
