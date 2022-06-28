<template>
   <container>
      <Navigation />
   </container>
   <main>
      <Section name="hero">
         <div style="position:relative;">
            <img src="../assets/img/badge.svg" alt="Reflow logo" class="badge">
            <img src="../assets/img/arrow-bg-home.svg" class="arrow-bg-home">
            <img src="../assets/img/arrow-events.svg" class="arrow-events">
            <img src="../assets/Reflow_logo-svg-white.svg" alt="Reflow logo" class="logo"><br>
            <h1 class="font-weight-black"><span>Berlin Pilot </span></h1>
            <br><br>
            <p id="textType"></p>
            <h2>Energy Matchmaking: We create matches between energy supply and demand</h2>
            <br>
            <div class="intro">
               <p>Discover the supply of<br> wastewater heat in an<br> area of your choice.</p>
               <p>Check whether REFLOW<br> is available for YOUR<br> real estate property .</p>
            </div>
            <transition name="fade">
               <a href="/map" class="check-button check letter-spacing">CHECK</a>
            </transition>
            <div class="text-box">
               <p>Interested in waste heat?</p>
               <br>
               <p>Contact us:</p>
               <br>
               <p class="font-weight-bold"><a href="mailto:reflow@prototypes.berlin">reflow@prototypes.berlin</a></p>
            </div>
         </div>
      </Section>
      <Section id="challenge" name="challenge">
         <video width="1440" height="900" autoplay muted loop preload="auto">
            <source src="../assets/video/earth.mp4" type="video/mp4" >
            Your browser does not support the video tag.
         </video>
         <div class="bg-overlay"></div>
         <div class="overlay">
            <h2 class="font-weight-black">The Challenge</h2>
            <ul>
               <div class="card" v-for="challenge in challenges" :key="challenge.id">
                  <span class="font-weight-bold">{{ challenge.id }}</span>
                  <li class="challenge-card">
                     <h3 class="card-title">{{ challenge.title }}</h3>
                     <p v-html="challenge.text"></p>
                  </li>
               </div>
            </ul>
            <p class="change">REFLOW is going to change this.</p>
         </div>
      </Section>
      <Section name="web-app" class="introducing">
         <div>
            <p class="intro">Introducing</p>
            <h2>THE REFLOW WEB-APP</h2>
            <p class="solution text">An innovative solution to bring wastewater heat to urban neighborhoods and industrial<br> sites.</p>
         </div>
         <div class="web-app">
            <div class="left">
               <iframe id="ytplayer" type="text/html" width="675" height="420px"
                  src="https://www.youtube.com/embed/6_2VUhQoIMo"
                  frameborder="0" allowfullscreen>
               </iframe>
               <p class="whatTodo text text-bold">What you can do with the app:</p>
               <ul>
                  <li>
                     <p class="text"><span class="text-bold">Search for addresses</span> by inserting an address or uploading a file</p>
                  </li>
                  <li>
                     <p class="text"><span class="text-bold">Retrieve heat potential</span> of specific locations</p>
                  </li>
                  <li>
                     <p class="text"><span class="text-bold">Categorize buildings</span> by estimated heat demand</p>
                  </li>
               </ul>
            </div>
            <div class="right">
               <p class="text text-bold title">For urban planners, experts, engineers,<br>real estate developers and other stakeholders.</p>
               <p class="text radar">The Waste Water Heat Radar, as part of the REFLOW project, is a web application that matches supply and demand for the usage of heat from waste water. Those matches can be used to find advantageous locations for making use of the heat energy and foster district heating.</p>
               <p class="text ">With this unique and state of the art approach of making use of waste water heat on a city scale, the application contributes to a sustainable and CO2 neutral future. It is a major step ahead for addressing climate change in an innovative way, with a lasting impact.</p>
               <p class="text ">REFLOW received funding from the European Union's Horizon 2020 research and innovation programme under grant agreement No 820937.</p>
               <p class="text ">The current version of the pilot project is a functional first prototype of the application, containing randomised data sets, to demonstrate the projects vision.</p>
            </div>
         </div>
      </Section>
      <Section name="heatRadar">
         <div style="position:relative;">
            <img src="../assets/img/arrow-bg-home.svg" class="arrow-bg-home">
            <img src="../assets/img/arrow-latest-reads.svg" class="arrow-reads">
            <p class="intro">Learn more about the</p>
            <h2>REFLOW Wastewater Heat<br> Radar</h2>
            <p class="intro">The <span class="text-bold"> REFLOW Wastewater Heat Radar </span> provides an unmatched depth of data<br> for analysis and decision making.</p>
            <div class="grid">
               <div class="grid-item">
                  <img src="../assets/img/ipad.png">
               </div>
               <div class="grid-item" style="margin-left: 50px;">
                  <div style="margin-top: 40px;">
                     <div class="item">
                        <div class="text-bold">Receive support for implementing<br> REFLOW in cities outside of Berlin</div>
                        <span class="checkMark"></span>
                     </div>
                     <div class="item">
                        <div class="text-bold">Gain access to insights of the <br> technology and implementationt</div>
                        <span class="checkMark"></span>
                     </div>
                     <div class="item">
                        <div class="text-bold" style="padding-left: 100px;">Access valuable data to <br>support decision making</div>
                        <span class="checkMark"></span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Section>
      <Section id="success" name="stories">
         <div style="position:relative;" class="stories">
            <img src="../assets/img/arrow-stories.svg" class="arrow-stories">
            <h3>Success Stories</h3>
            <p>Here is a selection of wastewater heat recovery projects that have already been<br> implemented in the past.</p>
            <div class="grid">
               <div v-for="storie in stories" class="grid-item storie" :key="storie.id">
                  <p class="font-weight-black">{{ storie.title }}</p>
                  <div class="image" :style="{ backgroundImage: 'url(' + require('@/assets/img/stories/'+ storie.image ) + ')' }"></div>
                  <ul>
                     <li v-for="(detail, index) in storie.details" :key="index" >
                        {{ detail }}
                     </li>
                  </ul>
                  <p class="quelle">{{storie.text}}</p>
               </div>
            </div>
            <br>
            <a href="/map" class="check-button check letter-spacing">CHECK</a>
            <p class="explore">Explore the functionality of the web-application.</p>
         </div>
      </Section>
      <Section name="doGood">
         <div class="bg-overlay"></div>
         <div class="wrap">
            <h2>Do good with REFLOW</h2>
            <div class="item" v-for="good in doGood" :key="good.id" :style="{ backgroundImage: 'url(' + require('@/assets/img/'+ good.image ) + ')' }">
               <p>{{ good.text }}</p>
            </div>
         </div>
      </Section>
      <Section id="partners" name="partners">
         <div style="position:relative;">
            <img src="../assets/img/arrow-events.svg" class="arrow-events">
            <h2>REFLOW Partners in Berlin</h2>
			<div class="partner">
            <p class="description">REFLOW is a project that received funding from the European Commision. Six cities across Europe analyze and improve the material and respource flows in different economic sectors (www.reflowproject.eu).The Berlin pilot group is part of the REFLOW consortium and focuses on wastewater heat recovery. Four organizations, with the support of other consortium members, have contributed to the development of the Wastewater Heat Radar.</p>
            <div class="wrap">
               <div v-for="partner in partners" :key="partner.id" class="item">
				<div class="left">
                     <div class="image" :style="{ backgroundImage: 'url(' + require('@/assets/img/partner/'+ partner.image ) + ')' }"></div>
                  </div>
                  <div class="right">
                     <p class="name">{{ partner.name }}</p>
                     <p class="text"> {{ partner.text }}</p>
                     <a class="quelle" :href="'http://'+ partner.link" target="_blank">{{ partner.link}}</a>
                  </div>
				</div>
            </div>
			</div>
         </div>
      </Section>
      <Section name="survey">
         <img src="../assets/img/icons/surveyIcon.png" alt="">
         <h2>Take our survey</h2>
         <p>It just takes 3 minutes. We are thankful for your contribution!. It will help us to further develop this technology. In case you want to reach out to us and learn more about how to bring the Waste Water Heat Radar to your city, simply add your email address at the bottom of the survey or send an email to reflow@prototypes.berlin.</p>
          <a href="/interest-survey" target="_blank" class="check-button check letter-spacing">Survey</a>
      </Section>
      <Section name="faq">
         <div style="position:relative;">
            <img src="../assets/img/arrow-events.svg" class="arrow-events">
            <faq />
         </div>
      </Section>
      <Section id="contact" name="contact">
         <img src="../assets/img/icons/contact.png" alt="">
         <h2>Contact</h2>
         <p>Get in touch: <a href="mailto:reflow@prototypes.berlin">reflow@prototypes.berlin</a></p>
      </Section>
      <footer id="footer">
         <div class="container appear animated visible-element">
            <div class="top row">
               <div class="col-sm-4">
                  <strong class="logo-footer">
                     <a href="https://reflowproject.eu">
                        <p>Co-creating circular and regenerative resource flows in cities</p>
                     </a>
                  </strong>
               </div>
               <div class="col-sm-4">
                  <ul id="menu-main-nav-1" class="">
                     <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-15"><a href="https://reflowproject.eu/about/" target="_blank">About</a></li>
                     <li  class="menu-item menu-item-type-custom menu-item-object-custom menu-item-2546"><a href="https://reflowproject.eu/pilots/" target="_blank">Pilots</a></li>
                     <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3494"><a href="https://reflowproject.eu/knowledge-hub/" target="_blank">Knowledge Hub</a></li>
                     <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-3615"><a href="https://reflowproject.eu/community/" target="_blank">Community</a></li>
                     <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3180"><a href="/map">Web App</a></li>
                     <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-3616"><a href="https://www.fokus.fraunhofer.de/Impressum" target="_blank">Impressum</a></li>
                  </ul>
               </div>
               <div class="col-sm-4">
                  <div class="txt-block hidden-xs">
                     <img class="img-responsive footer-img" src="https://reflowproject.eu/wp-content/themes/reflow/images/ico-eu-flag.svg" alt="eu flag">
                     <p>This project has received funding from the European Union's Horizon 2020 research and innovation programme under grant agreement No 820937.</p>
                  </div>
               </div>
            </div>
         </div>
      </footer>
      <button @click="scrollToTop" id="myBtn" title="Go to top">
      <i class="fa-solid fa-arrow-up"></i>
      </button>
   </main>
