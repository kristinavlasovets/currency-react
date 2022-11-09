import React, { useEffect, useState, useRef } from "react";
import { Block } from "./components/Block";
import { getData } from "./services/WebService";

export const App = () => {
  const [fromCurrency, setFromCurrency] = useState("BYN");
  const [toCurrency, setToCurrency] = useState("USD");
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(1);

  const ratesRef = useRef({});

  useEffect(() => {
    const getRates = async () => {
      const data = await getData("https://cdn.cur.su/api/latest.json");
      ratesRef.current = data.rates;
      onChangeToPrice(1);
    };
    getRates();
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setFromPrice(value);
    setToPrice(result.toFixed(2));
  };
  const onChangeToPrice = (value) => {
    const price = value / ratesRef.current[toCurrency];
    const result = price * ratesRef.current[fromCurrency];
    setToPrice(value);
    setFromPrice(result.toFixed(2));
  };

  useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);

  return (
    <div className="app">
      <div className="textblock">
        <h1>Always get the real exchange rate</h1>
        <p>Banks markup the exchange rate when you spend or transfer money abroad. We don't.</p>
      </div>
      <div className="mainblock">
        <Block
          value={fromPrice}
          currency={fromCurrency}
          result
          onChangeCurrency={setFromCurrency}
          onChangeValue={onChangeFromPrice}
        />
        <Block
          value={toPrice}
          currency={toCurrency}
          onChangeCurrency={setToCurrency}
          onChangeValue={onChangeToPrice}
        />
      </div>
    </div>
  );
};
