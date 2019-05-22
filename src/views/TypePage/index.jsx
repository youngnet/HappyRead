import React, { useState, useEffect, useCallback } from 'react'
import { getTypeDetail, getTypeBookList } from '../../api/home'
import BookItem from "@components/BookItem";
import List from '../../components/List'
import './index.scss'
import useWindowScroll from '../../utils/useWindowScroll'

let loading = false;

export default function TypePage({ history, location, query }) {
    const link = query.l.split('_')[0];
    const [page, setPage] = useState(0);
    const [data, setData] = useState({ hotList: [], totalPage: 1 });
    const [bookList, setBookList] = useState([])
    const reachBottom = useWindowScroll()

    useEffect(() => {
        async function fetchData() {
            let res = await getTypeDetail(query.l)
            setData(res.data);
        }
        fetchData();
        return () => {

        }
    }, [query.l])

    useEffect(() => {
        if (!loading && reachBottom && page < data.totalPage) {
            setPage((page) => {
                return page + 1
            })
        }
        return () => {

        }
    },
        [reachBottom])

    useEffect(() => {
        loading = true;
        async function getBookList() {
            let res = await getTypeBookList(`${link}_${page + 1}.html`);
            if (res.cd === 0) {
                setBookList([...bookList, ...res.data]);
            }
            loading = false;
        }
        getBookList()
    }, [page, link])

    const { hotList } = data;
    return (
        <div>
            <div className='hotList'>
                {hotList.map((book, index) => {
                    return <BookItem bookInfo={book} key={index} />;
                })}
            </div>
            <List>
                {bookList.map((book, index) => {
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
