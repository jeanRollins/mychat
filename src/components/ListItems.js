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

export const  AlignItemsList = (props) => {
  const classes = useStyles()

  console.log('props***_____' , props);
  let lisContact =  props.data

  let user = null
  return (
    <List className={classes.root}>

      { lisContact.map( row => (
        <>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src = {row.users[0].file_profile} />
            </ListItemAvatar>
            <ListItemText
              primary = {row.users[0].name }
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    Ali Connors
                  </Typography>
                  {" — I'll be in your neighborhood doing errands this…"}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </>
      ))}
      

    </List>
  );
}