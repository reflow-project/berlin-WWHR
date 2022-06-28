<template>
 <h2>FAQ</h2>
           <div v-for="faq in faqs" :key="faq.id" class="accordion">
            <h3>{{ faq.topic }}</h3>
          <accordion v-for="question in faq.questions" :key="question.id" class="mb-4">
            <template v-slot:title>
              <span class="">{{ question.question }}</span>
            </template>
            <template v-slot:content>
              <p v-html="question.answer" class="answer">
          
              </p>
            </template>
          </accordion>
          </div>
</template>

<script>
import Accordion from './content/accordion.vue';

export default {
  name: 'faq',
  components: {
      Accordion,
  },
  data() {
    return{
        faqs : [
            { id: 1, topic: 'General', questions: [
                {
                    id: 1,
                    question : 'What is REFLOW and what does the term stand for?',
                    answer: 'REFLOW is a project that has received funding from the European Union’s Horizon 2020 research and innovation program under grant agreement No 820937. REFLOW is an acronym for ‘co-creating circular and regenerative resource flows in cities’. For more information, please see <a style="color: blue;"href="https://reflowproject.eu/about/" target="_blank">https://reflowproject.eu/about/</a>.',
                },
                {   id: 2,
                    question : 'How does the Waste Water Heat Radar relate to REFLOW?',
                    answer: 'The Waste Water Heat Radar is one of the developments that take place under the REFLOW project in six European cities. In the City of Berlin wastewater heat was chosen as an area of intervention, this to understand current resource flows and develop a solution to increase the recovery rate of heat contained in wastewater.',
                } , 
                // {
                //     id: 3,
                //     question : ' Who owns the Waste Water Heat Radar?',
                //     answer: 'WILL BE ADDED LATER. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
                // },
                {
                    id: 4,
                    question : 'Where can I learn more about REFLOW?',
                    answer: 'There is comprehensive information about REFLOW under the general website link: <a style="color: blue;"href="https://reflowproject.eu/" target="_blank">https://reflowproject.eu/</a>. For specific information needs, please check the REFLOW Knowledge Hub  <a style="color: blue;"href="https://reflowproject.eu/knowledge-hub/" target="_blank">https://reflowproject.eu/knowledge-hub/</a>.',
                },
                
            ]},
             { id: 2, topic: 'Data Security/ Data Privacy', questions: [
                {   id: 1,
                    question : 'Where do the data used in the Waste Water Heat Radar come from?',
                    answer: 'We make use of an open source data set of parcel and buildings locations <br><br>We collect data of the local waste water pipes (kW) and connect them to simulated heating and cooling demands of buildings (kW). Both are georeferenced data types.<br><br>Additionally we collect data of the type of buildings (e.g. construction type, used materials) to better understand the demand potential (for providing an estimate of the heat demand range).',
                } , {
                    id: 2,
                    question : 'Which protocols are being followed to ensure data security?',
                    answer: 'We do not track visitors on the website, and the data you enter are saved and processed only for precontractual measures and to understand potential user interest. Further information can be found here: <a style="color: blue;"href="https://www.fokus.fraunhofer.de/8fd37b94cbb94c8a" target="_blank">Fraunhofer Datenschutzerklärung</a>.',
                },
                {
                    id: 3,
                    question : 'What happens to my input data?',
                    answer: 'Upon your request, we check for whether waste water heat energy is available at your location. Data from surveys will only be used to measure interest and will not be further processed, unless given permission by you.',
                },
                {
                    id: 4,
                    question : 'Does REFLOW sell my data?',
                    answer: 'We do not sell your data. In case you want us to remove your data, all you need to do is send us an email to <a style="color:blue;" href="mailto:reflow@prototypes.berlin">reflow@prototypes.berlin</a>.',
                },
                
            ]},
             { id: 3, topic: 'Technology', questions: [
                {   id: 1,
                    question : 'Is this technology already available for purchase or adaptation?',
                    answer: 'The source code to develop the web-application is open source and can be adapted. However, some of the data contains critical infrastructure and is therefore not available to the public. ',
                } , {
                    id: 2,
                    question : 'What are the system requirements for running the Waste Water Heat Radar?',
                    answer: 'All that is required is a common web browser and a stable internet connection.',
                },
                {
                    id: 3,
                    question : 'When was this software developed?',
                    answer: 'This prototype was developed within the REFLOW project during 2020 to 2022.',
                },            
            ]},
             { id: 4, topic: 'Adaptation of Technology', questions: [
                {   id: 1,
                    question : 'For whom is the Wastewater Heat Radar made?',
                    answer: 'The radar is primarily made for urban planners, experts, engineers, property developers and managers at industrial sites.',
                } , {
                    id: 2,
                    question : 'What is the next step if I identify a \'match\', i.e. there is available heat in my neighborhood?',
                    answer: 'After a match has been made the user has the option to indicate his/ her interest for that specific building and can contact the project partners for further information and possible implementations.',
                },
                {
                    id: 3,
                    question : 'What are the next steps if I am interested in installing a waste water heat recovery system (heat pump)?',
                    answer: 'Through the web application the user can get in touch with project partner BWB to further evaluate the possibility of implementing a waste water heat recovery system. <a style="color: blue;"href="/map" target="_blank">Click here to get to the web-application.</a>',
                },
                {
                    id: 4,
                    question : 'What are the next steps, if we want to adapt the Wastewater Heat Radar for a building complex or city outside Berlin?',
                    answer: 'The source code for the application is open source and can be used to create a similar application in other cities. Minimum requirements for a successful implementation of the application are certain types of data: geographical data on heat load (demand) of buildings and of the city’s waste water heat potential (supply). For further inquiries, please contact Prototypes for Europe: <a style="color:blue;" href="mailto:reflow@prototypes.berlin">reflow@prototypes.berlin</a>',
                },
                
            ]},
             { id: 5, topic: 'Cost', questions: [
                {   id: 1,
                    question : 'What are the cost for using the Waste Water Heat Radar?',
                    answer: 'During the duration of the REFLOW project, the usage of the web-application is free.',
                } , {
                    id: 2,
                    question : 'What are the cost for implementing a waste water heat recovery system (heat pump)?',
                    answer: 'The costs depend on many factors and will be calculated individually after contacting the project partner BWB:  <a style="color: blue;"href="https://www.bwb.de/en/kontakt.php" target="_blank">https://www.bwb.de/en/kontakt.php</a>.',
                },
                // {
                //     id: 3,
                //     question : 'What is REFLOW and what does the term stand for? What is REFLOW and what does the term stand for?',
                //     answer: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
                // },            
            ]},
        ]
    }
  },

  methods: {
  
  },
  computed: {

  }
};

</script>

<style scoped>
 h2, h3 {
    margin: 0;
  }
  h2 {
    font-weight: 900;
    font-size: 30px;
    font-style: normal;
    padding: 60px 0px;
    display: block;
  }
  h3 {
    float: left;
    font-size: 25px;
    font-weight: 900;
    margin-bottom: 20px;
  }
  .accordion {
    max-width: 980px;
    margin: 0 auto;
  }
  p {
      margin: 0;
  }
  @media screen and (max-width: 600px) { 
          h2 {
            padding: 50px 0px;
          }
  }
</style>
