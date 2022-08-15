import React, { useState } from 'react'
import { sanitize } from 'dompurify'
import useFetch from './../useFetch'
import { surveyResponseMock } from './../../mocks/surveyResponseMock'
import Success from '../UI/Success'
import Fail from '../UI/Fail'

function Survey() {
  const { data: {data: survey}, isLoading, error } = useFetch('/api/v1/survey')

  const [filmReview, setFilmReview] = useState({answer: '', questionId: ''})
  const [filmRating, setFilmRating] = useState({answer: '', questionId: ''})
  const [success, setSuccess] = useState(false)
  const [fail, setFail] = useState(false)

  const handleChange = (e) => {
    e.target.id === 'film' && setFilmReview({answer: e.target.value, questionId: e.target.id})
    e.target.id === 'review' && setFilmRating({answer: e.target.value, questionId: e.target.id})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFilmReview({answer: '', questionId: ''})
    setFilmRating({answer: '', questionId: ''})

    const responseData = surveyResponseMock
    responseData.data.attributes.answers.push(filmReview, filmRating)

    fetch(`/api/v1/survey/${survey.id}/answers`, {
      method: 'POST',
      headers: { "Content-type": "application/json"},
      body: JSON.stringify(responseData)
    })
      .then(res => {
        res.status == 201 && setSuccess(true)
        res.status == 500 && setFail(true)
        return res.json()
      })
  }

  const preparedRatings = (attributes) => {
    const ratings = []
    for(let i = attributes.min; i <= attributes.max; i++){
      ratings.push(i)
    }

    return ratings
  }

  const preparedFormFields = (question, i) => {
    if(question.questionType === 'text'){
      return (
        <label key ={i} className="review-label">
          {question.label}
          <input type="text" value={filmReview.answer} id={question.questionId} onChange={handleChange} required={question.required} />
        </label>
      )
    }

    if(question.questionType === 'rating'){
      return (
        <fieldset required={question.required}>
          <legend>{question.label}</legend>
          {preparedRatings(question.attributes).map((item, i) => {
            return(
              <div key={i}>       
                <input type="radio" id={question.questionId} value={item} name={item} onChange={handleChange} checked={item == filmRating.answer} />
                <label htmlFor={item}>{item}</label>
              </div>
            )
          })}
        </fieldset>
      )
    }
  }

  return (
    <div className="survey-container">
        <h3>Survey</h3>
        {isLoading && <span>Loading...</span>}
        {error && <p>{error}</p>}
        {survey &&
          <div>
            <h3>{survey.attributes.title}</h3>
            <div dangerouslySetInnerHTML={{__html: sanitize(survey.attributes.description)}} />
            <form className="survey-form" onSubmit={handleSubmit}>
              {survey.attributes.questions.map((question, i) => {
                return preparedFormFields(question, i)
              })}
              <input className="btn-form-submit" type="submit" value="Send" disabled={!(filmReview.answer && filmRating.answer && !success && !fail)} />
            </form>
          </div>
        }
        {success && <Success setSuccess={setSuccess} />}
        {fail && <Fail setFail={setFail} />}
    </div>
  )
}

export default Survey