import { getUUID } from '@/lib/uuid'
import { Row } from '../types'

type Props = {
    rows: Row[]
    style: React.CSSProperties
    linesPerRow: number
}

export const DynamicScheduleRows = ({ rows, style, linesPerRow }: Props) => {
    const itemStyle = {
        paragraph: { gridRow: `span ${linesPerRow} / span ${linesPerRow}` },
        span: { height: `calc(100% / ${linesPerRow})` },
    }

    return (
        <div className='grid w-full' style={style}>
            {rows.map((row) => (
                <p key={getUUID()} className='w-full h-full flex justify-center text-muted-foreground pr-2 relative p-0' style={itemStyle.paragraph}>
                    <span className='absolute top-0 left-0 w-full flex items-center justify-center' style={itemStyle.span}>
                        {row.label}
                    </span>
                </p>
            ))}
        </div>
    )
}
