import React from "react";
import { Table } from "semantic-ui-react";

import { numberWithCommas } from "../services/utils";

function TaxDetails({ taxs }) {
  const getAverageInHand = (values) => {
    const avg = taxs.reduce((accu, curr) => +curr.in_hand + accu, 0) / 12;

    return avg.toFixed(2);
  };

  const getAverageTax = (values) => {
    const avg = taxs.reduce((accu, curr) => +curr.tax + accu, 0) / 12;

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
            {taxs.map((item) => (
              <Table.Row key={item.month}>
                <Table.Cell>{item.month}</Table.Cell>
                <Table.Cell>{numberWithCommas(item.tax)}</Table.Cell>
                <Table.Cell>
                  {numberWithCommas(item.social_insurance)}
                </Table.Cell>
                <Table.Cell>{numberWithCommas(item.in_hand)}</Table.Cell>
              </Table.Row>
            ))}
            <Table.Row>
              <Table.Cell style={{ textAlign: "right" }}>
                <b>平均月个税：</b>
              </Table.Cell>
              <Table.Cell>
                <b>{getAverageTax(getAverageInHand(taxs))}</b>
              </Table.Cell>
              <Table.Cell colSpan={1} style={{ textAlign: "right" }}>
                <b>平均月工资：</b>
              </Table.Cell>
              <Table.Cell>
                <b>{numberWithCommas(getAverageInHand(taxs))}</b>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      )}
    </>
  );
}

export default TaxDetails;
