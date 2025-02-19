import { motion } from "framer-motion";

const ScoreModal = ({ totalScore, onClose }) => {
  const navigateToHome = () => {
    window.location.pathname = "/home";
  };

  // Dynamic messages based on score
  let message, bgColor;
  if (totalScore < 5) {
    message = "Oops! You failed the test. Try again!";
    bgColor = "bg-red-500";
  } else if (totalScore === 10) {
    message = "🎉 Congratulations! You got a perfect score! 🏆";
    bgColor = "bg-green-500";
  } else {
    message = "Thank you for participating! Keep practicing. 💪";
    bgColor = "bg-blue-500";
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white p-6 rounded-xl shadow-lg text-center w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-gray-800">Quiz Completed!</h2>
        <p className="text-xl mt-2 font-semibold">Your Score: {totalScore}/10</p>

        <div className={`mt-4 p-3 text-white rounded-lg ${bgColor}`}>
          {message}
        </div>

        <button
          onClick={navigateToHome}
          className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Go Home
        </button>
      </motion.div>
    </div>
  );
};

export default ScoreModal;
