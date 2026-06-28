import HomeNavbar from '@/components/HomeNavbar'
import React from 'react'

const layout = ({ children }) => {
    return (
        <div>
            <HomeNavbar />
            {children}
        </div>
    )
}

export default layout