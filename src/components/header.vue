<template>
<header class="header">
      <div id="mainHeaderContainer">
        <div id="mainHeading">
            <a href="https://reflowproject.eu/" >
              <img id="headerLogo" alt="Reflow logo" src="../assets/Reflow_logo-stamp.svg">
            </a>
            <h1 id="mainHeadingText">
            Waste Water Heat Radar
            </h1>
            <h3>Beta</h3>
        </div>
        <div id="headerLinks">
          <div class="headerLink">
            <router-link :to="{ name: 'About' }">Über</router-link>
          </div>
          <div class="headerLink">
            <router-link :to="{ name: 'Help' }">Hilfe</router-link>
          </div>
          <div class="headerLink">
            <router-link :to="{ name: 'Dashboard' }">Dashboard</router-link>
          </div>
          <div class="headerLink">
            <router-link :to="{ name: 'Map' }">Karte</router-link>
          </div>
        </div>
      </div>
</header>
    
        
</template>
<script>
export default {
  name: 'Header',
}
</script>
