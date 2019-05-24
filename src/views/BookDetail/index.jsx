import React, { useState, useEffect } from 'react'
import { getBookDetail, getChapterList } from '../../api/bookDetail'
import List from '../../components/List'
import './index.scss';
import useWindowScroll from '../../utils/useWindowScroll'

let loading = false;

export default function BookDetail(props) {
    const [bookDetail, setBookDetail] = useState({ bookInfo: {}, newChapterList: [] });
    const [chapterList, setChapterList] = useState([]);
    const params = props.query;
    const [page, setPage] = useState(0)
    const reachBottom = useWindowScroll();
    const link = params.l.split('.')[0];

    useEffect(() => {
        async function fetchInfo() {
            let res = await getBookDetail(params.l)
            if (res.cd === 0) {
                setBookDetail(res.data)
            }
        }
        fetchInfo()
    }, [params.l])


    useEffect(() => {
        async function getNextPage() {
            loading = true
            let res = await getChapterList(`${link}/${page + 1}.html`)
            if (res.cd === 0) {
                setChapterList([...chapterList, ...res.data])
            }
            loading = false
        }
        getNextPage()
    }, [page])

    useEffect(() => {
        if (!loading && reachBottom && page < bookDetail.bookInfo.totalPage) {
            setPage((page) => {
                return page + 1
            })
        }
    }
        , [reachBottom])

    const { bookInfo, newChapterList } = bookDetail;
    return (
        <div className="bookDetailContainer">
            <div className="bookInfo">
                <div className="imgWrapper">
                    <img src={bookInfo.picUrl} alt={bookInfo.name} />
                </div>
                <div className="rightInfo">
                    <div>{bookInfo.name}</div>
                    {bookInfo.infoList && bookInfo.infoList.map((item, index) => (<div key={index}>{item}</div>))}
                </div>
            </div>
            {newChapterList.length ? <div className="listTitle">最新章节</div> : null}
            <List className="chapterList">
                {newChapterList.map((chapterInfo, index) => {
                    return <List.Item
                        onClick={() => {
                            props.history.push(`/readPage?l=${chapterInfo.link}`)
                        }}
                        className="chapterListItem" key={index}>
                        {chapterInfo.name}
                    </List.Item>
                })}
            </List>
            {chapterList.length ? <div className="listTitle">目录</div> : null}
            <List className="chapterList">
                {chapterList.map((chapterInfo, index) => {
                    return <List.Item
                        onClick={() => {
                            props.history.push(`/readPage?l=${chapterInfo.link}`)
                        }}
                        className="chapterListItem" key={index}>
                        {chapterInfo.name}
                    </List.Item>
                })}
            </List>
        </div>
    )
}
