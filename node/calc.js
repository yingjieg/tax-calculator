function get_tax_rate(total_income) {
  if (total_income <= 0) {
    return [0, 0];
  }

  if (total_income < 36000) {
    return [3, 0];
  }

  if (total_income >= 36000 && total_income < 144000) {
    return [10, 2520];
  }

  if (total_income >= 144000 && total_income < 300000) {
    return [20, 16920];
  }

  if (total_income >= 300000 && total_income < 420000) {
    return [25, 31920];
  }

  if (total_income >= 420000 && total_income < 660000) {
    return [30, 52920];
  }

  if (total_income >= 660000 && total_income < 960000) {
    return [35, 85920];
  }

  if (total_income >= 960000) {
    return [45, 181920];
  }
}

function calc_insurance(salary, config, paid_by = 'individual') {
  const {
    tax_threshold,
    social_ins_base,
    housing_fund_base,
    additional_deduction,
    ...rates
  } = config;

  sib = salary < social_ins_base ? salary : social_ins_base;
  hfb = salary < housing_fund_base ? salary : housing_fund_base;

  const idx = paid_by === 'individual' ? 0 : 1;

  const pension_ins_rate = rates.pension_ins_rate[idx];
  const medical_ins_rate = rates.medical_ins_rate[idx];
  const unemployment_ins_rate = rates.unemployment_ins_rate[idx];
  const housing_fund_rate = rates.housing_fund_rate[idx];
  const supplementary_housing_fund_rate =
    rates.supplementary_housing_fund_rate[idx];

  const pension_ins = (sib * pension_ins_rate) / 100;
  const medical_ins = (sib * medical_ins_rate) / 100;
  const unemployment_ins = (sib * unemployment_ins_rate) / 100;
  const housing_fund = (hfb * housing_fund_rate) / 100;
  const supplementary_housing_fund =
    (hfb * supplementary_housing_fund_rate) / 100;

  const injury_ins = (sib * rates['injury_ins_rate'][idx]) / 100;
  const maternity_ins = (sib * rates['maternity_ins_rate'][idx]) / 100;

  let total =
    pension_ins +
    medical_ins +
    unemployment_ins +
    housing_fund +
    supplementary_housing_fund +
    injury_ins +
    maternity_ins;

  return {
    pension_ins,
    medical_ins,
    unemployment_ins,
    housing_fund,
    supplementary_housing_fund,
    injury_ins,
    maternity_ins,
    total,
  };
}

function calc_tax(salary, social_insurance, config) {
  const { additional_deduction, tax_threshold } = config;

  let total_income = 0;
  let last_tax = 0;

  const taxable_salary =
    salary - tax_threshold - social_insurance - additional_deduction;

  const taxs = [];

  for (let i = 0; i < 12; i++) {
    total_income += taxable_salary;
    let tax = 0;

    const [tax_rate, quick_deduction] = get_tax_rate(total_income);

    tax = (total_income * tax_rate) / 100 - quick_deduction;

    taxs.push(Math.round(tax - last_tax));

    last_tax = tax;
  }

  return taxs;
}

module.exports = {
  calc_insurance,
  calc_tax,
};
