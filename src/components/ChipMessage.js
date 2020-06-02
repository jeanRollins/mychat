import React from 'react'

import { Chip } from '@material-ui/core'

export const MessageText = ( props ) => {
  
    return (
        <div 
            align = { props.align }
            style = { styles }    
        >
            <Chip
                label = { props.label + ' -- ' + ' 12:10 am' }
            />
            <br/>
        </div>
        
    )  
} 

const styles = {
    margin : '5px'
}