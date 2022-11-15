import rslApi from '../rslApi/rslApi';

class Location {
    // Get/fetch location Api
    getAllLocations = callBack => {
        rslApi({
            method: 'GET',
            url: `/getLocation`,
        }).then(response => {
            if (response.data) {
                callBack({ status: 'success', data: response.data });
            }
        }).catch(error => {
            console.log('Error occure while getting locations', error.message);
            callBack({ status: 'error' });
        });
    };

    // Add/Post Location Api 
    addLocation = (data,callBack)=> {
        rslApi({
            method: 'POST',
            url: `/addLocation`,
            data:data
        }).then(response => {
            if(response.data) {
                callBack({status : 'success', data: response.data});
            }
        }).catch(error => {
            console.log('Error occure while Adding location', error.message);
        });
    };

    // Delete Api
    
  deleteLocationById = (id, callBack) => {
    rslApi({
      method: 'DELETE',
      url: `/deleteLocation/${id}`,
    })
      .then(response => {
        if (response.data) {
          callBack({ status: 'success', data: response.data });
        }
      })
      .catch(error => {
        console.log('Error occure while deleting locations', error.message);
        callBack({ status: 'error' });
      });
  };

  editLocationById = (id,data, callBack) => {
    rslApi({
      method: 'PUT',
      url: `/updateLocation/${id}`,
      data:data
    })
      .then(response => {
        if (response.data) {
          callBack({ status: 'success', data: response.data });
        }
      })
      .catch(error => {
        console.log('Error occure while editing locations', error.message);
        callBack({ status: 'error' });
      });
  };
}
export default new Location();