import React, { useState, useEffect } from "react";
import api from "@api";
import "./index.scss";

export default function Home() {
    const [data, setData] = useState([]);
    const fetchData = async () => {
        let res = await api.post("/123");
        setData(res.data.data);
    };

    useEffect(() => {
        fetchData();
        return () => {};
    }, []);

    return (
        <div className='newsContainer'>
            {data.map((news, index) => {
                return (
                    <a key={index} href={news.url}>
                        <article className='newsItem'>
                            <div>
                                <img
                                    className='img'
                                    src={
                                        news.imageUrls &&
                                        news.imageUrls[0].split("?")[0]
                                    }
                                    alt=''
                                />
                            </div>
                            <h5>{news.title}</h5>
                        </article>
                    </a>
                );
            })}
        </div>
    );
}
