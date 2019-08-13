import React, { useState } from 'react';
import InsuranceTable from './InsuranceTable';
import ConfigForm from './ConfigForm';
import config from '../config.json';
import TaxDetails from './TaxDetails';

import { calc_tax, calc_insurance } from '../services/calc';

function Calculator() {
  const [insIndividual, setInsIndividual] = useState(null);
  const [insEnterprise, setInsEnterprise] = useState(null);
  const [taxs, setTaxs] = useState([]);

  const handleCalculate = newConfig => {
    const ins1 = calc_insurance(newConfig);
    const ins2 = calc_insurance(newConfig, 'enterprise');

    const taxs = calc_tax(ins1.total, newConfig).map((item, idx) => ({
      month: idx + 1,
      tax: item,
      social_insurance: ins1.total,
      in_hand: newConfig.salary - item - ins1.total,
    }));

    setInsIndividual(ins1);
    setInsEnterprise(ins2);
    setTaxs(taxs);
  };

  return (
    <div>
      <ConfigForm config={config} onCalculate={handleCalculate} />
      <InsuranceTable individual={insIndividual} enterprise={insEnterprise} />
      <TaxDetails taxs={taxs} />
    </div>
  );
}

export default Calculator;
