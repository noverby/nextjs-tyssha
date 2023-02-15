import Head from "next/head";
import Highlight from "react-highlight";
import { useSyncExternalStore } from "use-sync-external-store/shim";
import { subscribeQueryStore, getLastQuery } from "../src/gqty/";
import dynamic from "next/dynamic";

import "highlight.js/styles/androidstudio.css";

const Query = dynamic(() => import("../src/components/Query"), {
  ssr: false,
});

export default function Home() {
  const fetchData = useSyncExternalStore(subscribeQueryStore, getLastQuery);

  return (
    <>
      <Head>
        <title>Live Editor - GQty</title>
      </Head>

      <Query />

      <div className="container h-screen flex flex-col">
        <Highlight className="w-max graphql">{fetchData?.query}</Highlight>

        {fetchData?.variables && (
          <Highlight className="w-max json">
            {"// Variables\n" + JSON.stringify(fetchData?.variables, null, 2)}
          </Highlight>
        )}
      </div>
    </>
  );
}
