# Rule-based-Engine
# Rule Engine with Abstract Syntax Tree (AST)

## Objective
This project implements a **3-tier rule engine application** that uses **Abstract Syntax Tree (AST)** to represent conditional rules. It allows dynamic creation, combination, and evaluation of rules based on user attributes such as **age, department, salary, and experience**. The rule engine evaluates whether a user meets specific criteria according to the defined rules.

---

## Table of Contents
1. [Flow Diagram](#flow-diagram)  
2. [Features](#features)  
3. [Technologies Used](#technologies-used)  
4. [Dependencies](#dependencies)  
5. [Project Structure](#project-structure)  
6. [Installation and Setup](#installation-and-setup)  
7. [API Design](#api-design)  
8. [Example Rules](#example-rules)  
9. [How to Test](#how-to-test)  
10. [Future Enhancements](#future-enhancements)  
11. [Sample HTML (Optional for UI)](#sample-html-optional-for-ui)  
12. [Conclusion](#conclusion)

---

## Flow Diagram

```mermaid
graph TD;
    A[User] -->|Enters Rule/Conditions| B[Frontend/UI]
    B -->|Sends Request| C[Express Server/API]
    C -->|Processes Rule and Data| D[AST Creation & Rule Logic]
    D -->|Returns Result| C
    C -->|Sends Response| B
    B -->|Displays Result| A
Features
Dynamic Rule Creation:
Allows creation of rules on the fly using strings and converts them into ASTs.
Rule Combination:
Combine multiple rules logically using AND and OR operators.
Flexible Evaluation:
Evaluate any JSON data against the rules to determine eligibility.
Error Handling:
Identifies and manages invalid rules and missing attributes.
Modifiable Rules:
Modify AST nodes to change rules dynamically without major code changes.
Technologies Used
Node.js: Backend runtime to power the server logic.
Express.js: Framework for handling HTTP requests and building RESTful APIs.
Body-parser: Middleware for parsing JSON bodies of incoming requests.
JavaScript: Core logic for AST creation, rule combination, and evaluation.
Dependencies
Install the dependencies using the following command:

bash
Copy code
npm install express body-parser
List of Dependencies:
Express: Handles routing and API creation.
Body-parser: Parses incoming request bodies into JSON format.
Node.js: JavaScript runtime environment.
Project Structure
php
Copy code
root/
│
├── public/                # Static HTML/CSS/JS (Optional for UI)
├── index.js               # Main Express server file
├── package.json           # Project metadata and dependencies
└── README.md              # Documentation (this file)
Installation and Setup
Clone the Repository:
Clone the repository using the command:

bash
Copy code
git clone <your-repo-url>
cd <your-project-directory>
Install Dependencies:
Install the project dependencies by running:

bash
Copy code
npm install
Run the Server:
Start the server with the following command:

bash
Copy code
node index.js
The server will start at http://localhost:3000.

API Design
1. POST /create_rule
Creates an AST from a rule string.

Request Body:
json
Copy code
{
  "ruleString": "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)"
}
Response:
json
Copy code
{
  "type": "operator",
  "value": "AND",
  "left": {...},
  "right": {...}
}
2. POST /combine_rules
Combines multiple rules into a single AST.

Request Body:
json
Copy code
{
  "rules": [
    "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)",
    "((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)"
  ]
}
Response:
json
Copy code
{
  "type": "operator",
  "value": "AND",
  "left": {...},
  "right": {...}
}
3. POST /evaluate_rule
Evaluates JSON data against the combined AST.

Request Body:
json
Copy code
{
  "ast": {
    "type": "operator",
    "value": "AND",
    "left": {...},
    "right": {...}
  },
  "data": {
    "age": 35,
    "department": "Sales",
    "salary": 60000,
    "experience": 3
  }
}
Response:
json
Copy code
{
  "result": true
}
Example Rules
Rule 1:
java
Copy code
((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)
Rule 2:
java
Copy code
((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)
How to Test
Create a Rule:
Use POST /create_rule to send a rule string. Verify the response to confirm correct AST generation.

Combine Rules:
Use POST /combine_rules with multiple rules. Check if the combined AST is generated correctly.

Evaluate Rule:
Use POST /evaluate_rule with the AST and sample data. Validate the output based on the expected result.

Error Handling:
Test with invalid inputs to confirm error handling works (e.g., invalid operators or missing attributes).

Future Enhancements
Database Integration:
Store rules in a database like MongoDB and retrieve them dynamically.

UI Enhancements:
Provide a visual interface for creating and modifying rules.

Advanced Operators:
Add support for more operators like >=, <=, and !=.

User-Defined Functions:
Enable custom logic functions in rules for more complex scenarios.

Rule Modification API:
Introduce endpoints to modify individual parts of the AST dynamically.

Sample HTML (Optional for UI)
html
Copy code
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rule Engine</title>
</head>
<body>
  <h1>Rule Engine</h1>
  <form id="ruleForm">
    <input type="text" id="ruleInput" placeholder="Enter Rule String" />
    <button type="submit">Create Rule</button>
  </form>
  <div id="result"></div>

  <script>
    document.getElementById('ruleForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const ruleString = document.getElementById('ruleInput').value;
      const response = await fetch('/create_rule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ruleString })
      });
      const result = await response.json();
      document.getElementById('result').innerText = JSON.stringify(result, null, 2);
    });
  </script>
</body>
</html>
Conclusion
This project demonstrates a flexible rule engine that leverages ASTs for dynamic rule creation, combination, and evaluation. Future extensions can improve it with database storage, advanced operators, and a visual interface.
