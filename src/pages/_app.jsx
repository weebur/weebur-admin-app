import 'antd/dist/antd.variable.min.css';
import '../styles/globals.css';

import { ConfigProvider } from 'antd';
import AppLayout from '../component/Layout';
import theme from '../theme';
import { ThemeProvider } from 'styled-components';

typeof window !== 'undefined' &&
    ConfigProvider.config({
        theme: {
            primaryColor: theme.color.primary,
            textColor: theme.color.text,
        },
    });

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
