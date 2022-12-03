import { useEffect, useState } from "react";
import "./App.css";
import { Ep, Seasons, TheVampireDiaries } from "./assets/Episodios_TVD";

const key = "lista_tvd";
function App() {
  const [show_watched, setShow_Watched] = useState<boolean>(false);
  const [lista, setLista] = useState<Seasons[]>();

  useEffect(() => {
    const lista_local = localStorage.getItem(key);
    if (lista_local) {
      setLista(JSON.parse(lista_local));
    } else {
      setLista(TheVampireDiaries);
    }
  }, []);

  useEffect(() => {
    lista && localStorage.setItem(key, JSON.stringify(lista));
  }, [lista]);

  function RenderEps(Ep: Ep, key_ep: number, key_season: number) {
    if (Ep.watched === true && !show_watched) return null;
    return (
      <div
        key={key_ep.toString()}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "4px 0",
        }}
      >
        <a href={Ep.link}>
          {Ep.ep_name.split(".")[0].padStart(2, "0") +
            " - " +
            Ep.ep_name.split(".")[1]}
        </a>
        <input
          style={{
            minWidth: "24px",
            margin: "0",
          }}
          type="checkbox"
          checked={Ep.watched === true}
          onChange={(i) => {
            setLista((list) => {
              if (list) {
                const new_list = list;
                new_list[key_season].eps[key_ep].watched = i.target.checked;
                return [...new_list];
              }
            });
          }}
        />
      </div>
    );
  }
  function RenderSeasons(Season: Seasons, key_season: number) {
    return (
      <div key={key_season.toString()} style={{ flexDirection: "column" }}>
        <p style={{ fontWeight: "bold" }}>
          {Season.season.replace("Season", "Season ")}
        </p>
        {Season.eps.map((ep, key_ep) => RenderEps(ep, key_ep, key_season))}
      </div>
    );
  }

  return (
    <div className="App">
      <header>The Vampire Diaries</header>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "4px 0",
        }}
      >
        <p>Show watched episodes?</p>
        <input
          type="checkbox"
          checked={show_watched === true}
          onChange={(e) => {
            setShow_Watched(e.target.checked);
          }}
          style={{
            width: "24px",
            margin: "0",
          }}
        ></input>
      </div>

      <ul>{lista?.map(RenderSeasons)}</ul>
    </div>
  );
}

export default App;
