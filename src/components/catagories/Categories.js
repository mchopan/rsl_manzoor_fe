import React, { useState, useEffect } from 'react'
import Appbar from './AppBar'
import CategoryCard from "./CategoryCards"
import Category from "../../modules/catagoriesApis/index"
export default function Categories() {

    const [categoryName, setCategoryName] = useState([]);
    const [addCategoryName, setAddCategoryName] = useState("");

    useEffect(() => {
        getAllCategories();
    }, []);

    // Fetch/Get Locations Data From DataBase
    const getAllCategories = () => {
        Category.getAllCategories(response => {
            if (response.status === 'success') {
                setCategoryName(response.data);
            } else {
                setCategoryName([]);
            }
        });
    };

    // Add/Post Category Data To DataBase
    const addCategory = (data) => {
        let newCategory = {
            categoryName:data
        }
        Category.addCategory(newCategory,response => {
            if (response.status === 'success') {
                setAddCategoryName(response.data);
                getAllCategories();
            } else {
                setAddCategoryName();
            }
        });
    };

    const handleDelete = (id) => {
        Category.deleteCategoryById(id, response => {
            if (response.status === 'success') {
                getAllCategories()
            } else {
                getAllCategories()
            }
        })
    }

    const handleCategory = (id) => {
        Category.getCategoryById(id, response => {
            if (response.status === 'success') {
                
            }
        })
    }

    return (
        <>
            <Appbar
                addCategory={addCategory}
                addCategoryName={addCategoryName}
                setCategoryName={setCategoryName}
            />
            <CategoryCard
                getAllCategories={getAllCategories}
                handleDelete={handleDelete}
                categoryName={categoryName}
                handleCategory={handleCategory}
            />
        </>
    )
}
