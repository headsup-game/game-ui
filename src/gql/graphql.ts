/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigInt: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type ApesCard = {
  __typename?: 'ApesCard';
  card1: Card;
  card1Id: Scalars['String']['output'];
  card2: Card;
  card2Id: Scalars['String']['output'];
  id: Scalars['String']['output'];
  round: Round;
  roundId: Scalars['String']['output'];
};

export type ApesCardFilter = {
  AND?: InputMaybe<Array<InputMaybe<ApesCardFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ApesCardFilter>>>;
  card1Id?: InputMaybe<Scalars['String']['input']>;
  card1Id_contains?: InputMaybe<Scalars['String']['input']>;
  card1Id_ends_with?: InputMaybe<Scalars['String']['input']>;
  card1Id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  card1Id_not?: InputMaybe<Scalars['String']['input']>;
  card1Id_not_contains?: InputMaybe<Scalars['String']['input']>;
  card1Id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  card1Id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  card1Id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  card1Id_starts_with?: InputMaybe<Scalars['String']['input']>;
  card2Id?: InputMaybe<Scalars['String']['input']>;
  card2Id_contains?: InputMaybe<Scalars['String']['input']>;
  card2Id_ends_with?: InputMaybe<Scalars['String']['input']>;
  card2Id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  card2Id_not?: InputMaybe<Scalars['String']['input']>;
  card2Id_not_contains?: InputMaybe<Scalars['String']['input']>;
  card2Id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  card2Id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  card2Id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  card2Id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  roundId?: InputMaybe<Scalars['String']['input']>;
  roundId_contains?: InputMaybe<Scalars['String']['input']>;
  roundId_ends_with?: InputMaybe<Scalars['String']['input']>;
  roundId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  roundId_not?: InputMaybe<Scalars['String']['input']>;
  roundId_not_contains?: InputMaybe<Scalars['String']['input']>;
  roundId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  roundId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  roundId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  roundId_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type ApesCardPage = {
  __typename?: 'ApesCardPage';
  items: Array<ApesCard>;
  pageInfo: PageInfo;
};

export type Card = {
  __typename?: 'Card';
  id: Scalars['String']['output'];
  rank: Rank;
  suit: Suit;
};

export type CardFilter = {
  AND?: InputMaybe<Array<InputMaybe<CardFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CardFilter>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  rank?: InputMaybe<Rank>;
  rank_in?: InputMaybe<Array<InputMaybe<Rank>>>;
  rank_not?: InputMaybe<Rank>;
  rank_not_in?: InputMaybe<Array<InputMaybe<Rank>>>;
  suit?: InputMaybe<Suit>;
  suit_in?: InputMaybe<Array<InputMaybe<Suit>>>;
  suit_not?: InputMaybe<Suit>;
  suit_not_in?: InputMaybe<Array<InputMaybe<Suit>>>;
};

export type CardPage = {
  __typename?: 'CardPage';
  items: Array<Card>;
  pageInfo: PageInfo;
};

export type CommunityCard = {
  __typename?: 'CommunityCard';
  card1: Card;
  card1Id: Scalars['String']['output'];
  card2: Card;
  card2Id: Scalars['String']['output'];
  card3: Card;
  card3Id: Scalars['String']['output'];
  card4: Card;
  card4Id: Scalars['String']['output'];
  card5: Card;
  card5Id: Scalars['String']['output'];
  id: Scalars['String']['output'];
  round: Round;
  roundId: Scalars['String']['output'];
};

export type CommunityCardFilter = {
  AND?: InputMaybe<Array<InputMaybe<CommunityCardFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CommunityCardFilter>>>;
  card1Id?: InputMaybe<Scalars['String']['input']>;
  card1Id_contains?: InputMaybe<Scalars['String']['input']>;
  card1Id_ends_with?: InputMaybe<Scalars['String']['input']>;
  card1Id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  card1Id_not?: InputMaybe<Scalars['String']['input']>;
  card1Id_not_contains?: InputMaybe<Scalars['String']['input']>;
  card1Id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  card1Id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  card1Id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  card1Id_starts_with?: InputMaybe<Scalars['String']['input']>;
  card2Id?: InputMaybe<Scalars['String']['input']>;
  card2Id_contains?: InputMaybe<Scalars['String']['input']>;
  card2Id_ends_with?: InputMaybe<Scalars['String']['input']>;
  card2Id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  card2Id_not?: InputMaybe<Scalars['String']['input']>;
  card2Id_not_contains?: InputMaybe<Scalars['String']['input']>;
  card2Id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  card2Id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  card2Id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  card2Id_starts_with?: InputMaybe<Scalars['String']['input']>;
  card3Id?: InputMaybe<Scalars['String']['input']>;
  card3Id_contains?: InputMaybe<Scalars['String']['input']>;
  card3Id_ends_with?: InputMaybe<Scalars['String']['input']>;
  card3Id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  card3Id_not?: InputMaybe<Scalars['String']['input']>;
  card3Id_not_contains?: InputMaybe<Scalars['String']['input']>;
  card3Id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  card3Id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  card3Id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  card3Id_starts_with?: InputMaybe<Scalars['String']['input']>;
  card4Id?: InputMaybe<Scalars['String']['input']>;
  card4Id_contains?: InputMaybe<Scalars['String']['input']>;
  card4Id_ends_with?: InputMaybe<Scalars['String']['input']>;
  card4Id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  card4Id_not?: InputMaybe<Scalars['String']['input']>;
  card4Id_not_contains?: InputMaybe<Scalars['String']['input']>;
  card4Id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  card4Id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  card4Id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  card4Id_starts_with?: InputMaybe<Scalars['String']['input']>;
  card5Id?: InputMaybe<Scalars['String']['input']>;
  card5Id_contains?: InputMaybe<Scalars['String']['input']>;
  card5Id_ends_with?: InputMaybe<Scalars['String']['input']>;
  card5Id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  card5Id_not?: InputMaybe<Scalars['String']['input']>;
  card5Id_not_contains?: InputMaybe<Scalars['String']['input']>;
  card5Id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  card5Id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  card5Id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  card5Id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  roundId?: InputMaybe<Scalars['String']['input']>;
  roundId_contains?: InputMaybe<Scalars['String']['input']>;
  roundId_ends_with?: InputMaybe<Scalars['String']['input']>;
  roundId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  roundId_not?: InputMaybe<Scalars['String']['input']>;
  roundId_not_contains?: InputMaybe<Scalars['String']['input']>;
  roundId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  roundId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  roundId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  roundId_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type CommunityCardPage = {
  __typename?: 'CommunityCardPage';
  items: Array<CommunityCard>;
  pageInfo: PageInfo;
};

export enum HandRank {
  Flush = 'Flush',
  FourOfAKind = 'FourOfAKind',
  FullHouse = 'FullHouse',
  HighCard = 'HighCard',
  OnePair = 'OnePair',
  RoyalFlush = 'RoyalFlush',
  Straight = 'Straight',
  StraightFlush = 'StraightFlush',
  ThreeOfAKind = 'ThreeOfAKind',
  TwoPair = 'TwoPair'
}

export type HeadsUp = {
  __typename?: 'HeadsUp';
  adminAddress: Scalars['String']['output'];
  blindInterval: Scalars['BigInt']['output'];
  bufferInterval: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  isPaused: Scalars['Boolean']['output'];
  minEntry: Scalars['BigInt']['output'];
  operatorFee: Scalars['Float']['output'];
  operators?: Maybe<OperatorPage>;
  ownerAddress: Scalars['String']['output'];
  participants?: Maybe<ParticipantPage>;
  roundInterval: Scalars['BigInt']['output'];
  rounds?: Maybe<RoundPage>;
  totaRound: Scalars['BigInt']['output'];
  treasuryAmount: Scalars['BigInt']['output'];
  treasuryClaimedAmount: Scalars['BigInt']['output'];
  treasuryFee: Scalars['Float']['output'];
};


export type HeadsUpOperatorsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<OperatorFilter>;
};


export type HeadsUpParticipantsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<ParticipantFilter>;
};


