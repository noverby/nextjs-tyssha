/**
 * GQTY AUTO-GENERATED CODE: PLEASE DO NOT MODIFY MANUALLY
 */

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
}

export const scalarsEnumsHash: import("gqty").ScalarsEnumsHash = {
  Boolean: true,
  ID: true,
  Int: true,
  String: true,
};
export const generatedSchema = {
  User: {
    __typename: { __type: "String!" },
    friends: { __type: "[User!]!", __args: { size: "Int", skip: "Int" } },
    id: { __type: "ID!" },
    name: { __type: "String!" },
  },
  mutation: {
    __typename: { __type: "String!" },
    myMut: { __type: "User", __args: { id: "ID" } },
  },
  query: { __typename: { __type: "String!" }, me: { __type: "User!" } },
  subscription: {},
} as const;

export interface User {
  __typename?: "User";
  friends: (args?: {
    size?: Maybe<Scalars["Int"]>;
    skip?: Maybe<Scalars["Int"]>;
  }) => Array<User>;
  id: ScalarsEnums["ID"];
  name: ScalarsEnums["String"];
}

export interface Mutation {
  __typename?: "Mutation";
  myMut: (args?: { id?: Maybe<Scalars["ID"]> }) => Maybe<User>;
}

export interface Query {
  __typename?: "Query";
  me: User;
}

export interface Subscription {
  __typename?: "Subscription";
}

export interface SchemaObjectTypes {
  Mutation: Mutation;
  Query: Query;
  Subscription: Subscription;
  User: User;
}
export type SchemaObjectTypesNames =
  | "Mutation"
  | "Query"
  | "Subscription"
  | "User";

export interface GeneratedSchema {
  query: Query;
  mutation: Mutation;
  subscription: Subscription;
}

export type MakeNullable<T> = {
  [K in keyof T]: T[K] | undefined;
};

export interface ScalarsEnums extends MakeNullable<Scalars> {}
