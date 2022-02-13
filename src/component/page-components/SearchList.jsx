import { Typography } from 'antd';
import styled from 'styled-components';
import ContentSpace from '../../component/Layout/ContentSpace';
import List from '../../component/List';
import Summary from '../../component/List/Summary';
import Loader from '../../component/Loader';
import CreateButton from '../Button/CreateButton';
import CommonButton from '../Button';

const SearchFormWrapper = styled.div`
    padding: 50px 0;
`;

const SummaryWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 55px 0 30px;
`;

const SearchFormTitle = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
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
    createButtonText,
    modifyButtonText,
    onCreateButtonClick,
    onItemClick,
    onCheckedItemChange,
    onModifyButtonClick,
}) {
    return (
        <>
            <SearchFormTitle>
                <Typography.Title level={4}>{title}</Typography.Title>
                {createButtonText && <CreateButton onClick={onCreateButtonClick}>{createButtonText}</CreateButton>}
            </SearchFormTitle>

            <ContentSpace align="center">
                <SearchFormWrapper>{children}</SearchFormWrapper>
            </ContentSpace>

            <SummaryWrapper>
                <Summary total={totalLength} />
                {modifyButtonText && (
                    <CommonButton primary onClick={onModifyButtonClick}>
                        {modifyButtonText}
                    </CommonButton>
                )}
            </SummaryWrapper>

            <ContentSpace>
                <List
                    onCheckedItemChange={onCheckedItemChange}
                    withCheckBox={withCheckBox}
                    headers={headers}
                    data={items}
                    hasNext={hasNext}
                    fetchData={fetchData}
                    onItemClick={onItemClick}
                />
            </ContentSpace>
        </>
    );
}

export default SearchList;
