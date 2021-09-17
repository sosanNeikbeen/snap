import React, { useState } from "react";

const Tabs = ({ tabs, className }) => {
  const [active, setActive] = useState(0);

  const handleOnTabClick = (active) => {
    setActive(active);
  };
  const ActivePanel = tabs[active].component;

  return (
    <div>
      <div className={`tabs ${className}`} style={{ marginBottom: "0" }}>
        <ul>
          {tabs.map((tab, i) => (
            <li
              key={`tab-${i}`}
              className={i === active ? "is-active" : ""}
              onClick={() => handleOnTabClick(i)}
            >
              <a href="#/">{tab.label}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="pt-5">
        <ActivePanel />
      </div>
    </div>
  );
};

export default Tabs;
