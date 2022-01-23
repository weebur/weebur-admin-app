import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DeleteOutlined, PauseOutlined } from '@ant-design/icons';

function SortableItem({ id, onRemove, children }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

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
        zIndex: isDragging ? 1 : 0,
    };

    return (
        <li style={style} ref={setNodeRef} {...attributes} {...listeners}>
            <PauseOutlined />
            {children}
            {onRemove && (
                <DeleteOutlined style={{ fontSize: 16 }} onClick={onRemove} />
            )}
        </li>
    );
}

export default SortableItem;
