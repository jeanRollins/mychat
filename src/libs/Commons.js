
export const LOGO_PRIMARY   = 'https://firebasestorage.googleapis.com/v0/b/mychat-e42c4.appspot.com/o/hipchat.jpg?alt=media&token=26d5a8b7-40ef-4e9a-af33-cf998a17c3b2'

export const LOGO_SECONDARY = 'https://firebasestorage.googleapis.com/v0/b/mychat-e42c4.appspot.com/o/hipchat_secondary.jpg?alt=media&token=4f045a37-9e01-4147-8eba-2d8e792007be'


export function GetDate()
{
    let currentdate = new Date() 
    let dateNow =   currentdate.getDate() + '/' +
                    (currentdate.getMonth() + 1) + '/' + 
                    currentdate.getFullYear()

    return dateNow
}

export function GetTime()
{
    let currentdate = new Date() 
    let dateNow =   currentdate.getHours() +  ':'  +
                    currentdate.getMinutes() + ':' +
                    currentdate.getSeconds() 
    return dateNow
}