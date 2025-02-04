import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar"; // Assuming this is another component
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  // Fetch questions from the API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:4000/questions");
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  // Add a new question
  const handleAddQuestion = async (newQuestion) => {
    try {
      const response = await fetch("http://localhost:4000/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuestion),
      });

      if (!response.ok) {
        throw new Error("Failed to add question");
      }

      const addedQuestion = await response.json();
      setQuestions((prevQuestions) => [...prevQuestions, addedQuestion]);
      setPage("List");
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  // Delete a question
  const handleDeleteQuestion = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete question");
      }

      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question.id !== id)
      );
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  // Update the correct answer of a question
  const handleUpdateCorrectAnswer = async (id, newCorrectIndex) => {
    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correctIndex: newCorrectIndex }),
      });

      if (!response.ok) {
        throw new Error("Failed to update question");
      }

      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === id
            ? { ...question, correctIndex: newCorrectIndex }
            : question
        )
      );
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateCorrectAnswer={handleUpdateCorrectAnswer}
        />
      )}
    </main>
  );
}

export default App;
