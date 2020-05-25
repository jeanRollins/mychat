import { GetDocumentWhere, GetDocumentLike, GetDocumentWhereArray } from './Firestore'

export const GetUsers = ( field , value , uid)  => {

    const fetch = async () => {
        
        if ( value == '' ) {
            let usersFounded =  await GetDocumentWhere( 'users' , 'state', 1 )
            usersFounded     =  await usersFounded.filter( row => ( uid !== row.id ) )
            return  usersFounded 
        } 
        else {
            let usersFounded =  await GetUsersLike( field , value )
            usersFounded     =  await usersFounded.filter( row => ( uid !== row.id ) )
            return  usersFounded 
        }
    }
    return fetch()
}

export const GetUsersLike = ( field , value ) => {

    const fetch = async () => {
        
        let usersFounded = await GetDocumentLike( 'users' , field , value )
        return  usersFounded 
    }
    return fetch()
}

export const GetIdUsersForNotConversation = ( uid ) => {
    
    const fetch = async () => {
        let conversation = [] 
        const options = {
            nameCollection : 'conversation' ,
            query : {
                field : 'participants' ,
                where : 'array-contains' ,
                value : uid
            } 
        }
        let responseConversation = await GetDocumentWhereArray( options )
        
        for await ( let row of responseConversation ){
            
            conversation.push(row.id)
        }
        return conversation        
    }
    return fetch()
}