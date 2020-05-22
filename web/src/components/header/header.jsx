import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export function Header() {

  return (
    <>
      <AppBar>
        <Toolbar variant="dense">
          <Typography variant="h5" color="inherit">
            Hackaton Manager
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}
