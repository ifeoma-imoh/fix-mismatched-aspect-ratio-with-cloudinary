import "./App.css";
import { useState, useEffect } from "react";
import { Image, Transformation } from "cloudinary-react";

function App() {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    async function requestCharacters() {
      const res = await fetch("https://thronesapi.com/api/v2/Characters");
      const characters = await res.json();
      setCharacters(characters);
    }
    requestCharacters();
  });
  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "80%",
        margin: "auto",
        alignItems: "center",
      }}
    >
      <h1>Game of Thrones</h1>
      <main
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto auto",
          gridGap: "50px",
        }}
      >
        {characters.map((character) => {
          const { id, imageUrl, fullName, title, family } = character;
          return (
            <div key={id} className="post">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "5px",
                }}
              >
                <Image cloudName="ifeomaimoh" publicId={imageUrl} type="fetch">
                  {/* uncomment this transformation component to test the fill crop mode */}
                  {/* <Transformation
                    height="300"
                    width="300"
                    crop="fill"
                    gravity="face"
                  /> */}
                  {/* uncomment this transformation component to test the pad crop mode */}
                  {/* <Transformation
                    background="auto"
                    height="300"
                    width="300"
                    crop="fill_pad"
                    gravity="auto"
                  /> */}
                  <Transformation if="ar_gt_1:1" />
                  <Transformation
                    width="300"
                    height="300"
                    crop="fill"
                    gravity="face"
                  />
                  <Transformation
                    if="else"
                    width="200"
                    height="300"
                    crop="fill"
                    gravity="face"
                  />
                  <Transformation if="end" />
                  <Transformation radius="10" />
                </Image>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "300px",
                  margin: "auto",
                  alignItems: "center",
                }}
              >
                <h2>{fullName}</h2>
                <h4>{title}</h4>
                <h4>{family}</h4>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
export default App;
