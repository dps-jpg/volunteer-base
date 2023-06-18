import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { routerConfig } from 'shared/config/routerConfig';
import { Navbar } from 'widget/Navbar/ui/Navbar';
import { Footer } from 'widget/Footer';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import './styles/index.css';
import './styles/global.css';

export const App: FC = () => {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        {/* <Route element={<div />}> */}
        {Object.values(routerConfig).map(({ element, path }) => (
          <Route key={path} path={path} element={element} />
        ))}
        {/* </Route> */}
      </Routes>
      <Footer />
    </div>
  );
};