</template>

<script>
import Container from './content/container';
import Section from './content/section.vue';
import Navigation from './navigation.vue';
import faq from './faq.vue';

export default {
   components: {
    Container,
    Navigation,
    Section,
   faq,
  },
  data() {
    return {
     challenges: [
       { id: 1, title: 'Wastewater heat is largely wasted.', text: `In the City of Berlin the heat potential contained in waste water amounts <strong>275 Megawatt. Only 3 %</strong> are recovered. There is a large potential of heat to be recovered!`},
       { id: 2, title: 'Energy from wastewater is CO2-neutral', text: `Around one-eighth of the heat demand in Germany can be met by waste water heat. <strong>As CO2-friendly heat</strong> with a high temperature, it is preferable to linear thermal energy.`},
       { id: 3, title: 'A streamlined process for implementation is missing', text: `There is <strong>no transparent and straight-forward approach</strong> yet to identify optimal locations for waste water thermal energy systems.`},
     ],
     stories: [
       { id: 1, title: '1. Office Building - Koppenstr.', details: ['- Function: heating and cooling','- Extraction: 600 kW','- CO2 reduction: 500 t'], text: 'Source: Photo - P4E Text: https://www.eon.com/de/geschaeftskunden/erfolgsstorys/ bueroflaechen-berlin.html', image: 'koppen.png'},
       { id: 2, title: '2. IKEA - Lichtenberg', details: ['- Function: heating and cooling','- Extraction: 1,14 MW','- CO2 reduction: 500 t'], text: 'Source: Photo & Text: https://www.bwb.de/de/heizen-und-kuehlen-mit- abwasser.php', image: 'ikea.png'},
       { id: 3, title: '3. Hellweg - Yorckstr.', details: ['- Function: heating and cooling','- Extraction: 160 kW (extendable up to 540 kW)','- CO2 reduction: 200 t'], text: 'Source: Photo & Text: https://www.bwb.de/de/heizen-und-kuehlen-mit- abwasser.php', image: 'hellweg.png'},
       { id: 4, title: '4. Swimming Pool - Sachsendamm', details: ['- Function: heating','- Extraction: 68 kW','- CO2-Reduktion: 90 t'], text: 'Source: Photo & Text: https://www.bwb.de/de/heizen-und-kuehlen-mit- abwasser.php', image: 'pool.png'},
     ],
     doGood: [
       { id: 1, text: 'Ensure access to water and sanitation for all', image: 'clean-water.svg' },
       { id: 2, text: 'Ensure access to affordable, reliable, sustainable and modern energy for all', image: 'clean-energy.svg'  },
       { id: 3, text: 'Make cities inclusive, safe, resilient and sustainable', image: "communities.svg" },
       { id: 4, text: 'Take urgent action to combat climate change and its impacts', image: 'climate.svg' },
     ],
     partners: [
      { id: 1, name: 'BWB', link: 'www.bwb.de', text: 'Berliner Wasserbetriebe, Berlin\'s water utility, is engaged in wastewater heat recovery since years and thus a core member of the REFLOW Berlin team.', image: 'berliner-wasserbetriebe.png' },
      { id: 2, name: 'FOKUS', link: 'www.fokus.fraunhofer.de', text: 'Fraunhofer FOKUS conducts research on digital transformation and its impact on economics, technology and our society. It is one of the largest ICT institutes of the Fraunhofer Society. ', image: 'fraunhofer-fokus.png' },
      { id: 3, name: 'MCS', link: 'www.mcs-datalabs.com', text: 'MCS Datalabs engages in IoT software and hardware. Within REFLOW its focus is on backend development. ', image: 'msc.png' },
      { id: 4, name: 'P4E', link: 'www.prototypes.berlin', text: 'Prototypes for Europe is a leading Berlin-based technology transfer organization and leads the REFLOW Wastewater Heat Radar project in Berlin. ', image: 'prototypes-for-europe.png' },
     ],
      charCount : 0,
      introText : 'Recover wastewater heat with the new Wastewater Heat Radar', // Hero Section Intro Text
      typeSpeed : 80,
      showCheckButton: false,
    }
  },
  methods: {
    typeWriter() {
      if (this.charCount < this.introText.length) {
        document.getElementById('textType').innerHTML += this.introText.charAt(this.charCount);
        this.charCount++;
        setTimeout(this.typeWriter, this.typeSpeed);
    }
  },
    scrollToTop() {
            window.scrollTo(0, 0);
        },
        handleScroll() {
          if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById("myBtn").style.display = "block";
          } else {
           document.getElementById("myBtn").style.display = "none";
              }
          }
  },
  computed: {

  },
  mounted: function () {
     window.addEventListener('scroll', this.handleScroll);
  this.$nextTick(function () {
     document.querySelector('video').playbackRate= 0.55;
  })
  if(window.innerWidth < 600) {
    this.typeWriter();
  } else {
     document.getElementById('textType').innerHTML += this.introText;
  }
},


};
</script>

