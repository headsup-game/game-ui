/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query GetCurrentRound($limit: Int!, $participant: String!) {\n      rounds(orderBy: \"epoch\", orderDirection: \"desc\", limit: $limit) {\n        items {\n          epoch\n          roundExpiredAfterTimestamp\n          apesCardsId\n          punksCardsId\n          apesPot\n          punksPot\n          totalApesBets\n          totalPunksBets\n          totalAmount\n          holeCardsRevealed\n          communityCardsRevealed\n          communityCards {\n            card1{rank suit}\n            card2{rank suit}\n            card3{rank suit}\n            card4{rank suit}\n            card5{rank suit}\n          }\n          winner\n          winningHands {\n            bestCard1 {\n              rank\n              suit\n            }\n            bestCard2 {\n              rank\n              suit\n            }\n            bestCard3 {\n              rank\n              suit\n            }\n            bestCard4 {\n              rank\n              suit\n            }\n            bestCard5 {\n              rank\n              suit\n            }\n          }\n          startTimestamp\n          closeTimestamp\n          blindCloseTimestamp\n          betCloseTimestamp\n          resultTrxTimestamp\n          participants(where: { userId: $participant }) {\n            items {\n              amount\n              position\n              isWinner\n            }\n          }\n          apesCards {\n            card1 {\n              id\n              rank\n              suit\n            }\n            card2 {\n              id\n              rank\n              suit\n            }\n          }\n          punksCards {\n            card1 {\n              id\n              rank\n              suit\n            }\n            card2 {\n              id\n              rank\n              suit\n            }\n          }\n        }\n      }\n    }": types.GetCurrentRoundDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCurrentRound($limit: Int!, $participant: String!) {\n      rounds(orderBy: \"epoch\", orderDirection: \"desc\", limit: $limit) {\n        items {\n          epoch\n          roundExpiredAfterTimestamp\n          apesCardsId\n          punksCardsId\n          apesPot\n          punksPot\n          totalApesBets\n          totalPunksBets\n          totalAmount\n          holeCardsRevealed\n          communityCardsRevealed\n          communityCards {\n            card1{rank suit}\n            card2{rank suit}\n            card3{rank suit}\n            card4{rank suit}\n            card5{rank suit}\n          }\n          winner\n          winningHands {\n            bestCard1 {\n              rank\n              suit\n            }\n            bestCard2 {\n              rank\n              suit\n            }\n            bestCard3 {\n              rank\n              suit\n            }\n            bestCard4 {\n              rank\n              suit\n            }\n            bestCard5 {\n              rank\n              suit\n            }\n          }\n          startTimestamp\n          closeTimestamp\n          blindCloseTimestamp\n          betCloseTimestamp\n          resultTrxTimestamp\n          participants(where: { userId: $participant }) {\n            items {\n              amount\n              position\n              isWinner\n            }\n          }\n          apesCards {\n            card1 {\n              id\n              rank\n              suit\n            }\n            card2 {\n              id\n              rank\n              suit\n            }\n          }\n          punksCards {\n            card1 {\n              id\n              rank\n              suit\n            }\n            card2 {\n              id\n              rank\n              suit\n            }\n          }\n        }\n      }\n    }"): (typeof documents)["query GetCurrentRound($limit: Int!, $participant: String!) {\n      rounds(orderBy: \"epoch\", orderDirection: \"desc\", limit: $limit) {\n        items {\n          epoch\n          roundExpiredAfterTimestamp\n          apesCardsId\n          punksCardsId\n          apesPot\n          punksPot\n          totalApesBets\n          totalPunksBets\n          totalAmount\n          holeCardsRevealed\n          communityCardsRevealed\n          communityCards {\n            card1{rank suit}\n            card2{rank suit}\n            card3{rank suit}\n            card4{rank suit}\n            card5{rank suit}\n          }\n          winner\n          winningHands {\n            bestCard1 {\n              rank\n              suit\n            }\n            bestCard2 {\n              rank\n              suit\n            }\n            bestCard3 {\n              rank\n              suit\n            }\n            bestCard4 {\n              rank\n              suit\n            }\n            bestCard5 {\n              rank\n              suit\n            }\n          }\n          startTimestamp\n          closeTimestamp\n          blindCloseTimestamp\n          betCloseTimestamp\n          resultTrxTimestamp\n          participants(where: { userId: $participant }) {\n            items {\n              amount\n              position\n              isWinner\n            }\n          }\n          apesCards {\n            card1 {\n              id\n              rank\n              suit\n            }\n            card2 {\n              id\n              rank\n              suit\n            }\n          }\n          punksCards {\n            card1 {\n              id\n              rank\n              suit\n            }\n            card2 {\n              id\n              rank\n              suit\n            }\n          }\n        }\n      }\n    }"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;