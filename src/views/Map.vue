<template>
 <layout>
  <div>
    <div id="bannerNoisyData" style="margin-top: 1%;">
        Dieses Web-Anwendung beruht aktuell nur auf verrauschten Daten ohne Bezug zur Berliner Abwasserinfrastruktur.
        Um sensible Daten über kritische Infrastrukturen zu schützen, wird an dieser Stelle die Funktionsweise des Waste Water Heat Radars
        zunächst anhand von Beispieldaten gezeigt.
        Wenn Sie Interesse an einer Abwasserwärmenutzung für Ihr Gebäude haben, nutzen Sie bitte <a id="linkContactForm" @click="openContactForm">dieses Formular</a>.
      </div>
    <div class="mapOptionsToggle">
      <div v-if="mapOptionsHidden" @click="mapOptionsHidden = false;">
        <span class="material-icons small-icon">east</span>
        <span>Optionen</span>
      </div>
      <div v-else @click="mapOptionsHidden = true;">
        <span class="material-icons small-icon">south</span>
        <span>Optionen</span>
      </div>
    </div>
    <div v-if="!mapOptionsHidden" id="mapOptions">
      <table class="mapOptionsTable">
        <tr class="mapOptionsFirstRow">
          <td class="mapOptionsFirstColumn">
            <div id="graspAddressContainer">
              <h4 class="mapOptionsHeadline">Finde eine Adresse:</h4>
              <input id="inputAddress" v-model="inputCurrentAddress" type="text" placeholder="Adresse, PLZ eingeben" @keyup.enter="searchForAddress">
            </div>
            <div id="graspRadiusContainer">
              <h4 class="mapOptionsHeadline">Setze einen Umgebungsradius:</h4>
              <div id="inputRadiusContainer">
                <input id="inputRadius" v-model="inputCurrentRadius" type="number" placeholder="Radius eingeben" @keyup.enter="searchForAddress"><span class="inputUnit">in Meter</span>
              </div>
            </div>
            <div class="submitDownloadButtonsContainer">
              <button id="buttonSearchAddress" class="buttonMapOptions" @click="searchForAddress">Suche</button>
            </div>
          </td>
          <td class="mapOptionsSecondColumn">
            <div id="fileInputHeadlineContainer">
              <h4 class="mapOptionsHeadline">Finde mehrere Adressen:</h4>
            </div>
            <div id="fileInputContainer">
              <div id="fileLabelButtonContainer">
                <label id="fileUploadLabel">Wählen Sie eine CSV-Datei von Ihrem Rechner aus.
                </label>
                <div id="fileUploadButtonContainer">
                  <label id="fileUploadButton" ref="fileUploadButton"> {{ fileUploadButtonLabel }}
                    <input id="fileUploadInput" name="addressesFile" type="file" size="50" accept="text/csv" ref="fileInput" v-on:change="onChangeFileUpload">
                  </label>
                  <div id="loaderContainer" ref="loaderContainer">
                    <clip-loader :loading="loading"
                                 :color= "colorReflowGreen"
                                 ></clip-loader>
                  </div>
                </div>
              </div>
            </div>
            <div class="submitDownloadButtonsContainer">
              <button id="fileSubmitButton" class="buttonMapOptions" @click="postFile">Absenden</button>
              <button  v-if="downloadAvailable" id="fileDownloadButton" class="buttonMapOptions" @click="dataHandler.downloadAddressBatchFeatures(baseUrl, downloadPathGeoJson)">Download GeoJson</button>
            </div>
          </td>
          <td class="mapOptionsThirdColumn">
            <div id="checkboxHeadlineContainer">
              <h4 class="fileInputHeadline">Setze Markierungen auf der Karte:</h4>
            </div>
            <div id="checkboxFeatures">
              <div>
                <input type="checkbox" id="confirm" checked="checked" v-model="showPotential">
                  <label for="confirm" id="confirm"> Potenzialgebiet einblenden </label>
              </div>
              <div>
                <input type="checkbox" id="confirm" checked="checked" v-model="showInterest">
                  <label for="confirm" id="confirm"> Gebäude mit Interesse einblenden </label>
              </div>
            </div>
            <div id="chooseBuildingtypeContainer">
              <h4>Markiere Gebäude nach Kategorie:</h4>
              <div id="bTMultiselectContainer">
                <multiselect
                    v-model="chosenBuildingTypes"
                    :options="buildingTypes"
                    :multiple="false"
                    :close-on-select="true"
                    placeholder="Wähle Gebäudetyp"
                    label="label"
                    track-by="label"
                    selectLabel="Auswählen"
                    selectedLabel="Ausgewählt"
                    deselectLabel="Entfernen"
                    />
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="addresses.length > 0">
          <td class="mapOptionsFirstColumn">
            <div class="historyToggle">
              <div v-if="historyHidden" @click="historyHidden = false;">
                <span class="material-icons small-icon historyToggleIcon">expand_less</span>
                <h4 class="addedPlacesLabel">Hinzugefügte Adressen</h4>
              </div>
              <div v-else @click="historyHidden = true;">
                <span class="material-icons small-icon historyToggleIcon">expand_more</span>
                <h4 class="addedPlacesLabel">Hinzugefügte Adressen</h4>
              </div>
            </div>
          </td>
        </tr>
        <div v-if="!historyHidden && addresses.length > 0" class="searchHistory">
          <div id="deleteAllAddressesButtonContainer">
            <button v-if="addresses.length > 0" class="deleteAllAddressesButton" @click="deleteAllAddresses">Alle löschen</button>
          </div>
          <div v-for="(address, index) in addresses" :key="address.name" class="address">
            <span class="addressClose" title="Close address" @click="removeAddress(index)">&#x2716;</span>
            <span class="addressContent" title="Center on map" @click="centerOnAddress(address.coords)">{{ address.name }}<span v-if="address.radius" class="radiusContent">(Radius: {{address.radius}} Meter)</span></span>
          </div>
        </div>
      </table>
    </div>
    <br>
    <div class="map">
      <div id="referenceOverlay" v-if="showBWBReference || showEZeitReference">
        <div class="reference" v-if="showEZeitReference">
          <p class="referenceText">
          Die Simulationsdaten zur Heizlast wurden bereitgestellt durch eZeit Ingenieur GmbH.
          </p>
          <img class="referenceLogo" src="..\assets\ezeit-ingenieuere-logo.png">
        </div>
        <div class="reference" v-if="showBWBReference">
          <p class="referenceText">
          Das angezeigte verfügbare Abwasserwärmepotenzial entspricht nicht der tatsächlich verfügbaren Entzugsleistung.
          </p>
        </div>
      </div>
      <l-map
        ref="map"
        v-model="zoom"
        v-model:zoom="zoom"
        :center="center"
        :options="{zoomControl: false, attributionControl: false}"
        :maxZoom="zoomMax"
        :minZoom="zoomMin"
      >
        <l-tile-layer :url="mapUrl" :attribution="mapAttribution"></l-tile-layer>
        <l-control-attribution position="topright" prefix="Kartenmaterial"></l-control-attribution>
        <l-control-zoom position="bottomright" ></l-control-zoom>
        <l-tile-layer
            key="Open Street Map"
            name="Open Street Map"
            layerType="base"
            url="mapUrl"
        />
        <l-geo-json
          v-if="showPotential"
          key="Potential Area"
          name="Potential Area"
          layerType="overlay"
          :geojson="potentialFeatures"
          :options="potentialOptions"
          @click="findPotential"
        ></l-geo-json>
        <l-geo-json
          v-if="showInterest"
          key="Interest Area"
          name="Interest Area"
          layerType="overlay"
          :geojson="interestFeatures"
          :options="interestOptions"
        ></l-geo-json>
        <l-geo-json
          v-if="showPotential"
          name="Selected Potential Area"
          :visible="true"
          layerType="overlay"
          :geojson="clickFeatures"
          :options="selectedPotentialOptions"
        ></l-geo-json>
        <l-geo-json
          name="EZEIT Buildings"
          :visible="true"
          layerType="overlay"
          :geojson="eZeitFeatures"
          :options="eZeitOptions"
         ></l-geo-json>
         <l-geo-json
           name="EZEIT Buildings Radius"
           :visible="true"
           layerType="overlay"
           :geojson="eZeitRadiusFeatures"
           :options="eZeitRadiusOptions"
          ></l-geo-json>
         <l-geo-json
           name="ALKIS Buildings"
           :visible="true"
           layerType="overlay"
           :geojson="alkisFeatures"
           :options="alkisOptions"
          ></l-geo-json>
        <div v-for="address in addresses" :key="address.name">
          <l-marker :lat-lng="address.coords">
            <l-popup class="buildingPopup">
              <h4 class="buildingPopupHeadline">Adresse</h4>
              <p class="buildingPopupValue">{{address.name}}</p>
              <h4 class="buildingPopupHeadline" v-if="address.potential">Abwasserwärmepotenzial</h4>
              <span
                class="material-icons small-icon iconSourceReference"
                v-if="address.potential"
                @mouseover="showBWBReference = true"
                @mouseleave="showBWBReference = false">info</span>
              <p class="buildingPopupValue" v-if="address.potential">Entzugsleistung: {{ address.potential }}</p>
              <h4 class="buildingPopupHeadline" v-if="address.r_nortml_w || address.r_medrtm_1 || address.r_enevtm_1 || address.r_adrtml_w">
                Gesamte Heizlast inkl. Trinkwarmwasser</h4>
              <span
                class="material-icons small-icon iconSourceReference"
                v-if="address.r_nortml_w || address.r_medrtm_1 || address.r_enevtm_1 || address.r_adrtml_w"
                @mouseover="showEZeitReference = true"
                @mouseleave="showEZeitReference = false">info</span>
              <p class="buildingPopupValue" v-if="address.r_nortml_w || address.r_medrtm_1 || address.r_enevtm_1 || address.r_adrtml_w">
                <table class="tableMarker">
                    <thead>
                        <tr>
                            <th colspan="4">Sanierung</th>
                        </tr>
                         <tr>
                            <th v-if="address.r_nortml_w">Keine</th>
                            <th v-if="address.r_medrtm_1">Mittel</th>
                            <th v-if="address.r_enevtm_1">EnEV 2016</th>
                            <th v-if="address.r_adrtml_w">Sehr gut</th>
                          </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td v-if="address.r_nortml_w">{{ address.r_nortml_w }} kW</td>
                        <td v-if="address.r_medrtm_1">{{ address.r_medrtm_1 }} kW</td>
                        <td v-if="address.r_enevtm_1">{{ address.r_enevtm_1 }} kW</td>
                        <td v-if="address.r_adrtml_w">{{ address.r_adrtml_w }} kW</td>
                      </tr>
                      <tr>
                        <td v-if="address.r_nortml_w" class="matchMakingContainer">
                          <div class="matchMakingBar" :style="getUsablePotential(address.potential, address.r_nortml_w)[0]"></div>
                          <div class="matchMakingValue">{{ getUsablePotential(address.potential, address.r_nortml_w)[1] }}</div>
                        </td>
                        <td v-if="address.r_medrtm_1" class="matchMakingContainer">
                          <div class="matchMakingBar" :style="getUsablePotential(address.potential, address.r_medrtm_1)[0]"></div>
                          <div class="matchMakingValue">{{ getUsablePotential(address.potential, address.r_medrtm_1)[1] }}</div>
                        </td>
                        <td v-if="address.r_enevtm_1" class="matchMakingContainer">
                          <div class="matchMakingBar" :style="getUsablePotential(address.potential, address.r_enevtm_1)[0]"></div>
                          <div class="matchMakingValue">{{ getUsablePotential(address.potential, address.r_enevtm_1)[1] }}</div>
                        </td>
                        <td v-if="address.r_adrtml_w" class="matchMakingContainer">
                          <div class="matchMakingBar" :style="getUsablePotential(address.potential, address.r_adrtml_w)[0]"></div>
                          <div class="matchMakingValue">{{ getUsablePotential(address.potential, address.r_adrtml_w)[1] }}</div>
                        </td>
                      </tr>
                    </tbody>
                </table>
              </p>
              <h4 class="buildingPopupHeadline" v-if="address.radius && (address.r_nortml_w__sum || address.r_medrtm_1__sum || address.r_enevtm_1__sum || address.r_adrtml_w__sum)">
                Summe Heizlast im Umkreis von {{ address.radius }} Metern</h4>
              <span
                class="material-icons small-icon iconSourceReference"
                v-if="address.radius && (address.r_nortml_w__sum || address.r_medrtm_1__sum || address.r_enevtm_1__sum || address.r_adrtml_w__sum)"
                @mouseover="showEZeitReference = true"
                @mouseleave="showEZeitReference = false">info</span>
              <p class="buildingPopupValue" v-if="address.r_nortml_w__sum || address.r_medrtm_1__sum || address.r_enevtm_1__sum || address.r_adrtml_w__sum">
                <table class="tableMarker">
                    <thead>
                        <tr>
                            <th colspan="4">Sanierung</th>
                        </tr>
                         <tr>
                            <th v-if="address.r_nortml_w__sum">Keine</th>
                            <th v-if="address.r_medrtm_1__sum">Mittel</th>
                            <th v-if="address.r_enevtm_1__sum">EnEV 2016</th>
                            <th v-if="address.r_adrtml_w__sum">Sehr gut</th>
                          </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td v-if="address.r_nortml_w__sum">{{ address.r_nortml_w__sum }} kW</td>
                        <td v-if="address.r_medrtm_1__sum">{{ address.r_medrtm_1__sum }} kW</td>
                        <td v-if="address.r_enevtm_1__sum">{{ address.r_enevtm_1__sum }} kW</td>
                        <td v-if="address.r_adrtml_w__sum">{{ address.r_adrtml_w__sum }} kW</td>
                      </tr>
                      <tr>
                        <td v-if="address.r_nortml_w__sum" class="matchMakingContainer">
                          <div class="matchMakingBar" :style="getUsablePotential(address.potential, address.r_nortml_w__sum)[0]"></div>
                          <div class="matchMakingValue">{{ getUsablePotential(address.potential, address.r_nortml_w__sum)[1] }}</div>
                        </td>
                        <td v-if="address.r_medrtm_1__sum" class="matchMakingContainer">
                          <div class="matchMakingBar" :style="getUsablePotential(address.potential, address.r_medrtm_1__sum)[0]"></div>
                          <div class="matchMakingValue">{{ getUsablePotential(address.potential, address.r_medrtm_1__sum)[1] }}</div>
                        </td>
                        <td v-if="address.r_enevtm_1__sum" class="matchMakingContainer">
                          <div class="matchMakingBar" :style="getUsablePotential(address.potential, address.r_enevtm_1__sum)[0]"></div>
                          <div class="matchMakingValue">{{ getUsablePotential(address.potential, address.r_enevtm_1__sum)[1] }}</div>
                        </td>
                        <td v-if="address.r_adrtml_w__sum" class="matchMakingContainer">
                          <div class="matchMakingBar" :style="getUsablePotential(address.potential, address.r_adrtml_w__sum)[0]"></div>
                          <div class="matchMakingValue">{{ getUsablePotential(address.potential, address.r_adrtml_w__sum)[1] }}</div>
                        </td>
                      </tr>
                    </tbody>
                </table>
              </p>
              <button id="buildingPopupInterestButton" @click="openModal(address)">Interesse bekunden</button>
            </l-popup>
          </l-marker>
        </div>
      </l-map>
    </div>
    <vue-final-modal v-model="showModal" classes="modal-container" content-class="modal-content">
      <button class="modal__close" @click="showModal = false">
        <span class="material-icons">close</span>
      </button>
      <span class="modal__title">Jetzt Ihr Interesse bekunden</span>
      <div class="modal__content">
        <p>
          <input id="inputInterestName" v-model="inputCurrentInterestName" type="text" placeholder="Name*" required>
        </p>
        <p>
          <input id="inputInterestMail" v-model="inputCurrentInterestMail" type="text" placeholder="E-Mail Adresse*" required>
        </p>
        <p>
          <input id="inputInterestOrganisation" v-model="inputCurrentInterestOrganisation" type="text" placeholder="Firma / Organisation">
        </p>
        <br/>
        <p>
          <textarea id="inputInterestAddress" v-model="inputCurrentInterestAddress" placeholder="Gesuchte Adresse" maxlength="100" rows="2"></textarea>
        </p>
        <p>
          <input id="inputInterestHeatingLoad" v-model="inputCurrentInterestHeatingLoad" type="text" placeholder="Heizlast des Gebäudes in KW">
        </p>
        <p>
          <textarea id="inputInterestNote" v-model="inputCurrentInterestNote" placeholder="Notiz" maxlength="1000" rows="10"></textarea>
        </p>
        <p id="containerDataPrivacy">
          <input type="checkbox" id="checkboxDataPrivacy" v-model="dataPrivacyAccepted">
          <label id="labelDataPrivacy" for="checkboxDataPrivacy">Hiermit willige ich ein, dass die oben angegebenen personenbezogenen Daten zum Zweck der Prüfung der Verfügbarkeit von Abwasserwärme von MCS Data Labs GmbH verarbeitet, bei den Berliner Wasserbetrieben (BWB) gespeichert und zu Weiterentwicklungszwecken bzgl. der Anwendung an Prototypes Europe e.V. weitergegeben werden dürfen. Die Daten werden nicht ohne Einwilligung an Dritte weitergegeben. Mir ist bekannt, dass ich meine erteilte Einwilligung jederzeit mit Wirkung für die Zukunft in einer formlosen <a id="emailLink" :href="`mailto:${defaultEmailContact}`">E-mail</a> widerrufen kann.</label>
        </p>
        <br/>
        <p v-if="interestSent" class="confirmationText">
          Vielen Dank für Ihr Interesse.
        </p>
      </div>
      <div class="modal__action" v-if="!interestSent">
        <button v-if="!interestSubmitted" @click="expressInterest()">Absenden</button>
        <div v-if="interestSubmitted">
          <clip-loader :loading="loading"
                       :color= "colorReflowGreen"
                       ></clip-loader>
        </div>
      </div>
    </vue-final-modal>
  </div>
  </layout>
