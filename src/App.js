import axios from 'axios';
import './App.css';
import React, { useState, useEffect } from 'react';
import { Container } from "@material-ui/core";
import Header from './components/Header/Header';
import Definitions from './components/Definitions/Definitions';
import withStyles from "@material-ui/core/styles/withStyles";
import { grey } from '@material-ui/core/colors';
import Switch from '@material-ui/core/Switch';

function App() {
  const [word, setWord] = useState('');
  const [meanings, setMeanings] = useState([]);
  const [category, setCategory] = useState('en');
  const [LightMode, setLightMode] = useState();

  const DarkMode = withStyles({
    switchBase: {
      color: grey[300],
      '&$checked': {
        color: grey[500],
      },
      '&$checked + $track': {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);
  

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
    <div className="App" style = {{
      height:'100vh' ,
      backgroundColor: LightMode ? '#fff': '#282c34',
      color: LightMode ? 'black' : 'white',
      transition: 'all 0.5s linear'
      }}>
      <Container maxWidth="md" style = {{display: "flex", height: "100vh", flexDirection: "column",justifyContent:"space-evenly"}}>
        <div style={{ position:'absolute', top:0, right:15, paddingTop:10 }}>
          <span>{LightMode ? "Dark" : "Light"} Mode?</span>
          <DarkMode 
          checked={LightMode}
          onChange={() => setLightMode(!LightMode)}
          />
        </div>
        <Header
         category={category}
         setCategory={setCategory}
         word={word}
         setWord={setWord}
         LightMode={LightMode}
         />
         {/* coditional rendering - && */}
         {meanings && (<Definitions
          meanings={meanings}
          word={word}
          category={category}
          LightMode={LightMode}
         />)}
      </Container>
    </div>
  );
}

export default App;
