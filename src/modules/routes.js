import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AmountGift from '../pages/sender/amountGift';
import WelcomePage from '../pages';
import SelectGift from '../pages/sender/selectGift';
import MessageGift from '../pages/sender/messageGift';
import FormConfirmGift from '../pages/sender/formConfirmGift';
import ClosingGift from '../pages/receiver/closingGift';
import ConfirmReception from '../pages/receiver/confirmReception';
import IsOpenGift from '../pages/receiver/isOpenGift';
import AboutWebsite from '../pages/about'
import Dasboard from '../pages/adminer/dashboard';

const routes = [

    //  WEBSITE PART
    { path: '/', element: <WelcomePage />, name: 'WelcomePage' },
    { path: '/About', element: <AboutWebsite />, name: 'About' },

    // SENDER PART 
    { path: '/Amount', element: <AmountGift />, name: 'Amount' },
    { path: '/Select/Gift', element: <SelectGift />, name: 'SelectGift' },
    { path: '/Message/Gift', element: <MessageGift />, name: 'MessageGift' },
    { path: '/Form/Confirm/Gift', element: <FormConfirmGift />, name: 'MessageGift' },

    // RECEIVER PART
    { path: '/Open/The/Gift', element: <ClosingGift />, name: 'AtOpenGift' },
    { path: '/The/Gift', element: <IsOpenGift />, name: 'TheGift' },
    { path: '/Congratulation', element: <ConfirmReception />, name: 'ConfirmReception' },

    // ADMIN DASHBOARD
    { path: '/Dasboard', element: <Dasboard />, name: 'Dashboard' },

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
