export class Element {
  constructor() {}

  // let [ImgSize, setImgSize] = useState({
  //   width: 100,
  //   height: 100,
  //   cursor: "default",
  // });

  // const [StartPos, setStartPos] = useState({ x: 0, y: 0 });
  // const [Size, setSize] = useState({ x: 0, y: 0 });
  // let [Resize, setResize] = useState(false);
  // let [ImgDel, setImgDel] = useState(false);

  // function condition(x, y) {
  //   return (
  //     x <= 10 || x >= ImgSize.width - 10 || y <= 10 || y >= ImgSize.height - 10
  //   );
  // }

  // // 마우스 무브 이벤트
  handleMouseMove(e) {
    let intX = parseInt(e.clientX - e.target.getBoundingClientRect().left);
    let intY = parseInt(e.clientY - e.target.getBoundingClientRect().top);
    if (Resize) {
      let newWidth = Size.x - StartPos.x + e.pageX;
      let newHeight = Size.y - StartPos.y + e.pageY;
      setImgSize({
        width: newWidth < 50 ? 50 : newWidth,
        height: newHeight < 50 ? 50 : newHeight,
      });
    } else
      setImgSize((c) => ({
        ...c,
        cursor: condition(intX, intY) ? "grab" : "default",
      }));
  }

  // // 마우스 다운 이벤트
  handelMouseDown(e) {
    e.preventDefault();
    console.log("hihi");

    // let btn = e.buttons;
    // if (btn == 1) {
    //   let intX = parseInt(e.clientX - e.target.getBoundingClientRect().left);
    //   let intY = parseInt(e.clientY - e.target.getBoundingClientRect().top);
    //   setResize(condition(intX, intY) ? true : false);
    //   setSize((c) => ({ ...c, x: ImgSize.width, y: ImgSize.height }));
    //   setStartPos((c) => ({ ...c, x: e.pageX, y: e.pageY }));
    // } else {
    //   setImgDel(true);
    // }
  }

  //   이미지 엘리멘트
  elementOfImg(src) {
    let width = 100;
    let height = 100;
    const img = document.createElement("img");
    img.src = src;
    img.className = "content_img";
    img.style.width = `${width}px`;
    img.style.height = `${height}px`;

    img.addEventListener("mousemove", (e) => this.handelMouseDown(e));
    return img;
  }

  //   디브 엘리멘트
  elementOfSpan(text) {
    let span = document.createElement("span");
    span.innerText = text;
    return span;
  }
}
