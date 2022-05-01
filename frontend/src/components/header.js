import React from "react";
import PropTypes from "prop-types";
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';
import AppBar from "@material-ui/core/AppBar";
import {IconButton, TextField } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import logo from "./logo.png";
import { useNavigate } from "react-router";
import { goToHome, goToActivityCreated, goToActivityJoined } from "../Router/coordenation";
import { setUser } from "./Context";

// customized style
const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    backgroundColor: "white",
  },
  search: {
    display: "flex",
    background: "white",
    paddingLeft: " 1%",
  },
  containerDetail:{
    display:'flex',
    justifyContent:"center",
    alignItems:"center",
    flexDirection: "column",
    width: "100%",
  },
  fabButton: {
      backgroundColor: '#FFA500',
      color: '#FFFFFF',
      '&:hover': {
        backgroundColor: '#dc9003',
        color: '#e7e7e7',
      }
  }
}));

// The ScrollTop button
function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role='presentation' className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

// the main component on the page, contains the navigation bar and rendered data
export default function BackToTop({ props, dataToScreen, isDetail, dataToHome}) {
  const [search, setSearch] = React.useState("");
  const classes = useStyles();
  const navigate = useNavigate();

  const onChange = (e) => {
    setSearch(e.target.value);
    dataToHome(e.target.value);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      
      <AppBar
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 10px",
          color: "#EC5D34",
          backgroundColor: "#F8D1B4",
        }}
      >
        <Toolbar>
          <IconButton
          color="inherit"
          onClick={()=> goToHome(navigate) }>
          <img src={logo}/>
          </IconButton>
          <Typography>&nbsp;&nbsp;&nbsp; </Typography>
          { isDetail ?  ""   :  <TextField
          value={search}
          className={classes.search}
          onChange={onChange}
          variant='standard'
          placeholder='Search by name'
        />}
        </Toolbar>

        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

          <IconButton
            color="inherit"
            onClick={()=> {window.location.href = '/createActivity' }}> 
          <Avatar sx={{ m: 1, bgcolor: "#F3902F" }}>
            <AddIcon />
          </Avatar>
            <Typography variant="h6" color="inherit" component="div">
            Create Activity
            </Typography>
          </IconButton>

          <IconButton
            color="inherit"
            onClick={()=> goToActivityCreated(navigate) }>
            <Typography variant="h6" color="inherit" component="div">
            Activities Created
            </Typography>
          </IconButton>

          <IconButton
            color="inherit"
            onClick={()=> goToActivityJoined(navigate) }>
            <Typography variant="h6" color="inherit" component="div">
            Activities Joined
            </Typography>
          </IconButton>

          <IconButton
          color="inherit"
          onClick={()=> {window.location.href = '/message' } }>
          <Typography variant="h6" color="inherit" component="div">
          Messages
          </Typography>
        </IconButton>

        <IconButton
          color="inherit"
          onClick={()=> {
            setUser(0)
            localStorage.setItem('user', 0)
            window.location.replace('../signIn')
          }}>
          <Typography variant="h6" color="inherit" component="div">
          Log Out
          </Typography>
        </IconButton>
        </Box>

      </AppBar>
      <Toolbar id='back-to-top-anchor' />

      <Container>
        <Box>
          {dataToScreen}
        </Box>
      </Container>      
      <ScrollTop {...props}>
        <Fab className={classes.fabButton} size='small' aria-label='scroll back to top'>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
