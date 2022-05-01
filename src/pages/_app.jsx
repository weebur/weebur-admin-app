import 'antd/dist/antd.variable.min.css';
import '../styles/globals.css';
import '../styles/Calendar.css';

import React from 'react';
import { ConfigProvider } from 'antd';
import Head from 'next/head';
import theme from '../theme';
import { ThemeProvider } from 'styled-components';
import { setTwoToneColor } from '@ant-design/icons';
import AppLayout from '../component/Layout';
import useAdminUser from '../hooks/useAdminUser';

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
    const { me } = useAdminUser();
    const { withoutSidebar, withoutContext, ...props } = pageProps;

    if (withoutContext) {
        return <Component {...props} />;
    }

    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/favicon.ico" />
                <title>WEEBUR BACKOFFICE 2.0</title>
            </Head>

            <ThemeProvider theme={theme}>
                <AppLayout me={me} withoutSidebar={withoutSidebar}>
                    <Component {...props} />
                </AppLayout>
            </ThemeProvider>
        </>
    );
}

export default App;
