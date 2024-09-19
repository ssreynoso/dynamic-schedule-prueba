import { Link, Outlet } from 'react-router-dom'

function App() {
    return (
        <div className='w-screen flex flex-col min-h-screen'>
            <div className='w-full items-center flex gap-4 pl-8 h-16 bg-blue-400'>
                <Link to='/'>Schedule</Link>
                <Link to='/drag-and-drop'>Drag and drop</Link>
                <Link to='/drag-and-drop-grid'>Drag and drop GRID</Link>
                <Link to='/dnd1'>DND1</Link>
                <Link to='/dnd2'>DND2</Link>
            </div>
            <Outlet />
        </div>
    )
}

export default App
