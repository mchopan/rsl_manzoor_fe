import AppBar from "./Appbar"
import Cards from "./CardComponent"
import React, { useEffect, useState } from "react"
import location from '../../modules/locationApis';

export default function Locations() {
    const [locationName, setLocationName] = useState([]);
    const [addLocationName, setAddLocationName] = useState("");

    useEffect(() => {
        getAllLocations();
    }, []);

    // Fetch/Get Locations Data From DataBase
    const getAllLocations = () => {
        location.getAllLocations(response => {
            if (response.status === 'success') {
                setLocationName(response.data);
            } else {
                setLocationName([]);
            }
        });
    };

    // Add/Post Locations Data To DataBase
    const addLocation = (data) => {
        let newData = {
           locationName:data 
        }
        console.log(data,"data")
        location.addLocation(newData, response => {
            if (response.status === 'success') {
                setAddLocationName(response.data);
                getAllLocations();
            } else {
                setAddLocationName();
            }
        });
    };

    const handleDelete = (id) => {
        location.deleteLocationById(id, response => {
            if (response.status === 'success') {
                getAllLocations()
            } else {
                getAllLocations()
            }
        })
    }

    


    return (
        <>
            <AppBar
                addLocation={addLocation}
                addLocationName={addLocationName}
                setAddLocationName={setAddLocationName}
            />
            <Cards
                getAllLocations={getAllLocations}
                handleDelete={handleDelete}
                locationName={locationName}
            />
        </>

    )
}
