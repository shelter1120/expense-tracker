import React, { useRef } from 'react'

const Expenses = () => {
  const inputAmountRef = useRef();
  const inputDescRef = useRef();
  const inputCategoryRef = useRef();

  const addExpenseHandler = (event)=>{
   event.preventDefault();
   console.log(inputDescRef.current.value)
  }
  return (
    <div> 
    <form onSubmit={addExpenseHandler}>
        <label htmlFor='amount'>Amount</label>
      <input type="number" ref={inputAmountRef} />

      <label htmlFor='description'>Description</label> 
      <textarea type="text" rows="3" ref={inputDescRef}></textarea> 

      <label htmlFor='category'>Choose one :</label>
      <select ref={inputCategoryRef}>
        <option value="food">Food</option>
        <option value="gym">Gym</option>
        <option value="rent">Rent</option>
        <option value="others">Others</option>
      </select>
      <button type='submit'>Add Expense</button>
    </form>
    <div>All Expense</div>
    </div>
    
  )
}

export default Expenses