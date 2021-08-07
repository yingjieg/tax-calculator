import React from "react";
import { Table, Label } from "semantic-ui-react";

import { numberWithCommas } from "../services/utils";

const floatRight = {
  float: "right",
  minWidth: 64,
};

function InsuranceTable({ individual, enterprise, config }) {
  return (
    <>
      {individual && enterprise && (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>个人缴纳部分</Table.HeaderCell>
              <Table.HeaderCell>单位缴纳部分</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>养老保险金：</Table.Cell>
              <Table.Cell>
                <span>{individual.pension_ins}</span>
                <Label style={floatRight} basic>
                  {config.pension_ins_pct[0]} %
                </Label>
              </Table.Cell>
              <Table.Cell>
                <span>{enterprise.pension_ins}</span>
                <Label style={floatRight} basic>
                  {config.pension_ins_pct[1]} %
                </Label>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>医疗保险金：</Table.Cell>
              <Table.Cell>
                <span>{individual.medical_ins}</span>
                <Label style={floatRight} basic>
                  {config.medical_ins_pct[0]} %
                </Label>
              </Table.Cell>
              <Table.Cell>
                <span>{enterprise.medical_ins}</span>
                <Label style={floatRight} basic>
                  {config.medical_ins_pct[1]} %
                </Label>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>失业保险金：</Table.Cell>
              <Table.Cell>
                <span>{individual.unemployment_ins}</span>
                <Label style={floatRight} basic>
                  {config.unemployment_ins_pct[0]} %
                </Label>
              </Table.Cell>
              <Table.Cell>
                <span>{enterprise.unemployment_ins}</span>
                <Label style={floatRight} basic>
                  {config.unemployment_ins_pct[1]} %
                </Label>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>基本住房公积金：</Table.Cell>
              <Table.Cell>
                <span>{individual.housing_fund}</span>
                <Label style={floatRight} basic>
                  {config.housing_fund_pct} %
                </Label>
              </Table.Cell>
              <Table.Cell>
                <span>{enterprise.housing_fund}</span>
                <Label style={floatRight} basic>
                  {config.housing_fund_pct} %
                </Label>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>补充住房公积金：</Table.Cell>
              <Table.Cell>
                <span>{individual.supplementary_housing_fund}</span>
                <Label style={floatRight} basic>
                  {config.supplementary_housing_fund_pct} %
                </Label>
              </Table.Cell>
              <Table.Cell>
                <span>{enterprise.supplementary_housing_fund}</span>
                <Label style={floatRight} basic>
                  {config.supplementary_housing_fund_pct} %
                </Label>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>工伤保险金：</Table.Cell>
              <Table.Cell />
              <Table.Cell>
                <span>{enterprise.injury_ins}</span>
                <Label style={floatRight} basic>
                  {config.injury_ins_pct[1]} %
                </Label>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>生育保险金：</Table.Cell>
              <Table.Cell />
              <Table.Cell>
                <span>{enterprise.maternity_ins}</span>
                <Label style={floatRight} basic>
                  {config.maternity_ins_pct[1]} %
                </Label>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Label ribbon>共计支出：</Label>
              </Table.Cell>
              <Table.Cell>
                <b>{numberWithCommas(individual.total)}</b>
              </Table.Cell>
              <Table.Cell>
                <b>{numberWithCommas(enterprise.total)}</b>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      )}
    </>
  );
}

export default InsuranceTable;
