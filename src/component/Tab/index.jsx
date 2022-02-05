import styled from 'styled-components';

const TabsWrapper = styled.div`
    display: flex;
    width: 100%;
    gap: 20px;
`;

const StyledTab = styled.div`
    flex: 1;
    height: 60px;
    padding: 18px 0;
    border-radius: 20px;
    font-weight: bold;
    cursor: pointer;
    color: ${({ theme }) => theme.color.light};
    font-size: ${({ theme }) => theme.fontSize.large};
    text-align: center;
    max-width: 240px;

    ${({ active, theme }) =>
        active &&
        `
      color: ${theme.color.primary};
      background-color: rgba(17, 82, 242, 0.05);
  `}
    &:hover {
        background-color: rgba(17, 82, 242, 0.05);
    }
`;

function Tab({ tabs = [], active, onChange }) {
    return (
        <TabsWrapper>
            {tabs.map(({ key, label }) => {
                return (
                    <StyledTab key={key} active={active === key} onClick={() => onChange(key)}>
                        {label}
                    </StyledTab>
                );
            })}
        </TabsWrapper>
    );
}

export default Tab;
