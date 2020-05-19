import React from 'react'

import {GetDocumentWhereArray, GetDocumentForId , GetDocumentWhere} from './Firestore'

export const GetConversation = ( uid ) => {
    //console.log('uid', uid);
    

    const fetch = async () => {
        let conversation = [] 
        let responseConversation = await GetDocumentWhereArray( 'conversation' , 'participants', uid )
        
        console.log('resp**' , responseConversation)

        for await ( let row of responseConversation ){
            let users = []
            
            for await ( let _row of row.participants ){
                if( _row != uid ){
                    let userFounded = await GetDocumentForId( 'users' , _row )
                    userFounded.id = _row
                    console.log('userFounded**' , userFounded)
                    users.push(userFounded)
                }
            }
            console.log('row**' , row)
            console.log('users**' , users)
            let conversationPrepare = {
                id      : row.id ,
                isGroup : false  ,
                users 
            }


            conversation.push(conversationPrepare)
        }
        
        console.log('conversation**', conversation)
        console.log('conversation***', conversation[0])

        //contacts.push()

        return conversation        
    }
    return fetch()
}
