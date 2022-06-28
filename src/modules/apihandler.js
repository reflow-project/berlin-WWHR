var axios = require("axios");

class ApiHandler {
  async getUserToken() {
    const realm = 'reflow';
    const client_id = 'berlin_pilot_app';
    const kcTokenEndpoint = `https://reflow.fokus.fraunhofer.de/keycloak/auth/realms/${realm}/protocol/openid-connect/token`;
    const username = 'webapp_entity';
    const password = 'ss5vdfg8sdaSf6IbK5kg92(1'


    const params = new URLSearchParams()
    params.append('client_id', client_id)
    params.append('grant_type', 'password')
    params.append('username', username)
    params.append('password', password)

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    const response = await axios.post(kcTokenEndpoint, params, config);
    
    return response.data.access_token;
  }

  async getRPToken() {
    const token = await this.getUserToken();

    const realm = 'reflow';
    const client_id = 'berlin_pilot_backend';
    const kcTokenEndpoint = `https://reflow.fokus.fraunhofer.de/keycloak/auth/realms/${realm}/protocol/openid-connect/token`;

    const params = new URLSearchParams()
    params.append('audience', client_id)
    params.append('grant_type', 'urn:ietf:params:oauth:grant-type:uma-ticket')

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
      }
    }

    const response = await axios.post(kcTokenEndpoint, params, config);

    return response.data.access_token;
  }

  async getFeatures(baseUrl, path) {
    const url = baseUrl + path
    const token = await this.getRPToken()
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
      }
    }

    const response = await axios.get(url, config);
    return response;
  }

  async postAddressFile(baseUrl, path, addressFile) {
    const url = baseUrl + path
    const token = await this.getRPToken()
    const formData = new FormData()
    formData.append('csv_data', addressFile);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    }

    const response = await axios.post(url, formData, config)
    return response.data;
  }

  async putInterest(baseUrl, path, pkId, name, email, organization, address, load, note) {
    const url = baseUrl + path + pkId
    const token = await this.getRPToken()
    const body = {
      email: email,
      last: load,
      name: name,
      addresse: address,
      organization: organization,
      note: note
    }
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }

    const response = await axios.put(url, body, config)
    return response;
  }

}

export default ApiHandler