<style lang="scss" scoped>
@import '../assets/css/style.scss';

p {
	margin: 0;
}

h1 {
	font-style: normal;
	font-weight: 400;
	font-size: 36px;
	line-height: 43px;
	text-align: center;
}

h2 {
	font-weight: 400;
	font-style: italic;
	line-height: 30px;
}

ul {
	list-style: none;
}

.font-weight-bold {
	font-weight: 700;
}

.font-weight-black {
	font-weight: 900;
}

.text {
	color: $main;
	font-size: 22px;
	font-weight: normal;
}

.text-bold {
	font-weight: 700;
}

.letter-spacing {
	letter-spacing: 0.25em;
}

.grid {
	display: inline-grid;
	grid-template-columns: auto auto auto;
	padding: 50px 130px;
}

footer ul li a:hover {
	color: $green-sotiers-border;
	opacity: .8;
}

.grid-item {
	padding: 20px;
	font-size: 30px;
	text-align: center;
}

.check {
	text-decoration: none;
	font-weight: 700;
	font-size: 16px;
	line-height: 19px;
	color: $green-btn-text;
}

.check-button {
	font-size: 16px;
	color: $green-btn-text;
	margin-top: 0px;
	margin-bottom: 20px;
	border: $green-btn-border 1px solid;
	box-sizing: border-box;
	border-radius: 10px;
	background-color: $main;
	padding: 10px 60px;
	transition: all .2s ease-in-out;
	&:hover {
		border-radius: 10px;
		background-color: $green-btn-text;
		padding: 12px 64px;
		color: $white;
		font-size: 18px;
		transform: scale(5.25);
	}
}

