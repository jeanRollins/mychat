import React from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { withRouter } from 'react-router-dom'
import { IconButton } from '@material-ui/core'
const IndexIcons = (props) => {

    let indexIcon = null
    switch( props.type ){

        case 'back' : indexIcon = <ArrowBackIcon /> ; break ;
    }

    return (
        <>
            <IconButton    
                aria-label = "delete" 
                className  = {''}
                style = { props.iconStyle }
                onClick    = { e =>  props.history.push( props.redirect ) }
            >
                { indexIcon }
            </IconButton>

        </>
    )
}


export default withRouter( IndexIcons ) 