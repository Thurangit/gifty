import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Accueil from '../pages';
import DigitalGiftingPlatform from '../pages';
/* import RootPhone from './rootphone';
import MenuPage from './menuPage';
 */
const routes = [
    { path: '/', element: <DigitalGiftingPlatform />, name: 'Accueil' },
];

const AppRoutes = () => {
    return (
        <Routes>
            {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
            ))}
        </Routes>
    );
};

export { AppRoutes, routes };
