import React, { useState , useEffect } from 'react'
import { auth } from '../config';
import { withRouter } from 'react-router-dom' 
import { Loading } from '../components/Loading';
import { GetDocumentForId } from '../libs/Firestore';
import Title from '../components/Title';
import { GetConversation } from '../libs/Messages';
import { Grid, ListItem } from '@material-ui/core';
import { AlignItemsList } from '../components/ListItems';


function Dashboard(props) {

  
    const [user, setUser] = useState(false)
    const [currentUser, setCurrentUser] = useState(false)
    const [conversations, setConversations] = useState(false)

    
    const getDataUser = async () => {
        let documentFounded = await GetDocumentForId( 'users', auth.currentUser.uid )
        let conversationsFounded = await GetConversation( auth.currentUser.uid )
        
        setCurrentUser( documentFounded )
        setConversations( conversationsFounded )
        console.log( 'conversationsFounded' , conversationsFounded )

        console.log( 'documentFounded' , documentFounded)

    } 

    useEffect(() => {
        if(auth.currentUser){
            setUser(auth.currentUser)
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
            <Title nameTitle = { currentUser.name } />
            
            <Grid container>
                <Grid item>
                    <AlignItemsList
                        data = { conversations }
                    />
                </Grid>
            </Grid>


        </>
    ) : (
        <Loading/>
    )
}

export default withRouter(Dashboard)