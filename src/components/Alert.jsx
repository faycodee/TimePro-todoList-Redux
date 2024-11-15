import { motion, AnimatePresence } from "framer-motion";

const Alert = ({ message, handlerClose, bgcolorr, colorr }) => {
  const alertVariants = {
    initial: { opacity: 0, x: -500 , },
    animate: { opacity: 1, x: 10 },
    exit: { opacity: 0, x: -500 },
  };

  return (
    <AnimatePresence>
    
      <motion.div
        variants={alertVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="alert"
        style={{ backgroundColor: bgcolorr }}
        transition={{ duration: 0.8, ease: "easeIn" }}
      >
        <span>{message}</span>
        <button onClick={() => handlerClose()}>Close</button>
      </motion.div>

    </AnimatePresence>
  );
};

// const App = () => {
//   const [showAlert, setShowAlert] = useState(false);

//   const handleShowAlert = () => {
//     setShowAlert(true);

//     // Automatically hide alert after 3 seconds
//     setTimeout(() => {
//       setShowAlert(false);
//     }, 3000);
//   };

//   return (
//     <div>
//       <button onClick={handleShowAlert}>Show Alert</button>

//       {showAlert && (
//         <Alert message="This is an alert message!" handlerClose={() => setShowAlert(false)} />
//       )}
//     </div>
//   );
// };

export default Alert;
