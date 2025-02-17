export class Element {
  constructor() {}

  changeImgSize(img, imgSize) {
    img.style.width = `${imgSize.width}px`;
    img.style.height = `${imgSize.height}px`;
  }

  //   이미지 엘리멘트
  elementOfImg({ element = undefined, src = undefined }) {
    let imgSize = { width: 100, height: 100 };
    let IMGsrc = src ? src : element.getAttribute("src");
    if (element) {
      let st = element.getAttribute("style");
      st.split(";").map((val) => {
        let [key, value] = val.split(":").map((s) => s.trim());

        if (key == "width") imgSize.width = parseInt(value.replace("px", ""));
        if (key == "height") imgSize.height = parseInt(value.replace("px", ""));
      });
    }

    let size = { x: 0, y: 0 };
    let startPos = { x: 0, y: 0 };
    let Resize = false;

    const img = document.createElement("img");
    img.src = IMGsrc;
    img.className = "content_img";
    this.changeImgSize(img, imgSize);

    // 마우스 무브 이벤트
    img.addEventListener("mousemove", (e) => {
      img.style.cursor = Resize ? "grabbing" : "grab";
      if (Resize) {
        let newWidth = size.x - startPos.x + e.pageX;
        let newHeight = size.y - startPos.y + e.pageY;

        imgSize = {
          width: newWidth <= 30 ? 30 : newWidth,
          height: newHeight <= 30 ? 30 : newHeight,
        };
        this.changeImgSize(img, imgSize);
      }
    });
    // 마우스 다운 이벤트
    img.addEventListener("mousedown", (e) => {
      e.preventDefault();
      let btn = e.buttons;

      if (btn == 1) {
        Resize = true;
        size = { x: imgSize.width, y: imgSize.height };
        startPos = { x: e.pageX, y: e.pageY };
      }
    });

    img.addEventListener("mouseup", () => {
      console.log("mouse up");
      Resize = false;
    });

    return img;
  }

  //   디브 엘리멘트
  elementOfSpan(text) {
    let span = document.createElement("span");
    span.innerText = text;
    return span;
  }
}
