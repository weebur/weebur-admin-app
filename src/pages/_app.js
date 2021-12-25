import '../styles/globals.css';
import 'antd/dist/antd.css';
import AppLayout from '../component/Layout';
import { ConfigProvider } from 'antd';
import theme from '../theme';
import { ThemeProvider } from 'styled-components';
import React from 'react';

typeof window !== 'undefined' &&
    ConfigProvider.config({
        theme: {
            primaryColor: theme.color.primary,
        },
    });

if (typeof document === 'undefined') {
    React.useLayoutEffect = React.useEffect;
}

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider theme={theme}>
            <AppLayout>
                <Component {...pageProps} />
            </AppLayout>
        </ThemeProvider>
    );
}

export default MyApp;
