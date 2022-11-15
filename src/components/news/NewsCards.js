import React, { useState, useEffect } from 'react';
import {
  Box, Button, Card,
  CardActions, CardContent,
  Dialog, DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography
} from '@mui/material';
import NewsApi from '../../modules/newsApi/index';
import locationApi from '../../modules/locationApis';

export default function CardComponent({ news, handleDelete, handleNews, getAllNews }) {

  // open and close dialog state
  const [open, setOpen] = useState(false)
  // set title for news
  const [editTitle, setEditTitle] = useState({ data: '', id: '' });
  // set description for news
  const [editDescription, setEditDescription] = useState({ data: '', id: '' });
  // set details for news
  const [editDetails, setEditDetails] = useState({ data: '', id: '' });
  // set location for news
  const [location, setLocation] = useState([]);
  const [locationName, setLocationName] = useState("");


  useEffect(() => {
    fetchlocations();
  }, []);

  const fetchlocations = () => {
    locationApi.getAllLocations(response => {
      if (response.status === 'success') {
        setLocation(response.data)
      }
    })
  }

  // Opening dialog function and getting current card title, description, details and id
  const handleClickOpen = (e, title, description, details, id,) => {
    // setting editTitle 
    setEditTitle({ data: title, id: id })
    // setting editDescription
    setEditDescription({ data: description })
    // setting editDetails
    setEditDetails({ data: details })
    // opening dialog
    setOpen(true);
  }

  // seting location data 
  const handleLocation = (e) => {
    setLocationName(e.target.value)
  }

  // closing dialog function
  const handleClose = () => {
    // closing dialog
    setOpen(false);
  }

  // getting input field value function for title
  const handleEditTitle = (e) => {
    // getting previous value and setting new value
    setEditTitle({ ...editTitle, data: e.target.value });
  }
  // getting input field value function for description
  const handleEditDescription = (e) => {
    // getting previous value and setting new value
    setEditDescription({ ...editDescription, data: e.target.value });
  }
  // getting input field value function for details
  const handleEditDetails = (e) => {
    // getting previous value and setting new value
    setEditDetails({ ...editDetails, data: e.target.value });
  }

  // updating title, description and details for news function
  const handleSubmitData = () => {
    // storing the data in object form in a variable "updatedNews"
    let updatedNews = {
      newsTitle: editTitle.data,
      newsDescription: editDescription.data,
      newsDetails: editDetails.data,
      location : {
        locationName : locationName
      }
    }
    debugger
    // calling news api to update these fields 
    NewsApi.editNewsById(editTitle.id, updatedNews, response => {
      if (response.status === 'success') {
        getAllNews()
      }
    })
    // clearing data from input fields and and closing dialog window
    setEditTitle({ id: '', data: '' });
    setEditDescription({ data: '' });
    setEditDetails({ data: '' });
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
      {news.map((card, index) => {
        return (
          <Card key={index}
            elevation={6}
            sx={{
              maxWidth: "400px",
              maxHeight: "600px",
              minWidth: "100px",
              minHeight: "200px"
            }}>
            <CardContent>
              <Typography variant="subtitle1" color="inherit">
                {card.categoryId}
              </Typography>
              <Typography variant="subtitle1" color="inherit">
                {card.location.locationName}
              </Typography>
              <Typography variant="h6" color="ThreeDShadow">
                {card.newsTitle}
              </Typography>
              <Typography variant="body1" color="GrayText">
                {card.newsDescription}
              </Typography>
              <Typography variant="body2" color="inherit">
                {card.newsDetails}
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
                onClick={(e) => handleClickOpen(e, card.newsTitle, card.newsDescription, card.newsDetails, card.id)}
              >
                Edit
              </Button>
            </CardActions>
          </Card>
        )
      })}

      {/* Edit Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit News</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            onChange={handleEditTitle}
            value={editTitle.data}
            margin="dense"
            id="title"
            label="Edit News Title"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            onChange={handleEditDescription}
            value={editDescription.data}
            margin="dense"
            id="description"
            label="Edit News Description"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            multiline
            rows={5}
            autoFocus
            onChange={handleEditDetails}
            value={editDetails.data}
            margin="dense"
            id="details"
            label="Edit News Details"
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
            <MenuItem value="none">None</MenuItem>
            {location.map((data) => {
              return (
                <MenuItem key={data.id} value={data.locationName}>{data.locationName}</MenuItem>
              )
            })}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmitData}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
