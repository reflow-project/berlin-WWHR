<template>
  <layout>
    <div>
      <iframe src="https://reflow-dashboard.fokus.fraunhofer.de/superset/dashboard/5/?standalone=true" width=100% height=950px, title="Reflow Berlin Draft Dashboard"></iframe>
    </div>
  </layout> 
</template>

<script>
//import axios from 'axios';
import Layout from '../layouts/layout'

export default {
  name: 'Dashboard',
  components: {
     Layout,
  },
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
  }
};
</script>

<style scoped>
.hexbin-hexagon {
  stroke: #000;
  stroke-width: 1px;
}
.mapOptionsToggle {
  position: fixed;
  top: 2%;
  left: 1%;
  cursor: pointer;
  color: #02E379;
  height: 20px;
  z-index: 10001;
}

.mapOptions {
  display: flex;
  width: 80%;
  margin: 0 auto;
}

.newAddresses {
  width: 100%;
  text-align: left;
}

.address {
  width: 80%;
  cursor: pointer;
  padding: 1% 2%;
}


.addressClose {
  margin-right: 2%;
}

.addressContent {
  font-size: large;
}

.addressClose:hover, .addressContent:hover {
 text-decoration: underline;
}

.hexagon {
  width: 100%;
  text-align: right;
}

.map {
  height: 65vh;
}

#addedPlaces, #addedPlacesLabel {
  padding-top: 2%;
}

#addedPlacesLabel {
  vertical-align: top;
}
</style>
