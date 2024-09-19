import { createRef, useEffect, useState } from 'react'

export const DragAndDropGrid = () => {
    const columns = [
        { id: 1, label: 'Columna 1' },
        { id: 2, label: 'Columna 2' },
        { id: 3, label: 'Columna 3' },
    ]

    const rows = [
        { id: 1, label: 'Fila 1' },
        { id: 2, label: 'Fila 2' },
        { id: 3, label: 'Fila 3' },
    ]

    const styles = {
        columns: {
            gridTemplateColumns: `repeat(${columns.length}, minmax(100px, 1fr))`,
        },
        rows: {
            gridTemplateRows: `repeat(${rows.length}, minmax(100px, 1fr))`,
        },
    }

    const [cellRefs, setCellRefs] = useState<React.RefObject<HTMLDivElement>[][]>([])

    useEffect(() => {
        // Initialize refs dynamically based on rows and columns
        const refs: React.RefObject<HTMLDivElement>[][] = []
        for (let i = 0; i < rows.length; i++) {
            const rowRefs: React.RefObject<HTMLDivElement>[] = []
            for (let j = 0; j < columns.length; j++) {
                rowRefs.push(createRef<HTMLDivElement>())
            }
            refs.push(rowRefs)
        }
        setCellRefs(refs)
    }, [rows.length, columns.length])

    return (
        <div className='w-full h-[calc(100vh-64px)] items-center justify-center bg-slate-900'>
            <div className='bg-red-300 w-full p-4 flex flex-col gap-4 h-full'>
                {/* Header */}
                <div className='grid h-12 gap-4' style={styles.columns}>
                    {columns.map((column) => (
                        <div key={column.id} className=' flex items-center justify-center font-bold text-xl'>
                            {column.label}
                        </div>
                    ))}
                </div>
                {/* Body */}
                <div className='grid gap-4 flex-1 bg-green-400 w-full' style={styles.columns}>
                    {columns.map((_, colIndex) => (
                        <div key={colIndex} className='grid grid-cols-1 gap-4 bg-slate-600' style={styles.rows}>
                            {rows.map((row, rowIndex) => (
                                <div
                                    key={row.id}
                                    ref={cellRefs[rowIndex] ? cellRefs[rowIndex][colIndex] : null}
                                    className='bg-blue-600 flex items-center justify-center font-bold text-xl'
                                >
                                    {row.label}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
