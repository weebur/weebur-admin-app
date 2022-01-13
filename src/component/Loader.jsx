import{ Spin } from 'antd';

import styled from 'styled-components';

const StyledLoader = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px;
    width: 100%;
`;

function Loader() {
    return (
    <StyledLoader>
      <Spin tip="Loading..."></Spin>
    </StyledLoader>
  )
}
export default Loader;
