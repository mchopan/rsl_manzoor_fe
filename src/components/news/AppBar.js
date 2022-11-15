import React, { useState, useEffect } from 'react';
import locationApi from '../../modules/locationApis/index'
import categoryApi from '../../modules/catagoriesApis/index'
import {
    AppBar, Box, Toolbar,
    Typography, Button, TextField,
    Dialog, DialogActions, DialogContent,
    DialogTitle,
    MenuItem,
} from '@mui/material'

export default function Appbar({ news, getAllnews, addNews }) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [details, setDetails] = useState("")
    const [location, setLocation] = useState([])
    const [category, setCategory] = useState([])
    const [locationName, setLocationName] = useState("");
    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
      fetchlocations();
      fetchCategories();
    }, []);

    const fetchlocations = () =>{
        locationApi.getAllLocations(response => {
            if(response.status === 'success'){
                setLocation(response.data)
            }
        })
    }
    const fetchCategories = () =>{
        categoryApi.getAllCategories(response => {
            if(response.status === 'success'){
                setCategory(response.data)
            }
        })
    }

    const handleLocation =(e) => {
        setLocationName(e.target.value)
    }

    const handleCategory = (e) => {
        setCategoryName(e.target.value)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleDes = (e) => {
        setDescription(e.target.value);
    }

    const handleDetails = (e) => {
        setDetails(e.target.value);
    }

    const handleAdd = (e) => {
        e.preventDefault();
        addNews(title, description, details, locationName, categoryName);
        setOpen(false);
        setTitle('');
        setDescription('');
        setDetails('');
        setOpen(false);
    }

    return (
        <Box>
            <AppBar sx={{ position: 'sticky' }} color='primary'>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h6'>News</Typography>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleClickOpen}
                    >
                        Add News
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Add Location Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New News</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        onChange={handleTitle}
                        value={title}
                        margin="dense"
                        id="newsTitle"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        onChange={handleDes}
                        value={description}
                        margin="dense"
                        id="newsDescription"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        multiline
                        rows={5}
                        autoFocus
                        onChange={handleDetails}
                        value={details}
                        margin="dense"
                        id="newsDetails"
                        label="Details"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        select
                        autoFocus
                        onChange={handleLocation}
                        value={locationName}
                        margin="dense"
                        id="locations"
                        label="Locations"
                        type="text"
                        fullWidth
                        variant="outlined"
                    >
                        {location.map((data) => {
                            return(
                                <MenuItem key={data.id} value={data.locationName}>{data.locationName}</MenuItem>
                            )
                        })}
                    </TextField>
                    <TextField
                        select
                        autoFocus
                        onChange={handleCategory}
                        value={categoryName}
                        margin="dense"
                        id="categories"
                        label="Category"
                        type="text"
                        fullWidth
                        variant="outlined"
                    >
                        {category.map((data) => {
                            return(
                                <MenuItem key={data.id} value={data.categoryName}>{data.categoryName}</MenuItem>
                            )
                        })}
                    </TextField>
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAdd}>Add</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
