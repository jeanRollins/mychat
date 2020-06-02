import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {List , ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export const SimpleList  =  ( props )  =>  {
  const classes = useStyles()

  const user = props.data

  return(
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar 
            alt = "Remy Sharp" 
            src = { user.file_profile } />
        </ListItemAvatar>
        <ListItemText
          primary = { user.name }
          secondary = {
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                { user.number_phone }
              </Typography>
              {" — " + user.thought }
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  )
    
}

export const  AlignItemsList = (props) => {
  const classes = useStyles()
  let lisContact =  props.data
  console.log( 'props***' , props);
  

  let user = null
  return (
    <List className={classes.root}>

      { lisContact.map( row => (
        <div key = { row.id }>
          <ListItem 
            alignItems="flex-start"
            button 
            onClick = { e => props.methodOnClick( row.users[0].id ) }  
          >
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src = {row.users[0].file_profile} />
            </ListItemAvatar>
            <ListItemText
              primary = {row.users[0].name }
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    Ali Connors
                  </Typography>
                  {" — I'll be in your neighborhood doing errands this…"}
                </>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </div>
      ))}
      

    </List>
  );
}

export const  ItemsList = (props) => {
  const classes = useStyles()
  let users =  props.data
  return (
    <List className={classes.root}>

      { users.map( row => (
        <div key = { row.id }>
          <ListItem 
            alignItems="flex-start" 
            button 
            onClick = { e => props.methodOnClick( row.id ) }>
            <ListItemAvatar> 
              <Avatar alt="Remy Sharp" src = {row.file_profile} />
            </ListItemAvatar>
            <ListItemText
              primary = {row.name }
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    { 'Número : ' +  row.number_phone }
                  </Typography>
                  
                  { ' '}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </div>
      ))}
      

    </List>
  )
}

