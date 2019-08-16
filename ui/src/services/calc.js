function get_tax_pct(total_income) {
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

const HOUSING_FUND_PCT = {
  basic: {
    7: [338, 3290],
    6: [290, 2820],
    5: [242, 2350],
  },
  suppl: {
    5: [242, 2350],
    4: [194, 1880],
    3: [146, 1410],
    2: [96, 940],
    1: [48, 470],
  },
};

function get_housing_fund(config) {
  const {
    social_ins_base,
    housing_fund_pct,
    supplementary_housing_fund_pct,
  } = config;

  const _get_housing_fund = (type, pct) => {
    let amount = 0;

    if (HOUSING_FUND_PCT[type][pct]) {
      const [min, max] = HOUSING_FUND_PCT[type][pct];
      const v = (social_ins_base * pct) / 100;

      if (v <= min / 2) {
        amount = min / 2;
      } else if (v >= max / 2) {
        amount = max / 2;
      } else {
        amount = v;
      }
    }

    return amount;
  };

  const housing_fund = _get_housing_fund('basic', housing_fund_pct);
  const suppl_housing_fund = _get_housing_fund(
    'suppl',
    supplementary_housing_fund_pct
  );

  return [housing_fund, suppl_housing_fund];
}

export function calc_insurance(config, paid_by = 'individual') {
  const {
    salary,
    tax_threshold,
    social_ins_base,
    housing_fund_base,
    additional_deduction,
    ...rest_pcts
  } = config;

  const sib = salary < social_ins_base ? salary : social_ins_base;

  const idx = paid_by === 'individual' ? 0 : 1;

  const pension_ins_pct = rest_pcts.pension_ins_pct[idx];
  const medical_ins_pct = rest_pcts.medical_ins_pct[idx];
  const unemployment_ins_pct = rest_pcts.unemployment_ins_pct[idx];

  const pension_ins = (sib * pension_ins_pct) / 100;
  const medical_ins = (sib * medical_ins_pct) / 100;
  const unemployment_ins = (sib * unemployment_ins_pct) / 100;
  const [housing_fund, supplementary_housing_fund] = get_housing_fund(config);

  const injury_ins = (sib * rest_pcts['injury_ins_pct'][idx]) / 100;
  const maternity_ins = (sib * rest_pcts['maternity_ins_pct'][idx]) / 100;

  let total =
    pension_ins +
    medical_ins +
    unemployment_ins +
    housing_fund +
    supplementary_housing_fund +
    injury_ins +
    maternity_ins;

  return {
    pension_ins: pension_ins.toFixed(2),
    medical_ins: medical_ins.toFixed(2),
    unemployment_ins: unemployment_ins.toFixed(2),
    housing_fund: housing_fund.toFixed(2),
    supplementary_housing_fund: supplementary_housing_fund.toFixed(2),
    injury_ins: injury_ins.toFixed(2),
    maternity_ins: maternity_ins.toFixed(2),
    total: total.toFixed(2),
  };
}

export function calc_tax(social_insurance, config) {
  const { salary, additional_deduction, tax_threshold } = config;

  let total_income = 0;
  let last_tax = 0;

  const taxable_salary =
    salary - tax_threshold - social_insurance - additional_deduction;

  const taxs = [];

  for (let i = 0; i < 12; i++) {
    total_income += taxable_salary;
    let tax = 0;

    const [tax_pct, quick_deduction] = get_tax_pct(total_income);

    tax = (total_income * tax_pct) / 100 - quick_deduction;

    taxs.push((tax - last_tax).toFixed(2));

    last_tax = tax;
  }

  return taxs;
}
