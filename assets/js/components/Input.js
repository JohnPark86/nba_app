import React from 'react'
import { connect } from 'react-redux'
import { addSearchParam } from '../redux/actions'

let AddSearchParam = ({ dispatch }) => {

let input

 return (
    <div>
    	<form onSubmit={e => {
        	e.preventDefault()
            if (!input.value.trim()) {
            	return
          	}
          	dispatch(AddSearchParam(input.value))
          	input.value = ''
        }}>
        <input ref={node => {
            input = node
          }}
        />
        <button type="submit">
          Search
        </button>
      </form>
    </div>
  )
}
AddSearchParam = connect()(AddSearchParam)

export default AddSearchParam