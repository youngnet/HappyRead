import React, { useState, useEffect } from "react";
import "./index.scss";
import { getHomeList } from "../../api/home";
import BookItem from "@components/BookItem";
import List from "@components/List";
import querystring from "querystring";

export default function Home(props) {
    const params = querystring.parse(props.location.search.slice(1));
    const [data, setData] = useState({
        navList: [],
        hotList: [],
        recommendList: []
    });
    const [l, setL] = useState("");
    if (l != params.l) {
		console.log("TCL: Home -> params", params)
        console.log(params.l)
        setL(params.l);
    }
    const fetchData = async () => {
        let res = await getHomeList(params.l);
        setData(res.data);
    };

    useEffect(() => {
        fetchData();
        return () => {};
    }, [l]);

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
                                    key={i}
                                    className='typeBookList'
                                    href={book.link}>
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
