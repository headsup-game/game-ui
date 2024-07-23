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
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
  /**
   * 8 bytes signed integer
   *
   */
  Int8: { input: any; output: any; }
  /**
   * A string representation of microseconds UNIX timestamp (16 digits)
   *
   */
  Timestamp: { input: any; output: any; }
};

export enum Aggregation_Interval {
  Day = 'day',
  Hour = 'hour'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type Executor = {
  __typename?: 'Executor';
  address: Scalars['Bytes']['output'];
  filledOrders?: Maybe<Array<Order>>;
  id: Scalars['ID']['output'];
};


export type ExecutorFilledOrdersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Order_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Order_Filter>;
};

export type Executor_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars['Bytes']['input']>;
  address_contains?: InputMaybe<Scalars['Bytes']['input']>;
  address_gt?: InputMaybe<Scalars['Bytes']['input']>;
  address_gte?: InputMaybe<Scalars['Bytes']['input']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  address_lt?: InputMaybe<Scalars['Bytes']['input']>;
  address_lte?: InputMaybe<Scalars['Bytes']['input']>;
  address_not?: InputMaybe<Scalars['Bytes']['input']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  and?: InputMaybe<Array<InputMaybe<Executor_Filter>>>;
  filledOrders_?: InputMaybe<Order_Filter>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Executor_Filter>>>;
};

export enum Executor_OrderBy {
  Address = 'address',
  FilledOrders = 'filledOrders',
  Id = 'id'
}

export type Handler = {
  __typename?: 'Handler';
  address: Scalars['Bytes']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  state: State;
};

export type Handler_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars['Bytes']['input']>;
  address_contains?: InputMaybe<Scalars['Bytes']['input']>;
  address_gt?: InputMaybe<Scalars['Bytes']['input']>;
  address_gte?: InputMaybe<Scalars['Bytes']['input']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  address_lt?: InputMaybe<Scalars['Bytes']['input']>;
  address_lte?: InputMaybe<Scalars['Bytes']['input']>;
  address_not?: InputMaybe<Scalars['Bytes']['input']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  and?: InputMaybe<Array<InputMaybe<Handler_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<Handler_Filter>>>;
  state?: InputMaybe<Scalars['String']['input']>;
  state_?: InputMaybe<State_Filter>;
  state_contains?: InputMaybe<Scalars['String']['input']>;
  state_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  state_ends_with?: InputMaybe<Scalars['String']['input']>;
  state_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  state_gt?: InputMaybe<Scalars['String']['input']>;
  state_gte?: InputMaybe<Scalars['String']['input']>;
  state_in?: InputMaybe<Array<Scalars['String']['input']>>;
  state_lt?: InputMaybe<Scalars['String']['input']>;
  state_lte?: InputMaybe<Scalars['String']['input']>;
  state_not?: InputMaybe<Scalars['String']['input']>;
  state_not_contains?: InputMaybe<Scalars['String']['input']>;
  state_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  state_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  state_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  state_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  state_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  state_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  state_starts_with?: InputMaybe<Scalars['String']['input']>;
  state_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Handler_OrderBy {
  Address = 'address',
  Id = 'id',
  Name = 'name',
  State = 'state',
  StateCancellationFeePercent = 'state__cancellationFeePercent',
  StateId = 'state__id',
  StateLastRebalanceTime = 'state__lastRebalanceTime',
  StateProtocolFeePercent = 'state__protocolFeePercent'
}

