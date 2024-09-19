import { DynamicScheduleProps } from '../types'

import { getUUID } from '@/lib/uuid'
import { ColumnItem } from './column-item'

type Props<T> = Pick<DynamicScheduleProps<T>, 'ItemComponent'> & {
    columnItems: DynamicScheduleProps<T>['scheduleItems']
}

export const ColumnItems = <T,>(props: Props<T>) => {
    const { ItemComponent, columnItems } = props

    return (
        <>
            {columnItems.map((item) => {
                const rowStart = item.rowId
                const rowEnd = item.rowId + item.rowSpan

                return (
                    <ColumnItem item={item} key={getUUID()} rowStart={rowStart.toString()} rowEnd={rowEnd.toString()}>
                        <ItemComponent item={item} />
                    </ColumnItem>
                )
            })}
        </>
    )
}
