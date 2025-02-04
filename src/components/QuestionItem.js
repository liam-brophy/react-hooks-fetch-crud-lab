import React, { useEffect, useState } from "react";

function QuestionItem({
  question,
  onDeleteQuestion,
  onUpdateCorrectAnswer,
}) {
  const { id, prompt, answers, correctIndex } = question;
  const [selectedCorrectIndex, setSelectedCorrectIndex] = useState(correctIndex);

  useEffect(() => {
    setSelectedCorrectIndex(correctIndex);
  }, [correctIndex]);

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleDelete = () => {
    onDeleteQuestion(id);
  };

  const handleDropdownChange = (event) => {
    const newCorrectIndex = parseInt(event.target.value, 10);
    setSelectedCorrectIndex(newCorrectIndex); // Update local state for controlled input
    onUpdateCorrectAnswer(id, newCorrectIndex); // Update global state
  };

  return (
    <li>
      <h4>{prompt}</h4>
      <label>
        Correct Answer:
        <select
          value={selectedCorrectIndex} // Control the select value using state
          onChange={handleDropdownChange}
        >
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;