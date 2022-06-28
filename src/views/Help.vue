<template>
  <layout>
  <div id="helpPageBody">
    <h2>Bedienung der Kartenapplikation</h2>
    <p>Hier finden Sie Informationen zur Nutzung der Web-Anwendung</p>
    <div id="interactionProcess">
      <div class="subInformationHeaderContainer" @click="openColorProcessInformation">
        <h4>Der Nutzungsprozess der Anwendung</h4>
        <span v-if="processInformationHidden" class="material-icons small-icon subInformationToggleIcon">expand_more</span>
        <span v-else class="material-icons small-icon subInformationToggleIcon">expand_less</span>
      </div>
      <table  v-if="!processInformationHidden" class="tableSubInformation">
        <tr>
          <th>
            1.
          </th>
          <td class="processStep">
            <div>
              Eingabe des Nutzers
            </div>
            <div class="processDescription">
              Geben Sie eine Adresse in das Suchfeld ein <br>
              oder laden Sie eine CSV-Datei Ihres Gebäudebestands in der richtigen Formatierung (gemäß dieser
              <a class="underlinedText" href="./template_example.csv">Vorlage</a>) hoch.
              <br>
              (Bei der Einzeladress-Eingabe kann zusätzlich ein Radius angegeben werden,
               um Gebäude in der Umgebung in die Potentialberechnung einzubeziehen)
            </div>
          </td>
        </tr>
        <tr>
          <th>
            2.
          </th>
          <td class="processStep">
            <div>
              Darstellung möglicher Potentiale
            </div>
            <div class="processDescription">
              Ein Marker für die gesuchten Adressen erscheint auf der Karte.
            </div>
          </td>
        </tr>
        <tr>
          <th>
            3.
          </th>
          <td class="processStep">
            <div>
              Erfassung der betreffenden Abwasserwärmepotenziale
            </div>
            <div class="processDescription">
              Durch Klicken auf die angezeigten Marker öffnet sich ein Informationsfeld, dass das <a class="underlinedText">aktuelle Abwasserwärmepotenzial</a> für die gewählte Adresse anzeigt.
              Diese maximale Wärmepotential an einem Standort wird auf Grundlage der Infrastruktur berechnet, in die Ihr Gebäude oder Bezirk angeschlossen werden kann.
              Darüber hinaus werden die ermittelten Heizlasten für das gewählte Gebäude in verschiedenen Sanierungszuständen und die ermittelte Deckung durch das bestehende Abwasserwärmepotenzial dargestellt.
              <br>
              (Wurde ein Suchradius angegeben, so wird die kummulierte Heizlast der Gebäude innerhalb dieses Radius und die Deckung durch das bestehende Abwasserwärmepotenzial dargestellt)
            </div>
          </td>
        </tr>
        <tr>
          <th>
            4.
          </th>
          <td class="processStep">
            <div>
              Kontaktaufnahme
            </div>
            <div class="processDescription">
              Sie können nun Ihr Interesse für die gewünschte Adresse bekunden und mit den Berliner Wasserbetrieben (BWB) in Kontakt treten.
              Sollten für Ihre Adresse bisher keine Daten vorliegen, können Sie trotzdem Ihr Interesse bekunden.
            </div>
          </td>
        </tr>
        <tr>
          <th>
            5.
          </th>
          <td class="processStep">
            <div>
              Anknüpfender Prozess in direktem Austausch
            </div>
            <div class="processDescription">
              Die Berliner Wasserbetriebe (BWB) werden sich mit Ihnen in Verbindung setzen, um ein mögliches Projekt zu prüfen und zu bewerten.
              Die Kartenapplikation wird regelmäßig aktualisiert.
              Wenn Ihr Gebäude noch nicht im abgebildeten Bereich liegt, können Sie später überprüfen, ob es aufgenommen wurde.
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div id="polygonColors">
      <div class="subInformationHeaderContainer" @click="openColorGuide">
        <h4 >Polygon-Farben und ihre Bedeutung</h4>
        <span v-if="colorGuideHidden" class="material-icons small-icon subInformationToggleIcon">expand_more</span>
        <span v-else class="material-icons small-icon subInformationToggleIcon">expand_less</span>
      </div>
      <table  v-if="!colorGuideHidden" class="tableSubInformation">
        <tr>
          <th>
            <div class="colorSpots" id="colorSpotPotential"></div>
          </th>
          <td class="colorCategory">
            Gesamtes Potenzialgebiet:
          </td>
          <td class="colorCategoryDescription">
            Gebiet, für welches Potenzialdaten der Berliner Wasserbetriebe vorhanden sind.
          </td>
        </tr>
        <tr>
          <th>
            <div class="colorSpots" id="colorSpotSelectedPotential"></div>
          </th>
          <td class="colorCategory">
            Ausgewähltes Potenzialgebiet:
          </td>
          <td class="colorCategoryDescription">
            Einzelnes Gebiet, für welches Potenzialdaten der Berliner Wasserbetriebe vorhanden sind.
          </td>
        </tr>
        <tr>
          <th>
            <div class="colorSpots" id="colorSpotBuildingAddress"></div>
          </th>
          <td class="colorCategory">
            Gebäude der eingegebenen Adresse:
          </td>
          <td class="colorCategoryDescription">
            Gebäude, welches der eingegebenen Adresse entspricht.
          </td>
        </tr>
        <tr>
          <th>
            <div class="colorSpots" id="colorSpotBuildingRadius"></div>
          </th>
          <td class="colorCategory">
            Gebäude im eingestellten Radius:
          </td>
          <td class="colorCategoryDescription">
            Gebäude, die sich innerhalb des eingestellten Radius um die eingegebene Adresse befinden.
          </td>
        </tr>
        <tr>
          <th>
            <div class="colorSpots" id="colorSpotBuildingtype"></div>
          </th>
          <td class="colorCategory">
            Ausgewählter Gebäudetyp:
          </td>
          <td class="colorCategoryDescription">
            Gebäude, die dem ausgewählten Gebäudetypen zugehörig sind.
          </td>
        </tr>
        <tr>
          <th>
            <div class="colorSpots" id="colorSpotInterest"></div>
          </th>
          <td class="colorCategory">
            Gebäude, bei denen Interesse für Abwasserwärmenutzung besteht:
          </td>
          <td class="colorCategoryDescription">
            Gebäude, für welche Interesse bzgl. der Nutzung von Abwasserwärme bekundet wurde.
          </td>
        </tr>
      </table>
    </div>
    <div id="contactOptions">
      <p>
      Sie sind Stadtplaner, Immobilienentwickler, Architekt, Manager eines Industriekomplexes außerhalb von Berlin?
      </p>
      <p>
      Senden Sie uns eine E-Mail an <a class="underlinedText" :href="`mailto:${contactAddress}`">{{ contactAddress }}</a> und wir werden uns mit Ihnen in Verbindung setzen.
      <br>
      Für weitere Infos besuchen Sie die
      <a class="underlinedText" href="https://www.bwb.de/de/heizen-und-kuehlen-mit-abwasser.php">offizielle Seite von den Berliner Wasserbetrieben (BWB)</a>
      oder nutzen Sie direkt das
      <a class="underlinedText" href="https://www.bwb.de/de/kontakt.php?xm=1B040A1C0504131107404356231601091B2E5047531F4140&nr=false&topic=Heizen+und+K%c3%bchlen+mit+Abwasser">Formular</a> zum Thema "Heizen und Kühlen mit Abwasser".
      </p>
    </div>
  </div>
  </layout>
