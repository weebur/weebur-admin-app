import styled from 'styled-components';

const Ellipsis = styled.div`
    display: -webkit-box;
    -webkit-line-clamp: ${({ line }) => line || 1};
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    word-break: break-all;
    width: 100%;
`;

export default Ellipsis;
