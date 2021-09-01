import { CLEAR_LIKED_JOBS, LIKE_JOB } from "../actions/types";
// import { REHYDRATE } from "redux-persist";
import _ from "lodash";

export default likes_reducer = (state = [], action) => {
  switch (action.type) {
    // case REHYDRATE:
    //   return action.payload.likedJobs || [];
    case LIKE_JOB:
      return _.uniqBy([action.payload, ...state], "jobkey");
    case CLEAR_LIKED_JOBS:
      return [];
    default:
      return state;
  }
};
