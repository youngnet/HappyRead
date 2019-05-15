import React from "react";
import "./index.scss";

export default function index({ bookInfo }) {
    return (
        <div className='bookItem'>
            <div className='bookPic'>
                <img src={bookInfo.picUrl} alt={bookInfo.title} />
            </div>
            <div className='bookInfo'>
                <div className='author'>
                    <span>{bookInfo.author}</span>
                    <span>{bookInfo.title}</span>
                </div>
                <div className='desc'>{bookInfo.desc}</div>
            </div>
        </div>
    );
}
