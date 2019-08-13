const config = require('./config');
const { calc_insurance, calc_tax } = require('./calc');

function main() {
  const { salary } = config;
  const ins = calc_insurance(salary, config);
  const ins2 = calc_insurance(salary, config, 'enterprise');

  const columns = [
    {
      key: 'pension_ins',
      title: 'Pension Insurance',
    },
    {
      key: 'medical_ins',
      title: 'Medical Insurance',
    },
    {
      key: 'unemployment_ins',
      title: 'Unemployment Insurance',
    },
    {
      key: 'housing_fund',
      title: 'Housing Fund',
    },
    {
      key: 'supplementary_housing_fund',
      title: 'Supplementary Housing Fund',
    },
    {
      key: 'injury_ins',
      title: 'Injury Insurance',
    },
    {
      key: 'maternity_ins',
      title: 'Maternity Insurance',
    },
    {
      key: 'total',
      title: 'Total',
    },
  ];

  console.log('### Social Insurance Details\n');
  console.log(
    `${''}`.padEnd(30) +
      'Individual'.padEnd(20) +
      'Enterprise'.padEnd(20) +
      '\n'
  );
  columns.forEach(col => {
    const { key, title } = col;
    console.log(
      title.padEnd(30) + `${ins[key]}`.padEnd(20) + `${ins2[key]}`.padEnd(20)
    );
  });

  const taxs = calc_tax(salary, ins.total, config);

  const headers = ['Month', 'Tax', 'Insurance', 'In Hand'].map(item =>
    item.padEnd(20)
  );

  console.log('\n\n\n### Tax Details\n');
  console.log('|' + headers.join('|') + '|');
  taxs.forEach((tax, idx) => {
    const total_ins = ins['total'];
    const in_hand = Math.round(salary - tax - total_ins);
    const month = idx + 1;

    const cols = [month, tax, total_ins, in_hand].map(item =>
      ('' + item).padEnd(20)
    );
    console.log('|' + cols.join('|') + '|');
  });
}

main();
