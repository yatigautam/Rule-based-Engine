# Rule-based Engine  

## Rule Engine with Abstract Syntax Tree (AST)  

### Objective  
This project implements a 3-tier rule engine application that uses **Abstract Syntax Tree (AST)** to represent conditional rules. It allows dynamic creation, combination, and evaluation of rules based on user attributes such as age, department, salary, and experience. The rule engine evaluates whether a user meets specific criteria according to the defined rules.

---

## Table of Contents  
- [Flow Diagram](#flow-diagram)  
- [Features](#features)  
- [Technologies Used](#technologies-used)  
- [Dependencies](#dependencies)  
- [Project Structure](#project-structure)  
- [Installation and Setup](#installation-and-setup)  
- [API Design](#api-design)  
- [Example Rules](#example-rules)  
- [How to Test](#how-to-test)  
- [Future Enhancements](#future-enhancements)  
- [Sample HTML (Optional for UI)](#sample-html-optional-for-ui)  
- [Conclusion](#conclusion)  

---

## Flow Diagram  
```mermaid
graph TD;
    A[User] -->|Inputs Rule/Conditions| B[Frontend/UI]
    B -->|Sends Request| C[Express Server/API]
    C -->|Processes Rule & Data| D[AST Creation & Rule Logic]
    D -->|Returns Evaluation| C
    C -->|Sends Response| B
    B -->|Displays Result| A
