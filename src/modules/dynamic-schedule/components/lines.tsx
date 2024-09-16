import { cn } from '@/lib/utils'
import { getUUID } from '@/lib/uuid'

type Props = {
    columns: number
    rows: number
    columnsStyle: React.CSSProperties
    rowsStyle: React.CSSProperties
    className?: string
}

export const DynamicScheduleLines = ({ columns, rows, columnsStyle, rowsStyle, className }: Props) => {
    const rowsArray = Array.from<number>({ length: rows }).fill(0)
    const columnsArray = Array.from<number>({ length: columns }).fill(0)

    return (
        <div className='absolute h-auto w-full left-0 top-12 z-0 px-4 grid' style={rowsStyle}>
            {rowsArray.map(() => (
                <div key={getUUID()} className={cn('border-b grid h-full', className)} style={columnsStyle}>
                    {columnsArray.map(() => (
                        <div key={getUUID()} className={cn('border-r w-full h-full', className)}></div>
                    ))}
                </div>
            ))}
        </div>
    )
}
