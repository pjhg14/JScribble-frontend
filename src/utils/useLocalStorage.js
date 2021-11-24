import { useCallback, useEffect, useState } from "react";

export function useLocalStorage(key, defaultValue) {
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(key)

        if (jsonValue !== null) return JSON.parse(jsonValue)

        if (typeof initialValue === "function") {
            return defaultValue()
        } else {
            return defaultValue
        }
    })

    useEffect(() => {
        if (value === undefined) return localStorage.removeItem(key)

        localStorage.setItem(key, JSON.stringify(value))
    },[key, value, localStorage])

    const remove = useCallback(() => {
        setValue(undefined)
    },[])

    return [value, setValue, remove]
}