import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AmountGift from '../pages/sender/amountGift';
import WelcomePage from '../pages';
import SelectGift from '../pages/sender/selectGift';
import MessageGift from '../pages/sender/messageGift';
import FormConfirmGift from '../pages/sender/formConfirmGift';
import ClosingGift from '../pages/receiver/closingGift';
import IsOpenGift from '../pages/receiver/isOpenGift';
import ConfirmReception from '../pages/receiver/confirmReception';
/* import RootPhone from './rootphone';
import MenuPage from './menuPage';
 */
const routes = [

    //  WEBSITE PART
    { path: '/', element: <WelcomePage />, name: 'WelcomePage' },

    // SENDER PART 
    { path: '/Amount', element: <AmountGift />, name: 'Amount' },
    { path: '/Select/Gift', element: <SelectGift />, name: 'SelectGift' },
    { path: '/Message/Gift', element: <MessageGift />, name: 'MessageGift' },
    { path: '/Form/Confirm/Gift', element: <FormConfirmGift />, name: 'MessageGift' },

    // RECEIVER PART
    { path: '/Open/The/Gift', element: <ClosingGift />, name: 'AtOpenGift' },
    { path: '/The/Gift', element: <IsOpenGift />, name: 'TheGift' },
    { path: '/Congratulation', element: <ConfirmReception />, name: 'ConfirmReception' },
    // ADMIN PART
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
