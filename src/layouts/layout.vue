
<template>
    <Header />
        <slot></slot>
    <Footer />
</template>

<script>
import Header from '../components/header'
import Footer from '../components/footer'

export default {
    name: 'Layout',    
    components: {
        Header,
        Footer,
    },
    data() {
        return {
        
        }
    },
    methods: {

    },
    computed: {

    }
};

</script>

<style>
* {
  box-sizing: border-box;
}

html, body {
  height: 100%;
  margin: 0;
}
#app {
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
  margin: 0 auto;
  font-style: normal;
}

a {
  color: #FFFFFF;
  text-decoration: none !important;
}

h1 {
  display: inline;
  margin-top: 0 !important;
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
  border: 0 !important;
  background-color: #FFFFFF !important;
  padding: 1% 2% !important;
}

.header {
  grid-row-start: 1;
  grid-row-end: 2;
  height: 7.5vh;
  min-height: 60px;
  width: 100%;
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
  top: 60%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

#mainHeadingText {
  padding-left: 1vw;
  font-size: clamp(30px, 4vw, 50px);
}

#headerLogo {
  width: 97px;
  height: 97px;
  float: left;
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
  color: #02E379 !important;
}

.material-icons.white-color {
  color: #FFFFFF !important;
}

.material-icons.white-color.hover:hover, .address:hover .material-icons.white-color.hover {
  color: #000000 !important;
}

.material-icons.small-icon {
  font-size: 14px !important;
}
@media screen and (max-width: 800px) { 
  table td {
    width: 100%!important;
    display: block;
  }
  #headerLogo {
    width: 22px;
  }
  #mainHeading {
    max-width: 40vw;
  }
  #headerLinks {
    height: 60px!important;
  }
  #mainHeaderContainer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  #mainHeadingText {

        max-width: 400px;
        font-size: 13px!important;
  }
}
</style>

