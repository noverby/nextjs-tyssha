/**
 * GQTY: You can safely modify this file and Query Fetcher based on your needs
 */

import { createReactClient } from "@gqty/react";
import { createClient } from "gqty";
import type {
  GeneratedSchema,
  SchemaObjectTypes,
  SchemaObjectTypesNames,
} from "./schema.generated";
import { generatedSchema, scalarsEnumsHash } from "./schema.generated";
import { parse, print } from "graphql";

let dedupeHash = "";
let lastData:
  | {
      query: string;
      variables: Record<string, any>;
    }
  | undefined;

const subscribers = new Set<(data: any) => void>();

export const subscribeQueryStore = (callback: (data: any) => void) => {
  subscribers.add(callback);

  callback(lastData);

  return () => {
    subscribers.delete(callback);
  };
};

export const getLastQuery = () => lastData;

export const client = createClient<
  GeneratedSchema,
  SchemaObjectTypesNames,
  SchemaObjectTypes
>({
  schema: generatedSchema,
  scalarsEnumsHash,
  queryFetcher: async (query, variables) => {
    if (dedupeHash === query) return {};

    dedupeHash = query;

    lastData = {
      query: print(parse(query)),
      variables,
    };

    subscribers.forEach((fn) => fn(lastData));

    const waitTill = new Date(new Date().getTime() + 1 * 1000);
    while (waitTill > new Date()) {}

    return {};

    // return {
    //   data: {
    //     me: {
    //       id: "1",
    //       name: "John Doe",
    //       friends: [{ id: "2", name: "Jane Doe" }],
    //     },
    //   },
    // };
  },
});

const { query, mutation, mutate, subscription, resolved, refetch, track } =
  client;

export { query, mutation, mutate, subscription, resolved, refetch, track };

const {
  graphql,
  useQuery,
  usePaginatedQuery,
  useTransactionQuery,
  useLazyQuery,
  useRefetch,
  useMutation,
  useMetaState,
  prepareReactRender,
  useHydrateCache,
  prepareQuery,
} = createReactClient<GeneratedSchema>(client, {
  defaults: {
    // Set this flag as "true" if your usage involves React Suspense
    // Keep in mind that you can overwrite it in a per-hook basis
    suspense: true,

    // Set this flag based on your needs
    staleWhileRevalidate: false,
  },
});

export {
  graphql,
  useQuery,
  usePaginatedQuery,
  useTransactionQuery,
  useLazyQuery,
  useRefetch,
  useMutation,
  useMetaState,
  prepareReactRender,
  useHydrateCache,
  prepareQuery,
};

export * from "./schema.generated";
