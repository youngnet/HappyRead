import React, { useState, useEffect } from 'react'
import { getBookDetail } from '../../api/bookDetail'
import List from '../../components/List'
import './index.scss';

export default function BookDetail(props) {
    const [bookDetail, setBookDetail] = useState({ bookInfo: {}, newChapterList: [], chapterList: [] });
    const params = props.query;

    useEffect(() => {
        async function fetchInfo() {
            let res = await getBookDetail(params.l)
            setBookDetail(res)
        }
        fetchInfo()
    }, [params.l])
    const { bookInfo, newChapterList, chapterList } = bookDetail;
    return (
        <div className="bookDetailContainer">
            <div className="bookInfo">
                <img src={bookInfo.picUrl} alt={bookInfo.name} />
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
