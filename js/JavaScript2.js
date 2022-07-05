//  Javascript Exercise 1..  JSON and Pulldown Window
//
// Follow the comments and code the missing part.
//
"use strict";   // this gives us some more discipline in coding correct Javascript
//
// Function Init defines a string. The content of that string is actually a JSON.
// This example is just for our training.
// the object. So what we do here is to define a string ' .JSON.... ' and then parse it.
function Init ()
{
  console.log("Init läuft");
// Define the JSON String
//
var jsonstring = ' { "Menschen" : [' +
  ' { "Vorname" : "Peter", "Nachname" :"Müller", "Gender": "male", "Rolle" : "Student"  },' +
  ' { "Vorname" : "Susanne", "Nachname" :"Lehmann", "Gender": "female", "Rolle" : "Student"  },' +
  ' { "Vorname" : "Jürgen", "Nachname" :"Schneider", "Gender": "male", "Rolle" : "Dozent"  }'+
  //  add another Person ..  see this statement concatenates substrings using the +  operator
  //  ... add another person like  ' .... ' +
  ' ] }';
//
//  Parse the jsonstring  to build an Object and put it as property to the global window Object.
//  This object has one attribute named Menschen which as value has an array of objects declaring
//  the people.
//  Would you agree ??
//  Putting it at the windwow object is not a good coding practice (but good enough for now).. we
//  need a global scope because differnt functions are using it..
//  It is your choice..
//
// we can simply add own properties the existing global objects like the window object or document object
// (again a bit dirty but fine for us now)
//
// we are using the JSON object method parse method to convert the string to a object structure
//
window.Menschen = JSON.parse(jsonstring);
//
// Define all click events
//
// Here are some examples.
//
//
document.getElementById('Dienste').addEventListener("click", showDienste);
// Above just gives the name of the function to the event listener, the function dothisnow must be specifed
// somewhere else
//
document.getElementById('popupli1').addEventListener("click",function() {showMenschen();});
// Above defines a inline function (anonymous function) as part of the addEventListener second parameter
// the code to be executed is within {} as part part of the second parameter and it
//
//
// The dothisnow function (as a basic example) makes sure that the Pullup element, which is initially invisible
// are made visible and is aligned right after the fixed header
// A routine like this can be called when e.g. the 'Dienste' button has been clicked
//

getFeed(RSS_URL_1, "#feed1Id"); //Load RSS-Feed from Heise
 }
function showDienste()
 {
  console.log("Pull up"); // just log that the event has triggered the right routine.
  //
  // access the pullup Window
  //
  var pull = document.getElementById('PullupOptions'); // variable pull refers to the HTML element with the id="abc"
  //
  // now you can simply modifiy the style attributes using this pull.style.123 notation
  // below are just examples
  // Let's assume this routine is the routine which is executed when the 'Dienste' link
  // has bee pressed and you want to make you Dienste popup visible.
  // The first question to answer is where to position this popup ?
  // Let's say we position it right below the navigation bar on the left side.
  // meaning we 'overlay' the beginning of the scrollable part
  // The code below (as an example) would do exactly that.
  //
  //
  //
  pull.style.top = document.getElementById('scrollpart').offsetTop + "px";
  pull.style.display = "block";
   }
  //
  // This function is a code skeleton of getting the above defined JSON and
  // to build an HTML string implementing a table with the JSON data
  //
