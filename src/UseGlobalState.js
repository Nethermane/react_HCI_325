import React from "react";
import { createContext, useReducer, useContext } from "react";
const SET_ACCOUNTS = "SET_ACCOUNTS";
const SET_INCOME = "SET_INCOME";
const SET_EXPENSES = "SET_EXPENSES";
const SET_GOAL = "SET_GOAL";
const SET_CATEGORY = "SET_CATEGORY";

const GlobalStateContext = createContext();

const initialState = {
  accounts: [
    { id: 1, name: "Savings", amount: "1000" },
    { id: 2, name: "Credit", amount: "1000" },
    { id: 3, name: "Cash", amount: "1000" }
  ],
  incomes: [
    {
      id: 1,
      name: "income1",
      amount: "1000",
      date: "01/01",
      frequency: "monthly"
    }
  ],
  expenses: [
    {
      id: 1,
      name: "netflix",
      amount: "7",
      date: "01/01",
      frequency: "monthly"
    }
  ],
  goals: [{ id: 1, name: "phone", frequency: "monthly", amount: "100" }],
  category: [{ id: 1, name: "food", max: 200 }]
};

const globalStateReducer = (state, action) => {
  switch (action.type) {
    case SET_INCOME:
      return {
        ...state,
        incomes: { ...action.payload }
      };

    case SET_ACCOUNTS:
      return {
        ...state,
        accounts: { ...action.payload }
      };

    case SET_EXPENSES:
      return {
        ...state,
        expenses: { ...action.payload }
      };

    case SET_GOAL:
      return {
        ...state,
        goals: { ...action.payload }
      };

    case SET_CATEGORY:
      return {
        ...state,
        categories: { ...action.payload }
      };

    default:
      return state;
  }
};

export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalStateReducer, initialState);

  return (
    <GlobalStateContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalStateContext.Provider>
  );
};

const useGlobalState = () => {
  const [state, dispatch] = useContext(GlobalStateContext);
  //array of id, name, amount
  const setAccounts = (a) => {
    dispatch({
      type: SET_ACCOUNTS,
      payload: a
    });
  };
  //array of  id, name, amount, date, frequency
  const setIncomes = (a) => {
    dispatch({
      type: SET_INCOME,
      payload: a
    });
  };
  //array of  id, name, amount, date, frequency
  const setExpenses = (a) => {
    dispatch({
      type: SET_EXPENSES,
      payload: a
    });
  };
  //array of  id, name, amount, frequency
  const setGoals = (a) => {
    dispatch({
      type: SET_GOAL,
      payload: a
    });
  };
  //array of id, name, max
  const setCategories = (a) => {
    dispatch({
      type: SET_GOAL,
      payload: a
    });
  };

  return {
    setAccounts,
    accounts: { ...state.accounts },
    setIncomes,
    incomes: { ...state.incomes },
    setExpenses,
    expenses: { ...state.expenses },
    setGoals,
    goals: { ...state.goals },
    setCategories,
    categories: { ...state.categories }
  };
};

export default useGlobalState;
