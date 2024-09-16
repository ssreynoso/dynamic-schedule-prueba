import { DynamicScheduleProps } from '@/modules/dynamic-schedule/types'
import { DynamicSchedule } from './modules/dynamic-schedule'

type Prueba = {
    id: number
    name: string
}

function App() {
    const columns: DynamicScheduleProps<Prueba>['columns'] = [
        { id: 1, label: 'Columna 1' },
        { id: 2, label: 'Columna 2' },
        { id: 3, label: 'Columna 3' },
    ]

    const rows: DynamicScheduleProps<Prueba>['rows'] = [
        { id: 1, label: 'Fila 1' },
        { id: 2, label: 'Fila 2' },
        { id: 3, label: 'Fila 3' },
    ]

    const items: Prueba[] = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
    ]

    const columnAssigner: DynamicScheduleProps<Prueba>['columnAssigner'] = (item, column) => {
        return item.id === Number(column.id)
    }

    const rowAssigner: DynamicScheduleProps<Prueba>['rowAssigner'] = (item, linesPerRow) => {
        console.log('item', item)
        console.log('linesPerRow', linesPerRow)

        return { rowStart: 1, rowEnd: 2 }
    }

    return (
        <div className='h-screen w-screen p-4'>
            <DynamicSchedule<Prueba>
                columns={columns}
                rows={rows}
                items={items}
                rowHeight={90}
                minColumnWidth={250}
                linesPerRow={1}
                columnAssigner={columnAssigner}
                rowAssigner={rowAssigner}
                ItemComponent={(item) => (
                    <div className='h-full w-full flex items-center justify-center bg-red-500'>{JSON.stringify(item, null, 2)}</div>
                )}
                VoidItemComponent={() => <div className='w-full h-full bg-green-300 border border-red-50'>Void</div>}
                // onHeaderClick={handleHeaderClick}
                headerClassName='bg-muted'
                className='bg-blue-500'
                yAxisLabel='Preuba Y'
            />
        </div>
    )
}

export default App