</template>

<script>
import axios from 'axios';
import Layout from '../layouts/layout'
import {
  LMap,
  LTileLayer,
  LGeoJson,
  LMarker,
 // LControlLayers,
  LControlZoom,
  LControlAttribution,
  LPopup,
} from "@vue-leaflet/vue-leaflet";
//import * as d3 from 'd3';
import "@asymmetrik/leaflet-d3";
import "leaflet/dist/leaflet.css";
//import Autolinker from "autolinker";
import "point-in-polygon";
// import post_template from 'raw-loader!@/assets/post_template.txt';
//import union from '@turf/union'
import Multiselect from '@suadelabs/vue3-multiselect';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import ApiHandler from '../modules/apihandler.js';
import DataHandler from '../modules/datahandler.js';
import store from '../modules/store.js';
import buildingTypesJson from "../assets/alkis_buildingtypes_reduced.json";
import { VueFinalModal } from 'vue-final-modal';

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LMarker,
    LControlAttribution,
  //  LControlLayers,
    LControlZoom,
    LPopup,
    Multiselect,
    ClipLoader,
    VueFinalModal,
    Layout,
  },

  data() {
    return {
      console,
      mapUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      mapAttribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> Mitwirkende',
      map: null, // Map object
      mapOptionsHidden: false, // Map options not hidden at start
      historyHidden: false, // Search history not hidden at start
      center: [52.5, 13.4], // Centered on Berlin coords
      zoomMin: 10,
      defaultZoom: 12,
      zoom: 12, // Current zoom level
      zoomMax: 18,
      iconSize: [40, 30], // Width X Height of the known addresses icons
      inputCurrentAddress: '', // Input to search for new addresses
      inputCurrentRadius: '',
      baseUrl: 'https://reflow.smarko-health.de',
      potentialFeatures: [],
      clickFeatures: [],
      interestFeatures: [],
      addresses: [],
      eZeitFeatures: [],
      eZeitRadiusFeatures: [],
      buildingTypes: [],
      chosenBuildingTypes: [],
      markedBuildingTypes: [],
      alkisFeatures: [],
      colorReflowGreen: "#02E379",
      colorReflowDarkBlue: "#0D2451",
      potentialColor: "#2dc26b",
      selectedPotentialColor: "#6ec4c0",
      eZeitBuildingsColor: "#2d37c2",
      eZeitBuildingsRadiusColor: "#6e74c4",
      alkisBuildingsColor: "#4f3f75",
      flaggedBuildingsColor: "#080f45",
      stringNoInformation: "No information available",
      maxRetries: 10,
      actualRetries: 0,
      loading: '',
      downloadAvailable: false,
      downloadPathGeoJson: '',
      fileUploadButtonLabel: 'Durchsuchen',
      showPotential: false,
      showInterest: true,
      apiHandler: null,
      dataHandler: null,
      defaultEmailContact: 'reflow@prototypes.berlin',
      showModal: false,
      inputCurrentInterestName: '',
      inputCurrentInterestMail: '',
      inputCurrentInterestOrganisation: '',
      inputCurrentInterestAddress: '',
      inputCurrentInterestAddressPkId: '',
      inputCurrentInterestHeatingLoad: '',
      inputCurrentInterestNote: '',
      interestSent: false,
      interestSubmitted: false,
      dataPrivacyAccepted: false,
      showBWBReference: false,
      showEZeitReference: false
    };
  },
  mounted () {
    this.$nextTick(() => {
      this.map = this.$refs.map.mapObject;

      this.showModal = store.getters.getContactFormState;

      this.apiHandler = new ApiHandler();
      this.dataHandler = new DataHandler(this.apiHandler);

      this.buildingTypes = buildingTypesJson;

      this.dataHandler.getPotentialArea(this.baseUrl).then(potentialFeatures => {
        this.potentialFeatures = potentialFeatures;
      })

      this.dataHandler.getInterestArea(this.baseUrl).then(interestFeatures => {
        this.interestFeatures = interestFeatures;
      })
    })
  },
  unmounted () {
    store.commit("closeContactForm");
  },
  computed: {
    getContactFormState(){
      return store.getters.getContactFormState;
    },

    getUsablePotential(){
      return (potential, heatload) => {
        potential = parseInt(potential,10)
        heatload = parseInt(heatload, 10)
        var potentialRatio = Math.round(Math.min((potential/heatload),1)*100)+"%";

        return [{
        "background-color": this.colorReflowGreen,
        width: potentialRatio
        },
        potentialRatio
        ]

      }
    },
    potentialOptions() {
      return {
        onEachFeature: this.potentialFeatureFunction
      };
    },
    selectedPotentialOptions() {
      return {
        onEachFeature: this.selectedPotentialFeatureFunction
      };
    },
    eZeitOptions() {
      return {
        onEachFeature: this.eZeitFeatureFunction
      };
    },
    eZeitRadiusOptions() {
      return {
        onEachFeature: this.eZeitRadiusFeatureFunction
      };
    },
    interestOptions(){
      return {
        onEachFeature: this.interestFeatureFunction
      };

    },
    alkisOptions() {
      return {
        onEachFeature: this.alkisFeatureFunction
      };
    },
    potentialFeatureFunction() {
      return (feature, layer) => {
        layer.setStyle({
          weight: 5,
          color: this.potentialColor,
          fillColor: this.potentialColor,
        })
      }
    },

    eZeitFeatureFunction() {
      return (feature, layer) => {

        var popupContent = '';
        popupContent = '<l-popup class="buildingPopup">\
                          <h4 class="buildingPopupHeadline" v-if="address.r_nortml_w || address.r_medrtm_1 || address.r_enevtm_1 || address.r_adrtml_w">\
                            Gesamte Heizlast inkl. Trinkwarmwasser</h4>\
                          <span \
                            class="material-icons small-icon iconSourceReference" \
                            v-if="address.r_nortml_w || address.r_medrtm_1 || address.r_enevtm_1 || address.r_adrtml_w" \
                            onmouseover="showEZeitReference = true" \
                            onmouseout="showEZeitReference = false">info</span>\
                          <table class="tableMarker">\
                            <thead>\
                                <tr>\
                                    <th colspan="4">Sanierung</th>\
                                </tr>\
                                <tr>\
                                    <th v-if="address.r_nortml_w__sum">Keine</th>\
                                    <th v-if="address.r_medrtm_1__sum">Mittel</th>\
                                    <th v-if="address.r_enevtm_1__sum">EnEV 2016</th>\
                                    <th v-if="address.r_adrtml_w__sum">Sehr gut</th>\
                                  </tr>\
                            </thead>\
                            <tbody>\
                              <tr>\
                                <td v-if="address.r_nortml_w__sum">' + layer.feature.properties.r_nortml_w + ' kW</td>\
                                <td v-if="address.r_medrtm_1__sum">' + layer.feature.properties.r_medrtm_1 + ' kW</td>\
                                <td v-if="address.r_enevtm_1__sum">' + layer.feature.properties.r_enevtm_1 + ' kW</td>\
                                <td v-if="address.r_adrtml_w__sum">' + layer.feature.properties.r_adrtml_w + ' kW</td>\
                              </tr>\
                            </tbody>\
                          </table>\
                        </l-popup>';
        layer.bindPopup(popupContent, {maxHeight: 400});

        layer.setStyle({
          weight: 3,
          color: this.eZeitBuildingsColor,
          fillColor: this.eZeitBuildingsColor,
          fillOpacity: 0.75
        });
      }
    },
    interestFeatureFunction(){
       return (feature, layer) => {

        layer.setStyle({
          weight: 5,
          color: this.flaggedBuildingsColor,
          fillColor: this.flaggedBuildingsColor,
          fillOpacity: 0.75
        });
      }
    },
    eZeitRadiusFeatureFunction() {
      return (feature, layer) => {

        var popupContent = '';
        popupContent = '<l-popup class="buildingPopup">\
                          <h4 class="buildingPopupHeadline" v-if="address.r_nortml_w || address.r_medrtm_1 || address.r_enevtm_1 || address.r_adrtml_w">\
                            Gesamte Heizlast inkl. Trinkwarmwasser</h4>\
                          <span \
                            class="material-icons small-icon iconSourceReference" \
                            v-if="address.r_nortml_w || address.r_medrtm_1 || address.r_enevtm_1 || address.r_adrtml_w" \
                            onmouseover="showEZeitReference = true" \
                            onmouseout="showEZeitReference = false">info</span>\
                          <table class="tableMarker">\
                            <thead>\
                                <tr>\
                                    <th colspan="4">Sanierung</th>\
                                </tr>\
                                <tr>\
                                    <th v-if="address.r_nortml_w__sum">Keine</th>\
                                    <th v-if="address.r_medrtm_1__sum">Mittel</th>\
                                    <th v-if="address.r_enevtm_1__sum">EnEV 2016</th>\
                                    <th v-if="address.r_adrtml_w__sum">Sehr gut</th>\
                                  </tr>\
                            </thead>\
                            <tbody>\
                              <tr>\
                                <td v-if="address.r_nortml_w__sum">' + layer.feature.properties.r_nortml_w + ' kW</td>\
                                <td v-if="address.r_medrtm_1__sum">' + layer.feature.properties.r_medrtm_1 + ' kW</td>\
                                <td v-if="address.r_enevtm_1__sum">' + layer.feature.properties.r_enevtm_1 + ' kW</td>\
                                <td v-if="address.r_adrtml_w__sum">' + layer.feature.properties.r_adrtml_w + ' kW</td>\
                              </tr>\
                            </tbody>\
                          </table>\
                        </l-popup>';
        layer.bindPopup(popupContent, {maxHeight: 400});

        layer.setStyle({
          color: this.eZeitBuildingsRadiusColor,
          fillColor: this.eZeitBuildingsRadiusColor,
          fillOpacity: 0.75
        });
      }
    },
    alkisFeatureFunction() {
      return (feature, layer) => {
        // popup for marked building polygons on the map
        var popupContent = '';
        if (layer.feature.properties.bezgfk || layer.feature.properties.nam) {
          popupContent = '<l-popup class="buildingPopup">\
                          <h4 class="buildingPopupHeadline"> ' + layer.feature.properties.bezgfk + '</h4>\
                          <p class="buildingPopupValue"> ' + layer.feature.properties.nam + '</p>\
                          </l-popup>';
        } else {
          popupContent = '<l-popup>\
                          <p class="buildingPopupValue"> ' + this.stringNoInformation + '</p>\
                          </l-popup>';
        }

        layer.bindPopup(popupContent, {maxHeight: 400});

        layer.setStyle({
          weight: 1,
          color: this.alkisBuildingsColor,
          fillColor: this.alkisBuildingsColor,
          fillOpacity: 0.75
        });
      }
    },
    selectedPotentialFeatureFunction() {
      return (feature, layer) =>  {
            var popupContent = ''
            popupContent = '<table class="tablePotential"> \
              <h4>Informationen zum ausgewälten Potentialgebiet</h4>'
            var dontDisplay = ["pk", "OBJECTID", "OID_1", "id"]

            for (var prop in feature.properties){

              if (!dontDisplay.includes(prop)){

                var property = feature.properties[prop];
                var description = prop.replaceAll('_', ' ');

                if(description.includes(' in ')){

                  var splitted = description.split(' in ')
                  description = splitted[0] + ' [' + splitted[1] + ']'

                }

                popupContent += '<tr>\
                          <th class="thPotential" scope="row">' + description + '</th>\
                          <td class="tdPotential">' + (!(isNaN(property)) ? Math.round(property * 100) / 100 : property) + '</td>\
                        </tr>'
              }
            }

            popupContent += '</table>';
            layer.bindPopup(popupContent, {maxWidth: 400});

            layer.setStyle({
              weight: 4,
              color: this.selectedPotentialColor,
              fillColor: this.selectedPotentialColor,
              fillOpacity: 0.0
            });
        }
    }

  },
  watch: {
    // the native way is to set @update:v-model="markBuildings()" in the multiselect object but that does not work
    chosenBuildingTypes(val) {
      this.markBuildings(val)
    },

    getContactFormState(state) {
      this.showModal = state;
    },

    showModal(state) {
      this.resetModalVModels();

      if (!state) {
        store.commit("closeContactForm");
      } else {
        store.commit("openContactForm")
      }
    },
  },
  methods: {
    openModal(address) {
      this.showModal = true;
      const interestData = this.dataHandler.processInterestData(address);
      this.inputCurrentInterestAddress = interestData.inputInterestAddress;
      this.inputCurrentInterestAddressPkId = interestData.inputInterestAddressPkId;
    },

    expressInterest() {
      if (this.dataPrivacyAccepted) {
        this.interestSubmitted = true;
        this.dataHandler.expressInterest(
          this.baseUrl,
          this.inputCurrentInterestName,
          this.inputCurrentInterestMail,
          this.inputCurrentInterestOrganisation,
          this.inputCurrentInterestAddressPkId,
          this.inputCurrentInterestAddress,
          this.inputCurrentInterestHeatingLoad,
          this.inputCurrentInterestNote)
          .then(requestSucceeded => {
            if (requestSucceeded) {
              this.interestSent = true;
            }
            else {
              this.interestSubmitted = false;
              this.dataPrivacyAccepted = false;
              window.alert('Ihr Interesse konnte leider nicht registriert werden, bitte versuchen Sie es erneut.');
            }
          })
      } else {
        window.alert('Um ihr Interesse registrieren zu können, müssen Sie der Datenverarbeitung zustimmen.');
      }

    },

    resetModalVModels() {
      this.inputCurrentInterestName = '';
      this.inputCurrentInterestMail = '';
      this.inputCurrentInterestOrganisation = '';
      this.inputCurrentInterestHeatingLoad = '';
      this.inputCurrentInterestNote = '';
      this.interestSubmitted = false;
      this.dataPrivacyAccepted = false;
    },

    searchForAddress() {
      // Check input
      if(this.inputCurrentAddress) {
        // Call API https://nominatim.org/release-docs/develop/api/Search/ to resolve the address
        axios
        .get(`https://nominatim.openstreetmap.org/search.php?q=${this.inputCurrentAddress}&format=jsonv2&limit=1`)
        .then(response => {
          if (response.data.length > 0) {
            this.requestAddressFeatures(response)
            this.inputCurrentAddress = "";
            this.inputCurrentRadius = "";
            this.interestSent = false;
          } else window.alert('Adresse konnte nicht gefunden werden ...');
        })
      } else window.alert('Bitte eine Adresse eingeben');
    },

    requestAddressFeatures(response) {
      let newAddress = {};

      // Save the name and coords of the address
      newAddress.name = response.data[0].display_name;
      newAddress.coords = [parseFloat(response.data[0].lat), parseFloat(response.data[0].lon)];
      newAddress.contact = this.defaultEmailContact;

      // request potential (BWB features)
      var asyncBwbFeatures = this.apiHandler.getFeatures(this.baseUrl, `/get_feature?lat=${parseFloat(response.data[0].lat)}&lon=${parseFloat(response.data[0].lon)}&srid=4326`);
      asyncBwbFeatures.then(response => {
        this.processBwbAddressFeatures(response.data, newAddress)
      }).catch(error => {
        console.log(error)
      })

      // getEZeitFeatures
      var asyncEZeitFeatures = this.apiHandler.getFeatures(this.baseUrl, `/get_feature_ezeit?lat=${response.data[0].lat}&lon=${response.data[0].lon}&srid=4326`);
      asyncEZeitFeatures.then(response => {
        this.processEZeitAddressFeatures(response.data, newAddress)
      }).catch(error => {
        console.log(error)
      })

      var asyncAlkisResult = this.getAlkisFeatureGeo([parseFloat(response.data[0].lon), parseFloat(response.data[0].lat)]);

      // Center on the map
      this.centerOnAddress(newAddress.coords);

      // Add new address to list of marked addresses
      this.addresses.push(newAddress);

      asyncAlkisResult.then(response => {
        this.processAlkisPkResponse(response.data, newAddress)
      })

      if (this.inputCurrentRadius) {
        newAddress.radius = this.inputCurrentRadius;

        // getEZeitSumFeatures
        var asyncEZeitRadiusFeatures = this.apiHandler.getFeatures(this.baseUrl, `/get_feature_ezeit_radius?lat=${parseFloat(response.data[0].lat)}&lon=${parseFloat(response.data[0].lon)}&srid=4326&radius=${this.inputCurrentRadius}`)
        asyncEZeitRadiusFeatures.then(response => {
          this.processEZeitRadiusAddressFeatures(response.data, newAddress)
        }).catch(error => {
          console.log(error)
        })

        // getEZeitRadiusSumFeatures
        var asyncEZeitRadiusSumFeatures = this.apiHandler.getFeatures(this.baseUrl, `/get_feature_ezeit_radius_sums?lat=${parseFloat(response.data[0].lat)}&lon=${parseFloat(response.data[0].lon)}&srid=4326&radius=${this.inputCurrentRadius}`)
        asyncEZeitRadiusSumFeatures.then(response => {
          this.processEZeitRadiusSumAddressFeatures(response.data, newAddress)
        }).catch(error => {
          console.log(error)
        })

      } else {
        console.log("Radius is not set.")
      }


    },

    processBwbAddressFeatures(data, newAddress) {
      if (!(Object.keys(data).length === 0) && data.properties.Abwassserwärmepotential_in_kW) {
        var potential = data.properties.Abwassserwärmepotential_in_kW;
        newAddress.potential = (Math.floor(potential) < 0)? "n/a" : Math.floor(potential) + " kW";
      } else {
        console.log("No waste water heat potential (BWB) is provided for this address.")
      }


    },

    processEZeitAddressFeatures(data, newAddress) {
      if (data.features) {
        var heatload = data.features[0].properties;
        newAddress.r_nortml_w = Math.round(heatload.r_nortml_w).toString();
        newAddress.r_medrtm_1 = Math.round(heatload.r_medrtm_1).toString();
        newAddress.r_enevtm_1 = Math.round(heatload.r_enevtm_1).toString();
        newAddress.r_adrtml_w = Math.round(heatload.r_adrtml_w).toString();

        if (!this.inputCurrentRadius) {
          newAddress.features = [data.features[0]];
          this.eZeitFeatures = this.eZeitFeatures.concat(newAddress.features);
        }
      } else {
        console.log("No Ezeit features are provided for this address.")
      }

    },

    processAlkisPkResponse(data, newAddress) {
      if (data.properties) {
        var properties = data.properties;
        newAddress.interest = properties.interest;
        newAddress.pk = properties.pk;
      } else {
        console.log("No Alkis properties are provided for this address.")
      }

    },

    processEZeitRadiusAddressFeatures(data, newAddress) {
      newAddress.radiusFeatures = data.features;
      Array.prototype.push.apply(this.eZeitRadiusFeatures, newAddress.radiusFeatures);
      // workaround to update the layer view; concat returns a new array
      this.eZeitRadiusFeatures = this.eZeitRadiusFeatures.concat([]);
    },

    processEZeitRadiusSumAddressFeatures(data, newAddress) {
      if (data) {
        var heatloadsums = data;
        newAddress.r_nortml_w__sum = Math.round(heatloadsums.r_nortml_w__sum).toString();
        newAddress.r_medrtm_1__sum = Math.round(heatloadsums.r_medrtm_1__sum).toString();
        newAddress.r_enevtm_1__sum = Math.round(heatloadsums.r_enevtm_1__sum).toString();
        newAddress.r_adrtml_w__sum = Math.round(heatloadsums.r_adrtml_w__sum).toString();
      } else {
        console.log("No Ezeit radius features are provided for this address.")
      }

    },

    centerOnAddress(coords) {
      this.center = coords;
      this.zoom = 20;
    },

    removeAddress(index) {
      this.addresses.splice(index, 1);

      this.eZeitFeatures = [];
      this.eZeitRadiusFeatures = [];
      this.addresses.forEach(address => {
        Array.prototype.push.apply(this.eZeitFeatures, address.features);
        Array.prototype.push.apply(this.eZeitRadiusFeatures, address.radiusFeatures);
      })
      // workaround to update the layer view; concat returns a new array
      this.eZeitFeatures = this.eZeitFeatures.concat([]);
    },

    findPotential(event){
      //getBwbFeature
      var asyncBwbFeatures = this.apiHandler.getFeatures(this.baseUrl, `/get_feature?lat=${event.latlng.lat}&lon=${event.latlng.lng}&srid=4326`)
      asyncBwbFeatures.then(response => {
        this.clickFeatures = [response.data];
      }).catch(error => {
        console.log(error)
      })
    },

    removeSelectedPotential(){
      this.clickFeatures = [];
    },

    getAlkisFeature(buildingType) {
      return axios
        .get(this.baseUrl+"/get_feature_alkis?name="+buildingType)
        .catch(error => {
          console.log(error)
        })
    },

    getAlkisFeatureGeo(coordinates){
      return axios
        .get(this.baseUrl+"/get_feature_alkis_geo?lat="+coordinates[1]+"&lon="+coordinates[0]+"&srid=4326")
        .catch(error => {
          console.log(error)
        })

    },

    markBuildings(buildingTypes) {

      // workaround to keep array for single select (aim is to get back to multiselect, when performance of map is optimized)
      if (buildingTypes) {
        buildingTypes = [buildingTypes];
      } else {
        buildingTypes = [];
      }

      var promises = [];

      buildingTypes.forEach(buildingType => {

          var promisesBT = [];

          // check if buildingType is marked
          if (!this.markedBuildingTypes.some(mbt => mbt.label === buildingType.label)) {

            // check if buildingType is stored
            var sbt = store.getters.getStoredBuildingTypes.filter(sbt => sbt.label === buildingType.label);
            if (sbt.length === 1) {
              buildingType.features = sbt[0].features;

            } else if (sbt.length == 0) {
              buildingType.features = [];
              buildingType.values.forEach(value => {

                var asyncAlkisResult = this.getAlkisFeature(value);
                asyncAlkisResult.then(response => {
                    // WORKAROUND API SHOULD THROW ERROR!
                    if (response.data.features && !(Object.keys(response.data.features).length === 0)) {
                      const features = response.data.features.map(featureArray => featureArray.geometry);
                      buildingType.features = buildingType.features.concat(features);
                    } else {
                      console.log('No polygons for this category value available');
                    }

                })
                promisesBT.push(asyncAlkisResult);
                promises.push(asyncAlkisResult);
              })

            } else {
              console.log("THIS CASE SHOULD NOT BE REACHED");

            }
          }

          Promise.all(promisesBT).then( () => {
            store.commit("addStoredBuildingType", buildingType);
            this.markedBuildingTypes.push(buildingType);
          })
      })

      Promise.all(promises).then( () => {
        this.syncAlkisFeatures(buildingTypes);

      })
    },

    syncAlkisFeatures(buildingTypes) {
      // // delete unchecked ones from markedBuildingTypesList
      var cbtLabels = buildingTypes.map(cbt => {return cbt.label});
      this.markedBuildingTypes = this.markedBuildingTypes.filter(mbt => cbtLabels.includes(mbt.label));

      // sync list with alkisFeatures array
      this.alkisFeatures = [];
      this.markedBuildingTypes.forEach(mbt => {
        Array.prototype.push.apply(this.alkisFeatures, mbt.features);
      });
      // workaround to update the layer view; concat returns a new array
      this.alkisFeatures = this.alkisFeatures.concat([]);
    },

    deleteAllAddresses(){
      this.eZeitFeatures = [];
      this.eZeitRadiusFeatures = [];
      this.addresses = [];
      this.zoom = this.defaultZoom;
    },

    onChangeFileUpload(event) {
      this.addressesFile = event.target.files[0];
      var fileName = this.addressesFile.name;
      this.fileUploadButtonLabel = fileName;

      this.downloadAvailable = false;
    },

    postFile() {
      if (this.addressesFile) {
        this.$refs.loaderContainer.style.visibility = "visible";

        // post batch request (all address features)
        var asyncAddressFeatures = this.apiHandler.postAddressFile(this.baseUrl, '/get_feature_csv', this.addressesFile)
        asyncAddressFeatures.then(response => {
          if (response.SUCCESS) {
            var batchRequestUri = response.SUCCESS;

            this.requestBatch(batchRequestUri);
            this.downloadPathGeoJson = `/download_batch?name=${batchRequestUri}`

          } else {
            throw 'No batch URI can be found in response.'
          }
        }).catch(error => {
          console.log(error)

          console.log("Addresses batch (CSV) can not be resolved")
          this.$refs.loaderContainer.style.visibility = "hidden";
          window.alert('Die in der Datei angegebenen Adressen konnten nicht verarbeitet werden.');
        })
      } else {
        window.alert('Bitte eine Datei auswählen.');
      }

    },

    requestBatch(batchRequestUri) {
      // getAddressesBatchFeatures
      var asyncAddressesBatchFeatures = this.apiHandler.getFeatures(this.baseUrl, `/download_batch?name=${batchRequestUri}`)
      asyncAddressesBatchFeatures.then(response => {
        this.clearRetries;
        if (response.data.length > 0) {
          this.processAddressesBatchFeatures(response.data)
        } else {
          window.alert('Keine der Adressen konnte verarbeitet werden.')
        }
      }).catch(error => {
        if (this.maxRetries == this.actualRetries) {
          console.log(error);
          this.clearRetries
        } else if (error.response && (error.response.status == 400 || error.response.status == 404 || error.response.status == 500)) {
          console.log("Rerequest address batch download")
          this.actualRetries += 1;
          setTimeout(this.requestBatch, 10000, batchRequestUri)
        } else {
          console.log(error)
        }
      })

    },

    clearRetries() {
      this.actualRetries = 0
    },

    processAddressesBatchFeatures(data) {
      data.forEach(address => {
        let newAddress = {};
        newAddress.contact = this.defaultEmailContact;

        if(address.coords_map_api
          && !(JSON.stringify(address.coords_map_api) === JSON.stringify({}))
          && !(JSON.stringify(address.coords_map_api) === JSON.stringify('{}'))) {
          newAddress.name = address.coords_map_api.display_name;
          newAddress.coords = [parseFloat(address.coords_map_api.lat), parseFloat(address.coords_map_api.lon)];
        } else {
          console.log("Submitted address could not be geocoded. It my does not exist.")
        }

        // BWB features
        if(address.bwb
          && !(JSON.stringify(address.bwb) === JSON.stringify({}))
          && !(JSON.stringify(address.bwb) === JSON.stringify('{}'))
          && !(JSON.stringify(address.bwb) === JSON.stringify("{\"ERROR\": \"Empty Result\"}"))) {
          var bwbJsonObject = JSON.parse(address.bwb); // WORKAROUND; BACKEND SHOULD DELIVER JSON OBJECTS!
          this.processBwbAddressFeatures(bwbJsonObject, newAddress);

        } else {
          console.log("No BWB data for this address")
        }

        // Ezeit features
        if(address.ezeit
          && !(JSON.stringify(address.ezeit) === JSON.stringify({}))
          && !(JSON.stringify(address.ezeit) === JSON.stringify('{}'))
          && !(JSON.stringify(address.ezeit) === JSON.stringify("{\"ERROR\": \"Empty Result\"}"))) {
          var ezeitJsonObject = JSON.parse(address.ezeit); // WORKAROUND; BACKEND SHOULD DELIVER JSON OBJECTS!
          this.processEZeitAddressFeatures(ezeitJsonObject, newAddress);

        } else {
          console.log("No EZeit data for this address")
        }

        // Alkis geo
        if(address.alkis
          && !(JSON.stringify(address.alkis) === JSON.stringify({}))
          && !(JSON.stringify(address.alkis) === JSON.stringify('{}'))
          && !(JSON.stringify(address.alkis) === JSON.stringify("{\"ERROR\": \"Empty Result\"}"))) {
          var alkisJsonObject = JSON.parse(address.alkis); // WORKAROUND; BACKEND SHOULD DELIVER JSON OBJECTS!
          this.processAlkisPkResponse(alkisJsonObject, newAddress)

        } else {
          console.log("No Alkis data for this address")
        }

        // push address
        if (newAddress.name && newAddress.coords) {
          this.addresses.push(newAddress);
        }
      })

      // add download button
      this.downloadAvailable = true;

      // remove loader
      this.$refs.loaderContainer.style.visibility = "hidden";
    }

  },

};
</script>


