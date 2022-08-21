import { createContext, useReducer } from "react"

export const StoreContext = createContext();


export const StoreProvider = ({children, reducer, initialState}) => {
    const [state, dispatch] = useReducer( reducer, initialState);

    return (
        <StoreContext.Provider value={[state, dispatch]}>{children}</StoreContext.Provider>
    )
}