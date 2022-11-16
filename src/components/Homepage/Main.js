import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import newsApi from '../../modules/newsApi';
import React, { useEffect, useState } from 'react'
import "./Header.css"


export default function Main({selectLocation, selectCategory}) {
  const [news, setNews] = useState([]);
  const arrayoffive = [1,2,3,4];
  useEffect(() => {
    getAllNews();
  }, []);

  // Fetch/Get News Data From DataBase
  const getAllNews = () => {
    newsApi.getAllNews(response => {
      if (response.status === 'success') {
        setNews(response.data);
      } else {
        setNews([]);
      }
    });
  };
  return (
    <>
      <div className='titles'>
        <h4>Locations</h4>
        <h4>Breaking News</h4>
        <h4>Catagories</h4>
      </div>
      <div className='container'>
        <div className='left-side'>
          {
            news.map((locationCard) => (
              locationCard.location.locationName === "Location" ?
              (
                <Card key={locationCard.id} sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div" color="text.secondary">
                        {
                          locationCard.newsTitle
                        }
                      </Typography>
                      <Typography gutterBottom variant="body1" component="div" color="text.secondary">
                        {
                          locationCard.newsDescription
                        }
                      </Typography>
                      <Typography variant="body2">
                        {
                          locationCard.newsDetails
                        }
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ) : (
                locationCard.location.locationName === selectLocation &&
              <Card key={locationCard.id} sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" color="text.secondary">
                    {
                      locationCard.newsTitle
                    }
                  </Typography>
                  <Typography gutterBottom variant="body1" component="div" color="text.secondary">
                    {
                      locationCard.newsDescription
                    }
                  </Typography>
                  <Typography variant="body2">
                    {
                      locationCard.newsDetails
                    }
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
              )
            ))
          }
        </div>
        <div className='main'>
          {
            arrayoffive.map((mainCard) => (
              <Card sx={{ maxWidth: "90%" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://cdn.wionews.com/sites/default/files/2022/05/19/263624-untitled-design-11.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            ))
          }
        </div>
        <div className='right-side'>
          {
            news.map((categoryCard) => (
              categoryCard.category === selectCategory && 
              (
                <Card key={categoryCard.id} sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {
                          categoryCard.newsTitle
                        }
                      </Typography>
                      <Typography gutterBottom variant="h5" component="div">
                        {
                          categoryCard.category
                        }
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {
                          categoryCard.newsDescription
                        }
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              )
            ))
          }
        </div>
      </div>
    </>
  )
}
