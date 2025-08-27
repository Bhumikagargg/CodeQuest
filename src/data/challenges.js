// Challenge data for different levels and sections
export const challengesData = {
  kids: {
    easy: [
      {
        id: 1,
        title: "Help the Cat Find Home! 🐱",
        description: "Move the cat to its house using simple commands",
        type: "visual-blocks",
        difficulty: "easy",
        xp: 50,
        icon: "🐱",
        gameType: "movement",
        instructions: "Drag the blocks to move the cat to the house!",
        solution: ["move_right", "move_right", "move_down"],
        hints: ["Try moving right first!", "The house is down and to the right"],
        visualElements: {
          character: "🐱",
          target: "🏠",
          obstacles: ["🌳", "🌸"],
          grid: { width: 4, height: 3 },
        },
      },
      {
        id: 2,
        title: "Feed the Hungry Animals! 🍎",
        description: "Give food to all the animals in the right order",
        type: "sequence",
        difficulty: "easy",
        xp: 60,
        icon: "🍎",
        gameType: "sequence",
        instructions: "Click the animals in the right order to feed them!",
        solution: ["🐰", "🐸", "🐱"],
        hints: ["Start with the bunny!", "Frog comes after bunny"],
        visualElements: {
          animals: ["🐰", "🐸", "🐱"],
          food: "🍎",
          feedOrder: [1, 2, 3],
        },
      },
      {
        id: 3,
        title: "Color Pattern Magic! 🌈",
        description: "Complete the colorful pattern",
        type: "pattern",
        difficulty: "easy",
        xp: 40,
        icon: "🌈",
        gameType: "pattern",
        instructions: "What color comes next in the pattern?",
        solution: ["red", "blue", "red", "blue", "red"],
        hints: ["Look for the repeating colors!", "Red and blue alternate"],
        visualElements: {
          colors: ["red", "blue", "green", "yellow"],
          pattern: ["red", "blue", "red", "blue", "?"],
        },
      },
    ],
    medium: [
      {
        id: 4,
        title: "Robot Dance Party! 🤖",
        description: "Program the robot to dance with loops",
        type: "loops",
        difficulty: "medium",
        xp: 80,
        icon: "🤖",
        gameType: "programming",
        instructions: "Use loops to make the robot dance 3 times!",
        solution: ["repeat 3 times", "spin", "jump", "clap"],
        hints: ["Use a loop to repeat actions!", "Dance moves: spin, jump, clap"],
        visualElements: {
          robot: "🤖",
          danceFloor: "🕺",
          moves: ["spin", "jump", "clap"],
        },
      },
      {
        id: 5,
        title: "Magic Number Collector! ✨",
        description: "Collect numbers and solve simple math",
        type: "math-adventure",
        difficulty: "medium",
        xp: 90,
        icon: "✨",
        gameType: "math",
        instructions: "Collect numbers that add up to 10!",
        solution: [2, 3, 5],
        hints: ["Find numbers that add to 10", "Try different combinations"],
        visualElements: {
          numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          target: 10,
          collector: "🧙‍♂️",
        },
      },
      {
        id: 6,
        title: "Treasure Hunt Logic! 💎",
        description: "Use if-then logic to find treasure",
        type: "conditionals",
        difficulty: "medium",
        xp: 100,
        icon: "💎",
        gameType: "logic",
        instructions: "If you see a key, then open the chest!",
        solution: ["if key found", "then open chest", "else keep searching"],
        hints: ["Look for the key first!", "Use if-then thinking"],
        visualElements: {
          treasure: "💎",
          key: "🗝️",
          chest: "📦",
          explorer: "🏴‍☠️",
        },
      },
    ],
    hard: [
      {
        id: 7,
        title: "Dragon Rescue Mission! 🐉",
        description: "Save the dragon using complex logic and loops",
        type: "advanced-logic",
        difficulty: "hard",
        xp: 150,
        icon: "🐉",
        gameType: "adventure",
        instructions: "Navigate the maze and rescue the dragon!",
        solution: ["while not at dragon", "if wall ahead", "turn right", "else move forward"],
        hints: ["Use while loops!", "Check for walls before moving"],
        visualElements: {
          dragon: "🐉",
          hero: "🦸‍♂️",
          maze: true,
          obstacles: ["🧱", "🔥", "⚡"],
        },
      },
    ],
  },
  beginners: {
    easy: [
      {
        id: 8,
        title: "Hello World Challenge",
        description: "Write your first program to display a message",
        type: "syntax",
        difficulty: "easy",
        xp: 75,
        icon: "👋",
        language: "python",
        instructions: "Write a program that prints 'Hello, CodeQuest!'",
        starterCode: "# Write your code here\n",
        solution: "print('Hello, CodeQuest!')",
        testCases: [{ input: "", expected: "Hello, CodeQuest!" }],
        hints: ["Use the print() function", "Don't forget the quotes!"],
      },
      {
        id: 9,
        title: "Variable Adventure",
        description: "Learn to store and use data in variables",
        type: "variables",
        difficulty: "easy",
        xp: 85,
        icon: "📦",
        language: "python",
        instructions: "Create variables for your name and age, then print them",
        starterCode: "# Create variables and print them\nname = \nage = \n",
        solution: "name = 'Your Name'\nage = 25\nprint(f'My name is {name} and I am {age} years old')",
        testCases: [{ input: "", expected: "My name is Your Name and I am 25 years old" }],
        hints: ["Use quotes for text", "Numbers don't need quotes"],
      },
      {
        id: 10,
        title: "Simple Calculator",
        description: "Perform basic math operations",
        type: "arithmetic",
        difficulty: "easy",
        xp: 70,
        icon: "🧮",
        language: "python",
        instructions: "Calculate the sum of two numbers and print the result",
        starterCode: "# Add two numbers\nnumber1 = 15\nnumber2 = 25\n# Your code here\n",
        solution: "number1 = 15\nnumber2 = 25\nresult = number1 + number2\nprint(result)",
        testCases: [{ input: "", expected: "40" }],
        hints: ["Use the + operator", "Store the result in a variable"],
      },
    ],
    medium: [
      {
        id: 11,
        title: "Loop Master",
        description: "Use loops to repeat actions efficiently",
        type: "loops",
        difficulty: "medium",
        xp: 120,
        icon: "🔄",
        language: "python",
        instructions: "Print numbers from 1 to 10 using a for loop",
        starterCode: "# Use a for loop to print numbers 1-10\n",
        solution: "for i in range(1, 11):\n    print(i)",
        testCases: [{ input: "", expected: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10" }],
        hints: ["Use range(1, 11)", "Don't forget the colon and indentation"],
      },
      {
        id: 12,
        title: "Decision Maker",
        description: "Use if-else statements to make decisions",
        type: "conditionals",
        difficulty: "medium",
        xp: 110,
        icon: "🤔",
        language: "python",
        instructions: "Check if a number is positive, negative, or zero",
        starterCode: "number = -5\n# Write if-else logic here\n",
        solution:
          "number = -5\nif number > 0:\n    print('Positive')\nelif number < 0:\n    print('Negative')\nelse:\n    print('Zero')",
        testCases: [{ input: "", expected: "Negative" }],
        hints: ["Use if, elif, and else", "Compare with 0"],
      },
      {
        id: 13,
        title: "List Explorer",
        description: "Work with lists and access elements",
        type: "data-structures",
        difficulty: "medium",
        xp: 130,
        icon: "📋",
        language: "python",
        instructions: "Create a list of fruits and print the first and last items",
        starterCode: "# Create a list of fruits\nfruits = \n# Print first and last items\n",
        solution: "fruits = ['apple', 'banana', 'orange', 'grape']\nprint(fruits[0])\nprint(fruits[-1])",
        testCases: [{ input: "", expected: "apple\ngrape" }],
        hints: ["Use square brackets []", "Index 0 is first, -1 is last"],
      },
    ],
    hard: [
      {
        id: 14,
        title: "Function Factory",
        description: "Create and use functions to organize code",
        type: "functions",
        difficulty: "hard",
        xp: 180,
        icon: "⚙️",
        language: "python",
        instructions: "Create a function that calculates the area of a rectangle",
        starterCode:
          "# Define a function to calculate rectangle area\ndef calculate_area():\n    # Your code here\n    pass\n\n# Test your function\n",
        solution:
          "def calculate_area(length, width):\n    return length * width\n\nresult = calculate_area(5, 3)\nprint(result)",
        testCases: [{ input: "", expected: "15" }],
        hints: ["Functions use def keyword", "Use return to give back a value"],
      },
      {
        id: 15,
        title: "Algorithm Challenge",
        description: "Implement a sorting algorithm",
        type: "algorithms",
        difficulty: "hard",
        xp: 200,
        icon: "🧠",
        language: "python",
        instructions: "Sort a list of numbers in ascending order",
        starterCode: "numbers = [64, 34, 25, 12, 22, 11, 90]\n# Sort the list\n",
        solution: "numbers = [64, 34, 25, 12, 22, 11, 90]\nnumbers.sort()\nprint(numbers)",
        testCases: [{ input: "", expected: "[11, 12, 22, 25, 34, 64, 90]" }],
        hints: ["Use the sort() method", "Or implement bubble sort manually"],
      },
    ],
  },
}

// API simulation for fetching challenges
export const fetchChallenges = async (section, difficulty, title = null) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const challenges = challengesData[section]?.[difficulty] || [];
  if (title) {
    // Find the challenge with the exact title
    const found = challenges.find((c) => c.title === title);
    return found ? [found] : [];
  }
  return challenges;
}

// Progress tracking
export const getUserProgress = () => {
  const saved = localStorage.getItem("codequest-progress")
  return saved
    ? JSON.parse(saved)
    : {
        kids: { easy: [], medium: [], hard: [] },
        beginners: { easy: [], medium: [], hard: [] },
        totalXP: 0,
        badges: [],
      }
}

export const saveProgress = (progress) => {
  localStorage.setItem("codequest-progress", JSON.stringify(progress))
}
