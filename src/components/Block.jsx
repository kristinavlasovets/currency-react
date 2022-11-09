import React from "react";

const defaultCurrencies = ["BYN", "USD", "EUR", "GBP"];

export const Block = ({ value, currency, onChangeValue, onChangeCurrency }) => {
  return (
    <div className="block">
      <ul className="currencies">
        {defaultCurrencies.map((item) => (
          <li
            key={item}
            onClick={() => onChangeCurrency(item)}
            className={currency === item ? "currency-active" : ""}
          >
            {item}
          </li>
        ))}
      </ul>
      <input onChange={(e) => onChangeValue(e.target.value)} className="input" type="number" value={value} placeholder={0}/>
    </div>
  );
};
