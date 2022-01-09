import 'antd/dist/antd.variable.min.css';
import '../styles/globals.css';

import { ConfigProvider } from 'antd';
import AppLayout from '../component/Layout';
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

function App({ Component, pageProps }) {
    const { withoutSidebar } = pageProps;

    return (
        <ThemeProvider theme={theme}>
            <AppLayout withSidebar={!withoutSidebar}>
                <Component {...pageProps} />
            </AppLayout>
        </ThemeProvider>
    );
}

export default App;
