const PISTON = "https://emkc.org/api/v2/piston"

const LANGUAGE_VERSIONS = {
    javascript: { language: "javascript", version: "18.15.0" },
    python: { language: "python", version: "3.10.0" },
    java: { language: "java", version: "15.0.2" },
}

/**
 * Execute source code using the Piston execution API.
 *
 * @param {string} language - Language key identifying which runtime to use (e.g., "javascript", "python", "java").
 * @param {string} code - Source code to execute.
 * @returns {{success: boolean, output?: string, error?: string}} `true` if execution completed without stderr; when `true`, `output` contains the program output (or "no output" if empty). `false` indicates a failure; `error` contains the error message and `output` may contain any captured output.

export async function executeCode(language, code) {
    try {
        const languageConfig = LANGUAGE_VERSIONS[language];
        if (!languageConfig) { return { success: false, error: "Unsupported language" } }

        const response = await fetch(`${PISTON}/execute`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                language: languageConfig.language,
                version: languageConfig.version,
                files: [{
                    name: `Main.${getFileExtension(language)}`,
                    content: code
                }],
            }),
        })

        if (!response.ok) {
            return { success: false, error: `API request failed with status ${response.status}` }
        }

        const data = await response.json();
        const output = data.run.output || "";
        const stderr = data.run.stderr || "";

        if (stderr) {
            return { success: false, output: output, error: stderr }
        }
        return { success: true, output: output || "no output" };
    } catch (error) {

    }
}

/**
 * Get the filename extension associated with a programming language key.
 * @param {string} language - Language identifier (e.g., "javascript", "python", "java").
 * @returns {string} The file extension for the language (e.g., "js", "py", "java"), or "txt" if unknown.
 */
function getFileExtension(language) {
    const extensions = {
        javascript: "js",
        python: "py",
        java: "java",
    };
    return extensions[language] || "txt"
}