<style>
.buildingPopup {
  line-height: 1;
}

.buildingPopupHeadline {
  margin-bottom: 1px !important;
}

.iconSourceReference {
  color: #000 !important;
}

.buildingPopupValue {
  margin-top: 1px !important;
}

.tablePotential{
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;
}

.tablePotential tr{
  border-bottom: 1px solid #dddddd;
}

.tablePotential tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.tableMarker{
  border-collapse: collapse;
  margin: 25x 0;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 300px;
}

.tableMarker thead tr{
  background-color: #9C9EA1;
  color: #ffffff;
  text-align: center;
 }

 .tableMarker tbody td{
  text-align: center;
  font-weight: bold;
  border-right: 1px solid #dddddd;
  border-left: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
 }

.searchHistory{
  border:1px solid #0D2451;
  background-color: white;
  color:black;
  margin-top:21px;
  width: calc((100% / 3) - 4vw);
  margin-right:2vw;
  position:absolute;
  z-index: 10003;
}


#checkboxFeatures{
  font-weight:bold;
  font-size:0.9em;
  height: 5vh;
  overflow: hidden;
  white-space: nowrap;
  min-height:50px;
}

#confirm{
  margin-left:10px;
}

#deleteAllAddressesButtonContainer {
  display: flex;
  width: 100%;
  justify-content: flex-end;
}