export type HeadsUpRoundsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<RoundFilter>;
};

export type HeadsUpFilter = {
  AND?: InputMaybe<Array<InputMaybe<HeadsUpFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<HeadsUpFilter>>>;
  adminAddress?: InputMaybe<Scalars['String']['input']>;
  adminAddress_contains?: InputMaybe<Scalars['String']['input']>;
  adminAddress_ends_with?: InputMaybe<Scalars['String']['input']>;
  adminAddress_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  adminAddress_not?: InputMaybe<Scalars['String']['input']>;
  adminAddress_not_contains?: InputMaybe<Scalars['String']['input']>;
  adminAddress_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  adminAddress_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  adminAddress_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  adminAddress_starts_with?: InputMaybe<Scalars['String']['input']>;
  blindInterval?: InputMaybe<Scalars['BigInt']['input']>;
  blindInterval_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blindInterval_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blindInterval_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  blindInterval_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blindInterval_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blindInterval_not?: InputMaybe<Scalars['BigInt']['input']>;
  blindInterval_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  bufferInterval?: InputMaybe<Scalars['BigInt']['input']>;
  bufferInterval_gt?: InputMaybe<Scalars['BigInt']['input']>;
  bufferInterval_gte?: InputMaybe<Scalars['BigInt']['input']>;
  bufferInterval_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  bufferInterval_lt?: InputMaybe<Scalars['BigInt']['input']>;
  bufferInterval_lte?: InputMaybe<Scalars['BigInt']['input']>;
  bufferInterval_not?: InputMaybe<Scalars['BigInt']['input']>;
  bufferInterval_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  isPaused?: InputMaybe<Scalars['Boolean']['input']>;
  isPaused_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  isPaused_not?: InputMaybe<Scalars['Boolean']['input']>;
  isPaused_not_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  minEntry?: InputMaybe<Scalars['BigInt']['input']>;
  minEntry_gt?: InputMaybe<Scalars['BigInt']['input']>;
  minEntry_gte?: InputMaybe<Scalars['BigInt']['input']>;
  minEntry_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  minEntry_lt?: InputMaybe<Scalars['BigInt']['input']>;
  minEntry_lte?: InputMaybe<Scalars['BigInt']['input']>;
  minEntry_not?: InputMaybe<Scalars['BigInt']['input']>;
  minEntry_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  operatorFee?: InputMaybe<Scalars['Float']['input']>;
  operatorFee_gt?: InputMaybe<Scalars['Float']['input']>;
  operatorFee_gte?: InputMaybe<Scalars['Float']['input']>;
  operatorFee_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  operatorFee_lt?: InputMaybe<Scalars['Float']['input']>;
  operatorFee_lte?: InputMaybe<Scalars['Float']['input']>;
  operatorFee_not?: InputMaybe<Scalars['Float']['input']>;
  operatorFee_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  ownerAddress?: InputMaybe<Scalars['String']['input']>;
  ownerAddress_contains?: InputMaybe<Scalars['String']['input']>;
  ownerAddress_ends_with?: InputMaybe<Scalars['String']['input']>;
  ownerAddress_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ownerAddress_not?: InputMaybe<Scalars['String']['input']>;
  ownerAddress_not_contains?: InputMaybe<Scalars['String']['input']>;
  ownerAddress_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  ownerAddress_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ownerAddress_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  ownerAddress_starts_with?: InputMaybe<Scalars['String']['input']>;
  roundInterval?: InputMaybe<Scalars['BigInt']['input']>;
  roundInterval_gt?: InputMaybe<Scalars['BigInt']['input']>;
  roundInterval_gte?: InputMaybe<Scalars['BigInt']['input']>;
  roundInterval_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  roundInterval_lt?: InputMaybe<Scalars['BigInt']['input']>;
  roundInterval_lte?: InputMaybe<Scalars['BigInt']['input']>;
  roundInterval_not?: InputMaybe<Scalars['BigInt']['input']>;
  roundInterval_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  totaRound?: InputMaybe<Scalars['BigInt']['input']>;
  totaRound_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totaRound_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totaRound_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  totaRound_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totaRound_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totaRound_not?: InputMaybe<Scalars['BigInt']['input']>;
  totaRound_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  treasuryAmount?: InputMaybe<Scalars['BigInt']['input']>;
  treasuryAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  treasuryAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  treasuryAmount_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  treasuryAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  treasuryAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  treasuryAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  treasuryAmount_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  treasuryClaimedAmount?: InputMaybe<Scalars['BigInt']['input']>;
  treasuryClaimedAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  treasuryClaimedAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  treasuryClaimedAmount_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  treasuryClaimedAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  treasuryClaimedAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  treasuryClaimedAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  treasuryClaimedAmount_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  treasuryFee?: InputMaybe<Scalars['Float']['input']>;
  treasuryFee_gt?: InputMaybe<Scalars['Float']['input']>;
  treasuryFee_gte?: InputMaybe<Scalars['Float']['input']>;
  treasuryFee_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  treasuryFee_lt?: InputMaybe<Scalars['Float']['input']>;
  treasuryFee_lte?: InputMaybe<Scalars['Float']['input']>;
  treasuryFee_not?: InputMaybe<Scalars['Float']['input']>;
  treasuryFee_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

export type HeadsUpPage = {
  __typename?: 'HeadsUpPage';
  items: Array<HeadsUp>;
  pageInfo: PageInfo;
};

export type Operator = {
  __typename?: 'Operator';
  account: Scalars['String']['output'];
  contract: HeadsUp;
  contractId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
};

export type OperatorFilter = {
  AND?: InputMaybe<Array<InputMaybe<OperatorFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<OperatorFilter>>>;
  account?: InputMaybe<Scalars['String']['input']>;
  account_contains?: InputMaybe<Scalars['String']['input']>;
  account_ends_with?: InputMaybe<Scalars['String']['input']>;
  account_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  account_not?: InputMaybe<Scalars['String']['input']>;
  account_not_contains?: InputMaybe<Scalars['String']['input']>;
  account_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  account_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  account_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  account_starts_with?: InputMaybe<Scalars['String']['input']>;
  contractId?: InputMaybe<Scalars['String']['input']>;
  contractId_contains?: InputMaybe<Scalars['String']['input']>;
  contractId_ends_with?: InputMaybe<Scalars['String']['input']>;
  contractId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contractId_not?: InputMaybe<Scalars['String']['input']>;
  contractId_not_contains?: InputMaybe<Scalars['String']['input']>;
  contractId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  contractId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contractId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  contractId_starts_with?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isActive_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  isActive_not?: InputMaybe<Scalars['Boolean']['input']>;
  isActive_not_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
};

export type OperatorPage = {
  __typename?: 'OperatorPage';
  items: Array<Operator>;
  pageInfo: PageInfo;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Participant = {
  __typename?: 'Participant';
  amount: Scalars['BigInt']['output'];
  bettingMultiplier: Scalars['BigInt']['output'];
  bettingPoints: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  contract: HeadsUp;
  contractId: Scalars['String']['output'];
  hasClaimed: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  isWinner: Scalars['Boolean']['output'];
  position: Position;
  round: Round;
  roundId: Scalars['String']['output'];
  timestamp: Scalars['BigInt']['output'];
  trxHash: Scalars['String']['output'];
  user: User;
  userId: Scalars['String']['output'];
  winningPoints: Scalars['BigInt']['output'];
};

export type ParticipantFilter = {
  AND?: InputMaybe<Array<InputMaybe<ParticipantFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ParticipantFilter>>>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  bettingMultiplier?: InputMaybe<Scalars['BigInt']['input']>;
  bettingMultiplier_gt?: InputMaybe<Scalars['BigInt']['input']>;
  bettingMultiplier_gte?: InputMaybe<Scalars['BigInt']['input']>;
  bettingMultiplier_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  bettingMultiplier_lt?: InputMaybe<Scalars['BigInt']['input']>;
  bettingMultiplier_lte?: InputMaybe<Scalars['BigInt']['input']>;
  bettingMultiplier_not?: InputMaybe<Scalars['BigInt']['input']>;
  bettingMultiplier_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  bettingPoints?: InputMaybe<Scalars['BigInt']['input']>;
  bettingPoints_gt?: InputMaybe<Scalars['BigInt']['input']>;
  bettingPoints_gte?: InputMaybe<Scalars['BigInt']['input']>;
  bettingPoints_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  bettingPoints_lt?: InputMaybe<Scalars['BigInt']['input']>;
  bettingPoints_lte?: InputMaybe<Scalars['BigInt']['input']>;
  bettingPoints_not?: InputMaybe<Scalars['BigInt']['input']>;
  bettingPoints_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  contractId?: InputMaybe<Scalars['String']['input']>;
  contractId_contains?: InputMaybe<Scalars['String']['input']>;
  contractId_ends_with?: InputMaybe<Scalars['String']['input']>;
  contractId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contractId_not?: InputMaybe<Scalars['String']['input']>;
  contractId_not_contains?: InputMaybe<Scalars['String']['input']>;
  contractId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  contractId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contractId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  contractId_starts_with?: InputMaybe<Scalars['String']['input']>;
  hasClaimed?: InputMaybe<Scalars['Boolean']['input']>;
  hasClaimed_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  hasClaimed_not?: InputMaybe<Scalars['Boolean']['input']>;
  hasClaimed_not_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  isWinner?: InputMaybe<Scalars['Boolean']['input']>;
  isWinner_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  isWinner_not?: InputMaybe<Scalars['Boolean']['input']>;
  isWinner_not_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  position?: InputMaybe<Position>;
  position_in?: InputMaybe<Array<InputMaybe<Position>>>;
  position_not?: InputMaybe<Position>;
  position_not_in?: InputMaybe<Array<InputMaybe<Position>>>;
  roundId?: InputMaybe<Scalars['String']['input']>;
  roundId_contains?: InputMaybe<Scalars['String']['input']>;
  roundId_ends_with?: InputMaybe<Scalars['String']['input']>;
  roundId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  roundId_not?: InputMaybe<Scalars['String']['input']>;
  roundId_not_contains?: InputMaybe<Scalars['String']['input']>;
  roundId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  roundId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  roundId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  roundId_starts_with?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  trxHash?: InputMaybe<Scalars['String']['input']>;
  trxHash_contains?: InputMaybe<Scalars['String']['input']>;
  trxHash_ends_with?: InputMaybe<Scalars['String']['input']>;
  trxHash_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  trxHash_not?: InputMaybe<Scalars['String']['input']>;
  trxHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  trxHash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  trxHash_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  trxHash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  trxHash_starts_with?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
  userId_contains?: InputMaybe<Scalars['String']['input']>;
  userId_ends_with?: InputMaybe<Scalars['String']['input']>;
  userId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userId_not?: InputMaybe<Scalars['String']['input']>;
  userId_not_contains?: InputMaybe<Scalars['String']['input']>;
  userId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  userId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  userId_starts_with?: InputMaybe<Scalars['String']['input']>;
  winningPoints?: InputMaybe<Scalars['BigInt']['input']>;
  winningPoints_gt?: InputMaybe<Scalars['BigInt']['input']>;
  winningPoints_gte?: InputMaybe<Scalars['BigInt']['input']>;
  winningPoints_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  winningPoints_lt?: InputMaybe<Scalars['BigInt']['input']>;
  winningPoints_lte?: InputMaybe<Scalars['BigInt']['input']>;
  winningPoints_not?: InputMaybe<Scalars['BigInt']['input']>;
  winningPoints_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
};

export type ParticipantPage = {
  __typename?: 'ParticipantPage';
  items: Array<Participant>;
  pageInfo: PageInfo;
};

export enum Position {
  Apes = 'APES',
  Draw = 'DRAW',
  NoPosition = 'NO_POSITION',
  Punks = 'PUNKS'
}

export type PunksCard = {
  __typename?: 'PunksCard';
  card1: Card;
  card1Id: Scalars['String']['output'];
  card2: Card;
  card2Id: Scalars['String']['output'];
  id: Scalars['String']['output'];
  round: Round;
  roundId: Scalars['String']['output'];
};

export type PunksCardFilter = {
  AND?: InputMaybe<Array<InputMaybe<PunksCardFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PunksCardFilter>>>;
  card1Id?: InputMaybe<Scalars['String']['input']>;
  card1Id_contains?: InputMaybe<Scalars['String']['input']>;
  card1Id_ends_with?: InputMaybe<Scalars['String']['input']>;
  card1Id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  card1Id_not?: InputMaybe<Scalars['String']['input']>;
  card1Id_not_contains?: InputMaybe<Scalars['String']['input']>;
  card1Id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  card1Id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  card1Id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  card1Id_starts_with?: InputMaybe<Scalars['String']['input']>;
  card2Id?: InputMaybe<Scalars['String']['input']>;
  card2Id_contains?: InputMaybe<Scalars['String']['input']>;
  card2Id_ends_with?: InputMaybe<Scalars['String']['input']>;
  card2Id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  card2Id_not?: InputMaybe<Scalars['String']['input']>;
  card2Id_not_contains?: InputMaybe<Scalars['String']['input']>;
  card2Id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  card2Id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  card2Id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  card2Id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  roundId?: InputMaybe<Scalars['String']['input']>;
  roundId_contains?: InputMaybe<Scalars['String']['input']>;
  roundId_ends_with?: InputMaybe<Scalars['String']['input']>;
  roundId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  roundId_not?: InputMaybe<Scalars['String']['input']>;
  roundId_not_contains?: InputMaybe<Scalars['String']['input']>;
  roundId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  roundId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  roundId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  roundId_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type PunksCardPage = {
  __typename?: 'PunksCardPage';
  items: Array<PunksCard>;
  pageInfo: PageInfo;
};

export type Query = {
  __typename?: 'Query';
  _meta?: Maybe<_Meta>;
  apesCard?: Maybe<ApesCard>;
  apesCards: ApesCardPage;
  card?: Maybe<Card>;
  cards: CardPage;
  communityCard?: Maybe<CommunityCard>;
  communityCards: CommunityCardPage;
  headsUp?: Maybe<HeadsUp>;
  headsUps: HeadsUpPage;
  operator?: Maybe<Operator>;
  operators: OperatorPage;
  participant?: Maybe<Participant>;
  participants: ParticipantPage;
  punksCard?: Maybe<PunksCard>;
  punksCards: PunksCardPage;
  round?: Maybe<Round>;
  rounds: RoundPage;
  user?: Maybe<User>;
  users: UserPage;
  winningHand?: Maybe<WinningHand>;
  winningHands: WinningHandPage;
};


export type QueryApesCardArgs = {
  id: Scalars['String']['input'];
};


export type QueryApesCardsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<ApesCardFilter>;
};


export type QueryCardArgs = {
  id: Scalars['String']['input'];
};


export type QueryCardsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<CardFilter>;
};


export type QueryCommunityCardArgs = {
  id: Scalars['String']['input'];
};


export type QueryCommunityCardsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<CommunityCardFilter>;
};


