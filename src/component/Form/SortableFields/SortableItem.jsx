import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PauseOutlined } from '@ant-design/icons';

function SortableItem({ id, item }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 5,
        borderRadius: 5,
        marginBottom: 5,
        userSelect: 'none',
        cursor: 'grab',
        boxSizing: 'border-box',
        gap: '10px',
    };

    return (
        <li style={style} ref={setNodeRef} {...attributes} {...listeners}>
            <PauseOutlined />
            {item}
        </li>
    );
}

export default SortableItem;
