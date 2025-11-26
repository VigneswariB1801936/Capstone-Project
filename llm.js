import { exec } from "child_process";

export function runLocalModel(prompt) {
  return new Promise((resolve, reject) => {
    // replace line breaks and escape quotes
    const safePrompt = prompt.replace(/"/g, '\\"').replace(/\n/g, ' ');

    // Windows-friendly command
    const command = `cmd /c "echo ${safePrompt} | ollama run llama3.2"`;

    exec(command, (err, stdout) => {
      if (err) return reject(err);

      const output = stdout.trim();

      // Try to find JSON in output
      const match = output.match(/\{[\s\S]*\}/);
      if (match) {
        try {
          const parsed = JSON.parse(match[0]);
          resolve(parsed);
        } catch {
          resolve({ parsing_error: true, raw: match[0] });
        }
      } else {
        resolve({ parsing_error: true, raw: output });
      }
    });
  });
}
