import React, { useContext } from 'react'
import { myContext } from '../../routes'

export default function Mine() {
    const { user } = useContext(myContext)

    return (
        <div>
            Mine
            <div>{user.name}</div>
            <div>{user.phone}</div>
        </div>
    )
}
