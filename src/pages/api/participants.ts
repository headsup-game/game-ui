import type { NextApiRequest, NextApiResponse } from 'next';

const participants = [
    {
        cards: [
            { rank: 'A', suit: 'hearts', image: '/images/ace_of_hearts.png' },
            { rank: 'K', suit: 'hearts', image: '/images/king_of_hearts.png' }
        ]
    },
    {
        cards: [
            { rank: 'Q', suit: 'hearts', image: '/images/queen_of_hearts.png' },
            { rank: 'J', suit: 'hearts', image: '/images/jack_of_hearts.png' }
        ]
    }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(participants);
}
