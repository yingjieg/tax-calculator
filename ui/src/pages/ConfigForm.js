import React, { useState } from 'react';

import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  Segment,
  Select,
} from 'semantic-ui-react';

const MIN_SOCIAL_INS_BASE = 4279;
const MAX_SOCIAL_INS_BASE = 24633;

function ConfigForm({ config, onCalculate }) {
  const [salary, setSalary] = useState(config.salary);

  const [socialInsBase, setSocialInsBase] = useState(config.social_ins_base);

  const [additionalDeduction, setAdditionalDeduction] = useState(
    config.additional_deduction
  );
  const [housingFundChecked, checkHousingFund] = useState(true);
  const [supplHousingFundChecked, checkSupplHousingFund] = useState(false);

  const [housingFundPct, setHousingFundPct] = useState(config.housing_fund_pct);
  const [supplHousingFundPct, setSupplHousingFundPct] = useState(
    config.supplementary_housing_fund_pct
  );

  const handleSalaryChange = e => {
    e.preventDefault();
    const { value } = e.target;

    setSalary(+value);

    if (value <= MIN_SOCIAL_INS_BASE) {
      setSocialInsBase(MIN_SOCIAL_INS_BASE);
    } else if (value > MIN_SOCIAL_INS_BASE && value < MAX_SOCIAL_INS_BASE) {
      setSocialInsBase(+value);
    } else if (value >= MAX_SOCIAL_INS_BASE) {
      setSocialInsBase(MAX_SOCIAL_INS_BASE);
    }
  };

  const handleSocialInsBaseChange = e => {
    e.preventDefault();
    setSocialInsBase(+e.target.value);
  };

  const handleAdditionalDeductionChange = e => {
    e.preventDefault();
    setAdditionalDeduction(+e.target.value);
  };

  const handleHousingFundCheck = e => {
    if (housingFundChecked) {
      setHousingFundPct(0);
      setSupplHousingFundPct(0);
    } else {
      setHousingFundPct(7);
    }

    checkHousingFund(!housingFundChecked);
  };

  const handleSupplHousingFundCheck = e => {
    if (supplHousingFundChecked) {
      setSupplHousingFundPct(0);
    } else {
      setSupplHousingFundPct(5);
    }

    checkSupplHousingFund(!supplHousingFundChecked);
  };

  const handleHousingFundChange = (e, option) => {
    e.preventDefault();
    const { value } = option;
    setHousingFundPct(value);
  };

  const handleSupplHousingFundChange = (e, option) => {
    e.preventDefault();
    const { value } = option;
    setSupplHousingFundPct(value);
  };

  const handleCalc = e => {
    e.preventDefault();

    onCalculate({
      ...config,
      salary,
      additional_deduction: additionalDeduction,
      social_ins_base: socialInsBase,
      housing_fund_pct: housingFundPct,
      supplementary_housing_fund_pct: supplHousingFundPct,
    });
  };

  return (
    <>
      <label>税前：</label>
      <Input value={salary} onChange={handleSalaryChange} />
      <Button onClick={handleCalc} style={{ marginLeft: 20 }}>
        计算
      </Button>
      <Segment>
        <Form>
          <Form.Field inline>
            <label style={{ width: 120 }}>社保汇缴基数：</label>
            <input value={socialInsBase} onChange={handleSocialInsBaseChange} />
          </Form.Field>
          <Form.Field inline>
            <label style={{ width: 120 }}>专项扣除：</label>
            <input
              value={additionalDeduction}
              onChange={handleAdditionalDeductionChange}
            />
          </Form.Field>
          <Divider />
          <Form.Group inline>
            <Form.Field
              control={Checkbox}
              label={{ children: '汇缴住房公积金' }}
              checked={housingFundChecked}
              onChange={handleHousingFundCheck}
            />
            <Form.Field
              control={Select}
              value={housingFundPct}
              onChange={handleHousingFundChange}
              options={[7, 6, 5].map(item => ({
                key: item,
                text: `${item} %`,
                value: item,
              }))}
            />
          </Form.Group>
          {housingFundChecked && (
            <Form.Group inline>
              <Form.Field
                control={Checkbox}
                label={{ children: '汇缴补充公积金' }}
                checked={supplHousingFundChecked}
                onChange={handleSupplHousingFundCheck}
              />
              <Form.Field
                control={Select}
                value={supplHousingFundPct}
                onChange={handleSupplHousingFundChange}
                options={[5, 4, 3, 2, 1].map(item => ({
                  key: item,
                  text: `${item} %`,
                  value: item,
                }))}
                disabled={!supplHousingFundChecked}
              />
            </Form.Group>
          )}
        </Form>
      </Segment>
    </>
  );
}

export default ConfigForm;
