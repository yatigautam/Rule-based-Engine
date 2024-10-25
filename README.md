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

---

## Features  
- **Dynamic Rule Creation:** Create rules from strings and convert them into ASTs.  
- **Rule Combination:** Combine multiple rules using **AND / OR** operators.  
- **Flexible Evaluation:** Evaluate user data against the rules dynamically.  
- **Error Handling:** Identify and manage invalid rules or missing data attributes.  
- **Rule Modification:** Modify AST nodes dynamically to change rules.

---

