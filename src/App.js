import React, { useState} from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import LoadingBar from "react-top-loading-bar";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


const App=()=> {
  const apiKey=process.env.REACT_APP_NEWS_API_KEY; //to hide api key from github apiKey='a55a1c4f368c4e9f925900fa36ed9373';

  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Router>
        <Navbar/>
        <LoadingBar
          color="#f11946"
          progress={progress}
          //onLoaderFinished={() => setProgress(0)}
        />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={9} country="us" category="general" />} />  
          <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={9} country="us" category="general" />} />
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={9} country="us" category="business" />} />
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={9} country="us" category="science" />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={9} country="us" category="entertainment" />} />
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={9} country="us" category="health" />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={9} country="us" category="technology" />} />
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={9} country="us" category="sports" />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App