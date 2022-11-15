import React, {useState} from 'react';
import {
    Box, Typography, Button, TextField,
    Dialog, DialogActions, DialogContent,
    DialogTitle, Card, CardContent, CardActions,
} from '@mui/material'
import locationApis from '../../modules/locationApis';

export default function CategoryCard({ locationName, handleDelete, getAllLocations }) {

    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState({data:'',id:''})

    const handleClickOpen = (e,name,id) => { 
        setEdit({data:name,id:id})
        console.log(edit)
        setOpen(true);     
    }

    const handleClose = () => {
        setOpen(false);
        setEdit({id:''})
    }

    const handleEditText = (e) => {
        setEdit({...edit,data:e.target.value});
    }

    const handleSubmitData = () => {
        console.log(edit.data)
        let newObj = {
            locationName :edit.data,
            id:edit.id
        }
            locationApis.editLocationById(edit.id,newObj, response => {
                if(response.status === 'success') {
                    getAllLocations();
                }
            })
        
        setEdit({id:'', name:''})        
        setOpen(false);
    }

    return (
        <Box sx={{
            margin: "20px",
            display: "flex",
            justifyContent: "space-evenly",
            gap: "20px",
            flexWrap: "wrap",

        }}>
            {locationName.map((card, index) => {
                debugger
                return (
                    <Card key={index}
                        elevation={6}
                        sx={{
                            maxWidth: "400px",
                            maxHeight: "200px"
                        }}>
                        <CardContent>
                            <Typography sx={{
                                opacity : ".5"
                            }} variant="subtitle1" color="inherit">
                               Id : {card.id}
                            </Typography>
                            <Typography variant="h6" color="inherit">
                                {card.locationName}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                onClick={e => handleDelete(card.id)}
                            >
                                Delete
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                size="small"
                                onClick={(event)=>handleClickOpen(event,card.locationName,card.id)}
                           >
                                Edit
                            </Button>
                        </CardActions>
                    </Card>
                )
            })}

            {/* Edit Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Location Name</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        onChange={handleEditText}
                        value={edit.data}
                        margin="dense"
                        id="name"
                        label="Edit Location"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmitData}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
