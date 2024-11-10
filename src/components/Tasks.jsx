import { motion } from "framer-motion";
import "../styles/index.css";
import { VscArrowRight } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
const Tasks = () => {
  const myList =useRef()
  const [CurrList, setCurrList] = useState("All");
  {
    console.log(CurrList);
  }
  const Task = useRef();
  const Tasks = useSelector((state) => state.Tasks);
  const dispatch = useDispatch();
  console.log(Tasks);
  const addHandler = () => {
    let obj = { task: Task.current.value, status: "Active" };
    dispatch({ type: "ADD", newTask: obj });
    alert("Added successfully");
  };
  const sort = () => {
    dispatch({ type: "SORT" });
  };
  sort();
  const deleteHandler = (position) => {
    confirm("Are you sure ?") && dispatch({ type: "DELETE", pos: position });
  };
  const changeStatusHandler = (position, sts, tsk) => {
    // alert(sts)
    let nTask = { task: tsk, status: sts == "Active" ? "Completed" : "Active" };
    // alert(nTask.status)
    dispatch({ type: "UPDATE", pos: position, nTask: nTask });
  };
  return (
    <div className="flex h-[90%]">
      <div className="relative w-[50%] flex flex-row h-[80%]  ">
        <div className="flex flex-col  mt-20  ml-9  px-8 h-[10%]  ">
          <motion.h1
            className="text-4xl md:text-6xl text-gray-100 mb-10 font-bold w-[480px]"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.8, delay: 0.7 }}
          >
            Your <span className="text-green-500 ">Tasks </span>
          </motion.h1>
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.8, delay: 0.7 }}
              className="flex"
            >
              <motion.input
                ref={Task}
                type="text"
                placeholder=" Add a new Task"
                className="py-3 px-6 w-[400px] bg-transparent border border-5 rounded-xl text-black border-gray-100 "
              />
              <motion.button
                initial={{ opacity: 0, x: -120 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 2, duration: 2 }}
                whileHover={{ scale: 1.2 }}
                // whileTap={{ scale: 0.8 }}
                className="text-center ml-2 flex justify-center items-center w-[50px] rounded-full bg-green-500"
                onClick={addHandler}
              >
                <VscArrowRight />
              </motion.button>
            </motion.div>
            <div className="filter flex mt-6">
              <motion.input
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 2, transition: 3 }}
                type="button"
                value={"All"}
                className="btn"
                onClick={() => {
                  setCurrList("All");
                }}
              />
              <motion.input
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 4, transition: 3 }}
                type="button"
                value={"Working."}
                className="btnA"
                onClick={() => {
                  setCurrList("Active");
                }}
              />
              <motion.input
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 6, transition: 3 }}
                type="button"
                value={"Done"}
                className="btnC"
                onClick={() => {
                  setCurrList("Completed");
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <motion.div
       ref={myList}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 ,delay:2 }}
        className="relative w-[50%] flex flex-col   p-10   shadow-2xl   rounded-2xl listTasks "
      >
        {Tasks.map((e, i) => {
          return e.status == CurrList ? (
            <motion.div className={CurrList}>
              <div
                onClick={() => {
                  changeStatusHandler(i, e.status, e.task);
                }}
                className="w-full h-full"
              >
                {" "}
                {e.task}
              </div>
              <button onDoubleClick={() => deleteHandler(i)}>X</button>
            </motion.div>
          ) : (
            CurrList == "All" && (
              <motion.div
                drag={true}
                dragConstraints={myList}
                initial={{ x: -40 }}
                animate={{ x: 0 }}
                transition={{ duration: 3 , delay: i * .8}}
                className={e.status}
              >
                <div
                  onDoubleClick={() => {
                    changeStatusHandler(i, e.status, e.task);
                  }}
                  className="w-full h-full"
                >
                  {" "}
                  {e.task}
                </div>
                <button onClick={() => deleteHandler(i)}>X</button>
              </motion.div>
            )
          );
        })}
      </motion.div>
    </div>
  );
};

export default Tasks;