export type QueryHeadsUpArgs = {
  id: Scalars['String']['input'];
};


export type QueryHeadsUpsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<HeadsUpFilter>;
};


export type QueryOperatorArgs = {
  id: Scalars['String']['input'];
};


export type QueryOperatorsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<OperatorFilter>;
};


export type QueryParticipantArgs = {
  id: Scalars['String']['input'];
};


export type QueryParticipantsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<ParticipantFilter>;
};


export type QueryPunksCardArgs = {
  id: Scalars['String']['input'];
};


export type QueryPunksCardsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<PunksCardFilter>;
};


export type QueryRoundArgs = {
  id: Scalars['String']['input'];
};


export type QueryRoundsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<RoundFilter>;
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<UserFilter>;
};


export type QueryWinningHandArgs = {
  id: Scalars['String']['input'];
};


export type QueryWinningHandsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<WinningHandFilter>;
};

export enum Rank {
  Ace = 'Ace',
  Eight = 'Eight',
  Five = 'Five',
  Four = 'Four',
  Jack = 'Jack',
  King = 'King',
  Nine = 'Nine',
  Queen = 'Queen',
  Seven = 'Seven',
  Six = 'Six',
  Ten = 'Ten',
  Three = 'Three',
  Two = 'Two'
}

export type Round = {
  __typename?: 'Round';
  apesCards?: Maybe<ApesCard>;
  apesCardsId?: Maybe<Scalars['String']['output']>;
  apesPot: Scalars['BigInt']['output'];
  betCloseTimestamp: Scalars['BigInt']['output'];
  blindCloseTimestamp: Scalars['BigInt']['output'];
  closeTimestamp: Scalars['BigInt']['output'];
  communityCards?: Maybe<CommunityCard>;
  communityCardsId?: Maybe<Scalars['String']['output']>;
  communityCardsRevealed: Scalars['Boolean']['output'];
  contract: HeadsUp;
  contractId: Scalars['String']['output'];
  epoch: Scalars['BigInt']['output'];
  holeCardsRevealTrxBlockNumber: Scalars['BigInt']['output'];
  holeCardsRevealTrxHash: Scalars['String']['output'];
  holeCardsRevealTrxTimestamp: Scalars['BigInt']['output'];
  holeCardsRevealed: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  participants?: Maybe<ParticipantPage>;
  punksCards?: Maybe<PunksCard>;
  punksCardsId?: Maybe<Scalars['String']['output']>;
  punksPot: Scalars['BigInt']['output'];
  resultTrxBlockNumber: Scalars['BigInt']['output'];
  resultTrxHash: Scalars['String']['output'];
  resultTrxTimestamp: Scalars['BigInt']['output'];
  rewardAmount: Scalars['BigInt']['output'];
  rewardBaseCalAmount: Scalars['BigInt']['output'];
  roundExpiredAfterTimestamp: Scalars['BigInt']['output'];
  roundStartTrxBlockNumber: Scalars['BigInt']['output'];
  roundStartTrxHash: Scalars['String']['output'];
  roundStartTrxTimestamp: Scalars['BigInt']['output'];
  startTimestamp: Scalars['BigInt']['output'];
  totalAmount: Scalars['BigInt']['output'];
  totalApesBets: Scalars['BigInt']['output'];
  totalClaimed: Scalars['BigInt']['output'];
  totalPunksBets: Scalars['BigInt']['output'];
  winner: Position;
  winningHands?: Maybe<WinningHand>;
  winningHandsId?: Maybe<Scalars['String']['output']>;
};


