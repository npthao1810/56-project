# Pitfalls Research

## Common Mistakes
1. **LocalStorage Limits & Parsing Errors**: 
   - *Warning*: JSON.parse errors if data is corrupted.
   - *Prevention*: Always wrap LocalStorage reads in a try/catch and provide fallback default states.
2. **Timezone/Date Logic Bugs**:
   - *Warning*: June 5, 2026 GMT+7 deadlines checking against local device time can be easily bypassed or fail unexpectedly if the device timezone is different.
   - *Prevention*: Use strict UTC timestamps or robust date libraries (like `date-fns`) for the deadline checks.
3. **Hardcoded Passcodes Exposed**:
   - *Warning*: If passcodes are plain text in the repository, he could inspect the source code.
   - *Prevention*: Either hash the passcodes (e.g., simple SHA-256 or basic encoding) or rely on the honor system since it's a romantic gift, not a bank.
4. **Tailwind Purge Issues**:
   - *Warning*: Dynamic class names (e.g., `bg-${color}-500`) getting purged in production.
   - *Prevention*: Always use full class names in React components.
