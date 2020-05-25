import React , {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {Backdrop, TextField, Modal, Fade} from '@material-ui/core'
import { GetUsers } from '../libs/Users'
import { ItemsList } from './ListItems'
import { SimpleLoading } from './Loading'
import { ButtonFloat } from './ButtonFloat'
import { withRouter } from 'react-router-dom'
import { GetAuth } from '../libs/Auth'
import { LocalStorage } from '../libs/LocalStorage'



const useStyles = makeStyles((theme) => ({
  modal: {
    //display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    //width : '100%',
    height : '800px',
    padding : '20px'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const SearchModal = (props) => {

    const classes = useStyles()
    const [ open  , setOpen  ]  = useState( props.state )
    const [ users , setUsers ]  = useState( false )
    const [ searchValue  , setSearchValue ] = useState( '' )
    const [ field  , setField ] = useState( 'number_phone' )

    const fetchApi = async () => {
        let usersFounded  = await  GetUsers( field , searchValue , GetAuth().currentUser.uid )
        setUsers(usersFounded)
    }
    
    const goToChat =  ( uid = '' ) => {
        LocalStorage.set( 'uid' , uid) 
        props.history.push('/conversation')
    }
    
    React.useEffect( () => {
        
        fetchApi()
    },[ searchValue ] )

    const handleOpen  = () => setOpen(true)
    const handleClose = () => setOpen(false)


    return  ( users !== false ) ? (
        <>
            <ButtonFloat 
                method = { e => handleOpen() }
                variant = { 'primary' }
            />
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <div className={classes.paper}>
                    <h3 id="transition-modal-title">¿Con quién deseas hablar?</h3>
                    <TextField 
                        fullWidth 
                        label    = "Buscar personas" 
                        onChange = { e => setSearchValue( e.target.value ) } 
                        variant  = "outlined" 
                    />

                    <ItemsList
                        data = {users }
                        methodOnClick = { goToChat }
                    />
                </div>
                </Fade>
            </Modal>
        </>
    ) : (
        <SimpleLoading/>
    )
}

export default withRouter( SearchModal )