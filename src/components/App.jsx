import { motion } from "framer-motion";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "../styles/index.css";
import "../styles/Cursor.css";
import "../styles/Alert.css";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { Environment, OrbitControls, ContactShadows } from "@react-three/drei";
import Model from "../../public/Time";
import Tasks from "./Tasks";
import Cursor from "./Cursor";
import Alert from "./Alert";
import { useSelector, useDispatch } from "react-redux";
import CalendarApp from './Calendar';

const App = () => {
  const showAlert = useSelector((state) => state.showAlert);
  const msgAlert = useSelector((state) => state.msgAlert);
  const msgBg = useSelector((state) => state.msgBg);
  const dispatch = useDispatch();
  console.log(showAlert);
  const handleShowAlert = () => {
    dispatch({ type: "SHOWALERT" });
    setTimeout(() => {
      dispatch({ type: "HIDEALERT" });
    }, 3000);
  };

  const handlerClose = () => {
    dispatch({ type: "HIDEALERT" });
  };

  return (
    <BrowserRouter>
      <Cursor />
      {showAlert && (
        <Alert message={msgAlert} onClose={handlerClose} bgcolorr={msgBg} />
      )}
      <div className="relative h-screen">
        <header>
          <Nav />
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <motion.video
                  style={{ zIndex: -1 }}
                  src="./bg.mp4"
                  autoPlay
                  loop
                  muted
                  className="absolute inset-0  w-full h-full object-cover max-lg:h-screen "
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                ></motion.video>
              </>
            }
          />
          <Route
            path="/tasks"
            element={
              <>
                <Tasks />
                <motion.video
                  style={{ zIndex: -1 }}
                  src="./bg2.mp4"
                  autoPlay
                  loop
                  muted
                  className="absolute inset-0  w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                ></motion.video>
              </>
            }
          />
   
          <Route
            path="/calendar"
            element={
              <>
                 <CalendarApp/> 
                <motion.video
                  style={{ zIndex: -1 }}
                  src="./bg3.mp4"
                  autoPlay
                  loop
                  muted
                  className="absolute inset-0  w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                ></motion.video>
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

const Nav = () => {
  return (
    <nav className="sticky w-full flex items-center justify-between px-8 py-4 bg-opacity-50">
      <div className="text-gray-800 text-2xl font-bold">
        Time<span className="text-green-500">Pro</span>
      </div>
      <ul className="flex space-x-8 text-gray-800">
        <li className="hover:text-green-500 cursor-pointer transition-colors">
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li className="hover:text-green-500 cursor-pointer transition-colors">
          <NavLink to={"/tasks"}>Tasks</NavLink>
        </li>
        <li className="hover:text-green-500 cursor-pointer transition-colors">
          <NavLink to={"/calendar"}>Calendar</NavLink>
        </li>
       
      </ul>
    </nav>
  );
};

const Hero = () => {
  return (
    <div className="relative h-[90%] flex flex-row  max-lg:flex-col max-lg:items-center ">
      <div className="h-full flex flex-col justify-center    px-8 w-[50%] max-lg:w-[100%] max-lg:mt-[130px] ">
        <motion.h1
          className="text-4xl md:text-6xl text-gray-100 font-bold "
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 0.7 }}
        >
          Master Your Day with <span className="text-green-500">TimePro</span>
        </motion.h1>
        <motion.p
          className="mt-4 text-sm md:text-lg text-gray-500 max-w-[80%]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 1 }}
        >
          Stay organized and productive with our intuitive time management
          platform. Manage tasks, track progress, and stay on top of deadlines.
          Start planning your day with TimePro.
        </motion.p>
        <motion.div
          className="mt-8 flex justify-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.2 }}
        >
          <NavLink
            to={"/tasks"}
            className="px-6 py-3 text-lg bg-green-500 text-white rounded-md shadow-lg hover:bg-green-400 transition-colors"
          >
            Get Started
          </NavLink>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 5, delay: 1.2 }}
        className="h-full flex flex-col justify-center   px-8  "
      >
        {/* <img
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 2, delay: 2.2 }}
         className="rounded-2xl" src="/photo.jpg" width={"500px"} alt="" 
         /> */}
        <Canvas style={{ width: "500px" }}>
          <ambientLight intensity={0} />
          <OrbitControls
            enableRotate
            enableDamping
            enableZoom={false}
            enableoom
            enablePan
          />
          <Suspense fallback={null}>
            <Model />
          </Suspense>
          <Environment preset="forest" />
          {/* <ContactShadows  position={[0,2,0]} opacity={.5} scale={50} blur={1} far={10} resolution={256} color="#000000"/> */}
        </Canvas>
      </motion.div>
    </div>
  );
};

export { Nav, Hero };

export default App;
