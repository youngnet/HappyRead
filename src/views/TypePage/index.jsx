import React, { useState, useEffect } from 'react'
import { getTypeDetail } from '../../api/home'
import BookItem from "@components/BookItem";
import List from '../../components/List'
import './index.scss'

export default function TypePage({ history, location, query }) {
    const [page, setPage] = useState(1);
    const [data, setData] = useState({ hotList: [], allBookList: [] });

    useEffect(() => {
        async function fetchData() {
            let res = await getTypeDetail(query.l)
            setData(res.data);
        }
        fetchData();
        return () => {

        }

    }, [query.l, page])

    const { allBookList, hotList } = data;
    return (
        <div>
            <div className='hotList'>
                {hotList.map((book, index) => {
                    return <BookItem bookInfo={book} key={index} />;
                })}
            </div>
            <List>
                {allBookList.map((book, index) => {
                    return (
                        <List.Item
                            onClick={() => {
                                history.push(`/detail?l=${book.link}`)
                            }}
                            className="typeBookList" key={index}>
                            <span>{book.type}</span>
                            <span className='title'>{book.name}</span>
                            <span>{book.author}</span>
                        </List.Item>
                    )
                })}
            </List>
        </div>
    )
}
