import {MemoryRouter as Router, Routes, Route, Link} from 'react-router-dom';

import './App.css';
import './App.global.css';
import {LoadFile} from "./components/LoadFile/LoadFile";
import React, {useState} from "react";
import { Navbar } from './components/Navbar/Navbar';
import { JsonEditor } from './components/JSONEditor/JsonEditor';

const StartPage = () => {
  return (
    <div className="container h-100 mt-5">
      <h1 className=" display-1 text-white">Lab #5</h1>
      <p className="display-6 text-white">Greetings! This app will help you edit JSON files✅</p>
      <p className="text-white">To start, just click the button below:</p>
      <button type="button" className="btn btn-primary">
        <Link to="/loadFile" className="text-white text-decoration-none">Load JSON</Link>
      </button>
      <h3 className={"text-white mt-4"}>Example of valid JSON input</h3>
        <pre className={"text-white"}>
          {`
         [
            {
              "name": "Linear Algrebra",
              "department": "Mathematics",
              "branch": "Mathematical Analysis",
              "chair": "Professor, Doctor of Technical Sciences, Professor of the Department of Computer Science and Engineering",
              "day": "Wednesday",
              "time": "18:00",
              "headman": "Alexander the great",
              "course": "Linear algebra basics",
              "subject": "Computer Science",
              "leader": "Kozlovsky Alexander"
            }
         ]
          `}
        </pre>
      <div className={"d-flex justify-content-end"}>
        <p className={"text-white"}>Made with 💙 By Yurii Pidlisnyi, student of K-26</p>
      </div>
    </div>
  );
};

export default function App() {
  const [json, setJson] = useState({})
  const [isJsonLoaded, setIsJsonLoaded] = useState(false)
  // Get parsed JSON from the main process
  window.electron.ipcRenderer.on('json-ready', (args) => {
    // @ts-ignore
    console.log("received json");
    // @ts-ignore
    setJson(args);
    setIsJsonLoaded(true);
  });

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<StartPage/>}/>
        {/*// @ts-ignore*/}
        <Route path="/loadFile" element={<LoadFile isJsonLoaded={isJsonLoaded} json={json}/>}/>

        <Route path="/jsonEditor" element={<JsonEditor />}/>
      </Routes>
    </Router>
  );
}
