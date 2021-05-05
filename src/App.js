import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useRef } from "react";
import "../node_modules/react-grid-layout/css/styles.css"
import "../node_modules/react-resizable/css/styles.css";

import GridLayout from 'react-grid-layout';
const maxHeight = 9;
const maxWidth = 16;
function App() {
  const [check, setCheck] = useState(0);
  const refLayout1 = useRef();
  const layout = [
    { i: 'b', x: 0, y: 0, w: 5, h: 5, isBounded: true },
    { i: 'c', x: 1, y: 0, w: 4, h: 4, isBounded: true },
    // { i: 'd', x: 2, y: 0, w: 1, h: 1 },
    // { i: 'e', x: 3, y: 0, w: 1, h: 1 },
    // { i: 'f', x: 4, y: 0, w: 1, h: 1 },
    // { i: 'g', x: 5, y: 0, w: 1, h: 1 },
    // { i: 'h', x: 6, y: 0, w: 1, h: 1 },
    // { i: 'i', x: 7, y: 0, w: 1, h: 1 },
    // { i: 'j', x: 8, y: 0, w: 1, h: 1 },
    // { i: 'q', x: 9, y: 0, w: 1, h: 1 },
    // { i: 'k', x: 10, y: 0, w: 1, h: 1 },
    // { i: 'l', x: 11, y: 0, w: 1, h: 1 },
    // { i: 'm', x: 12, y: 0, w: 1, h: 1 },
    // { i: 'n', x: 13, y: 0, w: 1, h: 1 },
    // { i: 'o', x: 14, y: 0, w: 1, h: 1 },
    // { i: 'p', x: 15, y: 0, w: 1, h: 1 },
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
      let check = 0;
      const CalHeight = (layParam) => {
        console.log(layParam[1], 'layParam')
        for (let i = 0; i < layParam.length; i++) {
          if (layParam[i].y + layParam[i].h > maxHeight) {
            if (layParam[i].h > 1) {
              --layParam[i].h;
            }
            else {
              if (layParam[i].x < 15) {
                console.log(layParam[i].x, 'xx')
                ++layParam[i].x;
                layParam[i].w = 1;
                layParam[i].y = 0;
              }
              else {
                layParam.splice(i, 1);
              }
            }
            CalHeight(layParam)
          }
          else if (i === layParam.length - 1) {
            return layParam;
          }
          else {
            continue;
          }
        }
      }
      const rs = CalHeight(temp);
      setLay(CalHeight(temp))
    }

  }

  const handleAddImage = (e, index) => {
    console.log(e.target.files[0],'e');
    // refLayout1.current.childNodes[index].style
    refLayout1.current.childNodes[index].style.backgroundImage = `url(${e.target.files[0]})`
    console.log(refLayout1.current.childNodes[index].style.backgroundColor = "red",'ref')
  }

  return (
    <div className="App">
      <div className="device-1">
        <GridLayout
          className="layout"
          layout={lay}
          cols={16}
          isBounded={true}
          rowHeight={30}
          autoSize={false}
          width={500}
          innerRef={refLayout1}
          height={270}
          margin={[0, 0]}
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
          {lay.map((item,index) => {
            return <div key={item.i}>
              {item.i}
              <span
                className="remove"
                onClick={() => handleDelete(item)}
              >
                x
              </span>
              <div>
                <input type="file" name="add-image" onChange={(e) => handleAddImage(e,index)}/>
              </div>
            </div>
          })}
        </GridLayout>
      </div>
      <div>
        <button
          onClick={() => {
            const temp = [...lay];
            let number = (lay.length) % (maxWidth);

            console.log((lay.length) % (maxWidth), 'check');

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
