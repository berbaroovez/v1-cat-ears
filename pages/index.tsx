import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import Logo from "../components/logo";
export default function Home() {
  const { selectedObjects, editor, onReady } = useFabricJSEditor();
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [canvasSize, setCanvasSize] = useState<number>(200);
  const onFileChange = (e: any) => {
    console.log(URL.createObjectURL(e.target.files[0]));
    setBackgroundImage(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    if (backgroundImage.length > 0) {
      fabric.Image.fromURL(backgroundImage, function (oImg: any) {
        oImg.scaleToWidth(400);
        console.log(oImg.height);
        if (oImg.height < 250) {
          oImg.scaleToHeight(400);
        }

        editor?.canvas.setBackgroundImage(
          oImg,
          editor?.canvas.renderAll.bind(editor?.canvas)
        );
        editor?.canvas.requestRenderAll();
      });
    }
  }, [backgroundImage]);

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
    <HomeContainer>
      <Logo />

      <h1>Add cat ears to your profile photo to support the V1 Boys</h1>

      <label className="custom-file-upload">
        <input
          className="fileBtn"
          type="file"
          onChange={onFileChange}
          accept="image/*"
        />
        Upload Image
      </label>

      <button onClick={onAddEar}>Add Ear</button>

      <TestCanvas onReady={onReady} />

      <button onClick={saveImage}>Save</button>
      <Credit>
        Made with 💜 by{" "}
        <a href="https://twitter.com/berbaroovez">Berbaroovez</a>
      </Credit>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  margin-top: 20px;
  display: grid;
  h1 {
    width: 400px;

    line-height: 30px;
    margin: 12px;
    text-align: center;
  }
  justify-items: center;
  button {
    cursor: pointer;
    margin: 12px;
    width: 200px;

    border: none;
    border-radius: 8px;
    padding: 8px;
    background: hsl(0, 0%, 94%);
    font-size: 1.2rem;
    font-weight: bold;

    &:hover {
      background: hsl(0, 0%, 84%);
    }
  }

  input[type="file"] {
    display: none;
  }

  .custom-file-upload {
    text-align: center;
    width: 200px;
    display: inline-block;
    border-radius: 8px;
    padding: 8px;
    background: hsl(0, 0%, 94%);
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      background: hsl(0, 0%, 84%);
    }
  }
`;

const TestCanvas = styled(FabricJSCanvas)`
  height: 400px;
  width: 400px;
`;

const Credit = styled.p`
  a {
    color: #e7c608;
    &:hover {
      color: #fcac00;
    }
  }
`;
