import { useEffect, useRef, useState } from "react";

const useWindowScroll = (lowerThreshold = 50) => {
    const frame = useRef(0);
    const [reachBottom, setState] = useState(false);

    useEffect(() => {
        const handler = () => {
            cancelAnimationFrame(frame.current);
            frame.current = requestAnimationFrame(() => {
                // setState({
                //     x: window.scrollX,
                //     y: window.scrollY
                // });
                const scrollTop = document.documentElement.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight;
                const clientHeight = document.documentElement.clientHeight;
                if (scrollTop + clientHeight > scrollHeight - 50) {
                    setState(true);
                }else{
                    setState(false);
                }
            });
        };

        window.addEventListener("scroll", handler, {
            capture: false,
            passive: true
        });

        return () => {
            cancelAnimationFrame(frame.current);
            window.removeEventListener("scroll", handler);
        };
    }, []);

    return reachBottom;
};

export default useWindowScroll;
