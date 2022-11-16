import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
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
                    news.map((element, index) => (
                        index < 5 && (
                            <Card key={element.id} sx={{ maxWidth: 345 }}>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography variant="h6">
                                            {
                                                element.newsDescription
                                            }
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        )
                    ))
                }
            </div>
            <hr />
        </>
    )
}

