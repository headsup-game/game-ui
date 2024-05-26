"use client";
export interface Card {
    rank: string;
    suit: string;
    image: string;
}
export const rankMap: Record<string, string> = {
    0: '2',
    1: '3',
    2: '4',
    3: '5',
    4: '6',
    5: '7',
    6: '8',
    7: '9',
    8: '10',
    9: 'jack',
    10: 'queen',
    11: 'king',
    12: 'ace'
};
export const suitMap: Record<string, string> = {
    0: 'hearts',
    1: 'diamonds',
    2: 'clubs',
    3: 'spades'
};
