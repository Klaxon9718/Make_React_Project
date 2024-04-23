import Header from 'src/pages/section/Header';
import * as React from 'react';
import * as HomeCom from 'src/pages/components/HomeComponents'


function Home() {
  return (
    <div>
      <Header />
      <HomeCom.SwipeableTextMobileStepper />
      창대한 인사말
    </div>
  );
}

export default Home;