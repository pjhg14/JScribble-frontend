import { useCallback, useLayoutEffect, useRef } from "react"

// New Resize Observer (from Tobias Lindström's blog) callback needs to be a useCallback function
export function useResizeObserver(callback, element) {
    const observer = useRef(null)
    
    const disconnect = useCallback(() => {
        observer.current?.disconnect()
    },[])

    const observe = useCallback(() => {
        observer.current = new ResizeObserver(callback)

        if (element.current) observer.current.observe(element.current)
    },[element, callback])

    useLayoutEffect(() => {
        observe()

        return () => {
            disconnect()
        }
    },[observe, disconnect])
}

/* Old Resize observer (from Eyas Mattar on Medium) caused a missing dependency warning
    export function useResizeObserver(callback, element) {
    const current = element && element.current
    const observer = useRef(null)
    
    useEffect(() => {
        observer.current = new ResizeObserver(callback)
        observe()

        return () => {
            if (observer && observer.current && element && element.current) {
                observer.current.unobserve(element.current)
            }
        }
    },[current])

    function observe() {
        if (current && observer.current) {
            observer.current.observe(element.current)
        }
    }
}
*/