export type Order = {
  __typename?: 'Order';
  cancelledTxHash?: Maybe<Scalars['Bytes']['output']>;
  createdAtBlock: Scalars['BigInt']['output'];
  createdTxHash?: Maybe<Scalars['Bytes']['output']>;
  creator: User;
  executedAtBlock?: Maybe<Scalars['BigInt']['output']>;
  executedTxHash?: Maybe<Scalars['Bytes']['output']>;
  executionFee: Scalars['BigInt']['output'];
  executor?: Maybe<Executor>;
  id: Scalars['ID']['output'];
  inputAfterFee?: Maybe<Scalars['BigDecimal']['output']>;
  inputAmount: Scalars['BigInt']['output'];
  inputToken: Scalars['Bytes']['output'];
  limitPrice?: Maybe<Scalars['BigDecimal']['output']>;
  minReturnAmount: Scalars['BigInt']['output'];
  orderEncodedData: Scalars['Bytes']['output'];
  orderId: Scalars['Bytes']['output'];
  outputToken: Scalars['Bytes']['output'];
  recipient: Scalars['Bytes']['output'];
  returnAmount?: Maybe<Scalars['BigInt']['output']>;
  shares: Scalars['BigInt']['output'];
  status: Status;
  stoplossAmount: Scalars['BigInt']['output'];
  stoplossPrice?: Maybe<Scalars['BigDecimal']['output']>;
  timestamp: Scalars['BigInt']['output'];
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
  yieldEarned?: Maybe<Scalars['BigInt']['output']>;
};

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Order_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Order_Filter>>>;
  cancelledTxHash?: InputMaybe<Scalars['Bytes']['input']>;
  cancelledTxHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  cancelledTxHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  cancelledTxHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  cancelledTxHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  cancelledTxHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  cancelledTxHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  cancelledTxHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  cancelledTxHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  cancelledTxHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  createdAtBlock?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlock_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlock_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlock_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAtBlock_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlock_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlock_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdTxHash?: InputMaybe<Scalars['Bytes']['input']>;
  createdTxHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  createdTxHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  createdTxHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  createdTxHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  createdTxHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  createdTxHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  createdTxHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  createdTxHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  createdTxHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  creator?: InputMaybe<Scalars['String']['input']>;
  creator_?: InputMaybe<User_Filter>;
  creator_contains?: InputMaybe<Scalars['String']['input']>;
  creator_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  creator_ends_with?: InputMaybe<Scalars['String']['input']>;
  creator_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creator_gt?: InputMaybe<Scalars['String']['input']>;
  creator_gte?: InputMaybe<Scalars['String']['input']>;
  creator_in?: InputMaybe<Array<Scalars['String']['input']>>;
  creator_lt?: InputMaybe<Scalars['String']['input']>;
  creator_lte?: InputMaybe<Scalars['String']['input']>;
  creator_not?: InputMaybe<Scalars['String']['input']>;
  creator_not_contains?: InputMaybe<Scalars['String']['input']>;
  creator_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  creator_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  creator_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creator_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  creator_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  creator_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creator_starts_with?: InputMaybe<Scalars['String']['input']>;
  creator_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  executedAtBlock?: InputMaybe<Scalars['BigInt']['input']>;
  executedAtBlock_gt?: InputMaybe<Scalars['BigInt']['input']>;
  executedAtBlock_gte?: InputMaybe<Scalars['BigInt']['input']>;
  executedAtBlock_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  executedAtBlock_lt?: InputMaybe<Scalars['BigInt']['input']>;
  executedAtBlock_lte?: InputMaybe<Scalars['BigInt']['input']>;
  executedAtBlock_not?: InputMaybe<Scalars['BigInt']['input']>;
  executedAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  executedTxHash?: InputMaybe<Scalars['Bytes']['input']>;
  executedTxHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  executedTxHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  executedTxHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  executedTxHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  executedTxHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  executedTxHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  executedTxHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  executedTxHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  executedTxHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  executionFee?: InputMaybe<Scalars['BigInt']['input']>;
  executionFee_gt?: InputMaybe<Scalars['BigInt']['input']>;
  executionFee_gte?: InputMaybe<Scalars['BigInt']['input']>;
  executionFee_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  executionFee_lt?: InputMaybe<Scalars['BigInt']['input']>;
  executionFee_lte?: InputMaybe<Scalars['BigInt']['input']>;
  executionFee_not?: InputMaybe<Scalars['BigInt']['input']>;
  executionFee_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  executor?: InputMaybe<Scalars['String']['input']>;
  executor_?: InputMaybe<Executor_Filter>;
  executor_contains?: InputMaybe<Scalars['String']['input']>;
  executor_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  executor_ends_with?: InputMaybe<Scalars['String']['input']>;
  executor_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  executor_gt?: InputMaybe<Scalars['String']['input']>;
  executor_gte?: InputMaybe<Scalars['String']['input']>;
  executor_in?: InputMaybe<Array<Scalars['String']['input']>>;
  executor_lt?: InputMaybe<Scalars['String']['input']>;
  executor_lte?: InputMaybe<Scalars['String']['input']>;
  executor_not?: InputMaybe<Scalars['String']['input']>;
  executor_not_contains?: InputMaybe<Scalars['String']['input']>;
  executor_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  executor_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  executor_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  executor_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  executor_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  executor_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  executor_starts_with?: InputMaybe<Scalars['String']['input']>;
  executor_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  inputAfterFee?: InputMaybe<Scalars['BigDecimal']['input']>;
  inputAfterFee_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  inputAfterFee_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  inputAfterFee_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  inputAfterFee_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  inputAfterFee_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  inputAfterFee_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  inputAfterFee_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  inputAmount?: InputMaybe<Scalars['BigInt']['input']>;
  inputAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  inputAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  inputAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  inputAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  inputAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  inputAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  inputAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  inputToken?: InputMaybe<Scalars['Bytes']['input']>;
  inputToken_contains?: InputMaybe<Scalars['Bytes']['input']>;
  inputToken_gt?: InputMaybe<Scalars['Bytes']['input']>;
  inputToken_gte?: InputMaybe<Scalars['Bytes']['input']>;
  inputToken_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  inputToken_lt?: InputMaybe<Scalars['Bytes']['input']>;
  inputToken_lte?: InputMaybe<Scalars['Bytes']['input']>;
  inputToken_not?: InputMaybe<Scalars['Bytes']['input']>;
  inputToken_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  inputToken_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  limitPrice?: InputMaybe<Scalars['BigDecimal']['input']>;
  limitPrice_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  limitPrice_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  limitPrice_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  limitPrice_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  limitPrice_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  limitPrice_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  limitPrice_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  minReturnAmount?: InputMaybe<Scalars['BigInt']['input']>;
  minReturnAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  minReturnAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  minReturnAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  minReturnAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  minReturnAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  minReturnAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  minReturnAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Order_Filter>>>;
  orderEncodedData?: InputMaybe<Scalars['Bytes']['input']>;
  orderEncodedData_contains?: InputMaybe<Scalars['Bytes']['input']>;
  orderEncodedData_gt?: InputMaybe<Scalars['Bytes']['input']>;
  orderEncodedData_gte?: InputMaybe<Scalars['Bytes']['input']>;
  orderEncodedData_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  orderEncodedData_lt?: InputMaybe<Scalars['Bytes']['input']>;
  orderEncodedData_lte?: InputMaybe<Scalars['Bytes']['input']>;
  orderEncodedData_not?: InputMaybe<Scalars['Bytes']['input']>;
  orderEncodedData_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  orderEncodedData_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  orderId?: InputMaybe<Scalars['Bytes']['input']>;
  orderId_contains?: InputMaybe<Scalars['Bytes']['input']>;
  orderId_gt?: InputMaybe<Scalars['Bytes']['input']>;
  orderId_gte?: InputMaybe<Scalars['Bytes']['input']>;
  orderId_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  orderId_lt?: InputMaybe<Scalars['Bytes']['input']>;
  orderId_lte?: InputMaybe<Scalars['Bytes']['input']>;
  orderId_not?: InputMaybe<Scalars['Bytes']['input']>;
  orderId_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  orderId_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  outputToken?: InputMaybe<Scalars['Bytes']['input']>;
  outputToken_contains?: InputMaybe<Scalars['Bytes']['input']>;
  outputToken_gt?: InputMaybe<Scalars['Bytes']['input']>;
  outputToken_gte?: InputMaybe<Scalars['Bytes']['input']>;
  outputToken_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  outputToken_lt?: InputMaybe<Scalars['Bytes']['input']>;
  outputToken_lte?: InputMaybe<Scalars['Bytes']['input']>;
  outputToken_not?: InputMaybe<Scalars['Bytes']['input']>;
  outputToken_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  outputToken_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  recipient?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_contains?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_gt?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_gte?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  recipient_lt?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_lte?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_not?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  recipient_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  returnAmount?: InputMaybe<Scalars['BigInt']['input']>;
  returnAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  returnAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  returnAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  returnAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  returnAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  returnAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  returnAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  shares?: InputMaybe<Scalars['BigInt']['input']>;
  shares_gt?: InputMaybe<Scalars['BigInt']['input']>;
  shares_gte?: InputMaybe<Scalars['BigInt']['input']>;
  shares_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  shares_lt?: InputMaybe<Scalars['BigInt']['input']>;
  shares_lte?: InputMaybe<Scalars['BigInt']['input']>;
  shares_not?: InputMaybe<Scalars['BigInt']['input']>;
  shares_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  status?: InputMaybe<Status>;
  status_in?: InputMaybe<Array<Status>>;
  status_not?: InputMaybe<Status>;
  status_not_in?: InputMaybe<Array<Status>>;
  stoplossAmount?: InputMaybe<Scalars['BigInt']['input']>;
  stoplossAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  stoplossAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  stoplossAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  stoplossAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  stoplossAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  stoplossAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  stoplossAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  stoplossPrice?: InputMaybe<Scalars['BigDecimal']['input']>;
  stoplossPrice_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  stoplossPrice_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  stoplossPrice_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  stoplossPrice_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  stoplossPrice_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  stoplossPrice_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  stoplossPrice_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  updatedAt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  updatedAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  yieldEarned?: InputMaybe<Scalars['BigInt']['input']>;
  yieldEarned_gt?: InputMaybe<Scalars['BigInt']['input']>;
  yieldEarned_gte?: InputMaybe<Scalars['BigInt']['input']>;
  yieldEarned_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  yieldEarned_lt?: InputMaybe<Scalars['BigInt']['input']>;
  yieldEarned_lte?: InputMaybe<Scalars['BigInt']['input']>;
  yieldEarned_not?: InputMaybe<Scalars['BigInt']['input']>;
  yieldEarned_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum Order_OrderBy {
  CancelledTxHash = 'cancelledTxHash',
  CreatedAtBlock = 'createdAtBlock',
  CreatedTxHash = 'createdTxHash',
  Creator = 'creator',
  CreatorAddress = 'creator__address',
  CreatorId = 'creator__id',
  ExecutedAtBlock = 'executedAtBlock',
  ExecutedTxHash = 'executedTxHash',
  ExecutionFee = 'executionFee',
  Executor = 'executor',
  ExecutorAddress = 'executor__address',
  ExecutorId = 'executor__id',
  Id = 'id',
  InputAfterFee = 'inputAfterFee',
  InputAmount = 'inputAmount',
  InputToken = 'inputToken',
  LimitPrice = 'limitPrice',
  MinReturnAmount = 'minReturnAmount',
  OrderEncodedData = 'orderEncodedData',
  OrderId = 'orderId',
  OutputToken = 'outputToken',
  Recipient = 'recipient',
  ReturnAmount = 'returnAmount',
  Shares = 'shares',
  Status = 'status',
  StoplossAmount = 'stoplossAmount',
  StoplossPrice = 'stoplossPrice',
  Timestamp = 'timestamp',
  UpdatedAt = 'updatedAt',
  YieldEarned = 'yieldEarned'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  executor?: Maybe<Executor>;
  executors: Array<Executor>;
  handler?: Maybe<Handler>;
  handlers: Array<Handler>;
  order?: Maybe<Order>;
  orders: Array<Order>;
  rebalance?: Maybe<Rebalance>;
  rebalances: Array<Rebalance>;
  state?: Maybe<State>;
  states: Array<State>;
  tokenDetail?: Maybe<TokenDetail>;
  tokenDetails: Array<TokenDetail>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryExecutorArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryExecutorsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Executor_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Executor_Filter>;
};


