import { useState } from 'react'

export const useDragAndDrop = () => {
    const [dragActive, setDragActive] = useState(false)

    // useEffect(() => {
    //     if (!file) {
    //         setDragActive(false)
    //     }
    // }, [file])

    // handle drag events
    const handleDrag = function (e: React.DragEvent) {
        console.log('handleDrag', e)
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    const handleDragOver = function (e: React.DragEvent) {
        console.log('handleDragOver', e)
        e.preventDefault()
    }

    const handleDrop = function (e: React.DragEvent) {
        console.log('handleDrop', e)

        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        // if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        //     // at least one file has been dropped so do something
        //     setFile(e.dataTransfer.files[0])
        // }
    }

    return {
        dragActive,
        handleDrag,
        handleDragOver,
        handleDrop,
    }
}
