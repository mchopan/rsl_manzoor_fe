import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
import { Link } from 'react-router-dom'
import "./Login.css"


export default function Login() {
    return (
        <>
            <AppBar position="relative" color="primary">
                <Toolbar>
                    <Typography variant="h6">
                        <h5>Welcome User</h5>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Typography variant='h4' textAlign="center" fontFamily="cursive">
                Here you can navegate to anywhere you want to update
            </Typography>
            <Box sx={{
                "height": "100%",
                "width": "100%",
                "display": "flex",
                "flexDirection": "column",
                "justifyContent": "center",
                "alignItems": "center"
            }}>
                <Link className='nav-links' to="/news"> Update News </Link>
                <Link className='nav-links' to="/categories"> Update Categories </Link>
                <Link className='nav-links' to="/locations"> Update Locations </Link>
                <Link className='nav-links' to="/"> Back to Home Page </Link>

            </Box>
        </>
    )
}
