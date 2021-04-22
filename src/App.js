import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import "../node_modules/react-grid-layout/css/styles.css"
import "../node_modules/react-resizable/css/styles.css";

import GridLayout from 'react-grid-layout';
const maxHeight = 10;
function App() {
  const [check, setCheck] = useState(0)
  const layout = [
    { i: 'b', x: 0, y: 0, w: 3, h: 2, isBounded: true },
    { i: 'c', x: 4, y: 0, w: 2, h: 2, isBounded: true },
    { i: 'd', x: 4, y: 0, w: 2, h: 2 },
  ];
  const [lay, setLay] = useState(layout);

  const handleDelete = (item) => {
    const temp = [...lay];
    const l = temp.filter(layItme => layItme.i !== item.i);
    setLay(l);
  }
  const onLayoutChange = (layout, layouts) => {
    if (!(layout[layout.length - 1]
      && Object.keys(layout[layout.length - 1]).length === 0 && layout[layout.length - 1].constructor === Object)) {
      const temp = [...layout];
      let checkHeight = [];
      for (let i = 0; i < layout.length; i++) {
        checkHeight.push(layout[i].h + layout[i].y);
      }
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].h + temp[i].y > maxHeight) {
          while (temp[i].h + temp[i].y > maxHeight) {
            if(check >= 6){
              temp.splice(i,1);
              setCheck(0);
              break;
            }
            if (temp[i].h > 1) {
              --temp[i].h;
            }
            else {
              let time = 0;
              while(temp[i].h + temp[i].y > maxHeight){
                let check1 = check;
                if(check >= 6){
                  temp.splice(i,1);
                  setCheck(0);
                  break;
                }
                if(temp[i].x === 7){
                  ++check1;
                  setCheck(++check1);
                  temp[i].x = 0;
                }
                else {
                  temp[i].x++;
                }
                --temp[i].y;
                temp[i].w = 1;
                time++;
              }
              break;
            }
          }
        }
      }
      setLay(temp)
    }

  }
  useEffect(() => {
    console.log(lay,'lay')
  },[lay])
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
          isDroppable={true}
          onLayoutChange={onLayoutChange}
          onDrop={(layout, item, e) => {
            if (!(layout[layout.length - 1]
              && Object.keys(layout[layout.length - 1]).length === 0 && layout[layout.length - 1].constructor === Object)) {
              for (let i = 0; i < layout.length; i++) {
                if (layout[i].i === "__dropping-elem__") {
                  layout.splice(i, 1);
                }
              }

              const temp = [...layout];
              const tempItem = { ...item };
              tempItem.i = e.timeStamp.toString();
              if (!(tempItem
                && Object.keys(tempItem).length === 0 && tempItem.constructor === Object)) {
                temp.push(tempItem);
              }
              setLay(temp);
            }
          }}
          onResizeStart={(layout, oldItem, newItem) => {
          }}
        >
          {lay.map(item => {
            return <div key={item.i}>
              {item.i}
              <span
                className="remove"
                onClick={() => handleDelete(item)}
              >
                x
        </span>
            </div>
          })}
        </GridLayout>
      </div>
      <div>
        <button
          onClick={() => {
            const temp = [...lay];
            let number = (lay.length) % 8;

            console.log((lay.length) % 8, 'check');
            
            const item = {
              i: Math.random().toString(),
              x: number,
              y: Infinity,
              w: 1,
              h: 1,
            }
            temp.push(item)
            setLay(temp)
          }}
        >add item</button>
      </div>
    </div>
  );
}

export default App;
