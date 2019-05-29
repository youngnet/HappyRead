import React, { useState, useContext } from 'react'
import { myContext } from '../../routes'
import * as TYPES from '../../store/constants'
import md5 from 'md5'
import { login } from '../../api/auth'
import './index.scss'

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
        <div className="loginContainer">
            <div className="user-form">
                <div className="label">
                    <span>手机号：</span>
                    <input value={phone} maxLength={11} onChange={(e) => setPhone(e.target.value)} type="text" placeholder="请输入手机号" />
                </div>
                <div className="label">
                    <span>密码：</span>
                    <input value={pw} onChange={(e) => setPw(e.target.value)} type="password" placeholder="请输入密码" />
                </div>

            </div>
            {/* <input type="text" placeholder="用户名" /> */}
            <button className="sub-btn" onClick={submit}>登 录</button>
        </div>
    )
}
