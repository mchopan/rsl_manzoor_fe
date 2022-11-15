import React from 'react'
import { useEffect, useState } from 'react';
import locationapi from '../../modules/locationApis';
import catagoriesApis from '../../modules/catagoriesApis';
import "./Header.css"
import TopHeadLines from './TopHeadLines';
import Main from './Main';
export default function Homepage() {
    const [loctions, setLocations] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        getAllLocations()
       }, []);

    const getAllLocations = () => {
        locationapi.getAllLocations(response => {
            if (response.status === 'success') {
                setLocations(response.data);
            } else {
                setLocations([]);
            }
        });
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    // Fetch/Get Locations Data From DataBase
    const getAllCategories = () => {
        catagoriesApis.getAllCategories(response => {
            if (response.status === 'success') {
                setCategory(response.data);
            } else {
                setCategory([]);
            }
        });
    };
    return (
        <>
            <div className='header'>
                <div className='header-name'>
                    <h1>RSL NEWS</h1>
                </div>
                <div className='header-elements'>
                    <div className='locations'>
                        <select name="Location" id="locations">
                            <option value="Location">Select Location</option>
                            {
                                loctions.map((location) => {
                                    return (
                                        <option value={location.locationName}>{location.locationName}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='catagories'>
                      <select name="Catagory" id="catagories">
                      <option value="Catagory">Select Catagory</option>
                            {
                                category.map((catagory) => {
                                    return (
                                        <option value={catagory.categoryName}>{catagory.categoryName}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <input type="button" className='ButtonCool' value="Login" />
                </div>
            </div>
            <TopHeadLines />
            <Main/>
        </>
    )
}
