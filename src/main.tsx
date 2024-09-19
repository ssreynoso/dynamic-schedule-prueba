import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import { Schedule } from './pages/schedule'
import { DragAndDrop } from './pages/drag-and-drop'
import { DragAndDropGrid } from './pages/drag-and-drop-grid'
import { Dnd1 } from './pages/dnd1'
import { Dnd2 } from './pages/dnd2'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Schedule />,
            },
            {
                path: '/drag-and-drop',
                element: <DragAndDrop />,
            },
            {
                path: '/drag-and-drop-grid',
                element: <DragAndDropGrid />,
            },
            {
                path: '/dnd1',
                element: <Dnd1 />,
            },
            {
                path: '/dnd2',
                element: <Dnd2 />,
            },
        ],
    },
])

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    <RouterProvider router={router} />
    // </StrictMode>
)
