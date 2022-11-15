import React,{useState} from 'react';
import {
    Box, Button, Card,
    CardActions, CardContent,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography
} from '@mui/material';
import catagoriesApis from '../../modules/catagoriesApis';

export default function CardComponent({ categoryName, handleDelete, handleCategory, getAllCategories}) {

    const [open, setOpen] = useState(false)
    const [edit, setEdit] = useState({data:'',id:''});
    const handleClickOpen = (e,name, id) => {
        setEdit({data:name,id:id})
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const handleEditText = (e) => {
        setEdit({...edit,data:e.target.value});
    }

    const handleSubmitData = () => {
        let updatedCategory = {
            categoryName : edit.data
        }
        catagoriesApis.editCategoryById(edit.id, updatedCategory, response => {
            if(response.status === 'success'){
                getAllCategories()
            }
        })
        setEdit({id:'',data:''});
        setOpen(false)
    }

    return (
        <Box sx={{
            margin: "20px",
            display: "flex",
            justifyContent: "space-evenly",
            gap: "20px",
            flexWrap: "wrap",

        }}>
            {categoryName.map((card, index) => {
                return (
                    <Card key={index}
                        elevation={6}
                        sx={{
                            maxWidth: "400px",
                            maxHeight: "200px"
                        }}>
                        <CardContent>
                            <Typography sx={{
                                opacity: ".5"
                            }} variant="subtitle1" color="inherit">
                                Id : {card.id}
                            </Typography>
                            <Typography variant="h6" color="inherit">
                               <Button
                                    onClick={e => handleCategory(card.id)} 
                                    variant="text"
                                    color="inherit">
                               {card.categoryName}
                               </Button>
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
                                onClick={(e)=>handleClickOpen(e,card.categoryName,card.id)}
                                >
                                Edit
                            </Button>
                        </CardActions>
                    </Card>
                )
            })}

            {/* Edit Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Category Name</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        onChange={handleEditText}
                        value={edit.data}
                        margin="dense"
                        id="name"
                        label="Edit Category"
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
