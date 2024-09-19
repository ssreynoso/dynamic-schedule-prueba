import { PropsWithChildren } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

export function Draggable(props: PropsWithChildren) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: 'draggable',
    })
    const style = transform
        ? {
              //   transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
              transform: CSS.Translate.toString(transform),
          }
        : undefined

    return (
        <button className='w-[100px] h-20 bg-red-400' ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {props.children}
        </button>
    )
}