.deleteAllAddressesButton{
  width: max(40%, 100px);
  text-align:center;
  height: 25px;
  font-weight:bold;
  opacity: 0.8;
}

.deleteAllAddressesButton:hover{
  opacity:1;
  cursor:pointer;
}

.deleteSingleAddressButton{
  top:0;
  left:0;
  display:none;
}

.deleteSingleAddressButton:hover{
  display:block;
}

.ac-renderer{
  position: absolute;
  border: 1px solid #ccc;
  margin-top: -1px;
  max-width: 400px;
}
.ac-row {
  white-space: nowrap;
  position: relative;
  cursor: pointer;
  padding: 5px;
  background-color: #fff;
  overflow: hidden !important;
  text-overflow: ellipsis;
}
.ac-row .suffix {
  font-size:.8em;
  color:#ccc;
  padding:.1em 0 .1em 5px;
}
.ac-row .type {
  font-size:.7em;
  color:#aaa;
  display:block;
  width:100%;
}
.ac-highlighted {font-weight: bold;}
.ac-active {background-color: #eee;}

</style>

<style scoped src="../components/modal/modal.css"></style>

<style scoped>
.hexbin-hexagon {
  stroke: #000;
  stroke-width: 1px;
}

.mapOptionsToggle {
   margin-top: 1.5vw;
  margin-left: 2vw;
  text-align: left;
  cursor: pointer;
  color: #02E379;
  height: 20px;
}

.historyToggle {
  margin-top:2%;
  float: right;
  margin-right: 2vw;
  cursor: pointer;
  color: #02E379;
  height: 20px;
}

.addedPlacesLabel{
  float: left;
  margin:auto;
}

.material-icons.small-icon.historyToggleIcon {
  font-size: 24px !important;
}

#mapOptions {
  width: 100%;
  padding-left: 2vw;
  padding-right: 2vw;
}

