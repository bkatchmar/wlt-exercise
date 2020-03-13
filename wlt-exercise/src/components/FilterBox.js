import React, { Component } from "react"
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';


const renderBadges = (props) => {
  return props.symbolsToFilter.map((sym, idx) => {
    return(
      <Badge
        className='filter-badge'
        variant="primary"
        key={'b'+idx}
        value={sym}
        onClick={props.handleFilterDeletion}
      >
        {sym}
      </Badge>
    )
  })
}

const FilterBox = (props) => {
  return (
    <Card className='text-center filter-box currency-table--filter'>
      <form onSubmit={props.handleFilterSubmit}>
        <label>Filter Currency</label><br/>
        <input
          type='tx'
          value={props.filterInput}
          onChange={props.handleFilterInput}
          placeholder="ex. USD"
          />
      </form>
      <Card.Body className="filter-box-body">
        {renderBadges(props)}
      </Card.Body>
    </Card>
  )
}


export default FilterBox;
