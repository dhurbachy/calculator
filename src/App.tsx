import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [inputBuffer, setInputBuffer] = useState("");   // digits being typed
  const [operator, setOperator] = useState<string | null>(null); // pending operator
  const [result, setResult] = useState(0);
  const [history, setHistory] = useState<string>('');
  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }
  const arithmeticActions = ['+', '-', '×', '÷'];
  const numericalButtons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '='];
  const bracketButtons = ['C', '(', ')', '{', '}', 'AC'];


  const handleNumberClick = (num: string) => {
    setInputBuffer(prev => prev + num);
    setHistory(prev => prev + num);
  };
  const calculate = (inputValue: number) => {
    setResult(prev => {
      switch (operator) {
        case "+": return prev + inputValue;
        case "-": return prev - inputValue;
        case "×": return prev * inputValue;
        case "÷": return inputValue === 0 ? 0 : prev / inputValue;
        default: return inputValue;
      }
    });
  };

  const handleOperatorClick = (op: string) => {
    const inputValue =
    inputBuffer !== ""
      ? Number(inputBuffer)
      : result;

  if (operator) {
    calculate(inputValue);
  } else {
    setResult(inputValue);
  }

    setOperator(op);
    setInputBuffer("");
    setHistory(prev => prev + op)
  };
  const handleEqualsClick = () => {
    if (!operator) return;

    const inputValue = Number(inputBuffer || "0");
    calculate(inputValue);
    setOperator(null);
    setInputBuffer("");
    setHistory(prev => prev)
  };
  const handleClearClick = () => {
    setInputBuffer("");
    setOperator(null);
    setResult(0);
    setHistory("");

  };
  const handleHistoryAndResult = () => {
    if (inputBuffer) {
      return operator
        ? `${history}`
        : inputBuffer;
    }
    if (operator && history.length) {
      return `${history}`;
    }

    if (!operator && history.length) {
    return `${history} = ${result}`;
  }


    return '0';
  }

  return (
    <main className="container w-[400px] p-2">
      <div className="">
        <input type="text"
          // value={`${history}${operator === null && history.length ? " = " + result : ""}`}
          value={handleHistoryAndResult()}

          readOnly className="w-full h-16 text-right border border-gray-300 rounded mt-4 mb-4 p-2 text-2xl" />
        {/* <span>{history}</span> */}
      </div>
      <div className="grid grid-cols-6 gap-2">
        {bracketButtons.map((button: string) => (
          <div>
            <button key={button} onClick={() => { if (button === "=") handleEqualsClick(); else handleClearClick(); }} className="m-1 p-2 bg-gray-300 rounded w-full">{button}</button>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-6 gap-2">
        <div className="col-span-5">
          <div className="grid grid-cols-3 gap-2">

            {numericalButtons.map((num: string) => (
              <div>
                <button key={num} onClick={() => { if (num === "=") handleEqualsClick(); else handleNumberClick(num) }} className="m-1 p-4 bg-gray-200 rounded w-full">{num}</button>
              </div>))}

          </div>
        </div>
        <div className="col-span-1">
          <div className="grid grid-cols-1 gap-2">


            {arithmeticActions.map((action: string) => (
              <div>
                <button key={action} onClick={() => handleOperatorClick(action)} className="m-1 p-2 bg-blue-500 w-full text-white rounded">{action}</button>
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
