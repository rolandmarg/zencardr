import Head from 'next/head';
import Game from '../components/Game';

function Title() {
  return (
    <Head>
      <title>zencardr</title>
    </Head>
  );
}

export default function Home() {
  return (
    <>
      <Title />
      <Game />
    </>
  );
}
