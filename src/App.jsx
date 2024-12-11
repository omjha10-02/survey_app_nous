import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './components/Question';
import { useNavigate } from 'react-router-dom';

// Timer Component
const Timer = ({ setTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setTimeUp(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, [setTimeUp]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer">
      <h3>Time Left: {formatTime(timeLeft)}</h3>
    </div>
  );
};

// Signup Component
const SignupForm = ({ setUserId }) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !code) {
      setError('Please provide both name and code');
      return;
    }

    try {
      const response = await axios.post('/api/signup', { name, code }); // Relative path
      setUserId(response.data.userId);
      navigate('/quiz');
    } catch (err) {
      setError('Invalid code or error during signup');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        {error && <p>{error}</p>}
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

// Quiz App Component
const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userId, setUserId] = useState(null); // Track user ID after signup
  const [timeUp, setTimeUp] = useState(false); // Track if time is up
  const navigate = useNavigate();

  // Fetch questions from backend
  useEffect(() => {
    if (userId) {
      axios
        .get('/api/quiz/questions') // Relative path
        .then((response) => {
          setQuestions(response.data);
        })
        .catch((error) => {
          console.error('There was an error fetching the questions!', error);
        });
    }
  }, [userId]);

  // Handle answer selection
  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  // Submit response
  const handleSubmitAnswer = () => {
    if (selectedOption) {
      const currentQuestion = questions[currentQuestionIndex];

      axios
        .post('/api/quiz/responses', {
          questionId: currentQuestion._id,
          selectedOption,
          userId,
        }) // Relative path
        .then(() => {
          setSelectedOption(null);
          if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
          } else {
            navigate('/results'); // Redirect to result page after the last question
          }
        })
        .catch((error) => {
          console.error('There was an error submitting the answer!', error);
        });
    } else {
      alert('Please select an answer');
    }
  };

  // Handle time-up scenario
  useEffect(() => {
    if (timeUp) {
      alert('Time is up! Redirecting to results page...');
      navigate('/results'); // Redirect to results page when time is up
    }
  }, [timeUp, navigate]);

  // If user is not signed up yet, show signup page
  if (!userId) {
    return <SignupForm setUserId={setUserId} />;
  }

  // If questions are loaded, show the quiz
  return (
    <div className="App">
      <Timer setTimeUp={setTimeUp} />
      <h1>Quiz App</h1>
      {questions.length > 0 ? (
        <div>
          <Question
            question={questions[currentQuestionIndex]}
            selectedOption={selectedOption}
            handleSelectOption={handleSelectOption}
          />
          <button onClick={handleSubmitAnswer}>Submit Answer</button>
        </div>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
};

export default App;
