import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const programmingMethodologyPythonModule: LearningModule = {
  title: 'Programming Methodology with Python',
  introduction: 'Welcome to the exciting world of Programming Methodology with Python! Python is one of the most popular and beginner-friendly programming languages in the world, used by everyone from web developers to data scientists to artificial intelligence researchers. In this module, you\'ll learn the fundamental concepts and techniques that form the foundation of all programming, using Python\'s clear and readable syntax. We\'ll cover everything from basic syntax and variables to advanced concepts like error handling and file operations. By the end of this module, you\'ll have a solid understanding of how to approach programming problems systematically and implement solutions using Python. Get ready to think like a programmer and bring your ideas to life through code!',
  concepts: [
    {
      title: 'Python Syntax, Variables, and Data Types',
      content: 'Python has a clean and readable syntax that makes it easy to learn. Variables store data that can be used throughout your program, and different data types allow you to work with different kinds of information.',
      examples: [
        'Variables are created by assigning values: name = "Alice", age = 16, height = 5.7',
        'Python automatically determines data types: int (10), float (3.14), str ("Hello"), bool (True/False)',
        'Variable names must start with a letter or underscore: student_name, _temp, score1',
        'Use meaningful names: total_score instead of ts, user_age instead of u',
        'Comments start with #: # This is a comment, x = 5  # Assign 5 to x',
        'Indentation is crucial in Python - it defines code blocks instead of braces {}'
      ]
    },
    {
      title: 'Input and Output Operations',
      content: 'Input and output operations allow your programs to interact with users. Input gets data from users, while output displays results and information.',
      examples: [
        'Input: name = input("Enter your name: ") gets text from the user',
        'Input always returns a string, so convert for numbers: age = int(input("Enter your age: "))',
        'Output: print("Hello, " + name) displays text to the user',
        'Multiple values: print("Name:", name, "Age:", age)',
        'Formatted output: print(f"Hello {name}, you are {age} years old")',
        'Special characters: \\n for new line, \\t for tab in print statements'
      ]
    },
    {
      title: 'Operators - Arithmetic, Comparison, Logical, Assignment',
      content: 'Operators perform operations on variables and values. Python provides various types of operators for different purposes.',
      examples: [
        'Arithmetic: + (add), - (subtract), * (multiply), / (divide), // (floor), % (modulo), ** (power)',
        'Example: result = (10 + 5) * 2  # result is 30',
        'Comparison: == (equal), != (not equal), >, <, >=, <=',
        'Example: if age >= 18: print("You are an adult")',
        'Logical: and, or, not',
        'Example: if age >= 13 and age <= 19: print("You are a teenager")',
        'Assignment: =, +=, -=, *=, /=, %=, **=',
        'Example: score += 10  # same as score = score + 10'
      ]
    },
    {
      title: 'Conditional Statements - if, elif, else',
      content: 'Conditional statements allow programs to make decisions based on conditions. They execute different code paths depending on whether certain conditions are true or false.',
      examples: [
        'Simple if: if temperature > 30: print("It\'s hot!")',
        'If-else: if age >= 18: print("Adult") else: print("Minor")',
        'Multiple conditions with elif: if score >= 90: grade = "A" elif score >= 80: grade = "B" else: grade = "C"',
        'Nested conditions: if age >= 18: if has_license: print("Can drive") else: print("No license")',
        'Combining conditions: if age >= 18 and has_id: print("Can vote")',
        'Checking multiple possibilities: if day == "Saturday" or day == "Sunday": print("Weekend!")'
      ]
    },
    {
      title: 'Loops - for and while',
      content: 'Loops allow programs to repeat actions multiple times, making it easy to process collections of data or perform repetitive tasks.',
      examples: [
        'For loop with range: for i in range(5): print(i)  # prints 0, 1, 2, 3, 4',
        'For loop with lists: for fruit in ["apple", "banana", "orange"]: print(fruit)',
        'While loop: count = 0; while count < 5: print(count); count += 1',
        'Breaking loops: for i in range(10): if i == 3: break; print(i)  # prints 0, 1, 2',
        'Skipping iterations: for i in range(5): if i == 2: continue; print(i)  # skips 2',
        'Nested loops: for i in range(3): for j in range(2): print(f"{i},{j}")'
      ]
    },
    {
      title: 'Functions - Creating and Using',
      content: 'Functions are reusable blocks of code that perform specific tasks. They help organize code, reduce repetition, and make programs easier to understand.',
      examples: [
        'Defining a function: def greet(name): print(f"Hello, {name}!")',
        'Calling a function: greet("Alice")',
        'Functions with parameters: def add(a, b): return a + b; result = add(5, 3)  # result is 8',
        'Functions with default parameters: def greet(name="Friend"): print(f"Hello, {name}!")',
        'Returning values: def square(x): return x * x; num_squared = square(4)  # 16',
        'Functions with multiple returns: def get_status(score): if score >= 60: return "Pass" else: return "Fail"'
      ]
    },
    {
      title: 'Key Data Structures - List, Tuple, Dictionary, Set',
      content: 'Data structures organize and store collections of data. Python provides several built-in data structures for different purposes.',
      examples: [
        'Lists: ordered, mutable collections: fruits = ["apple", "banana", "orange"]; fruits.append("grape")',
        'Tuples: ordered, immutable collections: coordinates = (10, 20); x, y = coordinates',
        'Dictionaries: key-value pairs: student = {"name": "Alice", "age": 16}; print(student["name"])',
        'Sets: unordered collections with unique elements: unique_numbers = {1, 2, 3, 2}; print(unique_numbers)  # {1, 2, 3}',
        'List operations: len(fruits), fruits[0], fruits[-1], fruits[1:3]',
        'Dictionary operations: student.keys(), student.values(), "name" in student'
      ]
    },
    {
      title: 'File Handling Operations',
      content: 'File handling allows programs to read from and write to files, making it possible to save data permanently and process external information.',
      examples: [
        'Writing to a file: with open("data.txt", "w") as file: file.write("Hello, World!")',
        'Reading from a file: with open("data.txt", "r") as file: content = file.read()',
        'Reading lines: with open("data.txt", "r") as file: lines = file.readlines()',
        'Appending to a file: with open("data.txt", "a") as file: file.write("\\nNew line")',
        'Exception handling with files: try: with open("data.txt") as f: content = f.read() except FileNotFoundError: print("File not found")',
        'The with statement automatically closes files, even if errors occur'
      ]
    },
    {
      title: 'Error Handling - try and except',
      content: 'Error handling allows programs to gracefully handle unexpected situations instead of crashing. It makes programs more robust and user-friendly.',
      examples: [
        'Basic try-except: try: result = 10/0 except: print("Cannot divide by zero")',
        'Specific exceptions: try: num = int(input("Enter number: ")) except ValueError: print("That\'s not a number!")',
        'Multiple exceptions: try: result = 10/int(input("Number: ")) except ValueError: print("Invalid input") except ZeroDivisionError: print("Cannot divide by zero")',
        'Else clause: try: file = open("data.txt") except FileNotFoundError: print("File missing") else: print("File opened successfully")',
        'Finally clause: try: file = open("data.txt") except: print("Error") finally: file.close()  # Always executes',
        'Raising exceptions: if age < 0: raise ValueError("Age cannot be negative")'
      ]
    },
    {
      title: 'Systematic Steps in Programming Methodology',
      content: 'Programming methodology provides a structured approach to solving problems with code. Following these steps helps create better, more reliable programs.',
      examples: [
        'Step 1: Problem Analysis - Understand what needs to be accomplished and what inputs/outputs are required',
        'Step 2: Planning - Break the problem into smaller sub-problems and plan the approach',
        'Step 3: Algorithm Design - Create a step-by-step procedure to solve the problem',
        'Step 4: Implementation - Write the code based on your algorithm',
        'Step 5: Testing - Run the program with different inputs to verify it works correctly',
        'Step 6: Debugging - Find and fix errors in the code',
        'Step 7: Documentation - Add comments and explanations to make the code understandable',
        'Step 8: Optimization - Improve the code for better performance or readability'
      ]
    },
    {
      title: 'Best Practices in Python Programming',
      content: 'Following best practices makes your code more readable, maintainable, and efficient. These conventions are widely accepted in the Python community.',
      examples: [
        'Use meaningful variable names: student_count instead of sc, total_price instead of tp',
        'Follow PEP 8 style guide: lowercase_with_underscores for variables, CamelCase for classes',
        'Add comments to explain complex logic: # Calculate tax based on state regulations',
        'Keep functions focused on single tasks: def calculate_tax(amount): rather than def process_order()',
        'Use docstrings for functions: def add(a, b): """Returns the sum of a and b""" return a + b',
        'Handle errors appropriately: try-except blocks for expected error conditions'
      ]
    },
    {
      title: 'Common Programming Patterns',
      content: 'Recognizing common programming patterns helps solve problems more efficiently and write cleaner code.',
      examples: [
        'Accumulator pattern: total = 0; for num in numbers: total += num',
        'Counter pattern: count = 0; for item in items: if condition(item): count += 1',
        'Filter pattern: evens = [x for x in numbers if x % 2 == 0]',
        'Map pattern: squares = [x**2 for x in numbers]',
        'Search pattern: found = False; for item in items: if item == target: found = True; break',
        'Validation pattern: while True: user_input = input("Enter positive number: "); if user_input > 0: break'
      ]
    }
  ],
  mcqs: [
    {
      question: 'Which of the following is the correct way to create a variable in Python?',
      options: ['var name = "Alice"', 'name = "Alice"', 'string name = "Alice"', 'name := "Alice"'],
      correct: 1,
      explanation: 'In Python, variables are created by assigning values using the = operator. Python automatically determines the data type based on the assigned value.'
    },
    {
      question: 'How do you get a number input from a user in Python?',
      options: ['age = input("Enter age: ")', 'age = int(input("Enter age: "))', 'age = number(input("Enter age: "))', 'age = get_number("Enter age: ")'],
      correct: 1,
      explanation: 'The input() function always returns a string, so you need to convert it to an integer using int() if you want to work with the input as a number.'
    },
    {
      question: 'Which operator is used for integer division in Python?',
      options: ['/', '//', '%', '**'],
      correct: 1,
      explanation: 'The // operator performs floor division (integer division), returning the largest integer less than or equal to the division result. For example, 7 // 2 equals 3.'
    },
    {
      question: 'What is the correct syntax for an if-elif-else statement in Python?',
      options: ['if condition: elif condition: else:', 'if (condition) elif (condition) else:', 'if condition: else if condition: else:', 'if condition then: elif condition then: else:'],
      correct: 0,
      explanation: 'In Python, the correct syntax is if condition: elif condition: else: with colons after each condition and proper indentation for the code blocks.'
    },
    {
      question: 'Which loop is best for iterating through elements in a list?',
      options: ['while loop', 'for loop', 'do-while loop', 'repeat loop'],
      correct: 1,
      explanation: 'A for loop is the most appropriate for iterating through elements in a list. Python\'s for loop is designed for this purpose: for item in my_list:'
    },
    {
      question: 'How do you define a function in Python?',
      options: ['function my_func():', 'def my_func():', 'func my_func():', 'define my_func():'],
      correct: 1,
      explanation: 'In Python, functions are defined using the def keyword followed by the function name and parentheses: def function_name():'
    },
    {
      question: 'Which data structure is ordered and mutable in Python?',
      options: ['Tuple', 'List', 'Dictionary', 'Set'],
      correct: 1,
      explanation: 'Lists are ordered (items maintain their position) and mutable (you can change, add, or remove items after creation). Tuples are ordered but immutable.'
    },
    {
      question: 'What is the correct way to read from a file in Python?',
      options: ['file = open("data.txt", "r"); content = file.read()', 'with open("data.txt", "r") as file: content = file.read()', 'Both A and B are correct', 'read("data.txt")'],
      correct: 2,
      explanation: 'Both approaches work, but option B with the with statement is preferred because it automatically closes the file even if an error occurs.'
    },
    {
      question: 'Which statement is used to handle exceptions in Python?',
      options: ['catch', 'except', 'handle', 'try-except'],
      correct: 3,
      explanation: 'Python uses try-except blocks to handle exceptions. The try block contains code that might raise an exception, and the except block handles the exception if it occurs.'
    },
    {
      question: 'What is the first step in the programming methodology?',
      options: ['Writing code', 'Testing the program', 'Understanding the problem', 'Debugging errors'],
      correct: 2,
      explanation: 'The first step in programming methodology is always to understand the problem completely - what needs to be accomplished and what the requirements are - before planning and implementing a solution.'
    }
  ]
}

export default function ProgrammingMethodologyPythonModule() {
  return (
    <ModuleLayout 
      module={programmingMethodologyPythonModule} 
      grade={11} 
      subject="Computer Science" 
    />
  )
}