export type RoundParticipantsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<ParticipantFilter>;
};

export type RoundFilter = {
  AND?: InputMaybe<Array<InputMaybe<RoundFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<RoundFilter>>>;
  apesCardsId?: InputMaybe<Scalars['String']['input']>;
  apesCardsId_contains?: InputMaybe<Scalars['String']['input']>;
  apesCardsId_ends_with?: InputMaybe<Scalars['String']['input']>;
  apesCardsId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  apesCardsId_not?: InputMaybe<Scalars['String']['input']>;
  apesCardsId_not_contains?: InputMaybe<Scalars['String']['input']>;
  apesCardsId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  apesCardsId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  apesCardsId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  apesCardsId_starts_with?: InputMaybe<Scalars['String']['input']>;
  apesPot?: InputMaybe<Scalars['BigInt']['input']>;
  apesPot_gt?: InputMaybe<Scalars['BigInt']['input']>;
  apesPot_gte?: InputMaybe<Scalars['BigInt']['input']>;
  apesPot_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  apesPot_lt?: InputMaybe<Scalars['BigInt']['input']>;
  apesPot_lte?: InputMaybe<Scalars['BigInt']['input']>;
  apesPot_not?: InputMaybe<Scalars['BigInt']['input']>;
  apesPot_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  betCloseTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  betCloseTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  betCloseTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  betCloseTimestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  betCloseTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  betCloseTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  betCloseTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  betCloseTimestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  blindCloseTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blindCloseTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blindCloseTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blindCloseTimestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  blindCloseTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blindCloseTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blindCloseTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blindCloseTimestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  closeTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  closeTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  closeTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  closeTimestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  closeTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  closeTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  closeTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  closeTimestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  communityCardsId?: InputMaybe<Scalars['String']['input']>;
  communityCardsId_contains?: InputMaybe<Scalars['String']['input']>;
  communityCardsId_ends_with?: InputMaybe<Scalars['String']['input']>;
  communityCardsId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  communityCardsId_not?: InputMaybe<Scalars['String']['input']>;
  communityCardsId_not_contains?: InputMaybe<Scalars['String']['input']>;
  communityCardsId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  communityCardsId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  communityCardsId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  communityCardsId_starts_with?: InputMaybe<Scalars['String']['input']>;
  communityCardsRevealed?: InputMaybe<Scalars['Boolean']['input']>;
  communityCardsRevealed_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  communityCardsRevealed_not?: InputMaybe<Scalars['Boolean']['input']>;
  communityCardsRevealed_not_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  contractId?: InputMaybe<Scalars['String']['input']>;
  contractId_contains?: InputMaybe<Scalars['String']['input']>;
  contractId_ends_with?: InputMaybe<Scalars['String']['input']>;
  contractId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contractId_not?: InputMaybe<Scalars['String']['input']>;
  contractId_not_contains?: InputMaybe<Scalars['String']['input']>;
  contractId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  contractId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contractId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  contractId_starts_with?: InputMaybe<Scalars['String']['input']>;
  epoch?: InputMaybe<Scalars['BigInt']['input']>;
  epoch_gt?: InputMaybe<Scalars['BigInt']['input']>;
  epoch_gte?: InputMaybe<Scalars['BigInt']['input']>;
  epoch_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  epoch_lt?: InputMaybe<Scalars['BigInt']['input']>;
  epoch_lte?: InputMaybe<Scalars['BigInt']['input']>;
  epoch_not?: InputMaybe<Scalars['BigInt']['input']>;
  epoch_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  holeCardsRevealTrxBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  holeCardsRevealTrxBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  holeCardsRevealTrxBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  holeCardsRevealTrxBlockNumber_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  holeCardsRevealTrxBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  holeCardsRevealTrxBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  holeCardsRevealTrxBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  holeCardsRevealTrxBlockNumber_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  holeCardsRevealTrxHash?: InputMaybe<Scalars['String']['input']>;
  holeCardsRevealTrxHash_contains?: InputMaybe<Scalars['String']['input']>;
  holeCardsRevealTrxHash_ends_with?: InputMaybe<Scalars['String']['input']>;
  holeCardsRevealTrxHash_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  holeCardsRevealTrxHash_not?: InputMaybe<Scalars['String']['input']>;
  holeCardsRevealTrxHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  holeCardsRevealTrxHash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  holeCardsRevealTrxHash_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  holeCardsRevealTrxHash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  holeCardsRevealTrxHash_starts_with?: InputMaybe<Scalars['String']['input']>;
  holeCardsRevealTrxTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  holeCardsRevealTrxTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  holeCardsRevealTrxTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  holeCardsRevealTrxTimestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  holeCardsRevealTrxTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  holeCardsRevealTrxTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  holeCardsRevealTrxTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  holeCardsRevealTrxTimestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  holeCardsRevealed?: InputMaybe<Scalars['Boolean']['input']>;
  holeCardsRevealed_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  holeCardsRevealed_not?: InputMaybe<Scalars['Boolean']['input']>;
  holeCardsRevealed_not_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  punksCardsId?: InputMaybe<Scalars['String']['input']>;
  punksCardsId_contains?: InputMaybe<Scalars['String']['input']>;
  punksCardsId_ends_with?: InputMaybe<Scalars['String']['input']>;
  punksCardsId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  punksCardsId_not?: InputMaybe<Scalars['String']['input']>;
  punksCardsId_not_contains?: InputMaybe<Scalars['String']['input']>;
  punksCardsId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  punksCardsId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  punksCardsId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  punksCardsId_starts_with?: InputMaybe<Scalars['String']['input']>;
  punksPot?: InputMaybe<Scalars['BigInt']['input']>;
  punksPot_gt?: InputMaybe<Scalars['BigInt']['input']>;
  punksPot_gte?: InputMaybe<Scalars['BigInt']['input']>;
  punksPot_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  punksPot_lt?: InputMaybe<Scalars['BigInt']['input']>;
  punksPot_lte?: InputMaybe<Scalars['BigInt']['input']>;
  punksPot_not?: InputMaybe<Scalars['BigInt']['input']>;
  punksPot_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  resultTrxBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  resultTrxBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  resultTrxBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  resultTrxBlockNumber_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  resultTrxBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  resultTrxBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  resultTrxBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  resultTrxBlockNumber_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  resultTrxHash?: InputMaybe<Scalars['String']['input']>;
  resultTrxHash_contains?: InputMaybe<Scalars['String']['input']>;
  resultTrxHash_ends_with?: InputMaybe<Scalars['String']['input']>;
  resultTrxHash_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  resultTrxHash_not?: InputMaybe<Scalars['String']['input']>;
  resultTrxHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  resultTrxHash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  resultTrxHash_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  resultTrxHash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  resultTrxHash_starts_with?: InputMaybe<Scalars['String']['input']>;
  resultTrxTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  resultTrxTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  resultTrxTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  resultTrxTimestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  resultTrxTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  resultTrxTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  resultTrxTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  resultTrxTimestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  rewardAmount?: InputMaybe<Scalars['BigInt']['input']>;
  rewardAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  rewardAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  rewardAmount_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  rewardAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  rewardAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  rewardAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  rewardAmount_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  rewardBaseCalAmount?: InputMaybe<Scalars['BigInt']['input']>;
  rewardBaseCalAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  rewardBaseCalAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  rewardBaseCalAmount_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  rewardBaseCalAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  rewardBaseCalAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  rewardBaseCalAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  rewardBaseCalAmount_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  roundExpiredAfterTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  roundExpiredAfterTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  roundExpiredAfterTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  roundExpiredAfterTimestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  roundExpiredAfterTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  roundExpiredAfterTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  roundExpiredAfterTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  roundExpiredAfterTimestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  roundStartTrxBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  roundStartTrxBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  roundStartTrxBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  roundStartTrxBlockNumber_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  roundStartTrxBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  roundStartTrxBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  roundStartTrxBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  roundStartTrxBlockNumber_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  roundStartTrxHash?: InputMaybe<Scalars['String']['input']>;
  roundStartTrxHash_contains?: InputMaybe<Scalars['String']['input']>;
  roundStartTrxHash_ends_with?: InputMaybe<Scalars['String']['input']>;
  roundStartTrxHash_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  roundStartTrxHash_not?: InputMaybe<Scalars['String']['input']>;
  roundStartTrxHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  roundStartTrxHash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  roundStartTrxHash_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  roundStartTrxHash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  roundStartTrxHash_starts_with?: InputMaybe<Scalars['String']['input']>;
  roundStartTrxTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  roundStartTrxTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  roundStartTrxTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  roundStartTrxTimestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  roundStartTrxTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  roundStartTrxTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  roundStartTrxTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  roundStartTrxTimestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  startTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  startTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  startTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  startTimestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  startTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  startTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  startTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  startTimestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  totalAmount?: InputMaybe<Scalars['BigInt']['input']>;
  totalAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalAmount_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  totalAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalAmount_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  totalApesBets?: InputMaybe<Scalars['BigInt']['input']>;
  totalApesBets_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalApesBets_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalApesBets_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  totalApesBets_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalApesBets_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalApesBets_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalApesBets_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  totalClaimed?: InputMaybe<Scalars['BigInt']['input']>;
  totalClaimed_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalClaimed_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalClaimed_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  totalClaimed_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalClaimed_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalClaimed_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalClaimed_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  totalPunksBets?: InputMaybe<Scalars['BigInt']['input']>;
  totalPunksBets_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalPunksBets_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalPunksBets_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  totalPunksBets_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalPunksBets_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalPunksBets_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalPunksBets_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  winner?: InputMaybe<Position>;
  winner_in?: InputMaybe<Array<InputMaybe<Position>>>;
  winner_not?: InputMaybe<Position>;
  winner_not_in?: InputMaybe<Array<InputMaybe<Position>>>;
  winningHandsId?: InputMaybe<Scalars['String']['input']>;
  winningHandsId_contains?: InputMaybe<Scalars['String']['input']>;
  winningHandsId_ends_with?: InputMaybe<Scalars['String']['input']>;
  winningHandsId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  winningHandsId_not?: InputMaybe<Scalars['String']['input']>;
  winningHandsId_not_contains?: InputMaybe<Scalars['String']['input']>;
  winningHandsId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  winningHandsId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  winningHandsId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  winningHandsId_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type RoundPage = {
  __typename?: 'RoundPage';
  items: Array<Round>;
  pageInfo: PageInfo;
};

export enum Suit {
  Clubs = 'Clubs',
  Diamonds = 'Diamonds',
  Hearts = 'Hearts',
  Spades = 'Spades'
}

export type User = {
  __typename?: 'User';
  account: Scalars['String']['output'];
  id: Scalars['String']['output'];
  participantions?: Maybe<ParticipantPage>;
  totalBetAmount: Scalars['BigInt']['output'];
  totalPoints: Scalars['BigInt']['output'];
  totalWonAmount: Scalars['BigInt']['output'];
};


export type UserParticipantionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<ParticipantFilter>;
};

