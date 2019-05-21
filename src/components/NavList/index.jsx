import React, { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom";
import { getNavList } from "../../api/home";
import './index.scss';

export default function NavList() {
    const [navList, setNavList] = useState([]);

    const fetchNav = async () => {
        let res = await getNavList();
        setNavList(res.data);
    };

    useEffect(() => {
        fetchNav();
        return () => { };
    }, []);
    
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
