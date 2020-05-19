import React from 'react'
import { CircularProgress, Button } from '@material-ui/core'

export const ButtonLoading = (props) => {

    return (
        <>
            <Button variant = { props.variant } fullWidth = {props.isFullWidth}  color="primary">
                { props.text }
                <CircularProgress size = { 18 } />
            </Button>
            
        </>
    )
}