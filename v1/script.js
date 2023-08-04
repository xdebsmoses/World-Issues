/*console.log("Hello World");

const factsList = document.querySelector(".facts-list");
console.dir(btn);

// create Dom elements: Render facts in list
factsList.innerHTML = "";

loadFacts();

async function loadFacts() {
  //load data from superbase
  const res = await fetch("https://azejsakbrqbkncyvhprk.supabase.co", {
    headers: {
      apikey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6ZWpzYWticnFia25jeXZocHJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA5MDM4MjEsImV4cCI6MjAwNjQ3OTgyMX0.wtoDHSrZ20mPhMGwvPLZBtskGweVHL5X_FwXET6CcnE",
      autherisation:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6ZWpzYWticnFia25jeXZocHJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA5MDM4MjEsImV4cCI6MjAwNjQ3OTgyMX0.wtoDHSrZ20mPhMGwvPLZBtskGweVHL5X_FwXET6CcnE",
    },
  });
  const data = await res.json();
  console.log(res);
}

//factsList.insertAdjacentHTML("afterbegin");

const htmlArr = initialFacts.map(
  (fact) => `<li class="fact">${fact.text}</li>`
);
console.log(htmlArr);

const html = htmlArr.join("");
//factsList.insertAdjacentHTML("afterbegin", html);
*/
const initialFacts = [
    {
      id: 1,
      text: "The shortest war in history",
      source: "https://opensource.fb.com/",
      category: "Europe",
      votessad: 24,
      votesunexpected: 9,
      votedshocked: 4,
      createdIn: 2021,
    },
    {
      id: 2,
      text: "russia invaded ukraine",
      source:
        "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
      category: "Europe",
      votesInteresting: 11,
      votesMindblowing: 2,
      votesFalse: 0,
      createdIn: 2019,
    },
    {
      id: 3,
      text: "cost of living",
      source: "https://en.wikipedia.org/wiki/Lisbon",
      category: "Europe",
      votesInteresting: 8,
      votesMindblowing: 3,
      votesFalse: 1,
      createdIn: 2015,
    },
  ];
  
  const CATEGORIES = [
    { name: "Europe", color: "rgb(59, 247, 59)" },
    { name: "Asia", color: "rgb(255, 182, 45)" },
    { name: "Africa", color: "rgb(249, 230, 31)" },
    { name: "North America", color: "rgb(111, 243, 255)" },
    { name: "South America", color: "rgb(241, 31, 31)" },
    { name: "Antartica", color: "rgb(174, 173, 173)" },
    { name: "Australia", color: "rgb(91, 90, 40)" },
  ];
  
  //selecting dom elemnets
  const btn = document.querySelector(".btn-open");
  const form = document.querySelector(".fact-form");
  const factsList = document.querySelector(".facts-list");
  
  //creating dom elements: render facts in list
  factsList.innerHTML = "";
  
  //Load supabase data
  loadFacts();
  
  async function loadFacts() {
    const res = await fetch(
      "https://azejsakbrqbkncyvhprk.supabase.co/rest/v1/Information", // Properly enclosed the URL with double quotes
      {
        headers: {
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6ZWpzYWticnFia25jeXZocHJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA5MDM4MjEsImV4cCI6MjAwNjQ3OTgyMX0.wtoDHSrZ20mPhMGwvPLZBtskGweVHL5X_FwXET6CcnE", // Replace with your actual API key
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6ZWpzYWticnFia25jeXZocHJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA5MDM4MjEsImV4cCI6MjAwNjQ3OTgyMX0.wtoDHSrZ20mPhMGwvPLZBtskGweVHL5X_FwXET6CcnE", // Replace with your actual bearer token
        },
      }
    );
    const data = await res.json();
    console.log(data);
    createFactsList(data);
  }
  
  function createFactsList(dataArray) {
    const htmlArr = dataArray.map(
      (fact) => `<li class="fact">
    <p>
    ${fact.text}
    <a
         class="source"
         href="${fact.source}"
        target="_blank"
        >(More Information)</a>
       </p>
        <span class="tag" style="background-color: ${
          CATEGORIES.find((cat) => cat.name === fact.category).color
        }"
        >${fact.category}</span>
    </li>`
    );
    console.log(htmlArr);
    const html = htmlArr.join("");
    factsList.insertAdjacentHTML("afterbegin", html);
  }
  
  //toggle form visibility
  btn.addEventListener("click", function () {
    if (form.classList.contains("hidden")) {
      form.classList.remove("hidden");
      btn.textContent = "Close";
    } else {
      form.classList.add("hidden");
      btn.textContent = " Share a fact";
    }
  });