import { useEffect, useState } from 'react';
import supabase from './supabase'
import './style.css';

const initialFacts = [
  {
    id: 1,
    text: "The shortest war in history",
    source: "https://opensource.fb.com/",
    category: "Europe",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "russia invaded ukraine",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "Asia",
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


function App() { 
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState(null); // Initialize facts as null
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setcurrentCategory] = useState("all");

  useEffect(function() {
    async function getFacts(){
      setIsLoading(true);
      
      let query = supabase.from("Information").select('*');

      if (currentCategory !== "all")
      query = query.eq("category", currentCategory);

      const { data: Information, error } = await query
        .order('text', {ascending: false})
        .limit(1000);

      if (!error) {
        setFacts(Information);
      } else {
        alert('There was a problem getting data');
      }
      
      setIsLoading(false);
    }
    
    getFacts();
  }, [currentCategory])

  //jsx has one parent expression -cant return 2 things
  return (
  <>
    <Header showForm={showForm} setShowForm={setShowForm}/>

    {showForm ? <NewFactForm setFacts={setFacts} setShowForm={setShowForm}/> : null}

    <main className="main">
    <CategoryFilter setcurrentCategory=
    {setcurrentCategory}/>

      {isLoading ? <Loader /> :
      <FactList facts={facts} setFacts={setFacts}/>
  }
    </main>
  </>
);

  }

function Loader() {
  return <p className='message'>Loading ...</p>
}

function Header({showForm, setShowForm}) {
  const appTitle = "Current Issues in The World";

  return     <header className="header"> {/* Corrected attribute name */}
  <div className="logo"> {/* Corrected attribute name */}
    <img src="logo.png" height="88px" width="88px" alt="Globe Logo"/>
    <h1>{appTitle}</h1>
  </div>
  <button className="btn btn-large btn-open" onClick={() =>setShowForm((show)=> !show)}>{showForm ? 'Close' : "Share a fact"}</button>
</header>
}

const CATEGORIES = [
  { name: "Europe", color: "rgb(59, 247, 59)" },
  { name: "Asia", color: "rgb(255, 182, 45)" },
  { name: "Africa", color: "rgb(249, 230, 31)" },
  { name: "North America", color: "rgb(111, 243, 255)" },
  { name: "South America", color: "rgb(241, 31, 31)" },
  { name: "Antartica", color: "rgb(174, 173, 173)" },
  { name: "Australia", color: "rgb(91, 90, 40)" },
];

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

function NewFactForm({setFacts, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("http://example.com");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(text, source, category);
  
    // Check if data is valid
    if (text && isValidHttpUrl(source) && category && text.length <= 200) {
      console.log("there is data");
  
      // Create new fact object
      //const newFact = {
      //  id: Math.round(Math.random() * 100000),
      //  text,
      //  source,
      //  category, // Instead of "category: category, name"
      //  votessad: 24,
      //  votesshoking: 9,
      //  votesunexpected: 4,
      //  createdIn: new Date().getFullYear(),
      //};
      setIsUploading(true);
      const { data: newFact, error } = await supabase.from("Information").insert([{ text, source, category }]).select();

      setIsUploading(false);

      
      if (!error) {
        // Add new fact to user interface
        setFacts((prevFacts) => [newFact[0], ...prevFacts]);
        // Reset input fields
        setText("");
        setSource("");
        setCategory("");
      } else {
        alert('Failed to add the fact. Please try again.');
      }
      
      setIsUploading(false);
    }
  }
  
  
  

  return <form className = "fact-form" onSubmit={handleSubmit}>     
  <input type="text"  placeholder= "Share Awareness About A Country..."
  value={text} onChange={(e) => setText(e.target.value)} disabled= {isUploading}/>
  <span>{200 - textLength}</span>
  <input value ={source} type="text" placeholder="Trust Worthy Source:" onChange={(e)=>setSource(e.target.value)}/>
  <select value = {category} onChange = {(e) => setCategory(e.target.value)} disabled= {isUploading}>
    <option value="">Choose Continent</option>
  {CATEGORIES.map((cat) => <option key={cat.name} value ={cat.name}>{cat.name.toUpperCase()}</option>)}
  </select>
  <button className="btn btn-large" disabled= {isUploading}>Submit</button>
  </form>
}


function CategoryFilter({ setcurrentCategory }) {
  return (
    <aside>
      <ul>
        <li className="category">
          <button className="btn btn-all-categories" onClick={() => setcurrentCategory("all")}>All</button>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat.name} className="category">
            <button
              className="btn btn-category"
              style={{ backgroundColor: cat.color }}
              onClick={() => setcurrentCategory(cat.name)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}


function FactList({ facts, setFacts }) {
  if (!facts) {
    return <p className="message">Loading...</p>;
  }

  if (facts.length === 0) {
    return (
      <p className="message">No Facts for this category yet... create the first! 😊</p>
    );
  }

  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact}setFacts = {setFacts} />
        ))}
      </ul>
    </section>
  );
}


function Fact({ fact, setFacts }) {
  const [isUpdating, setisUpdating] = useState(false);
  async function handleVote(columnName) {
    setisUpdating(true);
    //const updatedVoteCount = fact[voteType] + 1;
    const { data: updatedFact, error } = await supabase
      .from('Information')
      .update({ [columnName]: fact [columnName] + 1 })
      .eq('id', fact.id)
      .select();
      setisUpdating(false);
  
    if (!error) setFacts((facts) => facts.map((f) => (f.id === fact.id ? updatedFact[0] : f)));
  }
  
  

  const category = CATEGORIES.find((cat) => cat.name === fact.category);
  const backgroundColor = category ? category.color : 'transparent';

  return (
    <li className="fact">
      <p>
        {fact.text}
        <a
          className="source"
          href={fact.source}
          target="_blank"
          >(More Information)</a
        >
      </p>
      <span className="tag" style={{ backgroundColor }}>
        {category ? category.name : 'Uncategorized'}
      </span>
      <div className="vote-bottons">
        <button onClick={() => handleVote("votessad")} disabled={isUpdating}>😓 {fact.votessad}</button>
        <button onClick={() => handleVote("votesunexpected")} disabled={isUpdating}>😳 {fact.votesunexpected}</button>
        <button onClick={() => handleVote("votedshocked")} disabled={isUpdating}>🤯 {fact.votedshocked}</button>
      </div>
    </li>
  );
}


export default App;