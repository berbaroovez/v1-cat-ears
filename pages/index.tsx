import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import Logo from "../components/logo";

import { NextSeo } from "next-seo";
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
  const onAddSnippedEar = () => {
    fabric.Image.fromURL("snipped-ear2.png", function (oImg: any) {
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
    <>
      <NextSeo
        openGraph={{
          type: "website",
          url: "https://www.catearsforv1.com",
          title: "Cat Ears for V1",
          description:
            "Add cat ears to your profile photo to support V1 in Valorant",
          images: [
            {
              url: "https://www.catearsforv1.com/static/og-twitter.png",
              width: 800,
              height: 600,
              alt: "An image that reads cat ears for v1",
            },
          ],
        }}
      />
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
        <button onClick={onAddSnippedEar}>Add Snipped Ear</button>

        <TestCanvas onReady={onReady} />

        <button onClick={saveImage}>Save</button>
        <Credit>
          Made with 💜 by{" "}
          <a href="https://twitter.com/berbaroovez">Berbaroovez</a>
        </Credit>
        <Disclaimer>(not affiliated with v1 just a NA Fan)</Disclaimer>
      </HomeContainer>
    </>
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
    margin-top: 4px;
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

const Disclaimer = styled.p`
  font-size: 0.6rem;
`;
