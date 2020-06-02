import React , {useState} from 'react'

import { AppBar , Toolbar, Grid, Fab, TextField } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import { makeStyles } from '@material-ui/core/styles'
import { AddConversationMessage } from '../libs/Messages'


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


const BarSendMessage = (props) => {

    const [ message , setMessage ] = useState('')
    const [ conversationId , setConversationId ] = useState(props.conversationId)
    const [ receiver , seTreceiver ] = useState( props.receiver)
    const [ transmitter , setTransmitter ] = useState(props.transmitter)

    const sendMessage = async () => {

        let  validateMessage = await validate()

        if( !validateMessage ){
            return false 
        }

        try {
            
            const documentForAdd = {
                conversationId ,
                message ,
                receiver ,
                transmitter
            }

            const responseAdd = await AddConversationMessage( documentForAdd )
            if( await !responseAdd ){
                console.log('error al ingresar');
                return
            }
            console.log('*******');
            
            setMessage('')

        } catch ( error ) { }
    }
    
    const validate = () => {

        if ( message === '' ){
            console.log('Mensaje requerido')
            return false
        }
        return true
    }
    
    const classes = useStyles()
    
    return (
        <>
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                
                <Toolbar>
                    <Grid container>
                        <Grid item xs = { 9 } >
                            <TextField 
                                fullWidth   
                                className = { classes.textField } 
                                id        = "standard-required" 
                                label     = "Escribe un mensaje..." 
                                onChange  = { e => setMessage( e.target.value ) }
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
    )
}

export default BarSendMessage