#myBtn {
	display: none;
	position: fixed;
	bottom: 20px;
	right: 30px;
	z-index: 99;
	border: none;
	outline: none;
	background-color: red;
	color: white;
	cursor: pointer;
	padding: 5px;
	border-radius: 30px;
	font-size: 18px;
	//background:  url('../assets/img/icons/arrow-up-solid.svg') ;
	background-position: center;
	background-repeat: no-repeat;
	background-size: 100%;
	width: 50px;
	height: 50px;
	background: #abb1b6;
}

#myBtn:hover {
	background-color: #555;
	/* Add a dark-grey background on hover */
}

section[name="hero"] {
	.badge {
		width: 314px!important;
		height: 312px!important;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 2;
	}
	.arrow-bg-home {
		position: absolute;
		right: 10px;
		top: 138px;
		width: 476px!important;
		height: 517px!important;
	}
	.arrow-events {
		position: absolute;
		left: -180px;
		top: 534px;
	}
	h2 {
		padding-top: 26px;
	}
	.logo {
		height: 152px;
		width: 226px;
		margin: 0 auto;
		margin: 50px 0px;
	}
	div:not(:first-child) {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		//margin-top:3%;
		margin-bottom: 5%;
	}
	div p {
		color: $white;
		font-style: italic;
		font-size: 30px;
		line-height: 36px;
		padding: 0px 40px;
	}
	.text-box {
		max-width: 450px;
		margin: 0 auto;
		padding: 15px 0px;
		background: #C92323;
		border-radius: 20px;
		margin-bottom: 20px;
		margin-top: 30px;
	}
	#textType {
		font-weight: 900!important;
		font-style: normal!important;
		max-width: 637px;
		display: block;
		margin: 0 auto;
	}
}

