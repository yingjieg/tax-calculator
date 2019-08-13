#!/usr/bin/env python
# -*- coding: utf-8 -*-

from __future__ import print_function, division
from calc import load_config, calc_insurance, calc_tax


def print_to_console(salary, config):
    ins = calc_insurance(salary, config)
    ins2 = calc_insurance(salary, config, 'enterprise')

    print('### Social Insurance Details\n')
    print('{:40} {:20} {:20}\n'.format('', 'Individual', 'Enterprise'))
    print(
        '{:30} {:20} {:20}'.format(
            'Pension Insurance', ins['pension_ins'], ins2['pension_ins']
        )
    )
    print(
        '{:30} {:20} {:20}'.format(
            'Medical Insurance', ins['medical_ins'], ins2['medical_ins']
        )
    )
    print(
        '{:30} {:20} {:20}'.format(
            'Unemployment Insurance', ins['unemployment_ins'], ins2['unemployment_ins']
        )
    )
    print(
        '{:30} {:20} {:20}'.format(
            'Housing Fund', ins['housing_fund'], ins2['housing_fund']
        )
    )
    print(
        '{:30} {:20} {:20}'.format(
            'Supplementary Housing Fund',
            ins['supplementary_housing_fund'],
            ins2['supplementary_housing_fund'],
        )
    )
    print('{:30} {:20} {:20}'.format('Injury Insurance', '', ins2['injury_ins']))
    print('{:30} {:20} {:20}'.format('Maternity Insurance', '', ins2['maternity_ins']))

    print('\n{:30} {:20} {:20}'.format('Total', ins['total'], ins2['total']))

    print('\n\n\n### Tax Details\n')

    taxs = calc_tax(salary, ins['total'], config)

    header = map(lambda h: h.center(20), ['Month', 'Tax', 'Insurance', 'In Hand'])

    print('|' + '|'.join(list(header)) + '|')

    for idx, tax in enumerate(taxs):
        total_ins = ins['total']
        in_hand = round(salary - tax - total_ins, 2)
        month = idx + 1

        cols = map(lambda c: str(c).center(20), [month, tax, total_ins, in_hand])

        print('|' + '|'.join(list(cols)) + '|')


if __name__ == '__main__':
    config = load_config('config_v2.json')
    salary = config['salary']

    print_to_console(salary, config)