export type QueryHandlerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryHandlersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Handler_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Handler_Filter>;
};


export type QueryOrderArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryOrdersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Order_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Order_Filter>;
};


export type QueryRebalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRebalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Rebalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Rebalance_Filter>;
};


export type QueryStateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryStatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<State_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<State_Filter>;
};


export type QueryTokenDetailArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTokenDetailsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokenDetail_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenDetail_Filter>;
};


export type QueryUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};

export type Rebalance = {
  __typename?: 'Rebalance';
  id: Scalars['ID']['output'];
  rebalancedBy: Scalars['Bytes']['output'];
  timestamp: Scalars['BigInt']['output'];
  txCost: Scalars['BigDecimal']['output'];
  txHash?: Maybe<Scalars['Bytes']['output']>;
};

export type Rebalance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Rebalance_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Rebalance_Filter>>>;
  rebalancedBy?: InputMaybe<Scalars['Bytes']['input']>;
  rebalancedBy_contains?: InputMaybe<Scalars['Bytes']['input']>;
  rebalancedBy_gt?: InputMaybe<Scalars['Bytes']['input']>;
  rebalancedBy_gte?: InputMaybe<Scalars['Bytes']['input']>;
  rebalancedBy_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  rebalancedBy_lt?: InputMaybe<Scalars['Bytes']['input']>;
  rebalancedBy_lte?: InputMaybe<Scalars['Bytes']['input']>;
  rebalancedBy_not?: InputMaybe<Scalars['Bytes']['input']>;
  rebalancedBy_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  rebalancedBy_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  txCost?: InputMaybe<Scalars['BigDecimal']['input']>;
  txCost_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  txCost_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  txCost_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  txCost_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  txCost_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  txCost_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  txCost_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  txHash?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  txHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum Rebalance_OrderBy {
  Id = 'id',
  RebalancedBy = 'rebalancedBy',
  Timestamp = 'timestamp',
  TxCost = 'txCost',
  TxHash = 'txHash'
}

