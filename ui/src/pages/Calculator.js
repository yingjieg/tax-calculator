import React, { useState } from "react";

import InsuranceTable from "./InsuranceTable";
import ConfigForm from "./ConfigForm";
import TaxDetails from "./TaxDetails";

import config from "../config.json";
import { calc_tax, calc_insurance } from "../services/calc";

function Calculator() {
  const [insIndividual, setInsIndividual] = useState(null);
  const [insEnterprise, setInsEnterprise] = useState(null);
  const [taxs, setTaxs] = useState([]);
  const [cfg, setCfg] = useState(config);

  const handleCalculate = (newConfig) => {
    const ins1 = calc_insurance(newConfig);
    const ins2 = calc_insurance(newConfig, "enterprise");

    setCfg(newConfig);

    const taxs = calc_tax(ins1.total, newConfig).map((item, idx) => ({
      month: idx + 1,
      tax: item,
      social_insurance: ins1.total,
      in_hand: (newConfig.salary - item - ins1.total).toFixed(2),
    }));

    setInsIndividual(ins1);
    setInsEnterprise(ins2);
    setTaxs(taxs);

    console.log(newConfig);
  };

  return (
    <div style={{ maxWidth: 768, margin: "0 auto" }}>
      <ConfigForm config={config} onCalculate={handleCalculate} />
      <InsuranceTable
        individual={insIndividual}
        enterprise={insEnterprise}
        config={cfg}
      />
      <TaxDetails taxs={taxs} />
    </div>
  );
}

export default Calculator;
