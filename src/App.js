import React, { useState, useEffect } from "react";

import "./goldenlayout-base.css";
import "./goldenlayout-dark-theme.css";

import GoldenLayoutComponent from './goldenLayoutComponent'



// import GoldenLayout from "golden-layout";

// var config = {
//   content: [{
//     type: 'row',
//     content:[{
//         type:'react-component',
//         component: 'testItem',
//         props: { label: 'A' }
//     },{
//         type: 'column',
//         content:[{
//             type:'react-component',
//             component: 'testItem',
//             props: { label: 'B' }
//         },{
//             type:'react-component',
//             component: 'testItem',
//             props: { label: 'C' }
//         }]
//     }]
// }]
// };

// var myLayout = new GoldenLayout(config);
// myLayout.registerComponent("testItem", TestItem);

// myLayout.init();


// function TestItem() {
//   var [value, setValue] = useState("bla");

//   useEffect(() => {
   
//   }, []);

//   return (
//     <div>
//       <input type="text" value={value} onChange={setValue} />
//       <button>set title</button>
//     </div>
//   );
// }

function App() {
  return (
    <GoldenLayoutComponent/>
  );
}

export default App;
