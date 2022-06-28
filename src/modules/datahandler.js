class DataHandler {
  constructor(apiHandler) {
    this.apiHandler = apiHandler;
  }

  //API data handling
  async getPotentialArea(baseUrl) {
    var potentialFeatures = []
    await this.apiHandler.getFeatures(baseUrl, '/area')
    .then(response => {
        if(!(response.data.coordinates.length == 0)) {
          potentialFeatures = [response.data];

        } else {
          window.alert('Es konnten keine Potenzialdaten geladen werden.');
        }
    }).catch(error => {
      console.log(error)
    })
    return potentialFeatures
  }

  async getInterestArea(baseUrl){
    var interestFeatures = [];
    await this.apiHandler.getFeatures(baseUrl, '/interest?page=1&page_size=100')
    .then(response => {
      // WORKAROUND API SHOULD THROW ERROR!
      if ((response.data.features) && !(Object.keys(response.data.features).length === 0)) {
        interestFeatures = response.data.features.map(featureArray => featureArray.geometry);
      } else {
        console.log('No data for getInterestArea could be requested.');
      }
    }).catch(error => {
      console.log(error)
    })
    return interestFeatures
  }

  async downloadAddressBatchFeatures(baseUrl, batchRequestUri) {
    await this.apiHandler.getFeatures(baseUrl, batchRequestUri)
    .then(response => {
      var addressBatchURL = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(response.data));
      var addressBatchLink = document.createElement('a');
      addressBatchLink.setAttribute('href', addressBatchURL);
      addressBatchLink.setAttribute('download', 'address_batch_features.json');
      document.body.appendChild(addressBatchLink);
      addressBatchLink.click();
      addressBatchLink.remove();
    }).catch(error => {
      console.log(error)
    })
  }

  processInterestData(address) {
    const inputInterestAddress = address.name;
    var inputInterestAddressPkId = 0;
    if (address.pk) {
      inputInterestAddressPkId = address.pk;
    } else {
      console.log('No alkis data for this address available. Dummy PK-Id was set.')
    }

    return {
      inputInterestAddress: inputInterestAddress,
      inputInterestAddressPkId: inputInterestAddressPkId
    }
  }


  async expressInterest(baseUrl, personName, personMail, personOrganisation, addressPkId, addressName, heatingLoad, note) {
    var requestSucceeded = false;
    if (addressPkId == 0) {
      // default pkId = no pkId was set
      note = `Note: Address couldnt be found in the alkis building list, ${note}`
    }

    await this.apiHandler.putInterest(baseUrl, '/express_interest/', addressPkId, personName, personMail, personOrganisation, addressName, heatingLoad, note)
    .then(response => {
      if (response.data.SUCCESS) {
        requestSucceeded = true;

      } else {
        console.log('Interest could not be registered.');
      }
    }).catch(error => {
      console.log(error)
    })

    return requestSucceeded
  }

}

export default DataHandler
