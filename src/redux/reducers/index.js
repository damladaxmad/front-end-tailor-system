import { combineReducers } from "redux";
import { dashboardReducer } from "./dashboardReducer";
import { customersReducer } from "./customersReducer";
import { menusReducer } from "./menusReducer";
import { usersReducer } from "./usersReducer";
import { companyInfoReducer } from "./companyInfoReducer";
import { activeUserReducer } from "./activeUserReducer";
import { employeesReducer } from "./employeesReducer"; 
import { employeeTitleReducer } from "./employeeTitleReducer"; 
import { isLoginReducer } from "./isLoginReducer";

const reducers = combineReducers({
  dashboard: dashboardReducer,
  customers: customersReducer,
  menus: menusReducer,
  users: usersReducer,
  companyInfo: companyInfoReducer,
  activeUser: activeUserReducer,
  employees: employeesReducer,
  employeeTitle: employeeTitleReducer,
  isLogin: isLoginReducer,

});
export default reducers;
