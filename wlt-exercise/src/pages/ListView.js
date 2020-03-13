import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import StandardDropDown from '../components/StandardDropDown'
import StandardTable from '../components/StandardTable'
import FilterBox from '../components/FilterBox'
import Navbar from 'react-bootstrap/Navbar';
import axios from "axios";

class ListView extends Component {
  state = {
    hasError: false,
    currencyRates: [],
    selectedSymbol: "",
    currencySymbols: [],
    symbolsToFilter: [],
    filterInput: "",
  };

  componentDidMount() {
    this.updateBaseCurrency('EUR')
  }

  updateBaseCurrency = (sym) => {
    axios.get(`https://api.ratesapi.io/api/latest?base=${sym}`)
      .then(resp => {
        let currencySymbols = Object.keys(resp.data.rates).sort()
        let currencyRates = currencySymbols.map((sym) => {
          return { 'symbol': sym, 'rate': resp.data.rates[sym] }
        })
        let selectedSymbol = resp.data.base

        currencySymbols = [selectedSymbol, ...currencySymbols]
        this.setState({ currencyRates, currencySymbols, selectedSymbol })
      })
      .catch(err => this.setState({ hasError: true }))
  }

  handleBaseCurrencyChange = (event) => {
    let sym = event.target.value
    this.updateBaseCurrency(sym)
  }

  handleFilterInput = (event) => {
    let filterInput = event.target.value.toUpperCase()
    this.setState({ filterInput })
  }

  handleFilterSubmit = (event) => {
    event.preventDefault()
    if (this.state.currencySymbols.includes(this.state.filterInput)) {
      this.setState({
        symbolsToFilter: [this.state.filterInput, ...this.state.symbolsToFilter],
        filterInput: ""
      })
    } else {
      this.setState({ filterInput: "" })
    }
  }

  handleFilterDeletion = (event) => {
    let symbolsToFilter = this.state.symbolsToFilter.filter((s)=>{
      return event.target.innerText !== s
    })
    this.setState({ symbolsToFilter })
  }

  handleTableData = () => {
    if (!!this.state.filterInput) {
      return this.state.currencyRates.filter((cr) => {
        return cr.symbol.toUpperCase().startsWith(this.state.filterInput)
      })
    } else if (this.state.symbolsToFilter.length !== 0) {
        return this.state.currencyRates.filter((cr) => {
          return this.state.symbolsToFilter.includes(cr.symbol.toUpperCase())
        })
    } else {
      return this.state.currencyRates
    }
  }




  render() {
    if (!this.state.hasError) {
      return (
        <div className='list-view-container'>
          <Navbar bg="dark" variant="dark" className='justify-content-center'>
            <Navbar.Brand>Select Base Currency</Navbar.Brand>
            <StandardDropDown
              changeFunction={this.handleBaseCurrencyChange}
              list={this.state.currencySymbols}
            />
          </Navbar>

          <div className='currency-table'>
            <StandardTable
              tableHeaders={['Symbol', 'Price']}
              tableData={this.handleTableData()}
            />

            <FilterBox
              handleFilterInput={this.handleFilterInput}
              handleFilterSubmit={this.handleFilterSubmit}
              filterInput={this.state.filterInput}
              symbolsToFilter={this.state.symbolsToFilter}
              handleFilterDeletion={this.handleFilterDeletion}
            />
          </div>
        </div>
      )
    } else {
        return (<Redirect to="/500" />);
    }
  }
}

export default ListView;
