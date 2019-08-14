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
const MAX_SOCIAL_INS_BASE = 21396;

const MIN_HOUSING_FUND_BASE = 2300;
const MAX_HOUSING_FUND_BASE = 21400;

function ConfigForm({ config, onCalculate }) {
  const [salary, setSalary] = useState(config.salary);
  const [socialInsBase, setSocialInsBase] = useState(config.social_ins_base);
  const [housingFundBase, setHousingFundBase] = useState(
    config.housing_fund_base
  );
  const [additionalDeduction, setAdditionalDeduction] = useState(
    config.additional_deduction
  );
  const [housingFundChecked, checkHousingFund] = useState(true);
  const [supplHousingFundChecked, checkSupplHousingFund] = useState(false);

  const [housingFundRate, setHousingFundRate] = useState(
    config.housing_fund_rate
  );
  const [supplHousingFundRate, setSupplHousingFundRate] = useState(
    config.supplementary_housing_fund_rate
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

    if (value <= MIN_HOUSING_FUND_BASE) {
      setHousingFundBase(MIN_HOUSING_FUND_BASE);
    } else if (value > MIN_HOUSING_FUND_BASE && value < MAX_HOUSING_FUND_BASE) {
      setHousingFundBase(+value);
    } else if (value >= MAX_HOUSING_FUND_BASE) {
      setHousingFundBase(MAX_HOUSING_FUND_BASE);
    }
  };

  const handleSocialInsBaseChange = e => {
    e.preventDefault();
    setSocialInsBase(+e.target.value);
  };

  const handleHousingFundBaseChange = e => {
    e.preventDefault();
    setHousingFundBase(+e.target.value);
  };

  const handleAdditionalDeductionChange = e => {
    e.preventDefault();
    setAdditionalDeduction(+e.target.value);
  };

  const handleHousingFundCheck = e => {
    if (housingFundChecked) {
      setHousingFundRate(0);
    } else {
      setHousingFundRate(7);
    }

    checkHousingFund(!housingFundChecked);
  };

  const handleSupplHousingFundCheck = e => {
    if (supplHousingFundChecked) {
      setSupplHousingFundRate(0);
    }

    checkSupplHousingFund(!supplHousingFundChecked);
  };

  const handleSupplHousingFundChange = (e, option) => {
    e.preventDefault();
    const { value } = option;
    setSupplHousingFundRate(value);
  };

  const handleCalc = e => {
    e.preventDefault();

    onCalculate({
      ...config,
      salary,
      additional_deduction: additionalDeduction,
      social_ins_base: socialInsBase,
      housing_fund_base: housingFundBase,
      housing_fund_rate: housingFundRate,
      supplementary_housing_fund_rate: supplHousingFundRate,
    });
  };

  return (
    <>
      <label>税前：</label>
      <Input
        value={salary}
        onChange={handleSalaryChange}
      />
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
            <label style={{ width: 120 }}>公积金汇缴基数：</label>
            <input
              value={housingFundBase}
              onChange={handleHousingFundBaseChange}
            />
          </Form.Field>
          <Form.Field inline>
            <label style={{ width: 120 }}>专项扣除：</label>
            <input
              value={additionalDeduction}
              onChange={handleAdditionalDeductionChange}
            />
          </Form.Field>
          <Divider />
          <Form.Field
            control={Checkbox}
            label={{ children: `汇缴公积金 ( ${housingFundRate} % )` }}
            checked={housingFundChecked}
            onChange={handleHousingFundCheck}
          />
          {housingFundChecked && (
            <Form.Group inline>
              <Form.Field
                control={Checkbox}
                label={{ children: '汇缴补充住房公积金' }}
                checked={supplHousingFundChecked}
                onChange={handleSupplHousingFundCheck}
              />
              <Form.Field
                control={Select}
                value={supplHousingFundRate}
                onChange={handleSupplHousingFundChange}
                options={[...Array(8).keys()].map(item => ({
                  key: item + 1,
                  text: `${item + 1} %`,
                  value: item + 1,
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
