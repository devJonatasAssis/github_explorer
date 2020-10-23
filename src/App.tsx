import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Routes from './routes';

import GlobalStyles from './styles/global';

const App: React.FC = () => {
    return (
        <>
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
        <GlobalStyles />
        </>
    );
};

export default App;
