import { useDraggable } from '@dnd-kit/core'
import { PropsWithChildren } from 'react'

export const Draggable = (props: PropsWithChildren<{ id: string }>) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
        id: props.id,
    })

    return (
        <div ref={setNodeRef} {...listeners} {...attributes}>
            {props.children}
        </div>
    )
}