.mapOptionsTable {
  width: 100%;
  text-align: left;
}

.mapOptionsFirstColumn {
  width: calc(100% /3);
}

.mapOptionsFirstRow > .mapOptionsFirstColumn {
  border-right: 2px dashed #ffffff;
}

.mapOptionsSecondColumn {
  width: calc(100% /3);
  padding-left: 2vw;
  padding-right: 2vw;
}

.mapOptionsFirstRow > .mapOptionsSecondColumn {
  border-right: 2px solid #ffffff;
}

.mapOptionsThirdColumn {
  width: calc(100% /3);
  padding-left: 2vw;
}

#graspAddressContainer,#graspRadiusContainer,#fileInputHeadlineContainer,#checkboxHeadlineContainer {
  min-height: 50px;
  display: flex;
  height: 7vh;
}

.mapOptionsHeadline {
  order: 1;
  margin: auto;
}

#fileInputHeadlineContainer > .mapOptionsHeadline {
  width: 100%;
  text-align: left;
}

#inputAddress {
  order: 2;
  flex-grow: 1;
  margin: auto;
  margin-left: 1em;
  height: 3.5vh;
  min-height: 40px;
  margin-right: 2vw;
}

#inputRadiusContainer {
  order: 2;
  flex-grow: 1;
  margin: auto;
  display: inline-block;
  border: 1px solid white;
  margin-left: 1em;
  margin-right: 2vw;
  height: 3.5vh;
  min-height: 40px;
  overflow: hidden;
  white-space: nowrap;
}

