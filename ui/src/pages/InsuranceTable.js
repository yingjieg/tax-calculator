import React from 'react';
import { Table, Label } from 'semantic-ui-react';

function InsuranceTable({ individual, enterprise }) {
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
              <Table.Cell>{individual.pension_ins}</Table.Cell>
              <Table.Cell>{enterprise.pension_ins}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>医疗保险金：</Table.Cell>
              <Table.Cell>{individual.medical_ins}</Table.Cell>
              <Table.Cell>{enterprise.medical_ins}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>失业保险金：</Table.Cell>
              <Table.Cell>{individual.unemployment_ins}</Table.Cell>
              <Table.Cell>{enterprise.unemployment_ins}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>基本住房公积金：</Table.Cell>
              <Table.Cell>{individual.housing_fund}</Table.Cell>
              <Table.Cell>{enterprise.housing_fund}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>补充住房公积金：</Table.Cell>
              <Table.Cell>{individual.supplementary_housing_fund}</Table.Cell>
              <Table.Cell>{enterprise.supplementary_housing_fund}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>工伤保险金：</Table.Cell>
              <Table.Cell />
              <Table.Cell>{enterprise.injury_ins}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>生育保险金：</Table.Cell>
              <Table.Cell />
              <Table.Cell>{enterprise.maternity_ins}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Label ribbon>共计支出：</Label>
              </Table.Cell>
              <Table.Cell>{individual.total}</Table.Cell>
              <Table.Cell>{enterprise.total}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      )}
    </>
  );
}

export default InsuranceTable;
