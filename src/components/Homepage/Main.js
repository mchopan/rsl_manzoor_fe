import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import newsApi from '../../modules/newsApi';
import React, { useEffect, useState } from 'react'
import "./Header.css"
export default function Main() {
  // const array = [1,2,3,4];
  const [news, setNews] = useState([]);

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
                news.map((locationCard) => {
                  return (
                    <Card key={locationCard.id} sx={{ maxWidth: 345 }}>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {
                                                locationCard.newsTitle
                                            }
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {
                                                locationCard.newsDescription
                                            }
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                  )
                })
              }
            </div>
            <div className='main'>
              Hello world
            </div>
            <div className='right-side'>
              {
                news.map((catagoryCard) => {
                  return(
                    <Card key={catagoryCard.id} sx={{ maxWidth: 345 }}>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {
                                                catagoryCard.newsTitle
                                            }
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {
                                                catagoryCard.newsDescription
                                            }
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                  )
                })
              }
            </div>
        </div>
    </>
  )
}
