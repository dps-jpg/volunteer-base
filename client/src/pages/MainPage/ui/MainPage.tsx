import { FC } from 'react';
import { Box } from '@mui/material';

import { HeaderMainPage } from 'pages/MainPage/components/HeaderMainPage/HeaderMainPage';
import { NewsBlock } from 'pages/MainPage/components/NewsBlock/NewsBlock';
import { MissionBlock } from 'pages/MainPage/components/MissionBlock/MissionBlock';
import { PartnersBlock } from 'pages/MainPage/components/PartnersBlock/PartnersBlock';
import { Links } from "pages/MainPage/components/Links'/Links";

interface MainPageProps {
  className?: string;
}

export const MainPage: FC<MainPageProps> = ({ className }) => {
  return (
    <Box pb={4}>
      <HeaderMainPage />
      <NewsBlock />
      {/* <PartnersBlock /> */}
      <MissionBlock />
      <Links />
    </Box>
  );
};
