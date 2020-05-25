import React from 'react'

import { 
        GetDocumentWhereArray, 
        GetDocumentForId, 
        GetDocumentWhereConditionals, 
        AddCollection ,
        GetTimestamp
    } from './Firestore'

export const GetConversation = ( uid ) => {
    
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
            
            let users = []
            
            for await ( let _row of row.participants ){
                if( _row != uid ){
                    let userFounded = await GetDocumentForId( 'users' , _row )
                    userFounded.id = _row
                    users.push(userFounded)
                }
            }
            let conversationPrepare = {
                id      : row.id ,
                isGroup : false  ,
                users 
            }
            conversation.push(conversationPrepare)
        }
        return conversation        
    }
    return fetch()
}

export const AddMessage = ( document ) => {
    
    const fetch = async () => {
        document.dateSend = GetTimestamp()
        const response = await AddCollection( 'message' , document )
        return  response 
    }
    return fetch()
}  

export const ValidateNewConversation = ( myUid, uidUser ) => {
    
    const fetch = async () => {
        let conversation = [] 
        console.log( 'myUid**'   , myUid  )
        console.log( 'uidUser**'   , uidUser  )

        let options = [
            { field : 'state' , condition : 'array-contains' , value : 1  }
        ]

        let response = await GetDocumentWhereConditionals('users', options )

        let res = response.docs.map( row => row )
        console.log( 'res**'   , res )

        

        /*
        let responseConversationMyUid   = await GetDocumentWhereArray( 'conversation' , 'participants', myUid )
        let responseConversationUidUser = await GetDocumentWhereArray( 'conversation' , 'participants', uidUser )
        console.log( 'responseConversationMyUid**'   , responseConversationMyUid  )
        console.log( 'responseConversationUidUser**' , responseConversationUidUser )
        */
        //return conversation        
    }
    return fetch()
} 
