import React, { useEffect, useRef, useState } from "react";
import ExpenseItem from "../components/ExpenseItem";
//why use useffect
const Expenses = () => {
  const inputAmountRef = useRef();
  const inputDescRef = useRef();
  const inputCategoryRef = useRef();

    const dummy_expense = []; //why would take this why not add empty array
    const [expense, setExpense] = useState(dummy_expense);

    async function fetchExpense() {
      try {

        const res = await fetch(
          `https://react-http-1fabf-default-rtdb.firebaseio.com/${localStorage.getItem("email")}.json`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(res)
        const data = await res.json();
        if (res.ok) {
          const newdata = [];
          for (let key in data) {
            newdata.push({ id: key, ...data[key] });
            console.log("hai maja data key", data[key]);
          }
          setExpense(newdata);
        } else {
          throw data.error;
        }
      } catch (error) {
        console.log(error.message);
      }
    }
     useEffect(()=>{
        fetchExpense();
     },[]);
     
     const addExpenseHandler = async (event)=>{
        event.preventDefault();
        const obj = {
            amount : inputAmountRef.current.value,
            description : inputDescRef.current.value,
            category : inputCategoryRef.current.value,
        };
        try {
            const res = await fetch(
                `https://react-http-1fabf-default-rtdb.firebaseio.com/${localStorage.getItem("email")}.json`,
                {
                     method : "POST",
                     headers : {
                       "Content-Type" : "application/json", 
                     },
                     body : JSON.stringify(obj),
                }

            );

            const data = await res.json();
            if(res.ok){
                alert("expense added successFUlly");
                inputAmountRef.current.value="";
                inputDescRef.current.value="";
                inputCategoryRef.current.value="";
                await fetchExpense();
            }else{
                throw data.error
            }
        
        } catch(error){
          console.log(error.message);
        }
     }
  
  return (
    <div>
      <form onSubmit={addExpenseHandler}>
        <label htmlFor="amount">Amount</label>
        <input type="number" ref={inputAmountRef} />

        <label htmlFor="description">Description</label>
        <textarea type="text" rows="3" ref={inputDescRef}></textarea>

        <label htmlFor="category">Choose one :</label>
        <select ref={inputCategoryRef}>
          <option value="food">Food</option>
          <option value="gym">Gym</option>
          <option value="rent">Rent</option>
          <option value="others">Others</option>
        </select>
        <button type="submit">Add Expense</button>
      </form>
      <div>All Expense</div>
      <div>
        {expense.map((lagat) => (
          <ExpenseItem key={lagat.id} item={lagat} />
        ))}
      </div>
    </div>
  );
};

export default Expenses;
