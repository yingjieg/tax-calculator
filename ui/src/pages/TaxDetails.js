import React from 'react';
import { Table } from 'semantic-ui-react';

function TaxDetails({ taxs }) {
  const getAverageInHand = values => {
    const avg = taxs.reduce((accu, curr) => +curr.in_hand + accu, 0) / 12;

    return avg.toFixed(2);
  };

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
            <Table.Row>
              <Table.Cell colSpan={3} style={{ textAlign: 'right' }}>
                <b>平均月工资：</b>
              </Table.Cell>
              <Table.Cell>
                <b>{getAverageInHand(taxs)}</b>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      )}
    </>
  );
}

export default TaxDetails;
