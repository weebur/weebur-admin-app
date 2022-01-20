import { useDroppable } from '@dnd-kit/core';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import SortableItem from './SortableItem';
import React from 'react';
import styled from 'styled-components';

const SortableContainer = styled.div`
    padding: 20px 10px;
    border: 1px solid ${({ theme }) => theme.color.lightBorder};
    border-radius: 4px;
    min-width: 110px;
`;

const Droppable = ({ id, ids, items }) => {
    const { setNodeRef } = useDroppable({ id });

    return (
        <SortableContext id={id} items={ids} strategy={rectSortingStrategy}>
            <SortableContainer ref={setNodeRef}>
                {items.map((item, i) => (
                    <SortableItem key={ids[i]} id={ids[i]} item={item} />
                ))}
            </SortableContainer>
        </SortableContext>
    );
};

export default Droppable;
