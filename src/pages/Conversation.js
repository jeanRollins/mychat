import React , { useEffect , useState } from 'react'
import { LocalStorage } from '../libs/LocalStorage'
import { GetDocumentForId } from '../libs/Firestore'
import { GetConversation, ValidateNewConversation } from '../libs/Messages'
import { GetAuth } from '../libs/Auth'
import { Grid } from '@material-ui/core'
import { SimpleList } from '../components/ListItems'
import { SimpleLoading } from '../components/Loading'
import  IndexIcons  from '../components/IndexIcons'
import BarSendMessage from '../components/BarSendMessage'

const Conversation = () => {

    const [receiver, setReceiver] = useState(false)
    const [myuid, setMyuid] = useState(false)


    const uid = LocalStorage.get('uid')

    const getDataUser = async () => {
        let myuidTemp = GetAuth().currentUser.uid 
        let documentFounded = await GetDocumentForId( 'users', uid )
        console.log('documentFounded**' , documentFounded)

        let response = await ValidateNewConversation( myuidTemp , uid)

        console.log('response**' , response)
        setMyuid( myuidTemp )
        setReceiver( documentFounded )
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
            ( myuid    !== false ) ? (
        <>
            <Grid 
                container 
                style = { styleConntainer }
                >
                <Grid 
                    item 
                    xs = { 12 } 
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
                    <SimpleList
                        data = { receiver }    
                    />
                    
                </Grid>
            </Grid>

            <BarSendMessage
                receiver = { uid }
                transmitter = { myuid }
                conversationId  = { '' }
            />

        </>
    ) : (
        <SimpleLoading/>
    )
}

export default Conversation