.intro {
	margin: 0;
	font-size: 26px;
	padding-top: 50px;
	line-height: 26px;
	padding-bottom: 7px;
	color: $main;
}

section[name="challenge"] {
	height: 810px;
	position: relative;
	background: black;
	ul {
		margin: 0 auto;
		padding: 0;
		list-style-type: none;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
	}
	h2 {
		padding: 60px 0px 95px;
		font-size: 36px;
		font-style: normal;
		display: block;
		margin: 0;
	}
	span {
		margin: 0 auto;
		width: 100px;
		height: 100px;
		background-color: rgba(255, 255, 255, .7);
		mix-blend-mode: normal;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		font-size: 30px;
		line-height: 36px;
		color: $white;
	}
	.card {
		width: 369px;
		min-height: 480px;
		color: $main;
	}
	.challenge-card {
		height: 20.625rem;
		background-color: $white;
		margin-top: 50px;
		padding: 12px 18px;
		text-align: left;
		border-radius: 15px;
	}
	.card-title {
		font-weight: 700;
		font-size: 26px;
		line-height: 31px;
	}
	p {
		margin: 0;
		margin-top: 40px;
		font-size: 30px;
		font-weight: 400;
	}
	.challenge-card p {
		margin: 50px 0px 0px 0px;
		font-size: 22px;
		text-align: block;
	}
	video {
		position: relative;
		z-index: 0;
		height: auto;
	}
	.overlay {
		position: absolute;
		margin-left: auto;
		margin-right: auto;
		left: 0;
		right: 0;
		top: 0;
		z-index: 3;
		height: 100%;
		max-width: 1440px;
	}
}