function showMenschen()  {
  //
  //  Show Menschen Object as dynamic table
  //
  console.log("showMenschen ");
  //
  // We could use JavaScript and the HTML object methods and properties to build a table or we just
  // construct a string with the HTML data
  //
  var tableheader = "<table> <tr>"; // this is the table header .. just take it
  tableheader += "<th>Vorname</th><th>Nachname</th><th>Gender</th><th>Rolle</th></tr>";
  //
  // now we build each row
  //
  var tabletext = "";
  var alle = window.Menschen;
  // var alle is now the reference to the Object
  // alle.Menschen is the array of people
  for (var i = 0; i < alle.Menschen.length; i++) {
    var person = alle.Menschen[i];
    tabletext += "<tr><td>" + person.Vorname + "</td>";
    tabletext += "<td>" + person.Nachname + "</td>";
    tabletext += "<td>" + person.Gender + "</td>";
    tabletext += "<td>" + person.Rolle + "</td></tr>";
  }

  var tableclosing = "</table>"; // the table end just take it
  var fulltext = tableheader + tabletext + tableclosing;
  //
  // save the full text as innerHTML of the popup element named showwindowData
  document.getElementById('showwindowData').innerHTML = fulltext;
  // show the curently invisible showwindow item
  document.getElementById('showwindow').style.display = "block";
  // somewhere in the middle of the page
  document.getElementById('showwindow').style.top = "50%";
 }
 //
 //  Wiki Anfrage
 //
 function runWikiQuery(){
  var query = "/proxy/?url=https://de.wikipedia.org/w/api.php"
  query = query + "?action=query&generator=prefixsearch&format=json&gpslimit=4"
                + "&prop=extracts%7Cdescription"
                + "&exintro=1&explaintext=1&exsentences=3&gpssearch="
                + document.getElementById('wikisearchstring').value; //Build Search-URL
  var xhttp = new XMLHttpRequest();
  console.log("Wiki Search String ",query);
  xhttp.onreadystatechange = function() { //Callback
    console.log("callback reached ",this.readyState);
    if (this.readyState == 4 && this.status == 200) {
      try {
        var response = JSON.parse(this.responseText);
      } catch (e) {
        document.getElementById('showwindowData').innerHTML = e;
        document.getElementById('showwindow').style.display = "block";
        return;
      }
      if (response.error != null && response.error.message != undefined) //Error-Case
      {
          document.getElementById('showwindowData').innerHTML = "Fehler aufgetreten" + response.error.message;
          document.getElementById('showwindow').style.display = "block";
      }
      else {
        console.log("Data ", response.response.query.pages);
        var text = "<table id='wikiresulttable' style='background-color:beige;'><tr><th>Search Argument</th><th>Description</th><th>Extract</th><th>Link</th><tr>";
        var pages = response.response.query.pages;  // for potential input
        for (var page in pages) {
          if (pages.hasOwnProperty(page)) { //Build Result-Table
             (pages[page].description ==  undefined) ? " - " : pages[page].description;
            text += "<td>" + pages[page].title + "</td>";
            text += (pages[page].description ==  undefined) ? "<td> - </td>": "<td>" + pages[page].description + "</td>";
            text += (pages[page].extract == undefined) ? "<td> - </td>":"<td>" + pages[page].extract + "</td>";
            text += "<td><a href=" + "'https://de.wikipedia.org/?curid=" + pages[page].pageid + "' target='_blank'>" +
                    "https://de.wikipedia.org/?curid=" + pages[page].pageid+ "</a></td></tr>"
          }
        }
        text += "</table>";
        document.getElementById('showwindowData').innerHTML = text; //Show Table
        document.getElementById('showwindow').style.display = "block";
      }
    }
  };
  xhttp.open("GET",query, true);
  xhttp.send();
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Stock Request

	function requestData(url)
  {
		const req = new XMLHttpRequest();
		req.open( 'GET', url, true ); //Neuen Request initialisieren
		req.onerror = function( xhr ) { console.log( 'Fehlercode:', xhr  ); }; //Error bei Fehler in Konsole ausgeben
		req.onprogress = function( xhr ) {
      stockMsg.innerText = "Daten laden...";
      console.log( 'Geladene Bytes: ', xhr.loaded  ); }; //Während Laden Anzahl geladene Bytes in Konsole ausgeben
		req.onload = callback; //Wenn request successful wird callback ausgeführt
		req.send( null ); //Da GET benutzt wird parameter ignoriert

		  function callback(req)
      {
			    let response, json_ret, lines;

	        response = req.target.response; //
          stockMsg.innerText = ""; //"Daten laden..." aus Msg entfernen

          json_ret = JSON.parse( response );

          console.log( 'JSON Data: ', json_ret ); //Empfangene Daten loggen

          printJSON(json_ret);
		}
	}

  function printJSON(json)
  {
        if(json.Note === undefined) //Wenn JSON-File Valide kein Note-Element enthalten
        {
          const symbol = json['Meta Data']['2. Symbol']; //Index der Aktie
          const currentDate = json['Meta Data']['3. Last Refreshed'] //Aktuelles Datum
          const data = json['Time Series (Daily)']; //Auf Tageswerte zugreifen
          var max = null; //Init Max-Wert
          var min = null; //Init Min-Wert
          var currentValue = 0; //Init Aktueller Wert

          var values = []; //Array für alle empfangenen Werte
          var days = []; //Array für alle Tagesnamen (Daten)

          for(var i in data) //Über jeden Tag iterieren
          {
            var day = data[i];
            let value = day['4. close']; //Schlusskurs als Wert nehmen

            values.unshift(value); //Am Anfang einfügen

            if(max == null || min == null) //Zu Beginn min und max auf ersten Wert setzen
            {
              max = value;
              min = value;
              currentValue = value;
            }

            if(parseFloat(value)>max) //Wenn aktueller Wert höher als bisheriger Max Wert wird aktueller Wert neuer Max Wert
            {
              max = value;
            }

            if(parseFloat(value)<min) //Wenn aktueller Wert geringer als bisheriger Min Wert wird aktueller Wert neuer Min Wert
            {
              min = value;
            }
          }

          for(var i = 0; i<values.length; i++) //Alle Tagesnamen in Array
          {
            var dayName = Object.keys(data)[i];
            days.unshift(dayName); //Am Anfang einfügen
          }

          const formatter = new Intl.NumberFormat('en-US', { //Formatter für 2 Nachkommastellen
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
          });
          currentValue = formatter.format(currentValue); //In Fixed Point konvertieren mit 2 Nachkommastellen
          max = formatter.format(max);
          min = formatter.format(min);


          //Inner-HTML der Aktieninformationen aktualisieren
          const stockInfo = document.getElementById("stockInfo");
          let html = `
            <div class="stockData">Firma (Tag): ${symbol}</div>
            <div class="stockData">Aktuellstes Datum: ${currentDate}</div>
            <div class="stockData">Aktuellster Wert: ${currentValue}$</div>
            <div class="stockData">Maximum im Zeitraum: ${max}$</div>
            <div class="stockData">Minimum im Zeitraum: ${min}$</div>`;
            stockInfo.innerHTML = html;

          printData(days, values, symbol); //Chart erstellen und ausgeben
        }
        else{ //Fehler ==> Maximale Anzahl an Anfragen erreicht
          document.getElementById("stockMsg").innerHTML = "Maximale Anzahl an Anfragen pro Minute erreicht!";
      //    alert("Maximale Anzahl an Anfragen pro Minute erreicht!") //Optional
        }

  }
  function printData(xValues, yValues, symbol) //Genaue Dokumentation siehe ChartJS-Website
  {
    const ctx = document.getElementById('StockChart'); //Canvas wählen
    const context = ctx.getContext('2d');
    context.clearRect(0, 0, 400, 400); //Canvas Resetten
    const myChart = new Chart(ctx, {
    type: 'line', //Art des DIagramms
    data: {
        labels: xValues, //Labels hier Tagesnamen
        datasets: [{
            label: symbol, //TAG der Aktie
            data: yValues, //Aktienkurse
            pointRadius: 1, //Punktgröße
            backgroundColor: [
                'rgba(150, 240, 1, 0.4)', //Farbe CHart
            ],
            borderColor: [
                //'rgba(255, 199, 132, 1)',
            ],
            borderWidth: 1,
            cubicInterpolationMode: 'monotone' //Keine Quadratische Interpolation sondern monotone, sonst Kurs verfälscht
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false //Für präzisere Darstellung
                }
            }]
        }
    }
});


}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Weather Request
const formText = document.querySelector("form");
const input = document.querySelector("input");
  const myKey = 'c51e0330f2586d7d1f6777694a3dc8dc'; //Key für Wetter-API
  var weather = []; //Speichert Wetterdaten der einzelnen Tage
  const loc = { //Definition des Orts
    city:'',
    country:'',
    coord:{lat:0, lon:0}
  };

  function showWeather() //Wetter zu Eingabe anzeigen
  {
    const inputCity = document.getElementById('inputCity').value; //Eingabe abfragen
    fetchPosition(buildLinkCity(myKey, inputCity));
  }

  function buildLinkCity(key, city) //Anfragelink für Wetterdaten zu Stadtnamen bauen
  {
    let api = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${key}`;
    return api;
  }

  function buildLinkPos(lat, lon, key) //Anfragelink für Wetterdaten zu Koordinaten bauen
  {
    let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&lang=de&appid=${key}`
    return api;
  }

  function fetchPosition(api) //Get Position by Name of City //With City only Weather-Data in 3h-Steps available but with Position Daily-Data available
  {
    fetch(api)
    .then(response => {
      var data = response.json();
      return data;
  })
    .then(function(data){
      loc.city = data.city.name;
      loc.country = data.city.country;
      loc.coord = data.city.coord; //Get lat and lon of city requested
      console.log("Location: ", loc);
      console.log(loc.coord.lat, loc.coord.lon);
      console.log("Link: ", buildLinkPos(loc.coord.lat, loc.coord.lon, myKey));
      fetchWeather(buildLinkPos(loc.coord.lat, loc.coord.lon, myKey)); //Wetter zu Koordinaten anfragen
    })
    //Fehler bei falschem Ortsnamen
    .catch(err => {document.getElementById("weatherMsg").innerHTML = "Ungültige Eingabe!";})//alert("Falscher Ortsname!")) //Optional
  }

  function fetchWeather(api) //Wetterdaten zur Position
  {
    document.getElementById("weatherMsg").innerHTML = ""; //Reset Error Message
    fetch(api)
    .then(response => {
      var data = response.json();
      return data;
    })
    .then(function(data){

      console.log(data);
      const dayList = document.querySelector("#daysId");

      dayList.textContent = ''; //Liste resetten

        for(var i = 1; i<6; i++) //5 Tage durchiterierieren
        {
          let day = {}; //Daten zum jeweiligen Tag


           var date = new Date(0); // Set date to epoch start
           date.setUTCSeconds(data.daily[i].dt); //convert utcSenconds to Date

          day.temperature = {};
          day.temperature.day = Math.round(data.daily[i].temp.day); //in GradC
          day.temperature.night = Math.round(data.daily[i].temp.night); //in GradC
          day.windspeed = Math.round(data.daily[i].wind_speed); //in m/s
          day.humidity = data.daily[i].humidity; //in %
          day.symbol = data.daily[i].weather[0].icon; //ID
          day.description = data.daily[i].weather[0].description; //Beschreibung speichern (deutsch)*/


          const symbolSource = `http://openweathermap.org/img/wn/${day.symbol}@2x.png`; //Link zu Bild bauen
          addDay(dayList, loc.city, loc.country, day.temperature.day, day.temperature.night, day.windspeed, day.humidity, symbolSource, day.description, date.toLocaleDateString("de-DE")); //Tag zur Anzeige hinzufügen
        }

        console.log("Wetter: ", weather);
        return weather;
      })
  }

  function addDay(list, city, country, tempDay, tempNight, windSpeed, humidity, symbolSource, description, date)
  {
    const newDay = document.createElement("li"); //Listenelement erstellen
        newDay.classList.add("day"); //Klasse setzen
        const html = `
          <h2 class="location" data-name="${city},${country}">
            <span>${city}</span>
            <sup>${country}</sup>
          </h2>
          <h3 class="date" >${date}</h3>
          <figure>
            <img class="symbolWeather" src=${symbolSource}>
            <div class="weatherData important">${description}</div>
          </figure>
          <div class="weatherData">Temperatur ☀️: ${tempDay}°C</div>
          <div class="weatherData">Temperatur 🌙: ${tempNight}°C</div>
          <div class="weatherData">Luftfeuchtigkeit 🌫: ${humidity}%</div>
          <div class="weatherData">Windgeschwindigkeit 💨: ${windSpeed}<sup>m</sup>/s</div>

        `;

        newDay.innerHTML = html; //Inhalt setzen
        list.appendChild(newDay); //Tag zur Liste hinzufügen
  }

  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //RSS Request


  //const RSS_URL = `https://www.nasa.gov/rss/dyn/johnson_news.rss`;
  const RSS_URL_1 = `www.heise.de/rss/heise-atom.xml`; //RSS Feed Heise
  const RSS_URL_2 = `https://www.vox.com/rss/world/index.xml`; //RSS Feed Vox-News

  function getFeed(url, rssTag)
  {

    const PROXY_URL = `https://cors-anywhere.herokuapp.com/`; //Umleitung über Proxy
    url = PROXY_URL + url; //Gesamt-URL bauen
  	fetch(url)
  	  .then(response => {
  			var string = response.text();
  			console.log("String: ", string)
  			return string;
  		})
  	  .then(string => {
  			var data = new window.DOMParser().parseFromString(string, "text/xml"); //In XML wandeln
  			console.log("Data: ", data);
  			return data;
  		})
  	  .then(data => {
  			const itemList = document.querySelector(rssTag);
  			itemList.textContent = ''; //Reset List


  	    const items = data.querySelectorAll("entry"); //Alle Einträge speichern
  				for(var i = 0; i<10; i++){ //Just show the first 10 feed-items
  				var rssHtml = items[i].getElementsByTagName('content')[0].innerHTML;

      /*    rssHtml = rssHtml.replaceAll("&lt;", "<");
          rssHtml = rssHtml.replaceAll("&gt;", ">"); */ //Nötig für Vox-RSS-Feed

  				rssHtml = rssHtml.replace("]]>", ""); // ]]> at the end of heise feed, which is unneccesary
  				const newItem = document.createElement("li"); //Listenelement erstellen
  		    newItem.classList.add("rssItem"); //Klasse setzen
  				newItem.innerHTML = rssHtml; //Inhalt setzen

  				itemList.appendChild(newItem); //Element zur Liste hinzufügen
  			};
  	  });
  }
