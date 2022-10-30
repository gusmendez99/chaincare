import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Collapse } from '@material-ui/core';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import SortIcon from '@material-ui/icons/Sort';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll';
import logo from '../../assets/LogoBlueCropped.png'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'Nunito',
  },
  appbar: {
    background: 'none',
  },
  appbarWhite: {
    background: 'white',
  },
  appbarWrapper: {
    width: '80%',
    margin: '10px auto',
  },
  appbarTitle: {
    flexGrow: '1',
  },
  icon: {
    color: '#fff',
    fontSize: '2rem',
  },
  colorText: {
    color: '#3DBFF2',
  },
  container: {
    textAlign: 'center',
  },
  title: {
    color: '#fff',
    fontSize: '4.5rem',
  },
  goDown: {
    color: '#6BCCF2',
    fontSize: '4rem',
  },
}));

const ElevationScroll = props => {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    className: trigger ? classes.appbarWhite : classes.appbar,
  });
}

export default function Header() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <div className={classes.root} id="header">
      <ElevationScroll>
        <AppBar>
          <Toolbar className={classes.appbarWrapper}>
            <a href='/' className={classes.appbarTitle}>
              <img src={logo} alt='chaincare-logo' style={{ height: 40, weight: 40 }} />
            </a>
            <IconButton>
              <SortIcon className={classes.icon} />
            </IconButton>
          </Toolbar>
        </AppBar>
      </ElevationScroll>

      <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedSize={50}
      >
        <div className={classes.container}>
          <h1 className={classes.title}>
            Bienvenido a <br />
            <span className={classes.colorText}>ChainCare</span>
          </h1>
          <Scroll to="portal" smooth={true}>
            <IconButton>
              <ExpandMoreIcon className={classes.goDown} />
            </IconButton>
          </Scroll>
        </div>
      </Collapse>
    </div>
  );
}
