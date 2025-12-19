import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { PROBLEMS } from '../data/problems.js';
import Navbar from '../components/Navbar.jsx';
import ProblemDescription from '../components/ProblemDescription.jsx';
import CodeEditor from '../components/CodeEditor.jsx';
import OutputPanel from '../components/OutputPanel.jsx';
import { executeCode } from '../lib/piston.js';
import { toast } from 'react-hot-toast';
import confetti from 'canvas-confetti';

import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

function ProblemPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [currentProblemId, setCurrentProblemId] = useState("two-sum")
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(PROBLEMS[currentProblemId].starterCode.javascript);
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const currentproblem = PROBLEMS[currentProblemId];

  // update URL when prams changes

  useEffect(() => {
    if (id && PROBLEMS[id]) {
      setCurrentProblemId(id);
      setCode(PROBLEMS[id].starterCode[selectedLanguage]);
      setOutput(null);
    }

  }, [id, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const NewLang = e.target.value;
    setSelectedLanguage(NewLang);
    setCode(currentproblem.starterCode[NewLang]);
    setOutput(null);
  };

  const handleProblemChange = (NewProblem) => { navigate(`/problem/${NewProblem}`); };

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.2, y: 0.6 },
    });

    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.8, y: 0.6 },
    });
  };
  const normalizeOutput = (output) => {
    // normalize output for comparison (trim whitespace, handle different spacing)
    return output
      .trim()
      .split("\n")
      .map((line) =>
        line
          .trim()
          // remove spaces after [ and before ]
          .replace(/\[\s+/g, "[")
          .replace(/\s+\]/g, "]")
          // normalize spaces around commas to single space after comma
          .replace(/\s*,\s*/g, ",")
      )
      .filter((line) => line.length > 0)
      .join("\n");
  };

  const checkIfTestsPass = (expectedOutput, actualOutput) => {
    // Ensure both outputs are strings before normalizing
    const normalizedExpected = normalizeOutput(String(expectedOutput));
    const normalizedActual = normalizeOutput(String(actualOutput));
    return normalizedExpected === normalizedActual;
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);
    const result = await executeCode(selectedLanguage, code);
    setIsRunning(false);
    setOutput(result);

    // Check if all test cases pass
    if (result.success) {
      const expectedOutputs = currentproblem.expectedOutput[selectedLanguage];
      const actualOutput = result.output || ""; // Ensure actualOutput is a string
      const testsPass = checkIfTestsPass(expectedOutputs, actualOutput);

      if (testsPass) {
        triggerConfetti();
        toast.success("All test cases passed! 🎉");
      } else {
        toast.error("Some test cases failed. ❌");
      }
    } else {
      toast.error("Error executing code. ❌");
    }
  };

  return (
    <div className='h-screen bg-base-100 flex flex-col'>
      <Navbar />
      <div className='flex-1'>
        <PanelGroup direction="horizontal">
          <Panel defaultSize={40} minSize={30}>
            {/* left panel - problem description */}
            <ProblemDescription
              problems={currentproblem}
              currentProblemId={currentProblemId}
              onProblemChange={handleProblemChange}
              allProblems={Object.values(PROBLEMS)}
            />
          </Panel>

          <PanelResizeHandle className='w-2 bg-base-200 hover:bg-primary transition-colors cursor-col-resize' />

          <Panel defaultSize={40} minSize={30}>
            <PanelGroup direction='vertical'>
              {/* upper panel - code editor */}
              <Panel defaultSize={60} minSize={20}>
                <CodeEditor
                  selectedLanguage={selectedLanguage}
                  code={code}
                  isRunning={isRunning}
                  onLanguageChange={handleLanguageChange}
                  onCodeChange={setCode}
                  onRunCode={handleRunCode}
                />
              </Panel>

              <PanelResizeHandle className='h-2 bg-base-200 hover:bg-primary transition-colors cursor-row-resize' />

              {/* lower panel - output */}
              <Panel defaultSize={30} minSize={20}>
                <OutputPanel output={output} />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  )
}

export default ProblemPage