.bg-overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 2;
	background: $light-blue;
	mix-blend-mode: normal;
	opacity: 0.45;
}

section[name="web-app"] {
	background-color: $white;
	color: $main;
	height: auto;
	h2 {
		font-weight: 900;
		text-transform: uppercase;
		font-size: 30px;
		font-style: normal;
	}
	.web-app {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		text-align: left;
		justify-content: space-between;
		padding: 0px 40px 50px 40px;
	}
	.solution {
		padding: 40px 0px 60px 0px;
	}
	.right {
		margin: 0;
		padding-left: 30px;
		.text {
			padding-bottom: 10px;
		}
		.title {
			padding-bottom: 0;
		}
	}
	.right p {
		margin: 0;
	}
	.radar {
		padding-top: 40px;
		//max-width: 466px;
	}
	.whatTodo {
		padding: 20px 0px;
		text-align: center;
	}
	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
		li {
			border: $blue-zodiac 1px solid;
			border-radius: 6px;
			padding: 5px;
			margin-bottom: 10px;
		}
	}
}

section[name="heatRadar"] {
	.arrow-bg-home {
		position: absolute;
		right: 9px;
		top: 22px;
	}
	.arrow-reads {
		position: absolute;
		bottom: -150px;
		left: -200px;
	}
	height: auto;
	background-color: $grey;
	color: $main;
	h2 {
		font-weight: 700;
		font-size: 30px;
		font-style: normal;
	}
	.item div {
		text-align: right!important;
		font-size: 26px;
		position: relative;
		padding-right: 20px;
	}
	.item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: 27px;
	}
	.checkMark {
		background: url('../assets/img/check-green.png');
		width: 120px;
		height: 70px;
		background-repeat: no-repeat;
		//margin-left: 40px;
		float: right;
	}
}

section[name="stories"] {
	.stories {
		overflow: hidden;
	}
	background-color: $main;
	color: $white;
	height: 1120px;
	h3 {
		padding: 60px 0px 20px 0px;
		display: block;
		margin: 0;
		font-size: 30px;
		font-weight: 900;
	}
	.arrow-stories {
		position: absolute;
		bottom: -280px;
		right: -150px;
		z-index: 5;
	}
	p {
		font-size: 22px;
	}
	.storie {
		width: 600px;
		height: 320px;
		border: $white 3px solid;
		border-radius: 30px;
		margin: 15px;
	}
	.grid {
		margin-top: 80px;
		padding: 0;
		grid-template-columns: auto auto;
		justify-content: space-evenly;
		margin-bottom: 40px;
	}
	.grid-item .image {
		float: left;
		border-radius: 20px;
		margin-top: 25px;
		border: $green-sotiers-border 2px solid;
		background-size: cover;
		width: 222px;
		height: 222px;
	}
	ul {
		margin: 0;
		padding-top: 50px;
		padding-left: 20px;
		display: flow-root;
		li {
			font-size: 22px;
			font-weight: 400;
			line-height: 26px;
			text-align: left;
			padding-bottom: 2px;
		}
	}
	.quelle {
		font-size: 10px;
		font-weight: 400;
		line-height: 12px;
		text-align: left;
		padding-left: 20px;
		display: block;
		float: right;
		width: 328px;
		padding-top: 12%
	}
	.explore {
		color: $green-btn-border;
		font-size: 22px;
		margin-top: 40px;
	}
}