export type State = {
  __typename?: 'State';
  cancellationFeePercent?: Maybe<Scalars['BigDecimal']['output']>;
  handlers?: Maybe<Array<Handler>>;
  id: Scalars['ID']['output'];
  lastRebalanceTime: Scalars['BigInt']['output'];
  protocolFeePercent?: Maybe<Scalars['BigDecimal']['output']>;
};


export type StateHandlersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Handler_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Handler_Filter>;
};

export type State_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<State_Filter>>>;
  cancellationFeePercent?: InputMaybe<Scalars['BigDecimal']['input']>;
  cancellationFeePercent_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  cancellationFeePercent_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  cancellationFeePercent_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  cancellationFeePercent_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  cancellationFeePercent_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  cancellationFeePercent_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  cancellationFeePercent_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  handlers_?: InputMaybe<Handler_Filter>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  lastRebalanceTime?: InputMaybe<Scalars['BigInt']['input']>;
  lastRebalanceTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastRebalanceTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastRebalanceTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastRebalanceTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastRebalanceTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastRebalanceTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastRebalanceTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<State_Filter>>>;
  protocolFeePercent?: InputMaybe<Scalars['BigDecimal']['input']>;
  protocolFeePercent_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  protocolFeePercent_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  protocolFeePercent_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  protocolFeePercent_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  protocolFeePercent_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  protocolFeePercent_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  protocolFeePercent_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
};

