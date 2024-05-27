"use client";

import PokerTable from './components/PokerTable';
import LandingPageComponent from './components/LandingPage';
import { useRouter } from 'next/router'

export default function Home() {
  return (
      <div>
        <LandingPageComponent />
      </div>
  );
}
