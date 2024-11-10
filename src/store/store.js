import { createStore } from "redux";
import { produce } from "immer";
import { Return } from "three/webgpu";
const mystate = {
  Tasks: [
    { task: "learn Three js", status: "Active" },
    { task: "learn GSAP js", status: "Active" },
    { task: "learn Parallax js", status: "Active" },
    { task: "learn React js", status: "Completed" },
    { task: "learn FramerMotion js", status: "Completed" },
  ],
};
const Render = (state = mystate, action) => {
  switch (action.type) {
    case "ADD":
      return produce(state, (draftState) => {
        draftState.Tasks.unshift(action.newTask);
      });
    case "DELETE":
      return produce(state, (darftS) => {
        darftS.Tasks.splice(action.pos, 1);
      });
    case "UPDATE":
        return produce(state,(ds)=>{
            ds.Tasks.splice(action.pos, 1,action.nTask);
        })
    case "SORT":
        return  produce(state,ds=>{
            ds.Tasks.sort((a, b) => a.status.localeCompare(b.status))
        })

    default:
      return state;
  }
};
const store = createStore(Render);
export default store;
