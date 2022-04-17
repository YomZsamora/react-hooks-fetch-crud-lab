import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/questions`)
    .then(resp => resp.json())
    .then(questions => setQuestions(questions))
  }, [])

  function addNewQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDeleteQuestion(deleteQuestion) {
    const updatedQuestions = questions.filter(question => question.id !== deleteQuestion.id);
    setQuestions(updatedQuestions);
  }

  function updateCorrectAnswer(updatedQuestion) {
    const updatedItems = questions.map(question => {
      if(question.id === updatedQuestion.id) {
        return updatedQuestion;
      } else {
        return question
      }
    })
    setQuestions(updatedItems);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={addNewQuestion} /> : <QuestionList questions={questions} onDeleteQuestion={handleDeleteQuestion} onUpdateAnswer={updateCorrectAnswer} />}
    </main>
  );
}

export default App;