export enum State_OrderBy {
  CancellationFeePercent = 'cancellationFeePercent',
  Handlers = 'handlers',
  Id = 'id',
  LastRebalanceTime = 'lastRebalanceTime',
  ProtocolFeePercent = 'protocolFeePercent'
}

export enum Status {
  Active = 'ACTIVE',
  Cancelled = 'CANCELLED',
  Executed = 'EXECUTED'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  executor?: Maybe<Executor>;
  executors: Array<Executor>;
  handler?: Maybe<Handler>;
  handlers: Array<Handler>;
  order?: Maybe<Order>;
  orders: Array<Order>;
  rebalance?: Maybe<Rebalance>;
  rebalances: Array<Rebalance>;
  state?: Maybe<State>;
  states: Array<State>;
  tokenDetail?: Maybe<TokenDetail>;
  tokenDetails: Array<TokenDetail>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionExecutorArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionExecutorsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Executor_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Executor_Filter>;
};


export type SubscriptionHandlerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionHandlersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Handler_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Handler_Filter>;
};


export type SubscriptionOrderArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionOrdersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Order_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Order_Filter>;
};


export type SubscriptionRebalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRebalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Rebalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Rebalance_Filter>;
};


export type SubscriptionStateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionStatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<State_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<State_Filter>;
};


export type SubscriptionTokenDetailArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTokenDetailsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokenDetail_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenDetail_Filter>;
};


export type SubscriptionUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};

export type TokenDetail = {
  __typename?: 'TokenDetail';
  address: Scalars['Bytes']['output'];
  bufferPercent?: Maybe<Scalars['BigInt']['output']>;
  id: Scalars['ID']['output'];
  isWhitelistToken: Scalars['Boolean']['output'];
  strategy?: Maybe<Scalars['Bytes']['output']>;
  totalFunds: Scalars['BigInt']['output'];
  totalShares: Scalars['BigInt']['output'];
};

