import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
export default function Home() {
  const { selectedObjects, editor, onReady } = useFabricJSEditor();
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const onFileChange = (e: any) => {
    console.log(URL.createObjectURL(e.target.files[0]));
    setBackgroundImage(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    if (backgroundImage.length > 0) {
      // editor?.canvas.setBackgroundImage(
      //   backgroundImage,
      //   editor?.canvas.renderAll.bind(editor?.canvas)
      // );
      fabric.Image.fromURL(backgroundImage, function (oImg: any) {
        oImg.scaleToWidth(editor?.canvas.width);
        oImg.scaleToHeight(editor?.canvas.height);
        editor?.canvas.setBackgroundImage(
          oImg,
          editor?.canvas.renderAll.bind(editor?.canvas)
        );
        editor?.canvas.requestRenderAll();
        // editor?.canvas.add(oImg);
      });
    }
  }, [backgroundImage]);

  // const onAddPhoto = () => {
  //   // fabric.Image.fromURL(
  //   //   "https://pbs.twimg.com/profile_images/1372335257630957568/pM8GqmBn_400x400.jpg",
  //   //   function (oImg: any) {
  //   //     editor?.canvas.add(oImg);
  //   //   }
  //   // );
  //   editor?.canvas.setBackgroundImage(
  //     "profile.jpg",

  //     editor?.canvas.renderAll.bind(editor?.canvas)
  //   );
  // };

  const onAddEar = () => {
    fabric.Image.fromURL("ear.png", function (oImg: any) {
      oImg.scaleToWidth(75);
      oImg.scaleToHeight(75);
      editor?.canvas.add(oImg);
    });
  };

  const saveImage = () => {
    // window.open(editor?.canvas.toDataURL());
    var image = editor?.canvas.toDataURL();
    var tmpLink = document.createElement("a");
    tmpLink.download = "image.png"; // set the name of the download file
    tmpLink.href = image!;
    tmpLink.click();
  };
  return (
    <div>
      <input
        className="fileBtn"
        type="file"
        onChange={onFileChange}
        accept="image/*"
      />
      <button onClick={onAddEar}>Add Ear</button>
      <button onClick={saveImage}>Save</button>
      <TestCanvas onReady={onReady} />
    </div>
  );
}

const TestCanvas = styled(FabricJSCanvas)`
  height: 400px;
  width: 400px;
`;
