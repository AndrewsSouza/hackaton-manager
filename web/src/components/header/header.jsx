import React from 'react';
import { useHistory } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { homePathName } from '../../pages'
import { Typography } from '@material-ui/core';

export function Header() {
  let history = useHistory()

  function goToHome() {
    history.push(homePathName)
  }

  return (
    <>
      <AppBar>
        <Toolbar variant="dense">
          <Button color="inherit" onClick={goToHome} >
            <Typography >
              Hackaton Manager
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
