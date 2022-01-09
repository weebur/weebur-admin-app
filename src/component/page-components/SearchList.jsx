import { Typography } from 'antd';
import styled from 'styled-components';
import ContentSpace from '../../component/Layout/ContentSpace';
import List from '../../component/List';
import Summary from '../../component/List/Summary';
import Loader from '../../component/Loader';

const SearchFormWrapper = styled.div`
    padding: 50px 0;
`;

const SummaryWrapper = styled.div`
    margin: 55px 0 30px;
`;

const SearchFormTitle = styled.div`
    margin-bottom: 18px;
`;

function SearchList({
    title,
    headers,
    items,
    totalLength,
    hasNext,
    fetchData,
    children,
    withCheckBox,
    loading,
}) {
    return (
        <>
            <SearchFormTitle>
                <Typography.Title level={4}>{title}</Typography.Title>
            </SearchFormTitle>

            <ContentSpace align="center">
                <SearchFormWrapper>{children}</SearchFormWrapper>
            </ContentSpace>

            <SummaryWrapper>
                <Summary total={totalLength} />
            </SummaryWrapper>

            <ContentSpace>
                <List
                    withCheckBox={withCheckBox}
                    headers={headers}
                    data={items}
                    hasNext={hasNext}
                    fetchData={fetchData}
                />
                {loading && <Loader />}
            </ContentSpace>
        </>
    );
}

export default SearchList;
