import 'antd/dist/antd.variable.min.css';
import '../styles/globals.css';

import React from 'react';
import { ConfigProvider } from 'antd';
import theme from '../theme';
import { ThemeProvider } from 'styled-components';
import { setTwoToneColor } from '@ant-design/icons';

setTwoToneColor(theme.color.primary);

typeof window !== 'undefined' &&
    ConfigProvider.config({
        theme: {
            primaryColor: theme.color.primary,
            textColor: theme.color.text,
        },
    });

if (typeof document === 'undefined') {
    React.useLayoutEffect = React.useEffect;
}

function App({ Component, pageProps }) {
    return (
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default App;
