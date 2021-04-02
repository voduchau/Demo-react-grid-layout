import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import "../node_modules/react-grid-layout/css/styles.css"
import "../node_modules/react-resizable/css/styles.css";

import GridLayout from 'react-grid-layout';
function App() {
  const layout = [
    { i: 'b', x: 0, y: 0, w: 3, h: 2, isBounded: true },
    { i: 'c', x: 4, y: 0, w: 2, h: 2, isBounded: true},
    { i: 'd', x: 4, y: 0, w: 2, h: 2 },
  ];
  const [lay, setLay] = useState(layout);

  const handleDelete = (item) => {
    console.log(item,'item')
    const temp = [...lay];
    const l = temp.filter(layItme => layItme.i !== item.i);
    console.log(l,'temp')
    setLay(l);
  }
  return (
    <div className="App">
      <div className="device-1">
      <GridLayout
        className="layout"
        layout={lay}
        cols={8}
        isBounded={true}
        rowHeight={30}
        autoSize={false}
        width={500}
        height={320}
        margin={[2, 2]}
        isDraggable={true}
        isDroppable={true}
        onLayoutChange={(layout) => {
          console.log(layout, 'layout change');
          const temp = [...layout];
          const temp2 = [...layout];
          const X0 = temp.filter(layItem => {
            return true;
          });
          for(let i = 0; i < temp.length; i++ ){
            for(let j = i + 1; j < temp.length; j++){
              if(temp[j].y === temp[i].y){
                let maxIndex;
                if(temp[j].h > temp[i].h){
                  maxIndex = j;
                  temp.splice(i, 1);
                }
                else {
                  maxIndex = i;
                  temp.splice(j, 1);
                }
              }
            }
          }
          // let checkHeight = temp.reduce((total, item) => total + (item.h),0)
          let checkHeight = [];
          for(let i = 0; i < temp.length; i++){
            checkHeight.push(temp[i].h + temp[i].y);
          }
          var max_of_height = Math.max.apply(Math, checkHeight);
          while(max_of_height > 10){
          const maxInTemp = Math.max.apply(Math, temp.map(function(o) { return o.h; }))
          let nameI = "";
          for(let i = 0; i < temp.length; i++){
            if(temp[i].h == maxInTemp){
              nameI = temp[i].i;
            }
          }
          for(let i = 0; i < temp2.length; i++){
            if(temp2[i].i === nameI){
              if(temp2[i].h > 1) {
                temp2[i].h--;
              }
            }
          }
          max_of_height--;
          }
          if(temp2.length === lay.length) {
          setLay(temp2);
          }
        }}
        onDrop={(layout, item, e) => {
          const temp = [...lay];
          const tempItem = { ...item };
          tempItem.i = e.timeStamp.toString();
          temp.push(tempItem);
          setLay(temp);
        }}
        onResizeStart={(layout, oldItem, newItem) => {
        }}
      >
        {lay.map(item => {
          return <div key={item.i}>
            {item.i}
            <span
              className="remove"
              onClick={() =>handleDelete(item)}
            >
              x
        </span>
          </div>
        })}
      </GridLayout>
      </div>
      <div
        className="drop"
        draggable={true}
        unselectable="on"
        onDragStart={e => e.dataTransfer.setData("text/plain", "")}
      >
        Drag add new 
        </div>
    </div>
  );
}

export default App;
