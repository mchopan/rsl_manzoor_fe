import rslApi from '../rslApi/rslApi';

class News {
    // Get/fetch News  Api
    getAllNews = callBack => {
      console.log()
        rslApi({
            method: 'GET',
            url: `/getNews`,
        }).then(response => {
            if (response.data) {
                callBack({ status: 'success', data: response.data });
            }
        }).catch(error => {
            console.log('Error occure while getting news', error.message);
            callBack({ status: 'error' });
        });
    };

    // Add/Post Location Api 
    addNews =(data, callBack) => {
      rslApi({
          method: 'POST',
          url: `/addNews`,
          data:data
      }).then(response => {
          if(response.data) {
              callBack({status : 'success', data: response.data});
          }
      }).catch(error => {
          console.log('Error occure while Adding Category', error.message);
      });
  };

    // Delete Api
    
  deleteNewsById = (id, callBack) => {
    rslApi({
      method: 'DELETE',
      url: `/delete/${id}`,
    })
      .then(response => {
        if (response.data) {
          callBack({ status: 'success', data: response.data });
        }
      })
      .catch(error => {
        console.log('Error occure while deleting News', error.message);
        callBack({ status: 'error' });
      });
  };

  editNewsById = (id, data, callBack) => {
    rslApi({
      method: 'PUT',
      url: `/update/${id}`,
      data:data
    })
      .then(response => {
        if (response.data) {
          callBack({ status: 'success', data: response.data });
        }
      })
      .catch(error => {
        console.log('Error occure while editing news', error.message);
        callBack({ status: 'error' });
      });
  };
}
export default new News();