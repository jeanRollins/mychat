import React, { useState , useEffect } from 'react'
import { withRouter } from 'react-router-dom' 
import { Loading } from '../components/Loading'
import { GetDocumentForId } from '../libs/Firestore'
import Title from '../components/Title'
import { GetConversation } from '../libs/Messages'
import { Grid } from '@material-ui/core'
import { AlignItemsList } from '../components/ListItems'
import  SearchModal  from '../components/SearchModal'

import { GetAuth } from '../libs/Auth'
import { LocalStorage } from '../libs/LocalStorage'



function Dashboard(props) {

  
    const [user, setUser] = useState(false)
    const [currentUser, setCurrentUser] = useState(false)
    const [conversations, setConversations] = useState(false)
    const [searchState, setSearchState] = useState(false)


    const goToChat =  ( uid = '' ) => {
        LocalStorage.set( 'uid' , uid) 
        props.history.push('/conversation')
    }

    const getDataUser = async () => {
        let documentFounded = await GetDocumentForId( 'users', GetAuth().currentUser.uid )
        let conversationsFounded = await GetConversation( GetAuth().currentUser.uid )
        
        setCurrentUser( documentFounded )
        setConversations( conversationsFounded )
    } 

    useEffect(() => {
        if( GetAuth().currentUser){
            setUser( GetAuth().currentUser)
            getDataUser()
            
        }
        else{
            setUser(null)
            props.history.push('/')
        }
    } , [] )
    
    return ( user !== false ) && 
           ( currentUser !== false ) &&
           ( conversations !== false ) ? (
        <>
            <SearchModal
                state = { searchState }
                uid = { GetAuth().currentUser.uid }
            />
            <Title nameTitle = { currentUser.name } />

            <Grid container>
                <Grid item>
                    <AlignItemsList
                        data = { conversations }
                        methodOnClick = { goToChat }
                    />
                </Grid>
            </Grid>


        </>
    ) : (
        <Loading/>
    )
}

export default withRouter(Dashboard)