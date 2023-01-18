import { useState, useEffect } from "react"

const useLocalStorage = (keyLocal, initialValue) => {

    const LOCAL_KEY = keyLocal
    const [sincronizedItem, setSincronizedItem] = useState(true)
    const [todos, setTodos] = useState(initialValue)
    const [isFetching, setIsFetching] = useState(true)
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            try {
                const localStorageTodos = localStorage.getItem(LOCAL_KEY)
                let parsedTodos;

                if (!localStorageTodos) {
                    localStorage.setItem(LOCAL_KEY, JSON.stringify(initialValue))
                    parsedTodos = []
                } else {
                    parsedTodos = JSON.parse(localStorageTodos)
                }

                setTodos(parsedTodos)
                setIsFetching(false)
                setSincronizedItem(true)
            } catch (e) {
                setIsFetching(false)
                setHasError(true)
            }
        }, 2000)
    }, [sincronizedItem])

    const sincronizeItem = () => {
        setIsFetching(true)
        setSincronizedItem(false)
    }

    const savedTodos = (arrayTodos) => {
        try {
            localStorage.setItem(LOCAL_KEY, JSON.stringify(arrayTodos))
            setTodos(arrayTodos)
        } catch (e) {
            setHasError(true)
        }
    }

    return {
        todos,
        savedTodos,
        isFetching,
        hasError,
        sincronizeItem
    }
}

export { useLocalStorage }