export const Page1 = () => {
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

    const baseItems: Prueba[] = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
    ]

    const [items, setItems] = useState<Prueba[]>(baseItems)

    const columnAssigner: DynamicScheduleProps<Prueba>['columnAssigner'] = (item, column) => {
        return item.id === column.id
    }

    const rowAssigner: DynamicScheduleProps<Prueba>['rowAssigner'] = (item, linesPerRow) => {
        console.log('item', item)
        console.log('linesPerRow', linesPerRow)

        if (item.id === 2) {
            return { rowStart: 1, rowEnd: 4 }
        }

        if (item.id === 3) {
            return { rowStart: 4, rowEnd: 6 }
        }

        return { rowStart: 1, rowEnd: 2 }
    }

    return (
        <div className='h-screen w-screen p-4'>
            <DynamicSchedule<Prueba>
                columns={columns}
                rows={rows}
                items={items}
                rowHeight={150}
                minColumnWidth={250}
                linesPerRow={1}
                columnAssigner={columnAssigner}
                rowAssigner={rowAssigner}
                ItemComponent={(item) => (
                    <div className='h-full w-full flex items-center justify-center border bg-red-500'>
                        <p className='w-2/3 h-2/3 border overflow-y-auto'>{JSON.stringify(item, null, 2)}</p>
                    </div>
                )}
                // onHeaderClick={handleHeaderClick}
                className='bg-blue-500'
                yAxisLabel='Preuba Y'
            />
        </div>
    )
}
