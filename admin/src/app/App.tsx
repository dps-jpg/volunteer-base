import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { UserListPage } from 'page/UsersListPage';
import { NewsListPage } from 'page/NewsListPage';
import { EventsPage } from 'page/EventsPage';
import { PrivateRoute } from 'widget/PrivateRoute';
import { Auth } from 'page/Auth';

import './styles/index.css';
import 'swiper/css';
import 'swiper/css/navigation';
import { Layout } from 'page/Layout';
import { EventMembers } from 'page/EventMembers';

export const App: FC = () => {
  return (
    <div className="app">
      <Routes>
        <Route path={'/admin-auth'} element={<Auth />} />
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path={'/moderate-users'} element={<UserListPage />} />
            <Route path={'/moderate-news'} element={<NewsListPage />} />
            <Route path={'/moderate-EventsPage'} element={<EventsPage />} />
            <Route path={'/events/:id'} element={<EventMembers />} />
            <Route path={'*'} element={<Navigate to={'/moderate-users'} />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};
