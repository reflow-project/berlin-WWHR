<template>
    <header>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <div class="topnav">
      <a href="/start" class="homeLink"><img id="" class="logo" alt="Reflow logo" src="../assets/Reflow_logo-stamp.svg"></a>

      <div id="myLinks">
        <a class="nav-link" href="#challenge">The Challenge</a>
        <a class="nav-link" href="/map">Web-App</a>
        <a class="nav-link" href="#success">Success Stories</a>
        <a class="nav-link" href="#partners">Partners</a>
        <a class="nav-link" href="#contact">Contact</a>
      </div>
     
      <a href="javascript:void(0);" class="icon" @click="myFunction">
        <i class="fa fa-bars"></i>
      </a>
    </div>
    </header> 
</template>
<script>

export default {
  name: 'navigation',
  methods: {
    myFunction() {
      console.log(1);
       var x = document.getElementById("myLinks");
       console.log(x);
        if (x.style.display === "block") {
          x.style.display = "none";
        } else {
          x.style.display = "block";
        }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/style.scss';

header {
  width: 100%;
  height: auto;
  background-color: $main;
  max-width: 1440px;
}
.homeLink {
  max-width: 40%;
}

.logo {
  margin-left: 15px;
  width: 90px!important;
  height: 90px;
}



.nav-link {
  margin: auto;
  text-decoration: none;
  color: #fff;
  font-weight: 400;
  font-size: 30px;
  line-height: 36px;
  font-family: $barlow, sans-serif;
  float: left;
}
.nav-link:not(:last-child)::after {
  content: "-";
  padding: 20px;
}

.nav-link:hover {
  color: $green-sotiers-border;
  opacity: .8;
}

/* Style the navigation menu */


/* Hide the links inside the navigation menu (except for logo/home) */


/* Style navigation menu links */

/* Style the hamburger menu */
.topnav a.icon {
  display:none;
  background: $main;
  position: absolute;
  right: 10px;
  top: 15px;
}

/* Add a grey background color on mouse-over */


/* Style the active link (or home/logo) */
.active {
  background-color: #04AA6D;
  color: white;
}
.topnav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 1440px;
  border-bottom: $white solid 1px;

}
#myLinks {
  display: flex;
  flex-direction: row;
  padding-right: 1%;
}
@media screen and (max-width: 1040px) { 
  .nav-link:not(:last-child)::after {
  content: "";
}
.nav-link {
  float: none;
}
  .topnav a {
  color: white;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  display: block;
}

  .topnav {
  display:block!important;
  overflow: hidden;
  background-color:$main;
  position: relative;
  text-align: left;
  border-bottom: $white solid 1px;
}
  .logo {
    max-height: 60px;
    margin: 0;
  }
  .topnav a.icon {
    display: block;
  }
  .topnav #myLinks {
  display: none;
}
/* Style the navigation menu */
.topnav {
  overflow: hidden;
  background-color:$main;
  position: relative;
  text-align: left;
  border-bottom: $white solid 1px;
}

/* Hide the links inside the navigation menu (except for logo/home) */


/* Style navigation menu links */
.topnav a {
  color: white;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  display: block;
}

/* Style the hamburger menu */
.topnav a.icon {
  background: $main;
  position: absolute;
  right: 10px;
  top: 15px;
}

/* Add a grey background color on mouse-over */
.topnav a:hover {
  color: $dark-green;
}

/* Style the active link (or home/logo) */
.active {
  background-color: #04AA6D;
  color: white;
}
}
</style>