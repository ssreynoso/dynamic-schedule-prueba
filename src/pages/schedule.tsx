import { DynamicScheduleProps } from '@/modules/dynamic-schedule/types'
import { DynamicSchedule } from '@/modules/dynamic-schedule'
import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'

type Prueba = {
    id: number
    name: string
}

export const Schedule = () => {
    const columns: DynamicScheduleProps<Prueba>['columns'] = [
        { id: 1, label: 'Columna 1' },
        { id: 2, label: 'Columna 2' },
        { id: 3, label: 'Columna 3' },
        { id: 4, label: 'Columna 4' },
        { id: 5, label: 'Columna 5' },
    ]

    const rows: DynamicScheduleProps<Prueba>['rows'] = [
        { id: 1, label: 'Fila 1' },
        { id: 2, label: 'Fila 2' },
        { id: 3, label: 'Fila 3' },
        { id: 4, label: 'Fila 4' },
        { id: 5, label: 'Fila 5' },
        { id: 6, label: 'Fila 6' },
    ]

    const items = useMemo<Prueba[]>(() => {
        return [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
            { id: 3, name: 'Item 3' },
        ]
    }, [])

    const [scheduleItems, setScheduleItems] = useState(
        items.map((item) => {
            return {
                ...item,
                columnId: item.id,
                rowId: item.id,
                rowSpan: item.id === 1 ? 2 : 1,
            }
        })
    )

    return (
        <div className='w-screen p-4'>
            <DynamicSchedule<Prueba>
                columns={columns}
                rows={rows}
                scheduleItems={scheduleItems}
                setScheduleItems={setScheduleItems}
                rowHeight={90}
                minColumnWidth={250}
                linesPerRow={1}
                ItemComponent={({ item, className }) => (
                    <div className={cn('h-full w-full flex items-center justify-center bg-red-400', className)}>{item.name}</div>
                )}
                // VoidItemComponent={() => <div className='w-full h-full border'>Void</div>}
                // onHeaderClick={handleHeaderClick}
                // headerClassName='bg-muted'
                className='bg-blue-500'
                yAxisLabel='Preuba Y'
                onChangeItems={({ itemsToMove, callback }) => {
                    console.log('itemsToMove: ', itemsToMove)

                    callback(true)
                }}
            />
        </div>
    )
}
