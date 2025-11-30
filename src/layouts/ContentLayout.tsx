import { Outlet } from 'react-router-dom'

export default function ContentLayout() {
    return (
        <div className='bg-gray-100 flex-1'>
            <Outlet />
        </div>
    )
}   