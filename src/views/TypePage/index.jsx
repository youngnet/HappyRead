import React, { useState, useEffect } from 'react'
import { getTypeDetail } from '../../api/home'
import querystring from 'querystring'

export default function TypePage(props) {
    const params = querystring.parse(props.location.search.slice(1))
    const [page, setPage] = useState(1);
    const [l, setL] = useState("");

    if (l != params.l) {
        setL(params.l)
    }
    async function fetchData() {
        let res = await getTypeDetail(params.l)
        console.log("TCL: fetchData -> res", res)
    }
    useEffect(() => {
        fetchData();
    }, [l, page])

    return (
        <div>
            type
        </div>
    )
}
