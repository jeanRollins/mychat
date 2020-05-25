//Module pattern
export const LocalStorage = ( () => {

    const getStorageItem = ( field = '' )  => ( field === '' ) ? localStorage : localStorage.getItem(field)
    
    const setStorageItem = ( field , value )  => localStorage.setItem( field , value )
    
    const clearStorageItems = () => localStorage.clear()
    
    return {

        get : ( field ) => {
            return getStorageItem( field )
        } ,

        set : ( field , value ) => {
            setStorageItem( field , value )
        },

        clear : () => {
            clearStorageItems()
        }
    }
})()

