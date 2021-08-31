import { FETCH_JOBS } from "../actions/types";

const INITIAL_STATE = {
  results: [],
};

export default jobs_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_JOBS:
      console.log(`Jobs reducer's state: ${action.payload[0].jobtitle}`);
      return { ...INITIAL_STATE, results: action.payload };
    default:
      return state;
  }
};
