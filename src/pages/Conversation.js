import React , { useEffect , useState } from 'react'
import { LocalStorage } from '../libs/LocalStorage'
import { GetDocumentForId } from '../libs/Firestore'
import { AddConversationMessage, MessagesConversation } from '../libs/Messages'
import { GetAuth } from '../libs/Auth'
import { AppBar , Toolbar, Grid, Fab, TextField } from '@material-ui/core'

import { SimpleList } from '../components/ListItems'
import { SimpleLoading } from '../components/Loading'
import  IndexIcons  from '../components/IndexIcons'
import { makeStyles } from '@material-ui/core/styles'
import SendIcon from '@material-ui/icons/Send'
import { MessageText } from '../components/ChipMessage'


const useStyles = makeStyles((theme) => ({
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      paddingBottom: 50,
    },
    list: {
      marginBottom: theme.spacing(2),
    },
    subheader: {
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      top: 'auto',
      bottom: 0,
      padding : '15px'
    },
    grow: {
      flexGrow: 1
    },
    fabButton: {
      position: 'absolute',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: '0 auto'
    },
    textField :{
        background : '#fff' ,
        borderRadius : '8px', 
        margin : '0px'
    }
}));

const Conversation = () => {

    const [receiver, setReceiver] = useState( false )
    const [messages, setMessages] = useState( false )
    const [conversationId, setConversationId] = useState( false )
    const [myuid, setMyuid] = useState( false )
    const [ messageText , setMessageText ] = useState('')
    const classes = useStyles()


    const uid = LocalStorage.get('uid')

    const getDataUser = async () => {
        let myuidTemp = GetAuth().currentUser.uid 
        let documentFounded = await GetDocumentForId( 'users', uid )
        console.log('documentFounded**' , documentFounded)

        let messagesFounded = await MessagesConversation( myuidTemp , uid)

        console.log('messagesFounded**' , messagesFounded)
        setConversationId( ( messagesFounded.length == 0 ) ? false : messagesFounded.conversation.id )
        setMessages( messagesFounded )
        setMyuid( myuidTemp )
        setReceiver( documentFounded )
    } 

    const sendMessage = async () => {

        let  validateMessage = await validate()

        if( !validateMessage ){
            return false 
        }

        try {
            const documentForAdd = {
                conversationId    ,
                message         : messageText,
                receiver        : uid,
                transmitter     : myuid
            }
            
            const responseAdd = await AddConversationMessage( documentForAdd )    
            
            if( !responseAdd ){
                console.log('error al ingresar');
                return
            }

            setConversationId( responseAdd )
            
            let resp = await getDataUser()
            
            
            setMessageText('')

        } catch ( error ){ console.log( 'error : ' + error) }   
    }
    
    const validate = () => {
        if ( messageText === '' ){
            console.log('Mensaje requerido')
            return false
        }
        return true
    }
    

    useEffect( () => {
        getDataUser()
    } , [] )

    const styleConntainer = {
        margin : '10px'
    }

    const styleBackIcon = {
        marginRight : '30px' ,
        float      : 'right'
    }
    
    return  ( receiver !== false ) &&  
            ( myuid    !== false ) && 
            ( messages !== false ) ? (
        <>
            <Grid 
                container 
                style = { styleConntainer }
            >
                

                <Grid 
                    item 
                    xs = { 10 } >
                    <SimpleList
                        data = { receiver }    
                    />
                    
                </Grid>

                <Grid 
                    item 
                    xs = { 2 } 
                > 
                    <IndexIcons
                        type = { 'back' }
                        redirect = { '/dashboard' }
                        iconStyle = { styleBackIcon }
                    /> 
                </Grid>

                <Grid 
                    item 
                    xs = { 12 } >

                    { ( messages.length !== 0 ) ? (
                        <>
                            { messages.messages.map( row => (

                                <MessageText
                                    key   = { row.id } 
                                    align = { ( myuid == row.transmitter ) ? 'right' : 'left' }
                                    label = { row.message }
                                />
                            ))}
                        </>
                        
                    ) : (
                        <div 
                            align     = { "center" } 
                            style     = {{ margin : '10px' , color : '#737373' } }
                        >
                            No hay mensajes
                        </div>
                    )}
                </Grid>

                
            </Grid>

            <AppBar position="fixed" color="primary" className={classes.appBar}>
                
                <Toolbar>
                    <Grid container>
                        <Grid item xs = { 9 } >
                            <TextField 
                                fullWidth   
                                className = { classes.textField } 
                                value     = { messageText }
                                id        = "standard-required" 
                                label     = "Escribe un mensaje..." 
                                onChange  = { e => setMessageText( e.target.value ) }
                                variant   = "filled"
                            />

                        </Grid>
                        <Grid item xs = {1} ></Grid>
                        <Grid item xs = { 2 } >
                            <Fab 
                                color="secondary" 
                                aria-label="add"
                                onClick = {  e => sendMessage() }    
                            >
                                <SendIcon/>
                            </Fab>

                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>

        </>
    ) : (
        <SimpleLoading/>
    )
}

export default Conversation