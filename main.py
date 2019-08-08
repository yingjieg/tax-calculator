pension_insurance = 8
medical_insurance = 2
unemployment_insurance = 0.5
housing_fund = 7


salary = 25000

social_insurance_base = 24633
housing_fund_base = 23496


sib = salary if salary < social_insurance_base else social_insurance_base
hfb = salary if salary < housing_fund_base else housing_fund_base


pension = sib * pension_insurance / 100
medical = sib * medical_insurance / 100
unemployment = sib * unemployment_insurance / 100
housing = hfb * housing_fund / 100

total_insurance = pension + medical + unemployment + housing

print('Pension Insurance       -     {}'.format(pension))
print('Medical Insurance       -     {}'.format(medical))
print('Unemployment Insurance  -     {}'.format(unemployment))
print('Housing Fund            -     {}'.format(housing))


income_total = 0
last_tax = 0

for idx in range(0, 12):
    taxable_salary = salary - 5000 - total_insurance - 3500

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

    print('tax on {} is {}'.format(idx + 1, tax - last_tax))

    last_tax = tax
