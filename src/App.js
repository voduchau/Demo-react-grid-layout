import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useRef } from "react";
import "../node_modules/react-grid-layout/css/styles.css"
import "../node_modules/react-resizable/css/styles.css";

import GridLayout, {WidthProvider} from 'react-grid-layout';

const MyLayout = WidthProvider(GridLayout);

const maxHeight = 9;
const maxWidth = 16;
function App() {
  const [check, setCheck] = useState(0);
  const refLayout1 = useRef();
  const [DeviceWidth, setDeviceWidth] = useState(1000);
  const [DeviceHeight, setDeviceHeight] = useState(1000);
  const layout = [
    { i: 'b', x: 0, y: 0, w: 5, h: 5, isBounded: true },
    { i: 'c', x: 1, y: 0, w: 4, h: 4, isBounded: true },
  ];
  const [lay, setLay] = useState(layout);

  useEffect(() => {
    let height = window.innerHeight;
    let width = window.innerWidth;
    setDeviceWidth(window.innerWidth);
    setDeviceHeight(window.innerHeight);
    console.log(height/9,'height')
    console.log(width,'width')
  },[])

  const handleDelete = (item) => {
    const temp = [...lay];
    if (temp.length > 1) {
      const l = temp.filter(layItme => layItme.i !== item.i);
      setLay(l);
    }
  }
  const onLayoutChange = (layout, layouts) => {
    if (!(layout[layout.length - 1]
      && Object.keys(layout[layout.length - 1]).length === 0 && layout[layout.length - 1].constructor === Object)) {
      const temp = [...layout];
      let check = 0;
      const CalHeight = (layParam) => {
        console.log(layParam, 'layParam')
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
    var file = e.target.files[0];
    var reader = new FileReader();

    console.log(refLayout1.current.childNodes[index].innerHTML = "<video width='100%' height='100%' controls><source src='https://res.cloudinary.com/c81admanagementstorage/video/upload/v1620223441/Videos/604c7c0cb58ead018da468b3/4K_EPIC_Pepsi_Zero_Sugar_B_Roll_inspired_by_Daniel_Schiffer_-_Pepsi_Commercial_Video_%ED%8E%A9%EC%8B%9C_%EC%A0%9C%EB%A1%9C_%EC%8A%88%EA%B1%B0_%EB%B9%84%EB%A1%A4_px69dh.webm' type='video/mp4'/></video>",'refLayout1')
    if (file && file.type.match('image')) {
      reader.onload = function (e) {
        console.log(e, 'e')
        refLayout1.current.childNodes[index].style.backgroundSize = "cover"
        refLayout1.current.childNodes[index].style.backgroundImage = `url(${e.target.result})`;
      }
      reader.readAsDataURL(file);
    }
    else {
      reader.onload = function () {
        var blob = new Blob([reader.result], { type: file.type });
        var url = URL.createObjectURL(blob);
        var video = document.createElement('video');
        var video = document.createElement('video');
        var timeupdate = function () {
          if (snapImage()) {
            video.removeEventListener('timeupdate', timeupdate);
            video.pause();
          }
        };
        video.addEventListener('loadeddata', function () {
          if (snapImage()) {
            video.removeEventListener('timeupdate', timeupdate);
          }
        });
        var snapImage = function () {
          var canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
          var image = canvas.toDataURL();
          var success = image.length > 100000;
          if (success) {
            // var img = document.createElement('img');
            // img.src = image;
            // document.getElementsByTagName('div')[0].appendChild(img);
            refLayout1.current.childNodes[index].style.backgroundSize = "cover"
            refLayout1.current.childNodes[index].style.backgroundImage = `url(${image})`;
            URL.revokeObjectURL(url);
          }
          return success;
        };
        video.addEventListener('timeupdate', timeupdate);
        video.preload = 'metadata';
        video.src = url;

        // Load video in Safari / IE11
        video.muted = true;
        video.playsInline = true;
        video.play();
      }
      reader.readAsArrayBuffer(file);
    }

  }
  return (
    <div className="App">
      <div className="device-1">
        <GridLayout
          className="layout"
          layout={lay}
          style={{width: "100%", border: "1px solid red", height: "100%"}}
          cols={16}
          isBounded={false}
          rowHeight={DeviceHeight/9}
          autoSize={false}
          width={DeviceWidth}
          innerRef={refLayout1}
          // height={270}
          margin={[0, 0]}
          // isDraggable={false}
          // isResizable={false}
          isDroppable={false}
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
          {lay.map((item, index) => {
            return <div key={item.i}>
              {item.i}
              <span
                className="remove"
                onClick={() => handleDelete(item)}
              >
                x
              </span>
              <div>
                <input type="file" name="add-image" onChange={(e) => handleAddImage(e, index)} />
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