section[name="doGood"] {
	background: white;
	color: $main;
	box-sizing: none;
	height: 780px;
	background: url('../assets/img/grass.svg');
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center center;
	position: relative;
	// background: lightblue;
	h2 {
		font-weight: 900;
		font-size: 30px;
		font-style: normal;
		padding: 50px 0px;
		display: block;
	}
	.wrap {
		display: flex;
		flex-direction: column;
		justify-items: center;
		margin: 0 auto;
		position: absolute;
		margin-left: auto;
		margin-right: auto;
		left: 0;
		right: 0;
		top: 0;
		z-index: 3;
	}
	.bg-overlay {
		background: #D8D8D8;
	}
	.item {
		width: 615px;
		height: 120px;
		margin: 0 auto;
		margin-bottom: 20px;
		p {
			font-weight: 700;
			font-size: 22px;
			text-align: left;
			padding-left: 145px;
			padding-top: 30px;
			padding-right: 70px;
		}
	}
}

section[name="partners"] {
  position: relative;
	height: 970px;
	background: white;
	color: $main;
	.arrow-events {
		position: absolute;
		left: -269px;
		top: 58px;
	}
	h2 {
		font-weight: 900;
		font-size: 30px;
		font-style: normal;
		padding: 60px 0px 20px 0px;
		display: block;
		margin: 0;
	}
	p {
		max-width: 1270px;
		margin: 0 auto;
		font-size: 22px;
	}
	.wrap {
		padding-top: 90px;
		display: flex;
		flex-direction: row;
		margin: 0 auto;
		max-width: 1300px;
		flex-wrap: wrap;
		justify-content: space-around;
		.item {
			border: 4px solid #000000;
			width: 620px;
			height: 280px;
			border-radius: 39px;
			margin-bottom: 20px;
			a {
				color: $main;
				font-weight: 700;
			}
			.left {
				float: left;
				margin-top: 100px;
				padding: 0px 30px;
				.image {
					width: 200px;
					height: 200px;
					background-repeat: no-repeat;
				}
			}
			.right {
				.name {
					font-weight: 700;
					text-transform: uppercase;
					padding: 20px 0px;
				}
				.text {
					text-align: left;
					max-width: 350px;
					float: right;
					margin: 0;
				}
				a {
					float: left;
					padding-top: 10px;
				}
			}
		}
	}
}

section[name="survey"],
section[name="contact"] {
	height: 475px;
	background: $main;
	color: $white;
	img {
		display: block;
		margin: 0 auto;
	}
	h2 {
		font-weight: 900;
		font-size: 30px;
		font-style: normal;
	}
	button {
		background: $main;
		font-size: 16px;
		text-transform: uppercase;
		line-height: 19px;
		font-weight: 700;
		font-style: normal;
	}
	p {
		max-width: 1272px;
		display: block;
		margin: 0 auto;
		padding: 20px 0px 50px;
		font-size: 22px;
	}
}

section[name="faq"] {
	background: $white;
	color: $main;
	height: auto;
	padding-bottom: 50px;
}

.arrow-events {
	position: absolute;
	top: 260px;
	left: 400px;
}

section[name="contact"] {
	height: 375px;
	p {
		font-size: 30px;
	}
}

// *************.bg-overlay
#footer {
	background: $main;
	color: #abb1b6;
	font-size: 12px;
	line-height: 20px;
	font-weight: 400;
	position: relative;
	z-index: 50;
	.row {
		max-width: 1400px;
	}
	.container.social-net {
		background: #D1D3D8;
		width: unset !important;
		padding-top: 30px;
		position: relative;
	}
}

