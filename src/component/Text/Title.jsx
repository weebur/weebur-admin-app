import styled from 'styled-components';
import { Typography } from 'antd';

const Title = styled(({ children }) => (
    <Typography.Title level={4}>{children}</Typography.Title>
))`
    font-weight: 500;
`;

export default Title;
