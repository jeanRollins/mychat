import React ,{useStyles} from 'react' 
import {AppBar , Toolbar ,Typography , IconButton , Button , MenuIcon , Grid } from '@material-ui/core'
import { logout } from '../libs/Auth';
import { withRouter } from 'react-router-dom'
import { LOGO_PRIMARY } from '../libs/Commons';
import { AvatarIcon } from './AvatarIcon';


function Header (props) {
    
    return (

        
        <AppBar position="static">
            <Toolbar>
                <Grid container >
                    <Grid item  xs={1}></Grid>

                    <Grid item xs={4} style={{ padding: '10px'}} >
                        <img src={ LOGO_PRIMARY } style={{ height : '35px' }} />
                    </Grid>
                    { ( props.imageProfile !== null ) && 
                      ( props.imageProfile !== undefined ) && (
                        <Grid item xs={3} style={{ padding: '10px'}} >
                            <AvatarIcon 
                                imageProfile = { props.imageProfile}
                            />
                        </Grid>
                      )}

                    <Grid item xs={3} style={{ padding : '10px' }} >
                        { ( props.data !== null ) ? (

                            <Button 
                                color="inherit" 
                                onClick = { e => { logout() ; props.history.push('/') } }
                            >
                                Salir
                            </Button>
                        ) : (
                            null
                        )}    
                    </Grid>
                   

                </Grid>
                
            </Toolbar>
        </AppBar>

        
    )
}



export default withRouter(Header)


