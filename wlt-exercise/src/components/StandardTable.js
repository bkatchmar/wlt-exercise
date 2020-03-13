import React, { Component } from "react"
import Table from 'react-bootstrap/Table';


const renderTableHeaders = (props) => {
  return props.tableHeaders.map((header, index) => {
    return(<th key={'th'+index}>{header}</th>)
  })
}

const renderTableRows = (props) => {
  return props.tableData.map((data, index) => {
    let values = Object.values(data)
    let tableData = values.map((val, idx) => <td key={'tr'+idx}>{val}</td>)
    return(<tr key={'tr'+index}>{tableData}</tr>)
  })
}

const StandardTable = (props) => {
  return (
    <Table striped bordered hover className='standard-table--small currency-table--table'>
      <thead>
        <tr>
          {renderTableHeaders(props)}
        </tr>
      </thead>
      <tbody>
        {renderTableRows(props)}
      </tbody>
    </Table>
  );
}


export default StandardTable;
