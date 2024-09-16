import { calculateVoidCells } from '../lib/calculate-void-cells'
import { Column, DynamicScheduleProps } from '../types'

import { getUUID } from '@/lib/uuid'
import { VoidCell } from './void-cell'

type Props<T> = Pick<DynamicScheduleProps<T>, 'rows' | 'VoidItemComponent'> & {
    column: Column
}

export const VoidCells = <T,>(props: Props<T>) => {
    const { rows, column, VoidItemComponent } = props

    const voidCells = calculateVoidCells({ rows })

    return (
        <>
            {voidCells.map((cell) => (
                <VoidCell key={getUUID()} column={column} cell={cell} VoidItemComponent={VoidItemComponent} />
            ))}
        </>
    )
}
