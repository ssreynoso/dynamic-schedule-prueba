import { getUUID } from '@/lib/uuid'
import { Row } from '../types'

type Props = {
    rows: Row[]
    style: React.CSSProperties
}

export const DynamicScheduleRows = ({ rows, style }: Props) => {
    return (
        <div className='grid w-full' style={style}>
            {rows.map((row) => (
                <p key={getUUID()} className='w-full h-full flex items-center justify-center text-muted-foreground pr-2 relative p-0'>
                    {row.label}
                </p>
            ))}
        </div>
    )
}
