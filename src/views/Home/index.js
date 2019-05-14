import React, { useState, useEffect } from "react";
import "./index.scss";
import { getNews, getHomeList } from "../../api/home";

export default function Home() {
    const [data, setData] = useState([]);
    const fetchData = async () => {
        let res = await getHomeList();
        // setData(res.data);
        document.querySelector('.newsContainer').innerHTML = res.data;
    };

    useEffect(() => {
        fetchData();
        return () => {};
    }, []);

    return <div className='newsContainer'></div>;
}
