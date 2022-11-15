import React, { useState } from 'react';
import {
    AppBar, Box, Toolbar,
    Typography, Button, TextField,
    Dialog, DialogActions, DialogContent,
    DialogTitle,
} from '@mui/material'



export default function Appbar({addCategory}) {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleText = (e) => {
        setText(e.target.value);
    }

    const handleAdd = (e) => {
        e.preventDefault();
        addCategory(text);
        setOpen(false);
        setText('');
    }

    return (
        <Box>
            <AppBar sx={{ position: 'sticky' }} color='primary'>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h6'>Categories</Typography>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleClickOpen}
                    >
                        Add Category
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Add Location Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        onChange={handleText}
                        value={text}
                        margin="dense"
                        id="name"
                        label="Category Name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAdd}>Add</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
