import { motion } from "framer-motion";
import "../styles/index.css";
import { VscArrowRight } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
const Tasks = () => {
  const myList = useRef();
  const [CurrList, setCurrList] = useState("All");
  const [CurrDate, setDate] = useState(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    return `${year}-${month}-${day}`;
  });

  {
    console.log(CurrList);
  }
  const Task = useRef();
  const descriptionTxt = useRef();
  const DateTxt = useRef();
  const DateTxtEnd = useRef();
  const Tasks = useSelector((state) => state.Tasks);
  const dispatch = useDispatch();
  console.log(Tasks);
  const addHandler = () => {
    let obj = {
      title: Task.current.value,
      description: descriptionTxt.current.value,
      status: "Active",
      start: myFormatDate(DateTxt.current.value),
      end: myFormatDateEnd(DateTxtEnd.current.value),
    };
    dispatch({ type: "ADD", newTask: obj });
    dispatch({ type: "SHOWALERT", msg: "Add Successfuly !" });
    setTimeout(() => dispatch({ type: "HIDEALERT" }), 3000);
  };
  const myFormatDate = (inputDate) => {
    const [year, month, day] = inputDate.split("-");
    return `${day}-${month}-${year}`;
  };
  const myFormatDateEnd = (inputDate) => {
    const [year, month, day] = inputDate.split("-");
    return `${year}-${month}-${day}`;
  };

  const sort = () => {
    dispatch({ type: "SORT" });
  };
  sort();
  const deleteHandler = (position) => {
    confirm("Are you sure ?") && dispatch({ type: "DELETE", pos: position });
  };
  const changeStatusHandler = (
    position,
    { title, description, status, start, end }
  ) => {
    // alert(sts)
    let nTask = {
      title,
      description,
      status: "Active" ? "Completed" : "Active",
      start,
      end,
    };
    // alert(nTask.status)
    dispatch({ type: "UPDATE", pos: position, nTask: nTask });
    dispatch({
      type: "SHOWALERT",
      msg: nTask.status == "Completed" ? "Done !" : "Working ...",
      clr: sts == "Active" ? "rgb(214, 255, 152)" : "rgb(255, 152, 152)",
    }),
      setTimeout(() => dispatch({ type: "HIDEALERT" }), 3000);
  };
  return (
    <div className="flex  h-[90%] max-lg:flex-col max-lg:justify-center">
      <div className="relative w-[50%] flex flex-row   ">
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
              <div>
                <motion.input
                  ref={Task}
                  type="text"
                  placeholder=" Add a new Task"
                  className="py-3  mb-1 px-6 w-[400px] bg-transparent border border-5 rounded-xl text-black border-gray-100 "
                />
                <motion.textarea
                  className="py-3  mb-1 px-6 w-[400px] bg-transparent border border-5 rounded-xl text-black border-gray-100 "
                  ref={descriptionTxt}
                  id="desc"
                  name="description"
                  rows="4"
                  cols="50"
                  placeholder="Enter  description here..."
                ></motion.textarea>
                <motion.input
                  ref={DateTxt}
                  type="date"
                  min={CurrDate}
                  className="py-3 px-6 w-[400px] bg-transparent border border-5 rounded-xl text-black border-gray-100 "
                />
                <div className="flex">
                  <motion.input
                    ref={DateTxtEnd}
                    type="date"
                    min={CurrDate}
                    className="py-3 px-6 w-[400px] bg-transparent border border-5 rounded-xl text-black border-gray-100 "
                  />      <motion.button
                  initial={{ opacity: 0, x: -120 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2, duration: 2 }}
                  className="text-center ml-2 flex justify-center items-center w-[50px] rounded-full text-white bg-black"
                  onClick={addHandler}
                >
                  <VscArrowRight />
                </motion.button>
                </div>
          
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1, transition: 15 }}
              className="filter flex mt-6"
            >
              <motion.input
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1, transition: 3 }}
                whileHover={{ scale: 1.2 }}
                whileHoverTransition={{ scale: 1.2 }}
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
                transition={{ delay: 1.5, transition: 3 }}
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
                transition={{ delay: 2, transition: 3 }}
                type="button"
                value={"Done"}
                className="btnC"
                onClick={() => {
                  setCurrList("Completed");
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
      <motion.div
        ref={myList}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 5, delay: 2 }}
        className="relative w-[50%] flex flex-col  p-10   shadow-2xl   rounded-2xl listTasks max-lg:w-[100%] "
      >
        {Tasks.map((e, i) => {
          return e.status == CurrList ? (
            <motion.div
              drag={true}
              dragConstraints={myList}
              initial={{ x: -40 }}
              animate={{ x: 0 }}
              transition={{ duration: 3, delay: i * 0.08 }}
              className={CurrList}
            >
              <div
                onDoubleClick={() => {
                  changeStatusHandler(i, e);
                }}
                className="w-full h-full flex justify-between"
              >
                {" "}
                <span className="font-mono font-semibold"> {e.title}</span>
                <small className="mr-[50px] translate-y-[23px] opacity-[50%]">
                  {" "}
                  {e.start}
                </small>
              </div>
              <button
                onClick={() => deleteHandler(i)}
                className="bg-gray-800 text-white p-1 rounded-full w-10 h-10"
              >
                X
              </button>
            </motion.div>
          ) : (
            CurrList == "All" && (
              <motion.div
                drag={true}
                dragConstraints={myList}
                initial={{ x: -40 }}
                animate={{ x: 0 }}
                transition={{ duration: 3, delay: i * 0.000004 }}
                className={e.status}
              >
                <div
                  onDoubleClick={() => {
                    changeStatusHandler(i, e);
                  }}
                  className="w-full h-full flex justify-between"
                >
                  {" "}
                  <span className="font-mono font-semibold"> {e.title}</span>
                  <small className="mr-[50px] translate-y-[23px] opacity-[50%]">
                    {" "}
                    {e.start}
                  </small>
                </div>
                <button
                  onClick={() => deleteHandler(i)}
                  className="bg-gray-800 text-white p-1 rounded-full w-10 h-10"
                >
                  X
                </button>
              </motion.div>
            )
          );
        })}
      </motion.div>
    </div>
  );
};

export default Tasks;
