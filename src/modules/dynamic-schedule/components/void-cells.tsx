import { calculateVoidCells } from '../lib/calculate-void-cells'
import { Column, DynamicScheduleProps } from '../types'

import { getUUID } from '@/lib/uuid'

type Props<T> = Pick<DynamicScheduleProps<T>, 'rows' | 'linesPerRow' | 'rowAssigner' | 'VoidItemComponent'> &
    Required<Pick<DynamicScheduleProps<T>, 'VoidItemComponent'>> & {
        filteredItems: DynamicScheduleProps<T>['items']
        column: Column
    }

export const VoidCells = <T,>(props: Props<T>) => {
    const { rows, linesPerRow, rowAssigner, filteredItems, VoidItemComponent, column } = props

    const voidCells = calculateVoidCells({
        items: filteredItems,
        linesPerRow,
        rowAssigner,
        rows
    })

    return (
        <>
            {voidCells.map(cell => (
                <VoidItemComponent key={getUUID()} columnId={column.id} row={cell.row} />
            ))}
        </>
    )
}
