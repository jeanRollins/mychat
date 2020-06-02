import React from 'react'
import { GetTime, GetDate } from './Commons'

import { 
    GetDocumentWhereArray , 
    GetDocumentForId , 
    AddCollection 
} from './Firestore'

export const GetConversation = ( uid ) => {
    
    console.log( 'GetConversation *****' , uid )
    
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

        document.timeCreate =  GetTime()
        document.dateCreate =  GetDate()
        document.dateSend   =  new Date()
        const response      =  await AddCollection( 'message' , document )
        return  response 
    }
    return fetch()
}  

export const AddConversationMessage = ( document ) => {


    const fetch = async () => {
        
        console.log( 'document______________*****************' , document )

        if ( document.conversationId === false ) {

            const conversation = {
                createConversation : new Date() ,
                timeCreate : GetTime() ,
                dateCreate : GetDate() ,
                participants : [ document.transmitter , document.receiver ] ,
                lastMessage : {}
            }

            const responseConv = await AddConversation( conversation )
        
            document.conversationId = responseConv.id

            const response = await AddMessage( document )

            return responseConv.id
        }
        else {

            const response = await AddMessage( document )

            return response.id
           
        }

        
    }
    return fetch()
}



export const AddConversation = ( document ) => {
    
    const fetch = async () => {


        const response = await AddCollection( 'conversation' , document )
        return  response 
    }
    return fetch()
}  

export const MessagesConversation = ( myUid, uidUser ) => {
    
    const fetch = async () => {

        const options = {
            nameCollection : 'conversation' ,
            query : { 
                field : 'participants' ,
                where : 'array-contains' , 
                value :  myUid 
            }
        }

        let conversationsFounded =  await GetDocumentWhereArray( options )
        conversationsFounded     =  await conversationsFounded.filter( row => row.participants.includes( uidUser ) )
        
        if ( conversationsFounded.length == 0 ){
            return []
        }
        
        const conversation = conversationsFounded[0]

        const searchMessages = {
            nameCollection : 'message' ,
            query : { 
                field : 'conversationId' ,
                where : '==' , 
                value :  conversation.id
            }
        }

        const messagesFounded =  await GetDocumentWhereArray( searchMessages )
        
        return {
            conversation ,
            messages : messagesFounded
        }        
    }
    return fetch()
} 
