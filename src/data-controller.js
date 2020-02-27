class DataController {
  constructor() {
    
  }

  getTravelers() {
    let allTravelers;

    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers')
      .then(res => res.json())
      .then(data => allTravelers = data)
      .catch(err => console.log(err.message));

    return allTravelers;
  }
}

export default DataController;
