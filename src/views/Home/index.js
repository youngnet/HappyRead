import React, { useState, useEffect } from "react";
import "./index.scss";
import { getHomeList } from "../../api/home";
import BookItem from "@components/BookItem";
import List from "@components/List";

export default function Home(props) {
    const [data, setData] = useState({
        navList: [],
        hotList: [],
        recommendList: []
    });

    const fetchData = async () => {
        let res = await getHomeList();
        setData(res.data);
    };

    useEffect(() => {
        fetchData();
        return () => {};
    }, []);

    return (
        <div className='newsContainer'>
            <div className='hotList'>
                {data.hotList.map((book, index) => {
                    return <BookItem bookInfo={book} key={index} />;
                })}
            </div>
            {data.recommendList.map((type, index) => {
                return (
                    <List key={index}>
                        <b className='typeName'>{type.title}</b>
                        {type.list.map((book, i) => {
                            return (
                                <List.Item
                                    onClick={() => {
                                        props.history.push(
                                            `/detail?l=${book.link}`
                                        );
                                    }}
                                    key={i}
                                    className='typeBookList'>
                                    <span>{book.type}</span>
                                    <span className='title'>{book.name}</span>
                                    <span>{book.author}</span>
                                </List.Item>
                            );
                        })}
                    </List>
                );
            })}
        </div>
    );
}