</template>

<script>
import Layout from '../layouts/layout'

export default {
  components: {
    Layout,
  },
  data() {
    return{
      colorGuideHidden: true,
      processInformationHidden: true,
      contactAddress: 'reflow@prototypes.berlin'
    }
  },

  methods: {
    openColorGuide() {
      this.colorGuideHidden = !this.colorGuideHidden;
    },
    openColorProcessInformation() {
      this.processInformationHidden = !this.processInformationHidden;
    }
  },
  computed: {

  }
};

</script>

<style scoped>

#helpPageBody {
  width: 94vw;
  margin-left: 2vw;
  margin-right: 2vw;
  margin-top: 2%;
  text-align: left;
}

.subInformationHeaderContainer {
  display: flex;
  align-items: flex-start;
}

.subInformationHeaderContainer:hover {
  cursor: pointer;
}

.material-icons.small-icon.subInformationToggleIcon {
  font-size: 24px !important;
  align-self: center;
}

.tableSubInformation {
  min-width: 400px;
  padding-left: 1vw;
}

.tableSubInformation tr {
  padding-top: 80px;
}

.tableSubInformation td {
  text-align: left;
  font-size: 16px;
  vertical-align: top;
  padding-top: 10px;
}

.tableSubInformation th {
  vertical-align: top;
  padding-top: 10px;
}

.processDescription {
  font-size: 12px;
}

.underlinedText {
  text-decoration: underline white !important;
}

.colorSpots {
  border-radius: 25px;
  width: 20px;
  height: 20px;
  border: solid white 1px;
}

.colorCategory {
  width: 25%;
}

.colorCategoryDescription {
  padding-left: 10px;
}

#contactOptions {
  margin-top: 3vh;
}


/* colors should be imported from Map.vue*/
#colorSpotPotential {
  background-color: #2dc26b;
}

#colorSpotSelectedPotential {
  background-color: #6ec4c0;
}

#colorSpotBuildingAddress {
  background-color: #2d37c2;
}

#colorSpotBuildingRadius {
  background-color: #6e74c4;
}

#colorSpotBuildingtype {
  background-color: #4f3f75;
}

#colorSpotInterest {
  background-color: #080f45;
}

</style>
