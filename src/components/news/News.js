import React, { useState, useEffect } from 'react'
import AppBar from './AppBar'
import NewsCard from "./NewsCards"
import newsApi from '../../modules/newsApi/index'

export default function News() {

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

  // Add/Post News Data To DataBase
  const addNews = (title, description, details, locationNames, categoryNames) => {
    let updatedNews = {
      newsTitle: title,
      newsDescription: description,
      newsDetails: details,
      location :{
        locationName : locationNames
      },
      category : categoryNames
    }
    debugger
    newsApi.addNews(updatedNews, response => {
      if (response.status === 'success') {
        setNews(response.data);
        getAllNews();
      } else {
        setNews();
      }
    });
  };

  const handleDelete = (id) => {
    newsApi.deleteNewsById(id, response => {
      if (response.status === 'success') {
        getAllNews();
      } else {
        getAllNews();
      }
    })
  }

  const handleNews = (id) => {
      news.getNewsById(id, response => {
          if (response.status === 'success') {

          }
      })
  }

  return (
    <>
      <AppBar
        addNews={addNews}
      />
      <NewsCard
        getAllNews={getAllNews}
        handleDelete={handleDelete}
        news={news}
        handleNews={handleNews}
      />
    </>
  )
}
