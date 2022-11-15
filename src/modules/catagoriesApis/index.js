import rslApi from '../rslApi/rslApi';

class Location {
    // Get/Fetch Categories Api
    getAllCategories = callBack => {
        rslApi({
            method: 'GET',
            url: `/getCategory`,
        }).then(response => {
            if (response.data) {
                callBack({ status: 'success', data: response.data });
            }
        }).catch(error => {
            console.log('Error occure while getting Categories', error.message);
            callBack({ status: 'error' });
        });
    };

    // Add/Post Categories Api 
    addCategory = (data, callBack) => {
        rslApi({
            method: 'POST',
            url: `/addCategory`,
            data:data
        }).then(response => {
            if(response.data) {
                callBack({status : 'success', data: response.data});
            }
        }).catch(error => {
            console.log('Error occure while Adding Category', error.message);
        });
    };

    // Delete Category Api
    
  deleteCategoryById = (id, callBack) => {
    rslApi({
      method: 'DELETE',
      url: `/deleteCategory/${id}`,
    })
      .then(response => {
        if (response.data) {
          callBack({ status: 'success', data: response.data });
        }
      })
      .catch(error => {
        console.log('Error occure while deleting Category', error.message);
        callBack({ status: 'error' });
      });
  };

  getCategoryById = (id, callBack) => {
    rslApi({
      method: 'GET',
      url: `/getCategory/${id}`,
    })
      .then(response => {
        if (response.data) {
          callBack({ status: 'success', data: response.data });
        }
      })
      .catch(error => {
        console.log('Error occure while fatching Category', error.message);
        callBack({ status: 'error' });
      });
  };

  editCategoryById = (id, data, callBack) => {
    rslApi({
      method : 'PUT',
      url: `/updateCategory/${id}`,
      data:data
    }).then(response => {
      if(response.data){
        callBack({status : 'success', data: response.data})
      }
    }).catch(error => {
      console.log("error occour while updating Category", error.message);
      callBack({status : error});
    });
  };
};
export default new Location();