export type TokenDetail_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars['Bytes']['input']>;
  address_contains?: InputMaybe<Scalars['Bytes']['input']>;
  address_gt?: InputMaybe<Scalars['Bytes']['input']>;
  address_gte?: InputMaybe<Scalars['Bytes']['input']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  address_lt?: InputMaybe<Scalars['Bytes']['input']>;
  address_lte?: InputMaybe<Scalars['Bytes']['input']>;
  address_not?: InputMaybe<Scalars['Bytes']['input']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  and?: InputMaybe<Array<InputMaybe<TokenDetail_Filter>>>;
  bufferPercent?: InputMaybe<Scalars['BigInt']['input']>;
  bufferPercent_gt?: InputMaybe<Scalars['BigInt']['input']>;
  bufferPercent_gte?: InputMaybe<Scalars['BigInt']['input']>;
  bufferPercent_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  bufferPercent_lt?: InputMaybe<Scalars['BigInt']['input']>;
  bufferPercent_lte?: InputMaybe<Scalars['BigInt']['input']>;
  bufferPercent_not?: InputMaybe<Scalars['BigInt']['input']>;
  bufferPercent_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  isWhitelistToken?: InputMaybe<Scalars['Boolean']['input']>;
  isWhitelistToken_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isWhitelistToken_not?: InputMaybe<Scalars['Boolean']['input']>;
  isWhitelistToken_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  or?: InputMaybe<Array<InputMaybe<TokenDetail_Filter>>>;
  strategy?: InputMaybe<Scalars['Bytes']['input']>;
  strategy_contains?: InputMaybe<Scalars['Bytes']['input']>;
  strategy_gt?: InputMaybe<Scalars['Bytes']['input']>;
  strategy_gte?: InputMaybe<Scalars['Bytes']['input']>;
  strategy_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  strategy_lt?: InputMaybe<Scalars['Bytes']['input']>;
  strategy_lte?: InputMaybe<Scalars['Bytes']['input']>;
  strategy_not?: InputMaybe<Scalars['Bytes']['input']>;
  strategy_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  strategy_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  totalFunds?: InputMaybe<Scalars['BigInt']['input']>;
  totalFunds_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalFunds_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalFunds_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalFunds_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalFunds_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalFunds_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalFunds_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalShares?: InputMaybe<Scalars['BigInt']['input']>;
  totalShares_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalShares_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalShares_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalShares_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalShares_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalShares_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalShares_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum TokenDetail_OrderBy {
  Address = 'address',
  BufferPercent = 'bufferPercent',
  Id = 'id',
  IsWhitelistToken = 'isWhitelistToken',
  Strategy = 'strategy',
  TotalFunds = 'totalFunds',
  TotalShares = 'totalShares'
}

export type User = {
  __typename?: 'User';
  address: Scalars['Bytes']['output'];
  id: Scalars['ID']['output'];
  orders?: Maybe<Array<Order>>;
};


export type UserOrdersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Order_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Order_Filter>;
};

export type User_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars['Bytes']['input']>;
  address_contains?: InputMaybe<Scalars['Bytes']['input']>;
  address_gt?: InputMaybe<Scalars['Bytes']['input']>;
  address_gte?: InputMaybe<Scalars['Bytes']['input']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  address_lt?: InputMaybe<Scalars['Bytes']['input']>;
  address_lte?: InputMaybe<Scalars['Bytes']['input']>;
  address_not?: InputMaybe<Scalars['Bytes']['input']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  and?: InputMaybe<Array<InputMaybe<User_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<User_Filter>>>;
  orders_?: InputMaybe<Order_Filter>;
};

export enum User_OrderBy {
  Address = 'address',
  Id = 'id',
  Orders = 'orders'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']['output']>;
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type GetOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrdersQuery = { __typename?: 'Query', states: Array<{ __typename?: 'State', protocolFeePercent?: any | null }>, orders: Array<{ __typename?: 'Order', id: string, yieldEarned?: any | null, orderId: any, recipient: any, creator: { __typename?: 'User', id: string } }> };


export const GetOrdersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"states"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"protocolFeePercent"}}]}},{"kind":"Field","name":{"kind":"Name","value":"orders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"yieldEarned"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"recipient"}}]}}]}}]} as unknown as DocumentNode<GetOrdersQuery, GetOrdersQueryVariables>;