export type UserFilter = {
  AND?: InputMaybe<Array<InputMaybe<UserFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<UserFilter>>>;
  account?: InputMaybe<Scalars['String']['input']>;
  account_contains?: InputMaybe<Scalars['String']['input']>;
  account_ends_with?: InputMaybe<Scalars['String']['input']>;
  account_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  account_not?: InputMaybe<Scalars['String']['input']>;
  account_not_contains?: InputMaybe<Scalars['String']['input']>;
  account_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  account_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  account_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  account_starts_with?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  totalBetAmount?: InputMaybe<Scalars['BigInt']['input']>;
  totalBetAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalBetAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalBetAmount_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  totalBetAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalBetAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalBetAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalBetAmount_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  totalPoints?: InputMaybe<Scalars['BigInt']['input']>;
  totalPoints_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalPoints_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalPoints_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  totalPoints_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalPoints_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalPoints_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalPoints_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  totalWonAmount?: InputMaybe<Scalars['BigInt']['input']>;
  totalWonAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalWonAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalWonAmount_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  totalWonAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalWonAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalWonAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalWonAmount_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
};

export type UserPage = {
  __typename?: 'UserPage';
  items: Array<User>;
  pageInfo: PageInfo;
};

export type WinningHand = {
  __typename?: 'WinningHand';
  bestCard1: Card;
  bestCard1Id: Scalars['String']['output'];
  bestCard2: Card;
  bestCard2Id: Scalars['String']['output'];
  bestCard3: Card;
  bestCard3Id: Scalars['String']['output'];
  bestCard4: Card;
  bestCard4Id: Scalars['String']['output'];
  bestCard5: Card;
  bestCard5Id: Scalars['String']['output'];
  handRank: HandRank;
  id: Scalars['String']['output'];
  round: Round;
  roundId: Scalars['String']['output'];
};

