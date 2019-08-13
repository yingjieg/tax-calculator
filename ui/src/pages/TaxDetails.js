import React from 'react';
import { Table } from 'semantic-ui-react';

function TaxDetails({ taxs }) {
  return (
    <>
      {taxs.length > 0 && (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>月份</Table.HeaderCell>
              <Table.HeaderCell>缴纳个税</Table.HeaderCell>
              <Table.HeaderCell>缴纳社保</Table.HeaderCell>
              <Table.HeaderCell>实发工资</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {taxs.map(item => (
              <Table.Row key={item.month}>
                <Table.Cell>{item.month}</Table.Cell>
                <Table.Cell>{item.tax}</Table.Cell>
                <Table.Cell>{item.social_insurance}</Table.Cell>
                <Table.Cell>{item.in_hand}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </>
  );
}

export default TaxDetails;
