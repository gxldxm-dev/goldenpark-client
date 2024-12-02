import { lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Categories = lazy(() => import('./pages/Categories'));
const Category = lazy(() => import('./pages/Category'));
const CreateCategory = lazy(() => import('./pages/CreateCategory'));
const Girls = lazy(() => import('./pages/Girls'));
const Girl = lazy(() => import('./pages/Girl'));
const CreateGirl = lazy(() => import('./pages/CreateGirl'));
const Videos = lazy(() => import('./pages/Videos'));
const Video = lazy(() => import('./pages/Video'));
const CreateStudio = lazy(() => import('./pages/CreateStudio'));
const Studios = lazy(() => import('./pages/Studios'));
const Studio = lazy(() => import('./pages/Studio'));

const routes = [
  { path: '/', component: Home },
  { path: '/categories', component: Categories },
  { path: '/category/:id', component: Category },
  { path: '/create-category', component: CreateCategory },
  { path: '/girls', component: Girls },
  { path: '/girl/:id', component: Girl },
  { path: '/create-girl', component: CreateGirl },
  { path: '/videos', component: Videos },
  { path: '/video/:id', component: Video },
  { path: '/studio/create', component: CreateStudio },
  { path: '/studios', component: Studios },
  { path: '/studio/:id', component: Studio },
];

export default routes;
