import { combineReducers } from "redux";
import counter from './counterModule';
import todo from './todoModule';

// 사용할 reducer들을 rootReducer로 합쳐줌
const rootReducer = combineReducers({
    counter,
    todo
});

export default rootReducer;