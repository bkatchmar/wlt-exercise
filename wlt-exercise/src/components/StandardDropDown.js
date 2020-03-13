import React from "react"


const createDropDownItems = (list) => {
  return list.map((sym) => {
    return <option value={sym} key={sym + 1}>{sym}</option>
  })
}

const StandardDropDown = ({ list, changeFunction }) => {
  return(
    <select onChange={changeFunction} id="dropdown-item-button">
      {createDropDownItems(list)}
    </select>
  )
}


export default StandardDropDown
