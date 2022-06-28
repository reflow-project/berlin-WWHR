
<template>
    <router-view class="content"></router-view>
</template>

<script>
import router from './router';
import store from './modules/store.js';

export default {
  name: 'App',
  components: {},
  methods: {
    openContactForm() {
      store.commit("openContactForm");
      router.push({ path: '/map', replace: true });
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

html, body {
  height: 100%;
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background-color: #0D2451;
  color: #FFFFFF;
}

#app {
  font-family: 'Barlow', sans-serif;
  text-align: center;
  min-height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  width: 100%;
}

a {
  color: #FFFFFF;
  text-decoration: none;
}

h1 {
  display: inline;
  margin-top: 0;
}

h2 {
  display: inline;
}

h3 {
  display: inline;
}

h4 {
  display: inline;
}

button {
  background-color: #02E379;
  color: #333333;
  border: 0;
  padding: 1% 3%;
  cursor: pointer;
  font-family: 'Barlow', sans-serif;
  font-weight: bold;
  font-size: 1em;
}

input {
  border: 0;
  background-color: #FFFFFF;
  padding: 1% 2%;
}

.header {
  grid-row-start: 1;
  grid-row-end: 2;
  min-height: 60px;
  width: 100%;
  display: grid;
  padding-bottom: 1%;
}

.content {
  grid-row-start: 2;
  grid-row-end: 3;
  width: 100%;
}

.footer {
  grid-row-start: 3;
  grid-row-end: 4;
  width: 100%;
  padding: 1% 2vw;
  display: flex;
  justify-content: space-between;
}

.mainHeaderContainer {
  grid-row-start: 1;
  grid-row-end: 2;
}

#headerLinks {
  padding-right: 2vw;
  height: 100%;
}

.headerLink {
  display: inline;
  float: right;
  padding-right: 1vw;
  font-size: clamp(15px, 1.5vw , 20px);
  position: relative;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

#mainHeading {
  display: inline;
  float: left;
  padding-left: 2vw;
  position: relative;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

#mainHeadingText {
  padding-left: 1vw;
  font-size: clamp(30px, 4vw, 50px);
}

#headerLogo {
  width: clamp(40px, 5vw , 60px);
  padding: 0;
  float: left;
}

#bannerNoisyData {
  grid-row-start: 3;
  grid-row-end: 4;
  background-color: red;
  padding-top: 0.5%;
  padding-bottom: 0.5%;
}

#linkContactForm {
  text-decoration: underline;
  cursor: pointer;
}

#euLogo {
  padding: 0;
  height: 8vh;
}

#footerLogo {
  margin: auto 0;
  height: 8vh;
}

#footerReflowLink {
  align-self: center;
}

#footerFurtherlinks {
  align-self: flex-end;
}

#euLink{
  background-color: white;
  align-self: center;
}

/*** MATERIAL ICONS ***/
.material-icons {
  color: #02E379;
}

.material-icons.white-color {
  color: #FFFFFF;
}

.material-icons.white-color.hover:hover, .address:hover .material-icons.white-color.hover {
  color: #000000;
}

.material-icons.small-icon {
  font-size: 14px;
}
</style>