export type WinningHandFilter = {
  AND?: InputMaybe<Array<InputMaybe<WinningHandFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<WinningHandFilter>>>;
  bestCard1Id?: InputMaybe<Scalars['String']['input']>;
  bestCard1Id_contains?: InputMaybe<Scalars['String']['input']>;
  bestCard1Id_ends_with?: InputMaybe<Scalars['String']['input']>;
  bestCard1Id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  bestCard1Id_not?: InputMaybe<Scalars['String']['input']>;
  bestCard1Id_not_contains?: InputMaybe<Scalars['String']['input']>;
  bestCard1Id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  bestCard1Id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  bestCard1Id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  bestCard1Id_starts_with?: InputMaybe<Scalars['String']['input']>;
  bestCard2Id?: InputMaybe<Scalars['String']['input']>;
  bestCard2Id_contains?: InputMaybe<Scalars['String']['input']>;
  bestCard2Id_ends_with?: InputMaybe<Scalars['String']['input']>;
  bestCard2Id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  bestCard2Id_not?: InputMaybe<Scalars['String']['input']>;
  bestCard2Id_not_contains?: InputMaybe<Scalars['String']['input']>;
  bestCard2Id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  bestCard2Id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  bestCard2Id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  bestCard2Id_starts_with?: InputMaybe<Scalars['String']['input']>;
  bestCard3Id?: InputMaybe<Scalars['String']['input']>;
  bestCard3Id_contains?: InputMaybe<Scalars['String']['input']>;
  bestCard3Id_ends_with?: InputMaybe<Scalars['String']['input']>;
  bestCard3Id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  bestCard3Id_not?: InputMaybe<Scalars['String']['input']>;
  bestCard3Id_not_contains?: InputMaybe<Scalars['String']['input']>;
  bestCard3Id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  bestCard3Id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  bestCard3Id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  bestCard3Id_starts_with?: InputMaybe<Scalars['String']['input']>;
  bestCard4Id?: InputMaybe<Scalars['String']['input']>;
  bestCard4Id_contains?: InputMaybe<Scalars['String']['input']>;
  bestCard4Id_ends_with?: InputMaybe<Scalars['String']['input']>;
  bestCard4Id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  bestCard4Id_not?: InputMaybe<Scalars['String']['input']>;
  bestCard4Id_not_contains?: InputMaybe<Scalars['String']['input']>;
  bestCard4Id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  bestCard4Id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  bestCard4Id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  bestCard4Id_starts_with?: InputMaybe<Scalars['String']['input']>;
  bestCard5Id?: InputMaybe<Scalars['String']['input']>;
  bestCard5Id_contains?: InputMaybe<Scalars['String']['input']>;
  bestCard5Id_ends_with?: InputMaybe<Scalars['String']['input']>;
  bestCard5Id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  bestCard5Id_not?: InputMaybe<Scalars['String']['input']>;
  bestCard5Id_not_contains?: InputMaybe<Scalars['String']['input']>;
  bestCard5Id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  bestCard5Id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  bestCard5Id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  bestCard5Id_starts_with?: InputMaybe<Scalars['String']['input']>;
  handRank?: InputMaybe<HandRank>;
  handRank_in?: InputMaybe<Array<InputMaybe<HandRank>>>;
  handRank_not?: InputMaybe<HandRank>;
  handRank_not_in?: InputMaybe<Array<InputMaybe<HandRank>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  roundId?: InputMaybe<Scalars['String']['input']>;
  roundId_contains?: InputMaybe<Scalars['String']['input']>;
  roundId_ends_with?: InputMaybe<Scalars['String']['input']>;
  roundId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  roundId_not?: InputMaybe<Scalars['String']['input']>;
  roundId_not_contains?: InputMaybe<Scalars['String']['input']>;
  roundId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  roundId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  roundId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  roundId_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type WinningHandPage = {
  __typename?: 'WinningHandPage';
  items: Array<WinningHand>;
  pageInfo: PageInfo;
};

export type _Meta = {
  __typename?: '_meta';
  status?: Maybe<Scalars['JSON']['output']>;
};

export type GetCurrentRoundQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  participant: Scalars['String']['input'];
}>;


