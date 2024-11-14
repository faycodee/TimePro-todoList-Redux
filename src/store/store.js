import { createStore } from "redux";
import { produce } from "immer";
import { Return } from "three/webgpu";
const now = new Date();
const year = now.getFullYear();
const month = now.getMonth();
const day = now.getDate();

// return `${year}-${month}-${day+Math.floor(Math.random() * 4) + 1}`;
const mystate = {
  Tasks: [
    {
      title: "learn Three js",
      description: "",
      status: "Active",
      start: `${year}-${month + 1}-${day}`,
      end: `${year}-${month + 1}-${day }`,
    },
    {
      title: "learn GSAP js",
      description: "",
      status: "Active",
      start: `${year}-${month + 1}-${day}`,
      end: `${year}-${month + 1}-${day +2}`,
    },
    {
      title: "learn Parallax js",
      description: "",
      status: "Active",
      start:`${year}-${month+1}-${day}`,
      end: `${year}-${month+1}-${day+ 5}`,
    },
    {
      title: "learn FramerMotion js",
      description: "",
      status: "Completed",
      start:`${year}-${month+1}-${day}`,
      end: `${year}-${month+1}-${day}`,
    },
    {
      title: "learn React js",
      description: "",
      status: "Completed",
      start:`${year}-${month+1}-${day}`,
      end: `${year}-${month+1}-${day + 1}`,
    },
   
  ],
  Alert: {
    showAlert: false,
    msgAlert: "HIIII WELCOME",
    msgBg: "#e0f7fa",
  },
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
      return produce(state, (ds) => {
        ds.Tasks.splice(action.pos, 1, action.nTask);
      });
    case "SORT":
      return produce(state, (ds) => {
        ds.Tasks.sort((a, b) => a.status.localeCompare(b.status));
      });
    case "SHOWALERT":
      return produce(state, (sd) => {
        sd.showAlert = true;
        sd.msgAlert = action.msg;
        sd.msgBg = action.clr;
      });
    case "HIDEALERT":
      return produce(state, (sd) => {
        sd.showAlert = false;
      });

    default:
      return state;
  }
};
const store = createStore(Render);
export default store;
