import React from 'react'
import { getDifficultyBadgeClass } from '../lib/utils.js';

function ProblemDescription({ problems, currentProblemId, onProblemChange, allProblems }) {
  console.log(problems.description.notes);

  return (
    <div className='h-full overflow-y-auto bg-base-200'>
    
      {/* header */}
      <div className='p-6 bg-base-100 border-b border-base-300'>
        <div className='flex items-start justify-between mb-3'>
          <h1 className='text-3xl font-bold text-base-content'>{problems.title}</h1>
          <span className={`badge ${getDifficultyBadgeClass(problems.difficulty)}`}>{problems.difficulty}</span>
        </div>
        <p className='text-base-content/60'>{problems.category}</p>

        {/* Problem Selection */}
        <div className='mt-4'>
          <select className='select select-sm w-full'
            value={currentProblemId}
            onChange={(e) => onProblemChange(e.target.value)}>
            {allProblems.map((problem) => (
              <option key={problem.id} value={problem.id}>
                {problem.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='p-6 space-y-6'>
        {/* PROBLEM DESC */}
        <div className='bg-base-100 rounded-xl shadow-sm p-5 border border-base-300'>
          <h2 className='text-xl font-bold text-base-content'>Description</h2>

          <div className='space-y-3 text-base leading-relaxed'>
            <p className="text-base-content/90">{problems.description.text}</p>

            {problems.description.notes.map((note, idx) => (
              <p key={idx} className="text-base-content/90">
                {note}
              </p>
            ))}
          </div>
        </div>

        {/* Examples */}
        <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
          <h2 className="text-xl font-bold mb-4 text-base-content">Examples</h2>
          <div className="space-y-4">
            {problems.examples.map((example, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="badge badge-sm">{idx + 1}</span>
                  <p className="font-semibold text-base-content">Example {idx + 1}</p>
                </div>
                <div className="bg-base-200 rounded-lg p-4 font-mono text-sm space-y-1.5">
                  <div className="flex gap-2">
                    <span className="text-primary font-bold min-w-[70px]">Input:</span>
                    <span>{example.input}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-secondary font-bold min-w-[70px]">Output:</span>
                    <span>{example.output}</span>
                  </div>
                  {example.explanation && (
                    <div className="pt-2 border-t border-base-300 mt-2">
                      <span className="text-base-content/60 font-sans text-xs">
                        <span className="font-semibold">Explanation:</span> {example.explanation}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CONSTRAINTS */}

        <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
          <h2 className="text-xl font-bold mb-4 text-base-content">Constraints</h2>
          <ul className="space-y-2 text-base-content/90">
            {problems.constraints.map((constraint, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-primary">•</span>
                <code className="text-sm">{constraint}</code>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  )
}

export default ProblemDescription
