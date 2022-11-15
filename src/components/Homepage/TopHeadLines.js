import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import React, { useState, useEffect} from 'react'
import "./Header.css"
import newsApi from '../../modules/newsApi';
export default function TopHeadLines() {
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
            <div className='top-headlines'>
                <h3>Top Headlines</h3>
            </div>
            <div className='news-cards'>
                {
                    news.map((element) => {
                        return (
                            <Card key={element.id} sx={{ maxWidth: 345 }}>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {
                                                element.newsTitle
                                            }
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {
                                                element.newsDescription
                                            }
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        )
                    })
                }
            </div>
            <hr/>
        </>
    )
}