#inputRadius {
  width: 40%;
  height: 100%;
  margin: 0;
  padding-left: 1em !important;
}


.inputUnit {
  padding-left: 0.5em;
  margin-left: 2%;
  max-width: 59%;
  font-size: 16px;
  white-space:nowrap;
}

.buttonMapOptions {
  width: 40%;
  margin-top: 1vh !important;
  min-width: 100px;
  height: 3.5vh !important;
  min-height: 40px;
  padding: 0 !important;
  font-weight : bold;
}

.submitDownloadButtonsContainer {
  display: flex;
  justify-content: center;
}

#fileSubmitButton, #buttonSearchAddress, #fileDownloadButton {
  display: inline-block;
}

#fileDownloadButton {
  margin-left: 1vw;
  background-color: #02E379;
  color: #333333;
  border: 0;
  display:flex;
  align-items:center;
  justify-content:center;
  font-family: 'Barlow', sans-serif;
  font-weight: bold;
  font-size: 0.9em;
}

#fileInputContainer {
  width: 100%;
  min-height: 50px;
  height: 7vh;
  display: flex;
  align-items: center;
}

input[type="file"] {
    display: none;
}

#fileLabelButtonContainer{
  width: 100%;
}

#fileUploadLabel {
  width: 100%;
  font-size: 14px;
  display: block;
}

