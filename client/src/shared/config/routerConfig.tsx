import { Navigate, RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage/ui/MainPage';
import { NewsPage } from 'pages/News';
import { EventsPage } from 'pages/EventsPage';
import { SignIn } from 'pages/SignIn';
import { SignUp } from 'pages/SignUp';
import { PostPage } from 'pages/PostPage';
import { EventPage } from 'pages/EventPage';
import { AboutPage } from 'pages/AboutPage';

export enum AppRoutesEnum {
  MAIN = 'main',
  EVENTS = 'events',
  EVENT = 'event',
  NEWS = 'news',
  POST = 'post',
  SIGN_IN = 'sign_in',
  SIGN_UP = 'sign_up',
  ABOUT = 'about',
  ALL = 'all',
}

export const RoutePath: Record<AppRoutesEnum, string> = {
  [AppRoutesEnum.MAIN]: '/',
  [AppRoutesEnum.EVENTS]: '/EventsPage',
  [AppRoutesEnum.NEWS]: '/news',
  [AppRoutesEnum.EVENT]: '/EventsPage/:id',
  [AppRoutesEnum.POST]: '/news/:id',
  [AppRoutesEnum.SIGN_UP]: '/sign_up',
  [AppRoutesEnum.SIGN_IN]: '/sign_in',
  [AppRoutesEnum.ABOUT]: '/about',
  [AppRoutesEnum.ALL]: '*'
};

export const routerConfig: Record<AppRoutesEnum, RouteProps> = {
  [AppRoutesEnum.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />
  },
  [AppRoutesEnum.NEWS]: {
    path: RoutePath.news,
    element: <NewsPage />
  },
  [AppRoutesEnum.POST]: {
    path: RoutePath.post,
    element: <PostPage />
  },
  [AppRoutesEnum.EVENTS]: {
    path: RoutePath.events,
    element: <EventsPage />
  },
  [AppRoutesEnum.EVENT]: {
    path: RoutePath.event,
    element: <EventPage />
  },
  [AppRoutesEnum.SIGN_IN]: {
    path: RoutePath.sign_in,
    element: <SignIn />
  },
  [AppRoutesEnum.SIGN_UP]: {
    path: RoutePath.sign_up,
    element: <SignUp />
  },
  [AppRoutesEnum.ABOUT]: {
    path: RoutePath.about,
    element: <AboutPage />
  },
  [AppRoutesEnum.ALL]: {
    path: RoutePath.all,
    element: <Navigate to={RoutePath.main} />
  }
};
