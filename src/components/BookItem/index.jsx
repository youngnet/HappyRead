import React from "react";
import { Link } from 'react-router-dom'
import "./index.scss";

export default function index({ bookInfo }) {
    return (
        <Link to={`/detail?l=${bookInfo.link}`} className='bookItem'>
            <div className='bookPic'>
                <img src={bookInfo.picUrl} alt={bookInfo.name} />
            </div>
            <div className='bookInfo'>
                <div className='author'>
                    <span>{bookInfo.author}</span>
                    <span>{bookInfo.name}</span>
                </div>
                <div className='desc'>{bookInfo.description}</div>
            </div>
        </Link>
    );
}
