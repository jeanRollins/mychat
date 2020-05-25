import React from 'react'
import { LOGO_SECONDARY } from '../libs/Commons'
import { CircularProgress, Grid, GridList } from '@material-ui/core'

export const Loading = () => {

    
    return(
        <Grid container style={{ marginTop : '200px' , marginBottom : '200px' }}>
            <Grid item xs = {4} >  </Grid>
            <Grid item xs = {3}> 
                <img style={{ width : '100%' }} src = {LOGO_SECONDARY} /> 
                <br/>
                <div style={{ width : '100%' , textAlign: 'center' }} >
                    <CircularProgress/>
                </div>
                
            </Grid>

        </Grid>
    )
}

export const SimpleLoading = () => {   
    return(
        <div style={{ width : '100%' , textAlign: 'center' }} >
            <CircularProgress/>
        </div>
           
    )
}