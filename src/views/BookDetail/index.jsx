import React, { useState, useEffect } from 'react'
import { getBookDetail } from '../../api/bookDetail'
import querystring from 'querystring'
import List from '../../components/List'
import './index.scss';

export default function BookDetail(props) {
    console.log("TCL: index -> props", props)
    const [bookDetail, setBookDetail] = useState({ bookInfo: {}, newChapterList: [], chapterList: [] });
    const params = querystring.parse(props.location.search.slice(1))
    async function fetchInfo() {
        let res = await getBookDetail(params.l)
        console.log("TCL: getChapterList -> res", res)
        setBookDetail(res)
    }

    useEffect(() => {
        fetchInfo()
    }, [])
    const { bookInfo, newChapterList, chapterList } = bookDetail;
    return (
        <div className="bookDetailContainer">
            <div className="bookInfo">
                <img src={bookInfo.picUrl} alt={bookInfo.name} />
                <div>
                    <div>{bookInfo.name}</div>
                    {bookInfo.infoList && bookInfo.infoList.map((item, index) => (<div key={index}>{item}</div>))}
                </div>
            </div>
            {newChapterList.length ? <div className="listTitle">最新章节</div> : null}
            <List className="chapterList">
                {newChapterList.map((chapterInfo, index) => {
                    return <List.Item className="chapterListItem" key={index}>{chapterInfo.name}</List.Item>
                })}
            </List>
            {chapterList.length ? <div className="listTitle">目录</div> : null}
            <List className="chapterList">
                {chapterList.map((chapterInfo, index) => {
                    return <List.Item className="chapterListItem" key={index}>{chapterInfo.name}</List.Item>
                })}
            </List>
        </div>
    )
}
