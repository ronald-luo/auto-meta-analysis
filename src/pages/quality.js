import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/quality.module.css';

const initialQuestions = [  
  {    question: 'Selection',    description: 'Representativeness of the sample',    options: [      { label: 'Truly representative of the average in the target population. * (all subjects or random sampling)', value: 1 },      { label: 'Somewhat representative of the average in the target population. * (non-random sampling)', value: 1 },      { label: 'Selected group of users', value: 0 },      { label: 'No description of the sampling strategy', value: 0 },    ],
    score: undefined,
  },
  {
    question: 'Selection',
    description: 'Selection of the non-exposed cohort',
    options: [
      { label: 'Truly representative of the average in the target population. * (all subjects or random sampling)', value: 1 },
      { label: 'Somewhat representative of the average in the target population. * (non-random sampling)', value: 1 },
      { label: 'Selected group of users', value: 0 },
      { label: 'No description of the sampling strategy', value: 0 },
    ],
    score: undefined,
  },
  {
    question: 'Selection',
    description: 'Ascertainment of exposure',
    options: [
      { label: 'Validated measurement tool. **', value: 1 },
      { label: 'Non-validated measurement tool, but the tool is available or described.*', value: 0 },
      { label: 'No description of the measurement tool', value: 0 },
    ],
    score: undefined,
  },
  {
    question: 'Comparability',
    description: 'The subjects in different outcome groups are comparable, based on the study design or analysis. Confounding factors are controlled',
    options: [
      { label: 'The study controls for the most important factor (select one). *', value: 1 },
      { label: 'The study control for any additional factor. *', value: 1 },
    ],
    score: undefined,
  },
  {
    question: 'Outcome',
    description: 'Assessment of the outcome',
    options: [
      { label: 'Independent blind assessment. **', value: 1 },
      { label: 'Record linkage. **', value: 1 },
      { label: 'Self report. *', value: 1 },
      { label: 'No description.', value: 0 },
    ],
    score: undefined,
  },
  {
    question: 'Outcome',
    description: 'Statistical test',
    options: [
      { label: 'The statistical test used to analyze the data is clearly described and appropriate, and the measurement of the association is presented, including confidence intervals and the probability level (p value)', value: 1 },
      { label: 'The statistical test is not appropriate, not described or incomplete', value: 0 },
    ],
    score: undefined,
  },
];

export default function Quality() {
  const router = useRouter();
  const { extractedTexts } = router.query;

  const [extractedTextsList, setExtractedTextsList] = useState(JSON.parse(extractedTexts));
  const [nosScaleResponses, setNosScaleResponses] = useState(extractedTextsList.map(() => initialQuestions));

  const handleScoreChange = (paperIndex, questionIndex, value) => {
    const updatedResponses = [...nosScaleResponses];
    updatedResponses[paperIndex][questionIndex].score = value;
    setNosScaleResponses(updatedResponses);
  };

  return (
    <div>
      {extractedTextsList.map((paper, paperIndex) => (
        <div key={paperIndex} className={styles.studyContainer}>
          <div className={styles.extractedContent}>
            <h2>
              Paper {paperIndex}: {paper.fileName}
            </h2>
            <p>
              {paper.extractedText}
            </p>
          </div>
          <div className={styles.questionsContainer}>
            <h2>Paper {paperIndex}: {paper.fileName}</h2>
            {initialQuestions.map((question, questionIndex) => (
              <div key={questionIndex} className={styles.questionContainer}>
                  <h4>{question.question}</h4>
                  <p>{question.description}</p>
                  <select
                    value={question.score} 
                    onChange={(e) => handleScoreChange(paperIndex, questionIndex, e.target.value)}
                  >
                    <option value=""></option>
                    {question.options.map((option, index) => (
                      <option key={index} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>))}
              </div>
        </div>
      ))}


    </div>
  );
}