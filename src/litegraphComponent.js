/* npm install litegraph.js */
import React, { useRef, useEffect } from "react";
import { LiteGraph, LGraph, LGraphCanvas } from "litegraph.js";
//import { useMenuDispatcher, menuType } from "../Modules/Utils/CustomHooks/Menu";
import "litegraph.js/css/litegraph.css";

// import { CustomNodesCreate } from "./customNodes";
// import { CheckResultJson, ClearData } from './threeFuncs'

// import { ClearWrapper, AllRenderer } from "./threeWrapper"



export var graph = null;

function App() {
  graph = useRef(null);
  const canvasRef = useRef(null);
  const together = useRef(null);
  //const setSelectedIndex = useMenuDispatcher();

  const fileInputRef = useRef(null);

  useEffect(() => {
    // setSelectedIndex({
    //   type: menuType.default,
    //   value: { main: [true, -1], sub: ["docs", 1], detail: ["test", 0] }
    // });
    graph.current = new LGraph();
    var graphcanvas = new LGraphCanvas(canvasRef.current, graph.current);

    graph.current.onAfterExecute = function() {
      graphcanvas.draw(true);
    };

    //CustomNodesCreate(LiteGraph);
    //DrawNodes(LiteGraph, graph);

    window.addEventListener("resize", function() {
      graphcanvas.resize();
    });
    graphcanvas.resize();
  }, []);

  const StartAction = () => {
    //AllRenderer(); //??? 어떤 role
    //ClearData();
    
    graph.current.runStep(1);
    console.log(graph.current)
  };
  const StopAction = () => {
    graph.current.stop();
  };

  const saveAction = () => {
    console.log("saved");
    localStorage.setItem(
      "graphdemo_save",
      JSON.stringify(graph.current.serialize())
    );
  };

  const loadAction = () => {
    var data = localStorage.getItem("graphdemo_save");
   
    if (data) {
      graph.current.configure(JSON.parse(data));
     
    }
    console.log("loaded");
  };

  const loadFileAction = () => {
    const fr = new FileReader();

    fr.addEventListener("load", e => {
     
      graph.current.configure(JSON.parse(fr.result))
    });

    fr.readAsText(fileInputRef.current.files[0]);

    // console.log(fileInputRef.current.files[0]);
    // //var data = localStorage.getItem("graphdemo_save");
    // var data = JSON.stringify(fileInputRef.current.files[0]);
    // console.log(data);
    // if (data) graph.current.configure(data);
    console.log(" json loaded");
  };

  const downloadAction = () => {
    var data = JSON.stringify(graph.current.serialize());
    var file = new Blob([data]);
    var url = URL.createObjectURL(file);
    var element = document.createElement("a");
    element.setAttribute("href", url);
    element.setAttribute("download", "graph.JSON");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setTimeout(function() {
      URL.revokeObjectURL(url);
    }, 1000 * 60); //wait one minute to revoke url
  };

  const clearScene = () => {
    //ClearWrapper()
  }

//   const JsonFetchAction = () => {
//     //var result = CheckResultJson()
//     console.log(result)

//     var data = JSON.stringify(result);
//     var file = new Blob([data]);
//     var url = URL.createObjectURL(file);
//     var element = document.createElement("a");
//     element.setAttribute("href", url);
//     element.setAttribute("download", "result.JSON");
//     element.style.display = "none";
//     document.body.appendChild(element);
//     element.click();
//     document.body.removeChild(element);
//     setTimeout(function() {
//       URL.revokeObjectURL(url);
//     }, 1000 * 60); //wait one minute to revoke url
//   }

  return (
    <div
      id="main"
      style={{
        
        zIndex: 0,
        height: "calc( 100vh - 30px )",
        backgroundColor: "#333"
      }}
    >
      <button onClick={StartAction}>Start</button>
      <button onClick={StopAction}>Stop</button>
      <button onClick={saveAction}>Save</button>
      <button onClick={loadAction}>Load</button>
      <input
        type="file"
        name="myFile"
        ref={fileInputRef}
        onChange={loadFileAction}
      ></input>
      
      
      <canvas ref={canvasRef} width="1000" height="500" tabIndex={10}></canvas>
    </div>
  );
}

export default App;
