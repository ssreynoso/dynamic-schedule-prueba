import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
    className?: string
    style: React.CSSProperties
}>

export const DynamicScheduleHeader = ({ style, className, children }: Props) => {
    return (
        <div className={cn('grid border-b h-12 sticky top-0 z-40 bg-background', className)} style={style}>
            {children}
        </div>
    )
}
