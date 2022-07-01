import Keycloak from 'keycloak-js'

class KeycloakInitializer {
  async initWithStore(store) {

    var userAuthenticated = false;

    await new Promise((resolve) => {
      let initOptions = {
        url: '', //insert keycloak-instance URI
        realm: 'reflow',
        clientId: 'berlin_pilot_app',
        onLoad: 'login-required',
        bearerOnly: false,
        checkLoginIframe: false
      };

      let keycloak = Keycloak(initOptions);

      keycloak.init({
        onLoad: initOptions.onLoad,
        checkLoginIframe: initOptions.checkLoginIframe
      }).then(async (auth) => {
        if (!auth) {
          window.location.reload()
        } else {
          store.commit("setToken", keycloak.token);
      
          resolve(userAuthenticated = true);
        }

        //Token Refresh
        setInterval(() => {
          keycloak.updateToken(70).then((refreshed) => {
            if (refreshed) {
              console.info('Token refreshed' + refreshed);
              store.commit("setToken", keycloak.token);
            } else {
              // console.warn('Token not refreshed, valid for '
              //   + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds')
            }
          }).catch(() => {
            console.error('Failed to refresh token')
          });
        }, 6000)

      })
    });

    return userAuthenticated
  }

}

export default KeycloakInitializer
