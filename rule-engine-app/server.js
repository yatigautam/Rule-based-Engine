const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files (HTML, CSS, JS)

// Include the AST and rule engine logic from above
class Node {
  constructor(type, value = null, left = null, right = null) {
    this.type = type;
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

function createConditionNode(conditionString) {
  return new Node("operand", conditionString);
}

function createOperatorNode(operator, leftNode, rightNode) {
  return new Node("operator", operator, leftNode, rightNode);
}

function createRule(ruleString) {
  const tokens = ruleString.match(/(\w+|\W)/g);
  let stack = [];
  let currentNode = null;
  let operator = null;

  tokens.forEach(token => {
    if (token === "(") {
      stack.push(currentNode);
      currentNode = null;
    } else if (token === ")") {
      let left = stack.pop();
      currentNode = createOperatorNode(operator, left, currentNode);
      operator = null;
    } else if (token === "AND" || token === "OR") {
      operator = token;
    } else {
      let condition = createConditionNode(token);
      if (currentNode === null) {
        currentNode = condition;
      } else {
        currentNode = createOperatorNode(operator, currentNode, condition);
        operator = null;
      }
    }
  });

  return currentNode;
}

function combineRules(rules) {
  let combinedRoot = null;
  rules.forEach(rule => {
    let ruleAST = createRule(rule);
    if (combinedRoot === null) {
      combinedRoot = ruleAST;
    } else {
      combinedRoot = createOperatorNode("AND", combinedRoot, ruleAST);
    }
  });
  return combinedRoot;
}

function evaluateRuleNode(node, data) {
  if (node.type === "operand") {
    return evaluateCondition(node.value, data);
  } else if (node.type === "operator") {
    if (node.value === "AND") {
      return evaluateRuleNode(node.left, data) && evaluateRuleNode(node.right, data);
    } else if (node.value === "OR") {
      return evaluateRuleNode(node.left, data) || evaluateRuleNode(node.right, data);
    }
  }
  return false;
}

function evaluateCondition(condition, data) {
  const [attribute, operator, value] = condition.split(" ");
  const userValue = data[attribute];

  switch (operator) {
    case ">":
      return userValue > parseInt(value);
    case "<":
      return userValue < parseInt(value);
    case "=":
      return userValue === value.replace(/'/g, "");
    default:
      return false;
  }
}

function evaluateRule(ast, data) {
  return evaluateRuleNode(ast, data);
}

// POST /create_rule
app.post('/create_rule', (req, res) => {
  const { ruleString } = req.body;
  const ast = createRule(ruleString);
  res.json(ast);
});

// POST /combine_rules
app.post('/combine_rules', (req, res) => {
  const { rules } = req.body;
  const combinedAST = combineRules(rules);
  res.json(combinedAST);
});

// POST /evaluate_rule
app.post('/evaluate_rule', (req, res) => {
  const { ast, data } = req.body;
  const result = evaluateRule(ast, data);
  res.json({ result });
});

app.listen(port, () => {
  console.log(`Rule engine app listening at http://localhost:${port}`);
});
