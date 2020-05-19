import React from 'react'
import Typography from '@material-ui/core/Typography'


export default function Title(props){
    
    return( 
        <h3 
            style={ style }  
            align="center"
        >
            <Typography>

                {props.nameTitle}

            </Typography>
        </h3>
    )

}


    
const style = {
    color : '#595959', 
    margin : '50px 0px 10px 0px' 

}



