import axios from 'axios';
import './App.css';
import React, { useState, useEffect } from 'react';
import { Container } from "@material-ui/core";
import Header from './components/Header/Header';
import Definitions from './components/Definitions/Definitions';

function App() {
  const [word, setWord] = useState('');
  const [meanings, setMeanings] = useState([]);
  const [category, setCategory] = useState('en');

  const dictionaryApi = async () => {
    try {
      const data = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`);
      // console.log(data);
      setMeanings(data.data);


    } catch (error) {
      console.log(error);
    }
  };

  // console.log(meanings);

  useEffect(() => {
    dictionaryApi();
    // eslint-disable-next-line
  }, [word, category]);


  return (
    <div className="App" style = {{height:'100vh' ,backgroundColor: '#282c34', color: "white"}}>
      <Container maxWidth="md" style = {{display: "flex", height: "100vh", flexDirection: "column"}}>
        <Header
         category={category}
         setCategory={setCategory}
         word={word}
         setWord={setWord}
         />
         {/* coditional rendering - && */}
         {meanings && (<Definitions
          meanings={meanings}
          word={word}
          category={category}
         />)}
      </Container>
    </div>
  );
}

export default App;
