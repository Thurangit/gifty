import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AmountGift from '../pages/sender/amountGift';
import WelcomePage from '../pages';
import SelectGift from '../pages/sender/selectGift';
import MessageGift from '../pages/sender/messageGift';
import FormConfirmGift from '../pages/sender/formConfirmGift';
import OpeningGift from './isOpenGift';
import IsOpenGift from './isOpenGift';
import Dasboard from '../adminer/dashboard';
import ShareGift from '../sender/shareGift';

const routes = [
    //  WEBSITE PART
    { path: '/', element: <WelcomePage />, name: 'WelcomePage' },
    { path: '/Share/Gift/:ref', element: <ShareGift />, name: 'WelcomePage' },

    // SENDER PART 
    { path: '/Amount/:amount', element: <AmountGift />, name: 'Amount' },
    { path: '/Select/Gift/:amount', element: <SelectGift />, name: 'SelectGift' },
    { path: '/Message/Gift/:gift/:amount', element: <MessageGift />, name: 'MessageGift' },
    { path: '/Form/Confirm/Gift', element: <FormConfirmGift />, name: 'FormConfirmGift' },

    // RECEIVER PART
    { path: '/Opening/Gift', element: <OpeningGift />, name: 'OpeningGift' },
    { path: '/Gift/Open', element: <IsOpenGift />, name: 'IsOpenGift' },
    { path: '/Form/Confirm/Gift', element: <FormConfirmGift />, name: 'MessageGift' },

    // ADMIN PART
    { path: '/Dashboard', element: <Dasboard />, name: 'Dashboard' },

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
