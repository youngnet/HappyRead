import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getReadContent } from '../../api/bookDetail'
import './index.scss';


export default function ReadPage({ location, history, match, query }) {
    const [link, setLink] = useState('');
    const [data, setData] = useState({})
    if (link != query.l) {
        setLink(query.l)
        setData({})
    }
    async function fetchData() {
        let res = await getReadContent(query.l)
        console.log("TCL: fetchData -> res", res)
        setData(res);
    }
    useEffect(() => {
        fetchData();
    }, [link])
    const { content = '', name = '', prevChapter = '', nextChapter = '', directory = '' } = data;
    return (
        <div className="readPageContainer">
            <header className="title">{name}</header>
            <article className="content" dangerouslySetInnerHTML={{ __html: content }} />
            <div className="config-btn">
                <Link to={prevChapter}>上一章</Link>
                <Link to={`/detail?l=${directory}`}>目录</Link>
                <Link to={`readPage?l=${nextChapter}`}>下一章</Link>
            </div>
        </div>
    )
}
