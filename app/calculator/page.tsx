'use client';

import { useState } from "react";

    const actions = [
        { symbol: '%', className: 'btn operator' },
        { symbol: '/', className: 'btn operator' },

        { symbol: '7', className: 'btn' },
        { symbol: '8', className: 'btn' },
        { symbol: '9', className: 'btn' },
        { symbol: '*', className: 'btn operator' },

        { symbol: '4', className: 'btn' },
        { symbol: '5', className: 'btn' },
        { symbol: '6', className: 'btn' },
        { symbol: '-', className: 'btn operator' },

        { symbol: '1', className: 'btn' },
        { symbol: '2', className: 'btn' },
        { symbol: '3', className: 'btn' },
        { symbol: '+', className: 'btn operator' },

        { symbol: '0', className: 'btn zero' },
        { symbol: '.', className: 'btn' }
    ];  

const CalculatorApp = () => {
    const [collection,setCollection] = useState<any>([]); 
    const [result,setResult] = useState('0');  

    const handleResult = () => {
        const calc = [...collection].join(''); 
        setResult(eval(calc)); 
    }

    const ClickAC = () => {
        setResult(''); 
        setCollection([]); 
    }

    return (
        <>
            <div className="calculator">
                {/* Display */}
                <div className="display">
                    <span className="previous">{collection}</span> 
                    <span className="current">{result}</span>
                </div> 

                {/* Buttons */}
                <div className="buttons">
                    <button className="btn light" onClick={ClickAC}>AC</button>
                    <button className="btn light">DEL</button>
                    {actions?.map((item:any,index:number) => {
                        return (
                            <button key={index} onClick={() => setCollection([...collection,item.symbol])} className={item.className} >{item.symbol}</button> 
                        )
                    })}

                    <button onClick={handleResult} className="btn equals">=</button>
                </div>
            </div>

            <style jsx>{`
        .calculator {
          width: 320px;
          margin: 50px auto;
          border-radius: 12px;
          background: #1e1e1e;
          padding: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          font-family: sans-serif;
        }

        .display {
          background: #000;
          color: #fff;
          border-radius: 8px;
          padding: 12px;
          min-height: 70px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: right;
          margin-bottom: 16px;
        }

        .previous {
          font-size: 14px;
          color: #aaa;
        }

        .current {
          font-size: 28px;
          font-weight: bold;
          margin-top: 4px;
        }

        .buttons {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }

        .btn {
          height: 60px;
          border-radius: 8px;
          border: none;
          font-size: 18px;
          cursor: pointer;
          background: #2e2e2e;
          color: #fff;
          transition: background 0.2s ease;
        }

        .btn:hover {
          background: #3a3a3a;
        }

        .light {
          background: #9e9e9e;
          color: #000;
        }

        .operator {
          background: #ff9500;
          color: #fff;
        }

        .equals {
          background: #34c759;
          color: #fff;
        }

        .zero {
          grid-column: span 2;
        }
      `}</style>
        </>
    );
};

export default CalculatorApp;
