import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { getReadContent } from '../../api/bookDetail'
import './index.scss';


export default function ReadPage({ query }) {
    const [data, setData] = useState({})

    const fetchData = useCallback(async () => {
        let res = await getReadContent(query.l)
        setData(res);
    }, [query.l])

    useEffect(() => {
        // async function fetchData() {
        //     let res = await getReadContent(query.l)
        //     setData(res);
        // }
        fetchData();
        return () => {
            setData({});
        }
    }, [fetchData])

    const { content = '', name = '', prevChapter = '', nextChapter = '', directory = '' } = data;
    return (
        <div className="readPageContainer">
            <header className="title">{name}</header>
            <article className="content" dangerouslySetInnerHTML={{ __html: content }} />
            <div className="config-btn">
                {prevChapter !== directory ? <Link to={`readPage?l=${prevChapter}`}>上一章</Link> : <Link to={`/detail?l=${directory}`}>上一章</Link>}
                <Link to={`/detail?l=${directory}`}>目录</Link>
                <Link to={`readPage?l=${nextChapter}`}>下一章</Link>
            </div>
        </div>
    )
}


// export default class ReadPage extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             data: {}
//         }
//     }
//     componentDidMount() {
//         this.fetchData();
//     }

//     componentWillUnmount() { }


//     async  fetchData() {
//         let res = await getReadContent(this.props.query.l)
//         this.setState({ data: res });
//     }

//     componentDidUpdate(prevProps, prevState) {
//         if (prevProps.query.l !== this.props.query.l) {
//             this.fetchData();
//         }
//     }

//     // shouldComponentUpdate({ query }) {
//     //     console.log("TCL: ReadPage -> shouldComponentUpdate -> prevProps", query, this.props.query)
//     //     if (query.l !== this.props.query.l) {
//     //         return true
//     //     }
//     // }

//     render() {
//         const { content = '', name = '', prevChapter = '', nextChapter = '', directory = '' } = this.state.data;
//         return (
//             <div className="readPageContainer">
//                 <header className="title">{name}</header>
//                 <article className="content" dangerouslySetInnerHTML={{ __html: content }} />
//                 <div className="config-btn">
//                     {prevChapter !== directory ? <Link to={`readPage?l=${prevChapter}`}>上一章</Link> : <Link to={`/detail?l=${directory}`}>上一章</Link>}
//                     <Link to={`/detail?l=${directory}`}>目录</Link>
//                     <Link to={`readPage?l=${nextChapter}`}>下一章</Link>
//                 </div>
//             </div>
//         )
//     }
// }
