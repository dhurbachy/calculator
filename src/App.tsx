import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }
  const arithmeticActions = ['+', '-', 'x', '/'];
  const numericalButtons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '='];
  const bracketButtons = ['C','(', ')', '{', '}','AC'];


  return (
    <main className="container w-[400px]">
      <div className="">
        <input type="text" readOnly className="w-full h-16 text-right border border-gray-300 rounded mt-4 mb-4 p-2 text-2xl" />
      </div>
      <div className="grid grid-cols-6 gap-2">
        {bracketButtons.map((button: string) => (
          <div>
            <button key={button} className="m-1 p-2 bg-gray-300 rounded w-full">{button}</button>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-6 gap-2">
        <div className="col-span-5">
          <div className="grid grid-cols-3 gap-2">

            {numericalButtons.map((num: string) => (
              <div>
                <button key={num} className="m-1 p-4 bg-gray-200 rounded w-full">{num}</button>
              </div>))}

          </div>
        </div>
        <div className="col-span-1">
          <div className="grid grid-cols-1 gap-2">


            {arithmeticActions.map((action: string) => (
              <div>
                <button key={action} className="m-1 p-2 bg-blue-500 w-full text-white rounded">{action}</button>
              </div>
            ))}
          </div>

        </div>

      </div>


      {/* <form
        className="row "
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form> */}
      {/* <p>{greetMsg}</p> */}
    </main>
  );
}

export default App;
