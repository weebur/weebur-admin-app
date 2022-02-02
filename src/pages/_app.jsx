import 'antd/dist/antd.variable.min.css';
import '../styles/globals.css';

import React from 'react';
import { ConfigProvider } from 'antd';
import theme from '../theme';
import { ThemeProvider } from 'styled-components';
import { setTwoToneColor } from '@ant-design/icons';
import AppLayout from '../component/Layout';

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
    const { withoutSidebar, ...props } = pageProps;
    return (
        <ThemeProvider theme={theme}>
            <AppLayout withoutSidebar={withoutSidebar}>
                <Component {...props} />
            </AppLayout>
        </ThemeProvider>
    );
}

export default App;
