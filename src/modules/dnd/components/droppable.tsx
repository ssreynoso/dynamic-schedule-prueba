import { PropsWithChildren } from 'react'
import { useDroppable } from '@dnd-kit/core'

type Props = PropsWithChildren<{ id: string }>

export const Droppable = (props: Props) => {
    const { isOver, setNodeRef } = useDroppable({
        id: props.id,
    })
    const style = {
        backgroundColor: isOver ? 'green' : undefined,
    }

    return (
        <div ref={setNodeRef} style={style} className='h-40 border-4 border-dashed border-white'>
            {props.children}
        </div>
    )
}
