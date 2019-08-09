from calc import load_config, calc_insurance, calc_tax


def print_to_console():
    config = load_config()

    salary = config['salary']

    ins = calc_insurance(salary, config)
    print('### Social Insurance Details\n')
    print('Pension Insurance           -     {}'.format(ins['pension_insurance']))
    print('Medical Insurance           -     {}'.format(ins['medical_insurance']))
    print('Unemployment Insurance      -     {}'.format(ins['unemployment_insurance']))
    print('Housing Fund                -     {}'.format(ins['housing_fund']))
    print('Supplementary Housing Fund  -     {}'.format(ins['supplementary_housing_fund']))
    print('\nTotal                       -     {}'.format(ins['total']))

    print('\n\n\n### Tax Details\n')

    taxs = calc_tax(salary, ins['total'], config)

    header = map(lambda h: h.center(20), ['Month', 'Tax', 'Insurance', 'In Hande'])

    print('|' + '|'.join(list(header)) + '|')

    for idx, tax in enumerate(taxs):
        total_ins = ins['total']
        in_hand = round(salary - tax - total_ins, 2)
        month = idx + 1

        cols = map(lambda c: str(c).center(20), [month, tax, total_ins, in_hand])

        print('|' + '|'.join(list(cols)) + '|')


if __name__ == '__main__':
    print_to_console()
