import React, { useState, useContext } from 'react'
import { myContext } from '../../routes'
import * as TYPES from '../../store/constants'
import md5 from 'md5'
import { login } from '../../api/auth'

export default function Mine() {
    const { dispatch } = useContext(myContext)

    const [phone, setPhone] = useState('')
    const [pw, setPw] = useState('')

    async function submit() {
        let res = await login(phone, md5(pw));
        if (res.cd === 0) {
            dispatch({ type: TYPES.ADD_USER_INFO, user: res.data })
        }
    }

    return (
        <div>
            <input value={phone} maxLength={11} onChange={(e) => setPhone(e.target.value)} type="text" placeholder="手机号" />
            <input value={pw} onChange={(e) => setPw(e.target.value)} type="password" placeholder="密码" />
            <input type="text" placeholder="用户名" />
            <button onClick={submit}>提交</button>
        </div>
    )
}
