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
    const { withoutSidebar, withoutContext, wide, ...props } = pageProps;

    if (withoutContext) {
        return <Component {...props} />;
    }

    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/favicon.ico" />
                <title>WEEBUR BACKOFFICE 2.0</title>
                <meta property="og:image" content="/full_logo.png" />
                <meta property="og:title" content="Weebur Back-office" />
                <meta property="og:description" content="위버 어드민 사이트" />
            </Head>

            <ThemeProvider theme={theme}>
                <AppLayout me={me} withoutSidebar={withoutSidebar} wide={wide}>
                    <Component {...props} />
                </AppLayout>
            </ThemeProvider>
        </>
    );
}

export default App;
