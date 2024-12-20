// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import { Toaster } from 'react-hot-toast';
// import './QuizPage.css';

// const QuizPage = () => {
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [userId, setUserId] = useState('67571162354d8baf9cec174e'); // Example userId
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         // Use relative URL for proxy compatibility
//         const response = await axios.get('https://survey-app-nous.onrender.com/api/quiz/questions');
//         setQuestions(response.data);
//       } catch (err) {
//         console.error('Error fetching questions', err);
//       }
//     };

//     fetchQuestions();
//   }, []);

//   const handleOptionSelect = (option) => {
//     setSelectedOption(option);
//   };

//   const handleNextQuestion = async () => {
//     if (selectedOption === null) {
//       alert('Please select an option before moving to the next question');
//       return;
//     }

//     const currentQuestion = questions[currentQuestionIndex];
//     const responseData = {
//       questionId: currentQuestion._id,
//       selectedOption: selectedOption,
//       userId: userId,
//     };

//     try {
//       // Use relative URL for proxy compatibility
//       await axios.post('https://survey-app-nous.onrender.com/api/quiz/responses', responseData);
//       console.log('Response submitted successfully');
//     } catch (err) {
//       console.error('Error submitting response', err);
//     }

//     setCurrentQuestionIndex((prev) => prev + 1);
//     setSelectedOption(null);
//   };

//   const handleSubmitQuiz = async () => {
//     if (selectedOption === null) {
//       alert('Please select an option before submitting the quiz');
//       return;
//     }

//     const currentQuestion = questions[currentQuestionIndex];
//     const responseData = {
//       questionId: currentQuestion._id,
//       selectedOption: selectedOption,
//       userId: userId,
//     };

//     try {
//       // Use relative URL for proxy compatibility
//       await axios.post('https://survey-app-nous.onrender.com/api/quiz/responses', responseData);
//       console.log('Final response submitted successfully');

//       toast.success('Quiz Completed Successfully!', {
//         position: 'top-center',
//         duration: 3000,
//         onClose: () => {
//           toast('Here are some other thoughts you may consider...', {
//             position: 'top-center',
//             duration: 4000,
//           });
//         },
//       });

//       setTimeout(() => {
//         navigate('/view-results');
//       }, 3000);
//     } catch (err) {
//       console.error('Error submitting final response', err);
//       toast.error('Failed to submit the quiz. Please try again!', {
//         position: 'top-center',
//         duration: 3000,
//       });
//     }
//   };

//   if (questions.length === 0) return <p>Loading questions...</p>;

//   const currentQuestion = questions[currentQuestionIndex];
//   const isLastQuestion = currentQuestionIndex === questions.length - 1;

//   return (
//     <div className="quiz-container">
//       <div className="question-container">
//         <div className="progress-bar">
//           <div
//             className="progress"
//             style={{ width: ${((currentQuestionIndex + 1) / questions.length) * 100}% }}
//           ></div>
//         </div>
//         <div className="question-card">
//           <h2 className="question-number">Question {currentQuestion.number}</h2>
//           <p className="question-text">{currentQuestion.text}</p>
//           <div className="options-container">
//             {currentQuestion.options.map((option, index) => (
//               <div
//                 key={index}
//                 className={option-card ${selectedOption === option ? 'selected' : ''}}
//                 onClick={() => handleOptionSelect(option)}
//               >
//                 <input
//                   type="radio"
//                   name="option"
//                   id={option-${index}}
//                   value={option}
//                   checked={selectedOption === option}
//                   onChange={() => handleOptionSelect(option)}
//                   className="radio-input"
//                 />
//                 <label htmlFor={option-${index}} className="option-label">
//                   {option}
//                 </label>
//               </div>
//             ))}
//           </div>
//           <div className="quiz-buttons">
//             {!isLastQuestion ? (
//               <button className="next-button" onClick={handleNextQuestion}>
//                 Next
//               </button>
//             ) : (
//               <button className="submit-button" onClick={handleSubmitQuiz}>
//                 Submit Quiz
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       <Toaster />
//     </div>
//   );
// };

// export default QuizPage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import './QuizPage.css';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [userId, setUserId] = useState('67571162354d8baf9cec174e'); // Example userId
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // const response = await axios.get('http://127.0.0.1:5000/api/quiz/questions');
        const response = await axios.get('https://survey-app-nous.onrender.com/api/quiz/questions');
        setQuestions(response.data);
      } catch (err) {
        console.error('Error fetching questions', err);
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionSelect = (option) => {
    // Toggle selection for multiple choices
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((opt) => opt !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleNextQuestion = async () => {
    if (selectedOptions.length === 0) {
      alert('Please select at least one option before moving to the next question');
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const responseData = {
      questionId: currentQuestion._id,
      selectedOptions: selectedOptions,
      userId: userId,
    };

    try {
      // await axios.post('http://127.0.0.1:5000/api/quiz/responses', responseData);
      await axios.post('https://survey-app-nous.onrender.com/api/quiz/responses', responseData);
      console.log('Response submitted successfully');
    } catch (err) {
      console.error('Error submitting response', err);
    }

    setCurrentQuestionIndex((prev) => prev + 1);
    setSelectedOptions([]);
  };

  const handleSubmitQuiz = async () => {
    if (selectedOptions.length === 0) {
      alert('Please select at least one option before submitting the quiz');
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const responseData = {
      questionId: currentQuestion._id,
      selectedOptions: selectedOptions,
      userId: userId,
    };

    try {
      // await axios.post('http://127.0.0.1:5000/api/quiz/responses', responseData);
      await axios.post('https://survey-app-nous.onrender.com/api/quiz/responses', responseData);
      console.log('Final response submitted successfully');

      toast.success('Quiz Completed Successfully!', {
        position: 'top-center',
        duration: 3000,
        onClose: () => {
          toast('Redirecting to results page...', {
            position: 'top-center',
            duration: 4000,
          });
        },
      });

      setTimeout(() => {
        navigate('/view-results');
      }, 3000);
    } catch (err) {
      console.error('Error submitting final response', err);
      toast.error('Failed to submit the quiz. Please try again!', {
        position: 'top-center',
        duration: 3000,
      });
    }
  };

  if (questions.length === 0) return <p>Loading questions...</p>;

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Calculate progress
  const progressPercentage = (currentQuestionIndex / questions.length) * 100;

  return (
    <div className="quiz-container">
      <div className="question-container">
        <div className="question-card">
          <h2 className="question-number">Question {currentQuestion.number}</h2>
          <p className="question-text">{currentQuestion.text}</p>
          
          {/* Progress Bar */}
          <div className="progress-bar-container">
            <p className="progress-text">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
          
          <div className="options-container">
            {currentQuestion.options.map((option, index) => (
              <div key={index} className={`option-card ${selectedOptions.includes(option) ? 'selected' : ''}`}>
                <input
                  type="checkbox"
                  name={`option-${currentQuestionIndex}`}
                  id={`option-${index}`}
                  value={option}
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleOptionSelect(option)}
                  className="checkbox-input"
                />
                <label htmlFor={`option-${index}`} className="option-label">
                  {option}
                </label>
              </div>
            ))}
          </div>
          <div className="quiz-buttons">
            {!isLastQuestion ? (
              <button className="next-button" onClick={handleNextQuestion}>
                Next
              </button>
            ) : (
              <button className="submit-button" onClick={handleSubmitQuiz}>
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default QuizPage;
