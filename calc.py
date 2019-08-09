#!/usr/bin/env python

import json


def load_config():
    config = {}

    with open('config.json') as f:
        content = f.read()
        config = json.loads(content)

    return config


def calc_insurance(salary, config):
    social_ins_base = config['social_ins_base']
    housing_fund_base = config['housing_fund_base']

    sib = salary if salary < social_ins_base else social_ins_base
    hfb = salary if salary < housing_fund_base else housing_fund_base

    individual = config['individual']

    pension_ins_rate = individual['pension_ins_rate']
    medical_ins_rate = individual['medical_ins_rate']
    unemployment_ins_rate = individual['unemployment_ins_rate']
    housing_fund_rate = individual['housing_fund_rate']
    supplementary_housing_fund_rate = individual['supplementary_housing_fund_rate']

    pension_ins = sib * pension_ins_rate / 100
    medical_ins = sib * medical_ins_rate / 100
    unemployment_ins = sib * unemployment_ins_rate / 100
    housing_fund = hfb * housing_fund_rate / 100
    supplementary_housing_fund = hfb * supplementary_housing_fund_rate / 100

    return {
        'pension_insurance': pension_ins,
        'medical_insurance': medical_ins,
        'unemployment_insurance': unemployment_ins,
        'housing_fund': housing_fund,
        'supplementary_housing_fund': supplementary_housing_fund,
        'total': pension_ins
        + medical_ins
        + unemployment_ins
        + housing_fund
        + supplementary_housing_fund,
    }


def calc_tax(salary, social_insurance, config):

    additional_deduction = config['individual']['additional_deduction']
    tax_threshold = config['tax_threshold']

    income_total = 0
    last_tax = 0

    taxable_salary = salary - tax_threshold - social_insurance - additional_deduction

    taxs = []

    for _ in range(0, 12):

        income_total += taxable_salary

        tax = 0

        if income_total < 0:
            tax = 0

        elif income_total < 36000:
            tax = income_total * 3 / 100

        elif 36000 <= income_total < 144000:
            tax = income_total * 10 / 100 - 2520

        elif 144000 <= income_total < 300000:
            tax = income_total * 20 / 100 - 16920

        elif 300000 <= income_total < 420000:
            tax = income_total * 25 / 100 - 31920

        elif 420000 <= income_total < 660000:
            tax = income_total * 30 / 100 - 52920

        elif 660000 <= income_total < 960000:
            tax = income_total * 35 / 100 - 85920

        elif income_total >= 960000:
            tax = income_total * 45 / 100 - 181920

        taxs.append(round(tax - last_tax, 2))

        last_tax = tax

    return taxs
