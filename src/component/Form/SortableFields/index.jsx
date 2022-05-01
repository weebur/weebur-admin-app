import React from 'react';
import { DndContext, useSensors, useSensor, PointerSensor } from '@dnd-kit/core';
import Droppable from './Droppable';
import { cloneDeep } from 'lodash-es';

class MyPointerSensor extends PointerSensor {
    static activators = [
        {
            eventName: 'onPointerDown',
            handler: ({ nativeEvent: event }) => {
                if (!event.isPrimary || event.button !== 0 || isInteractiveElement(event.target)) {
                    return false;
                }

                return true;
            },
        },
    ];
}

function isInteractiveElement(element) {
    const interactiveElements = ['button', 'input', 'textarea', 'select', 'option'];

    if (interactiveElements.includes(element.tagName.toLowerCase())) {
        return true;
    }

    return false;
}

function DraggableFields({ id, ids, onChange, children }) {
    const sensors = useSensors(
        useSensor(MyPointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
    );

    return (
        <DndContext
            sensors={sensors}
            onDragEnd={({ active, over }) => {
                const oldIndex = ids.indexOf(active.id);
                const newIndex = ids.indexOf(over?.id);

                if (newIndex < 0) return;

                const cloned = cloneDeep(ids);
                const removed = cloned.splice(oldIndex, 1)[0];

                cloned.splice(newIndex, 0, removed);

                onChange(cloned);
            }}
        >
            <div style={{ display: 'flex', width: '100%' }}>
                <Droppable id={id} ids={ids}>
                    {children}
                </Droppable>
            </div>
        </DndContext>
    );
}

export default DraggableFields;