#fileUploadButton {
  cursor: pointer;
  color: #0D2451;
  background-color: #ffffff;
  padding: 0.5vh;
  display: inline-block;
}

#fileUploadInput {
  width: 100%;
}

#loaderContainer {
  float: right;
  visibility: hidden;
}

:deep(.v-clip) {
  width: 2vw !important;
  height: 2vw !important;
}

#chooseBuildingtypeContainer {
 width: 100%;
}

#bTMultiselectContainer {
  display: inline-block;
  margin-top: 1vh;
  width: 100%;
}

:deep(.multiselect) {
  width: 100%;
  background-color: white;
  z-index: 10002;
  height: 2vh !important;
  min-height: 40px;
  font-family: 'Tahoma', sans-serif !important;
  font-size: 13px !important;
}

:deep(.multiselect__input) {
  display: none;
}

:deep(.multiselect__placeholder) {
  font-family: 'Tahoma', sans-serif !important;
  font-size: 13px !important;

  display: block;
  overflow: hidden;
  word-wrap: break-word;
  text-overflow: ellipsis;
  white-space: nowrap;

}

:deep(.multiselect__tags) {
  height: 2vw !important;
}

:deep(.multiselect__tags-wrap) {
  display: block;
  float: inherit;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  width: 25vw;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.multiselect__tags-wrap::-webkit-scrollbar {
  display: none;
}

.address {
  width: auto;
  cursor: pointer;
  padding: 1% 2%;
}

.address:nth-child(odd){
  background-color: #f3f3f3;
}


.addressClose {
  top:0;
  margin-right: 2%;
  font-size:80%;
  opacity:0.7;
  color: black !important;
}

.addressContent {
  font-size: 80%;
}

.addressClose:hover, .addressContent:hover {
  text-decoration: underline;
  opacity:1;
}

.radiusContent {
  margin-left:5%;
  font-weight:bold;
}

.hexagon {
  width: 100%;
  text-align: right;
}

.map {
  height: 65vh;
}

#referenceOverlay {
  position: absolute;
  right: 0;
  z-index: 10001;
  margin-top: 20px;
  width: 20vw;
  /* height: 10vw; */

  background-color: #FFFFFF;
  border-bottom: 4px solid #000;
  border-top: 4px solid #000;
  border-left: 4px solid #000;
}

.reference {
  width: 100%;
}

.referenceText {
  color: #000;
  margin-left: 2%;
  margin-right: 2%;
}

.referenceLogo {
  width: 100%;
  padding: 5%;
}

.consumptionTable {
  text-align: center;
}

.consumptionTable th:nth-of-type(even) {
  background-color: #f3f3f3;
}

.consumptionTable td:nth-of-type(even) {
  background-color: #f3f3f3;
}

.matchMakingContainer {
  height: 16px;
  position: relative;
}

.matchMakingBar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
}

.matchMakingValue {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: transparent;
}

#buildingPopupInterestButton {
  margin-top: 5px;
  width: 30%;
  font-size: 1em;
  font-weight: bold;
  border: none;
  padding: 1%;
  cursor: pointer;
  outline-offset: 4px;
  margin: 0 auto;
  display: block;
}

.popupTable {
  border: 1px solid black;
}
</style>
