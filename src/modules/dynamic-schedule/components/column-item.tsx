import { PropsWithChildren } from 'react'
import { useDragAndDrop } from '../hooks/use-drag-and-drop'

type Props = PropsWithChildren<{
    rowStart: string
    rowEnd: string
}>

export const ColumnItem = ({ children, rowStart, rowEnd }: Props) => {
    const { dragActive, handleDrag, handleDragOver, handleDrop } = useDragAndDrop()

    return (
        <div
            onDragStart={handleDrag}
            style={{
                gridRowStart: rowStart,
                gridRowEnd: rowEnd,
            }}
        >
            {children}
        </div>
    )
}
