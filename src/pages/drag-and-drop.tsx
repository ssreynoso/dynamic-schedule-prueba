import React, { useState, useRef } from 'react'
import './drag-and-drop.css'

export const DragAndDrop = () => {
    const [dragging, setDragging] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    const [offset, setOffset] = useState({ x: 0, y: 0 })

    const [isOriginalVisible, setIsOriginalVisible] = useState(true)
    const [currentContainer, setCurrentContainer] = useState(1)
    const [hoveredContainer, setHoveredContainer] = useState<number | null>(null)

    const elementRef = useRef<HTMLDivElement>(null)
    const cloneRef = useRef<HTMLDivElement>(null)
    const containerRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)]

    const handleMouseDown = (e: React.MouseEvent) => {
        if (elementRef.current) {
            const rect = elementRef.current.getBoundingClientRect()

            setDimensions({ width: rect.width, height: rect.height })
            setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top })
            setDragging(true)
            setPosition({ x: rect.left, y: rect.top })
            setIsOriginalVisible(false)
        }
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (dragging) {
            setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y })

            // Update hovered container based on mouse position
            let newHoveredContainer: number | null = null
            containerRefs.forEach((ref, index) => {
                if (ref.current) {
                    const rect = ref.current.getBoundingClientRect()
                    if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
                        newHoveredContainer = index
                    }
                }
            })
            setHoveredContainer(newHoveredContainer)
        }
    }

    const handleMouseUp = (e: MouseEvent) => {
        setDragging(false)
        setIsOriginalVisible(true)

        // Determine the new container based on the drop position
        containerRefs.forEach((ref, index) => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect()
                if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
                    setCurrentContainer(index)
                }
            }
        })
        setHoveredContainer(null)
    }

    React.useEffect(() => {
        if (dragging) {
            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('mouseup', handleMouseUp)
        } else {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [dragging])

    return (
        <div className='w-full h-[calc(100vh-64px)] flex items-center justify-center bg-slate-900'>
            <div className='grid grid-cols-3 h-1/2 w-2/3 gap-4'>
                {containerRefs.map((ref, index) => (
                    <div key={index} ref={ref} className='droppable-container'>
                        {currentContainer === index ? (
                            <div
                                ref={elementRef}
                                className='w-1/2 h-1/2 bg-blue-600 flex items-center justify-center select-none'
                                onMouseDown={handleMouseDown}
                                style={{
                                    opacity: isOriginalVisible ? 1 : 0.5,
                                    cursor: dragging ? 'grabbing' : 'grab',
                                }}
                            >
                                Contenido
                            </div>
                        ) : (
                            dragging &&
                            hoveredContainer === index && (
                                <div
                                    className='w-1/2 h-1/2 bg-blue-600 flex items-center justify-center select-none'
                                    style={{
                                        opacity: 0.5,
                                        cursor: 'grabbing',
                                    }}
                                >
                                    Contenido
                                </div>
                            )
                        )}
                        {dragging && currentContainer === index && (
                            <div
                                ref={cloneRef}
                                className='w-1/2 h-1/2 bg-blue-600 flex items-center justify-center select-none'
                                style={{
                                    position: 'absolute',
                                    left: position.x,
                                    top: position.y,
                                    width: `${dimensions.width}px`,
                                    height: `${dimensions.height}px`,
                                    cursor: 'grabbing',
                                }}
                            >
                                Contenido
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
