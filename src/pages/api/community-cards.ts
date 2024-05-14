import type { NextApiRequest, NextApiResponse } from 'next';

const communityCards = [
    { rank: '2', suit: 'clubs', image: '/images/2_of_clubs.png' },
    { rank: '3', suit: 'clubs', image: '/images/3_of_clubs.png' },
    { rank: '4', suit: 'clubs', image: '/images/4_of_clubs.png' },
    { rank: '5', suit: 'clubs', image: '/images/5_of_clubs.png' },
    { rank: '6', suit: 'clubs', image: '/images/6_of_clubs.png' }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(communityCards);
}
