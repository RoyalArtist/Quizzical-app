import React from 'react'
import './Questions.css'
import { useState, useEffect } from 'react'


function Questions() {
    const [questions, setQuestions] = useState([])
    const [selectedAnswers, setSelectedAnswers] = useState([])
    const [showResult, setShowResult] = useState(false)

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => {
                const questions = data.results.map(question => ({
                    ...question,
                    answers: [question.correct_answer, ...question.incorrect_answers].sort(() => Math.random() - 0.5)
                }))
                setQuestions(questions)
                setSelectedAnswers(new Array(questions.length).fill(null))
            })
    }, [])

    const handleAnswerClick = (questionIndex, answerIndex) => {
        if (!showResult) {
            const newSelectedAnswers = [...selectedAnswers]
            newSelectedAnswers[questionIndex] = answerIndex
            setSelectedAnswers(newSelectedAnswers)
        }
    }

    const handleResultClick = () => {
        setShowResult(true)
    }

    const handleRestartClick = () => {
        window.location.reload()
    }

    const numCorrectAnswers = questions.reduce((numCorrect, question, index) => {
        if (question.correct_answer === question.answers[selectedAnswers[index]]) {
            return numCorrect + 1
        } else {
            return numCorrect
        }
    }, 0)

    const numIncorrectAnswers = questions.length - numCorrectAnswers

    return (
        <div>
            {questions.map((question, questionIndex) => (
                <div key={questionIndex} className="question-container">
                    <ul>
                        <li className='question-list'>
                            <span className='question' dangerouslySetInnerHTML={{ __html: question.question }}></span>
                        </li>
                        {question.answers.map((answer, answerIndex) => {
                            let className = "answer-btn"
                            if (showResult) {
                                if (question.correct_answer === answer) {
                                    className += " correct-answer"
                                } else if (selectedAnswers[questionIndex] === answerIndex) {
                                    className += " incorrect-answer"
                                }
                            } else if (selectedAnswers[questionIndex] === answerIndex) {
                                className += " selected-answer"
                            }
                            return (
                                <button
                                    key={answerIndex}
                                    className={className}
                                    onClick={() => handleAnswerClick(questionIndex, answerIndex)}
                                    dangerouslySetInnerHTML={{ __html: answer }}>
                                </button>
                            )
                        })}
                    </ul>
                </div>
            ))}
            <div className="results-container">
                {showResult ? (
                    <div className='result'>
                        <p>You have: {numCorrectAnswers} Correct answers out of 5</p>
                        <button className='restart-btn' onClick={handleRestartClick}>Restart Game</button>
                    </div>
                ) : (
                    <button className='show-btn' onClick={handleResultClick}>Show result</button>
                )}
            </div>
        </div>
    )
}

export default Questions;