.skew-bg {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: #D1D3D8;
	z-index: -1;
	transform: skewY(-1deg);
	transform-origin: top left;
}

footer .footer-social {
	display: flex;
	justify-content: center;
}

footer .footer-social a {
	width: 30px;
	height: 30px;
	margin-right: 15px;
	background: red;
}

#footer .container {
	padding-bottom: 45px;
	max-width: 1440px;
	margin: 0 auto;
}

#footer .top {
	padding-bottom: 5px;
	display: flex;
	text-align: left;
}

.row {
	margin: 0 auto;
}

#footer .top>div[class^="col-"]:nth-child(1) {
	width: 34.8%;
	padding-left: 32px;
}

#footer .logo-footer {
	width: 268px;
	height: 80px;
	overflow: hidden;
	background: url('../assets/Reflow_logo-svg-white.svg') no-repeat;
	/* background-size: 268px 58px; */
	display: block;
	margin: 3px 0 66px;
}

#footer .logo-footer a {
	display: block;
	height: 100%;
}

#footer .top p {
	margin: 0 0 20px;
}

#footer .logo-footer p {
	width: 50%;
	float: right;
	margin: 0;
	font-size: 15px;
	font-weight: 600;
}

#footer .top>div[class^="col-"]:nth-child(2) {
	width: 40%;
}

#footer #menu-main-nav-1 {
	list-style: none;
	font-size: 15px;
	display: flex;
	flex-flow: wrap column;
	max-height: 95px;
}

#footer ul,
ol {
	margin-top: 0;
	margin-bottom: 10px;
}

#footer #menu-main-nav-1 {
	list-style: none;
	font-size: 15px;
	display: flex;
	flex-flow: wrap column;
	max-height: 95px;
}

#footer .top>div[class^="col-"]:nth-child(3) {
	width: 25.2%;
}

footer .txt-block {
	max-width: 305px;
}

#footer .footer-img {
	max-width: 90px;
	float: left;
	margin-right: 5px;
	margin-left: -10px;
	margin-bottom: 30px;
}

footer .top p {
	margin: 0 0 20px;
}

#footer .bottom {
	position: relative;
	padding: 37px 0 0;
	color: #525963;
	font-size: 14px;
	line-height: 18px;
	font-weight: 400;
}

@media only screen and (min-width: 600px) {
	video {
		max-width: 500px;
	}
	section[name="challenge"] {
		.overlay ul {
			flex-wrap: wrap!important;
		}
	}
	// section[name="web-app"] .web-app {
	//    flex-wrap: wrap !important;
	// }
}

@media only screen and (min-width: 600px) and (max-width: 1024px) {
	section[name="challenge"] {
		height: 810px!important;
	}
}

@media screen and (max-width: 450px) {
	section[name="web-app"] {
		.right {
			margin-top: 90%!important;
		}
	}
}

@media screen and (max-width: 1024px) {
	video {
		max-width: 700px;
	}
	section[name="challenge"] {
		height: 1250px;
	}
	section[name="web-app"] {
		height: auto !important;
		.web-app {
			justify-content: center!important;
		}
		.radar {
			max-width: 100%!important;
		}
		.right {
			padding: 50px 0px;
		}
	}
	li.challenge-card {
		height: auto!important;
	}
	section[name="stories"] {
		height: auto!important;
		.grid {
			grid-template-columns: auto!important;
		}
	}
}

@media screen and (min-width: 1024px) {
	section[name="web-app"] {
		.web-app {
			flex-wrap: nowrap!important;
		}
	}
	video {
		width: 1200px;
		max-width: 100%!important;
	}
}

@media screen and (min-width: 1840px) {
		section[name="stories"] {
	.stories {
		overflow: visible!important;
	}
		}
}
</style>