export type GetCurrentRoundQuery = { __typename?: 'Query', rounds: { __typename?: 'RoundPage', items: Array<{ __typename?: 'Round', epoch: any, roundExpiredAfterTimestamp: any, apesCardsId?: string | null, punksCardsId?: string | null, apesPot: any, punksPot: any, totalApesBets: any, totalPunksBets: any, totalAmount: any, holeCardsRevealed: boolean, communityCardsRevealed: boolean, winner: Position, startTimestamp: any, closeTimestamp: any, blindCloseTimestamp: any, betCloseTimestamp: any, communityCards?: { __typename?: 'CommunityCard', card1: { __typename?: 'Card', rank: Rank, suit: Suit }, card2: { __typename?: 'Card', rank: Rank, suit: Suit }, card3: { __typename?: 'Card', rank: Rank, suit: Suit }, card4: { __typename?: 'Card', rank: Rank, suit: Suit }, card5: { __typename?: 'Card', rank: Rank, suit: Suit } } | null, winningHands?: { __typename?: 'WinningHand', bestCard1: { __typename?: 'Card', rank: Rank, suit: Suit }, bestCard2: { __typename?: 'Card', rank: Rank, suit: Suit }, bestCard3: { __typename?: 'Card', rank: Rank, suit: Suit }, bestCard4: { __typename?: 'Card', rank: Rank, suit: Suit }, bestCard5: { __typename?: 'Card', rank: Rank, suit: Suit } } | null, participants?: { __typename?: 'ParticipantPage', items: Array<{ __typename?: 'Participant', amount: any, position: Position, isWinner: boolean }> } | null, apesCards?: { __typename?: 'ApesCard', card1: { __typename?: 'Card', id: string, rank: Rank, suit: Suit }, card2: { __typename?: 'Card', id: string, rank: Rank, suit: Suit } } | null, punksCards?: { __typename?: 'PunksCard', card1: { __typename?: 'Card', id: string, rank: Rank, suit: Suit }, card2: { __typename?: 'Card', id: string, rank: Rank, suit: Suit } } | null }> } };

