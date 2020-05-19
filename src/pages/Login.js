import React , {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Card , InputLabel, CardContent, Input, CardActions, TextField, InputAdornment, IconButton ,Button } from '@material-ui/core'
import { Visibility, VisibilityOff} from '@material-ui/icons'
import Title from '../components/Title'
import { withRouter } from 'react-router-dom'

import { validate , GetAuth } from '../libs/Auth'
import { ButtonLoading } from '../components/ButtonLoading';


function Login(props){

  
    if( GetAuth().currentUser){
        props.history.push('/dashboard')
    }

    const [btnSigIn, setBtnSigIn] = useState(true)
    const [textFailEmail, setTextFailEmail] = useState(false)
    const [textFailPassword, setTextFailPassword] = useState(false)
    const [failTextSigIn, setFailTextSigIn] = useState(false)

    const [values, setValues] = useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
        email : ''
    })
    
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    }
;

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const signIn = async (e) => {
        e.preventDefault()
        setBtnSigIn(false)
    
        try{
            const responseForm = await validateForm()

            if( !responseForm ){
                setBtnSigIn(true)
                return false
            }

            setTextFailEmail(false)
            setTextFailPassword(false)

            const responseSigIn = await validate( values.email , values.password )
            props.history.push('/dashboard')
        }
        catch(error){ 
            setFailTextSigIn(true)
            setBtnSigIn(true)
        }
    }

    const validateForm = () => {
        if( values.email == '' ) {
            setTextFailEmail(true)
            return false
        }

        if( values.password == '' ) {
            setTextFailEmail(false)
            setTextFailPassword(true)
            return false
        }

        return true
    }

    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          flexWrap: 'wrap',
        },
        margin: {
          margin: theme.spacing(1),
        },
        withoutLabel: {
          marginTop: theme.spacing(3),
        },
        textField: {
          width: '25ch',
        },
    }));

    return (
        <>
            <Title nameTitle = {'Mychat Login'}/>
            <Grid container >
                <Grid item xs={12} style={{ padding: '10px'}} >
                    <Card style={{width: '100%', padding: '5px'}} className="">


                        <CardContent>
                            <form className={useStyles.root} noValidate autoComplete="off">
                            <InputLabel htmlFor="standard-full-width">Email</InputLabel>

                                <TextField
                                    error={ textFailEmail}
                                    id="standard-full-width"
                                    placeholder="juan@ejemplo.cl"
                                    fullWidth
                                    margin="normal"
                                    onChange = { handleChange('email' )}
                                    helperText={ (textFailEmail) ? "Email necesario." : "" }
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                <TextField
                                    error={ textFailPassword}
                                    id="standard-adornment-password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={ handleChange('password' )}
                                    helperText={ (textFailPassword) ? "Password necesario." : "" }
                                    fullWidth
                                    endadornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                />
                                <br/>

                                {(failTextSigIn) ? (
                                    <p style = {{ color : 'red' , width : '100%' }}> Usuario o contraseña invalida. </p>

                                ) : ( 
                                    null 
                                )}
                                <CardActions>


                                    { ( btnSigIn ) ? (
                                        <Button 
                                            variant = "outlined" 
                                            fullWidth 
                                            style = {{ marginTop : '5px' }} 
                                            onClick = { e => signIn(e) } 
                                            color="primary"
                                        >
                                            Acceder
                                        </Button>
                                    ) : (
                                        <ButtonLoading 
                                            isFullWidth = {true}
                                            text        = { 'Accediendo...' }
                                            variant     = { 'outlined' }
                                        />
                                    )}

                                </CardActions>
                                
                            </form>
                        </CardContent>
                        
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export default withRouter(Login) 



