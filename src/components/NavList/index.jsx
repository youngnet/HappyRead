import React from 'react'
import { NavLink } from "react-router-dom";
import './index.scss';

export default function NavList({ navList }) {
    return (
        <div className='navList'>
            {navList.map((item, index) => {
                return (
                    <NavLink key={index} to={`/type?l=${item.link}`}>
                        {item.name}
                    </NavLink>
                );
            })}
        </div>
    )
}
