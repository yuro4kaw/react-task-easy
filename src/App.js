import './App.css';
import React, { useEffect, useState } from 'react';
import Select from './Components/Select';
import s from "./Components/Style.module.css"
import axios from "axios";
import Header from './Components/Header';

function App(props) {
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("UAH");
  const [values, setValues] = useState({});

  useEffect(() => {
    axios.get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5")
      .then(response => {
        let values = { USD: Math.round(response.data[0].sale * 1000) / 1000, EUR: Math.round(response.data[1].sale * 1000) / 1000, UAH: 1 };
        setValues(values);
      });
  })

  useEffect(() => {
    if (!!values) {
      handleAmount1Change(1);
    }
  }, [Object.keys(values)])

  function format(num) {
      return num.toFixed(4)
  }

  function handleAmount1Change(amount1) {
      setAmount2(format(amount1 * values[currency1] / values[currency2]))
      setAmount1(amount1);
  }

  function handleCurrency1Change(currency1) {
      setAmount2(format(amount1 * values[currency1] / values[currency2]))
      setCurrency1(currency1);
  }

  function handleAmount2Change(amount2) {
      setAmount1(format(amount2 * values[currency2] / values[currency1]))
      setAmount2(amount2);
  }

  function handleCurrency2Change(currency2) {
      setAmount1(format(amount2 * values[currency2] / values[currency1]))
      setCurrency2(currency2);
  }

  return (<div>
    <Header values={ values} />
      <div className={s.select}>
          <Select
              currencies={values}
              amount={amount1}
              currency={currency1}
              onAmountChange={handleAmount1Change}
              onCurrencyChange={handleCurrency1Change} />
          <Select
              currencies={values}
              amount={amount2}
              currency={currency2}
              onAmountChange={handleAmount2Change}
              onCurrencyChange={handleCurrency2Change} />
      </div></div>
  );
}

export default App;
