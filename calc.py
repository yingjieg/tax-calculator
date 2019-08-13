# -*- coding: utf-8 -*-

import json


def load_config():
    config = {}

    with open('config.json') as f:
        content = f.read()
        config = json.loads(content)

    return config


def calc_insurance(salary: int, config: dict):
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


def get_tax_rate(total_income: int):
    if total_income <= 0:
        return 0, 0

    if total_income < 36000:
        return 3, 0

    if 36000 <= total_income < 144000:
        return 10, 2520

    if 144000 <= total_income < 300000:
        return 20, 16920

    if 300000 <= total_income < 420000:
        return 25, 31920

    if 420000 <= total_income < 660000:
        return 30, 52920

    if 660000 <= total_income < 960000:
        return 35, 85920

    if total_income >= 960000:
        return 45, 181920


def calc_tax(salary: int, social_insurance: int, config: dict):

    additional_deduction = config['individual']['additional_deduction']
    tax_threshold = config['tax_threshold']

    total_income = 0
    last_tax = 0

    taxable_salary = salary - tax_threshold - social_insurance - additional_deduction

    taxs = []

    for _ in range(0, 12):

        total_income += taxable_salary

        tax = 0

        tax_rate, quick_deduction = get_tax_rate(total_income)

        tax = total_income * tax_rate / 100 - quick_deduction

        taxs.append(round(tax - last_tax, 2))

        last_tax = tax

    return taxs
