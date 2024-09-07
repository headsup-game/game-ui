import { gql } from '@apollo/client';

export const GET_POINTS_QUERY =
    gql`query GetPoints {
    users(orderBy: "totalPoints", orderDirection: "desc", limit: 10) {
    items {
            totalPoints
            account
        }
    }
}`