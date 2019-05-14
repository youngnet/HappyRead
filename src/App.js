import React, { useState, useEffect, useRef } from "react";

function App() {
    const [state, setState] = useState(() => {
        return { a: 1, b: 2 };
    });

    return (
        <div className='App'>
            <p>a:{state.a}</p>
            <p>b:{state.b}</p>
            <button onClick={() => setState({ ...state, a: state.a + 1 })}>
                +
            </button>
            <button
                onClick={() =>
                    setState(({ a, b }) => {
                        return { a, b: b - 1 };
                    })
                }>
                -
            </button>
            <Example />
        </div>
    );
}

function Example(props) {
    let [name, setName] = useState("");
    let [xxx, setX] = useState("");
    let life = useRef();
    useEffect(() => {
        if (!life.current) {
            life.current = true;
        } else {
            // didUpdate
            console.log(1111);
        }
        setTimeout(() => {
            setX(xxx + name);
        }, 1000);
        return () => {};
    }, [name]);
    return (
        <>
            <div>{xxx}</div>
            <input
                placeholder='请输入姓名'
                type='text'
                value={name}
                onChange={e => setName(e.target.value)}
            />
        </>
    );
}

export default App;
