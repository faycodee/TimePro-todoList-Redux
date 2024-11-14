import { createStore } from "redux";
import { produce } from "immer";
import { Return } from "three/webgpu";
const mystate = {
  Tasks: [
    {
      title: "learn Three js",
      description: "",
      status: "Active",
      start: "11-11-2024",
      end: "2024-11-16 ",

    },
    // {
    //   title: "learn GSAP js",
    //   description: "",
    //   status: "Active",
    //   start: "11-11-2024",
    //   end: "2024-11-16 08:00",

    // },
    // {
    //   title: "learn Parallax js",
    //   description: "",
    //   status: "Active",
    //   start: "11-11-2024",
    //   end: "2024-11-16 08:00",

    // },
    // {
    //   title: "learn React js",
    //   description: "",
    //   status: "Completed",
    //   start: "25-10-2024",
    //   end: "2024-11-16 08:00",

    // },
    // {
    //   title: "learn FramerMotion js",
    //   description: "",
    //   status: "Completed",
    //   start: "2-10-2024",
    //   end: "2024-20-16 08:00",

    // }

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
