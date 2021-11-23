import { useEffect, useRef } from "react"

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