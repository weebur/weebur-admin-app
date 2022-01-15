import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const StyledLoader = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px;
    width: 100%;
`;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function Loader({ outlined }) {
    return (
        <StyledLoader>
            <Spin tip="Loading..." indicator={outlined && antIcon} />
        </StyledLoader>
    );
}
export default Loader;