export type GetPointsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPointsQuery = { __typename?: 'Query', users: { __typename?: 'UserPage', items: Array<{ __typename?: 'User', totalPoints: any, account: string }> } };


export const GetCurrentRoundDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentRound"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"participant"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rounds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"StringValue","value":"epoch","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"StringValue","value":"desc","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"epoch"}},{"kind":"Field","name":{"kind":"Name","value":"roundExpiredAfterTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"apesCardsId"}},{"kind":"Field","name":{"kind":"Name","value":"punksCardsId"}},{"kind":"Field","name":{"kind":"Name","value":"apesPot"}},{"kind":"Field","name":{"kind":"Name","value":"punksPot"}},{"kind":"Field","name":{"kind":"Name","value":"totalApesBets"}},{"kind":"Field","name":{"kind":"Name","value":"totalPunksBets"}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"holeCardsRevealed"}},{"kind":"Field","name":{"kind":"Name","value":"communityCardsRevealed"}},{"kind":"Field","name":{"kind":"Name","value":"communityCards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"suit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"card2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"suit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"card3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"suit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"card4"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"suit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"card5"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"suit"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"winner"}},{"kind":"Field","name":{"kind":"Name","value":"winningHands"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bestCard1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"suit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bestCard2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"suit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bestCard3"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"suit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bestCard4"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"suit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bestCard5"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"suit"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"startTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"closeTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"blindCloseTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"betCloseTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"participants"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"participant"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"isWinner"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"apesCards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"suit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"card2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"suit"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"punksCards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"suit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"card2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"suit"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCurrentRoundQuery, GetCurrentRoundQueryVariables>;
export const GetPointsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPoints"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"StringValue","value":"totalPoints","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"StringValue","value":"desc","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalPoints"}},{"kind":"Field","name":{"kind":"Name","value":"account"}}]}}]}}]}}]} as unknown as DocumentNode<GetPointsQuery, GetPointsQueryVariables>;