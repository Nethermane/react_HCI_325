import React from "react";
import { createContext, useReducer, useContext } from "react";
const SET_ACCOUNTS = "SET_ACCOUNTS";
const SET_INCOME = "SET_INCOME";
const SET_EXPENSES = "SET_EXPENSES";
const SET_GOAL = "SET_GOAL";
const SET_CATEGORY = "SET_CATEGORY";

const GlobalStateContext = createContext();

const initialState = {
  incomes: [
    {
      id: 1,
      name: "Scholarship",
      amount: "1000",
      date: "2020-01-01",

      category: "Scholarship",
      frequency: "monthly",
      end_date: "3020-01-01",
    },
    {
      id: 2,
      name: "McWendy's",
      amount: "120",
      date: "2020-02-02",
      category: "Work",
      frequency: "monthly",
      end_date: "3020-01-01",
    },
  ],
  expenses: [
    {
      id: 1,
      name: "Utilities",
      amount: "50",
      date: "2020-01-01",
      category: "Living",
      frequency: "monthly",
      end_date: "3020-01-01",
    },
    {
      id: 2,
      name: "Notflex",
      amount: "7",
      date: "2020-02-01",
      category: "Entertainment",
      frequency: "monthly",
      end_date: "3020-01-01",
    },
    {
      id: 3,
      name: "Tsarbucks",
      amount: "50",
      date: "2020-03-01",
      category: "Coffee",
      frequency: "monthly",
      end_date: "3020-01-01",
    },
    {
      id: 4,
      name: "Jim Borton's",
      amount: "250",
      date: "2020-04-06",
      category: "Coffee",
      frequency: "onetime",
      end_date: "3020-01-01",
    },
    {
      id: 5,
      name: "Pizza Bell",
      amount: "120",
      date: "2020-01-01",
      category: "Food",
      frequency: "monthly",
      end_date: "3020-01-01",
    },
    {
      id: 6,
      name: "Basic Foods",
      amount: "2",
      date: "2020-01-01",
      category: "Food",
      frequency: "monthly",
      end_date: "3020-01-01",
    },
  ],
  categories: [
    { id: 1, name: "Living", max: 500 },
    { id: 2, name: "Entertainment", max: 50 },
    { id: 3, name: "School", max: 250 },
    { id: 4, name: "Coffee", max: 175 },
    { id: 5, name: "Food", max: 250 },
  ],
};

const globalStateReducer = (state, action) => {
  switch (action.type) {
    case SET_INCOME:
      return {
        ...state,
        incomes: { ...action.payload },
      };

    case SET_ACCOUNTS:
      return {
        ...state,
        accounts: { ...action.payload },
      };

    case SET_EXPENSES:
      return {
        ...state,
        expenses: { ...action.payload },
      };

    case SET_GOAL:
      return {
        ...state,
        goals: { ...action.payload },
      };

    case SET_CATEGORY:
      return {
        ...state,
        categories: { ...action.payload },
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
      payload: a,
    });
  };
  //array of  id, name, amount, date, frequency
  const setIncomes = (a) => {
    dispatch({
      type: SET_INCOME,
      payload: a,
    });
  };
  //array of  id, name, amount, date, frequency
  const setExpenses = (a) => {
    dispatch({
      type: SET_EXPENSES,
      payload: a,
    });
  };
  //array of  id, name, amount, frequency
  const setGoals = (a) => {
    dispatch({
      type: SET_GOAL,
      payload: a,
    });
  };
  //array of id, name, max
  const setCategories = (a) => {
    dispatch({
      type: SET_CATEGORY,
      payload: a,
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
    categories: { ...state.categories },
  };
};

export default useGlobalState;
