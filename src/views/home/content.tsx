import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const Content: React.FC = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1, margin: 0 }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#FFF000",
            background:
              "linear-gradient(270deg, rgba(0,0,0,1) 0%, rgba(255,165,0,1) 100%)",
          }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              GymUp
            </Typography>
            <Link to="/about" style={{textDecoration:'none'}}>
            <Button sx={{color:'#FFFFFF'}} color="inherit">About</Button>
            </Link>
            <Button color="inherit">Contact</Button>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Box
        sx={{
          height: 600,
          backgroundImage: 'url("https://dummyimage.com/720x400")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          position: "relative",
        }}
      >
        <Typography
          sx={{
            position: "absolute",
            left: 10,
            bottom: 10,
          }}
          variant="h2"
        >
          GymUp
        </Typography>
      </Box>
    </>
  );
};
