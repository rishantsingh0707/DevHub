import Editor from "@monaco-editor/react";
import { Loader2Icon, PlayIcon } from "lucide-react";
import { LANGUAGE_CONFIG } from "../data/problems";

/**
 * Render a code editor with language selection and a run action.
 *
 * @param {object} props - Component props.
 * @param {string} props.selectedLanguage - Key of the currently selected language from LANGUAGE_CONFIG.
 * @param {string} props.code - Current code text displayed in the editor.
 * @param {boolean} props.isRunning - Whether code execution is in progress; disables the Run button when true.
 * @param {(event: import('react').ChangeEvent<HTMLSelectElement>) => void} props.onLanguageChange - Handler invoked when the language selection changes.
 * @param {(value: string | undefined) => void} props.onCodeChange - Handler invoked when the editor content changes.
 * @param {() => void} props.onRunCode - Handler invoked when the Run button is clicked.
 * @returns {import('react').ReactElement} A React element containing the language selector, run button, and Monaco editor configured for the selected language.
 */
function CodeEditor({
  selectedLanguage, code, isRunning, onLanguageChange, onCodeChange, onRunCode,
}) {
  return (
    <div className="h-full bg-base-300 flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 bg-base-100 border-t border-base-300">
        <div className="flex items-center gap-3">
          <img
            src={LANGUAGE_CONFIG[selectedLanguage].icon}
            alt={LANGUAGE_CONFIG[selectedLanguage].name}
            className="size-6"
          />
          <select className="select select-sm" value={selectedLanguage} onChange={onLanguageChange}>
            {Object.entries(LANGUAGE_CONFIG).map(([key, lang]) => (
              <option key={key} value={key}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-primary btn-sm gap-2" disabled={isRunning} onClick={onRunCode}>
          {isRunning ? (
            <>
              <Loader2Icon className="size-4 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <PlayIcon className="size-4" />
              Run Code
            </>
          )}
        </button>
      </div>

      <div className="flex-1">
        <Editor
          height={"100%"}
          language={LANGUAGE_CONFIG[selectedLanguage].monacoLang}
          value={code}
          onChange={onCodeChange}
          theme="vs-dark"
          options={{
            fontSize: 16,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            minimap: { enabled: false },
          }}
        />
      </div>
    </div>
  );
}
export default CodeEditor;