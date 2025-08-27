// AI-powered challenge generators for unlimited content with NO DUPLICATES

// Global tracking to prevent duplicates
const generatedChallenges = {
  kids: new Set(),
  beginners: new Set(),
}

// Kids Challenge Templates
const kidsTemplates = {
  movement: [
    {
      characters: ["🐱", "🐶", "🐰", "🐸", "🦊", "🐻", "🐼", "🐨"],
      targets: ["🏠", "🍎", "🥕", "🍯", "🐟", "🥜", "🍌", "🧀"],
      obstacles: ["🌳", "🌸", "🪨", "🌊", "🔥", "⚡", "🕳️", "🧱"],
      gridSizes: [
        { width: 3, height: 3 },
        { width: 4, height: 3 },
        { width: 4, height: 4 },
        { width: 5, height: 4 },
      ],
    },
  ],
  sequence: [
    {
      themes: ["animals", "colors", "shapes", "numbers", "fruits"],
      animals: ["🐰", "🐸", "🐱", "🐶", "🦊", "🐻", "🐼", "🐨", "🦁", "🐯"],
      colors: ["🔴", "🟡", "🟢", "🔵", "🟣", "🟠", "⚫", "⚪"],
      shapes: ["⭐", "❤️", "🔺", "🔷", "🔶", "🟦", "🟨", "🟩"],
      numbers: ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"],
      fruits: ["🍎", "🍌", "🍊", "🍇", "🍓", "🥝", "🍑", "🍒"],
    },
  ],
  math: [
    {
      operations: ["+", "-", "*"],
      ranges: [
        { min: 1, max: 10 },
        { min: 1, max: 20 },
        { min: 10, max: 50 },
      ],
      themes: ["🧙‍♂️ Magic Numbers", "🏴‍☠️ Treasure Hunt", "🚀 Space Math", "🦄 Unicorn Counting"],
    },
  ],
  pattern: [
    {
      themes: ["dots", "lines", "squares", "triangles"],
      dots: ["•", "◦", "●", "○"],
      lines: ["-", "=", "|", "—"],
      squares: ["□", "■", "⬛", "⬜"],
      triangles: ["▲", "△", "▴", "▵"],
    },
  ],
}

// Beginner Challenge Templates - UNIQUE VARIATIONS
const beginnerTemplates = {
  syntax: {
    print: [
      { name: "Alice", greeting: "Hello", message: "Welcome to Python!" },
      { name: "Bob", greeting: "Hi", message: "Let's code together!" },
      { name: "Charlie", greeting: "Hey", message: "Python is awesome!" },
      { name: "Diana", greeting: "Greetings", message: "Ready to learn?" },
      { name: "Eve", greeting: "Welcome", message: "Coding is fun!" },
      { name: "Frank", greeting: "Howdy", message: "Let's build something!" },
    ],
    variables: [
      { name: "Emma", age: 25, city: "New York", hobby: "reading" },
      { name: "Frank", age: 30, city: "London", hobby: "gaming" },
      { name: "Grace", age: 22, city: "Tokyo", hobby: "cooking" },
      { name: "Henry", age: 28, city: "Paris", hobby: "music" },
      { name: "Ivy", age: 26, city: "Sydney", hobby: "painting" },
      { name: "Jack", age: 32, city: "Berlin", hobby: "cycling" },
    ],
  },
  loops: {
    counting: [
      { start: 1, end: 5, step: 1, desc: "Count from 1 to 5" },
      { start: 1, end: 10, step: 1, desc: "Count from 1 to 10" },
      { start: 5, end: 15, step: 1, desc: "Count from 5 to 15" },
      { start: 0, end: 20, step: 2, desc: "Count even numbers from 0 to 20" },
      { start: 1, end: 21, step: 2, desc: "Count odd numbers from 1 to 21" },
      { start: 10, end: 0, step: -1, desc: "Countdown from 10 to 0" },
      { start: 2, end: 12, step: 2, desc: "Count by 2s from 2 to 12" },
      { start: 3, end: 18, step: 3, desc: "Count by 3s from 3 to 18" },
    ],
    multiplication: [
      { table: 2, desc: "2 times table", limit: 5 },
      { table: 3, desc: "3 times table", limit: 5 },
      { table: 4, desc: "4 times table", limit: 5 },
      { table: 5, desc: "5 times table", limit: 5 },
      { table: 6, desc: "6 times table", limit: 5 },
      { table: 7, desc: "7 times table", limit: 5 },
      { table: 8, desc: "8 times table", limit: 5 },
      { table: 9, desc: "9 times table", limit: 5 },
    ],
    patterns: [
      { rows: 3, pattern: "*", desc: "3-row star triangle" },
      { rows: 4, pattern: "#", desc: "4-row hash triangle" },
      { rows: 5, pattern: "+", desc: "5-row plus triangle" },
      { rows: 4, pattern: "=", desc: "4-row equals triangle" },
      { rows: 3, pattern: "-", desc: "3-row dash triangle" },
      { rows: 5, pattern: "o", desc: "5-row circle triangle" },
    ],
    squares: [
      { limit: 3, desc: "squares of numbers 1 to 3" },
      { limit: 5, desc: "squares of numbers 1 to 5" },
      { limit: 7, desc: "squares of numbers 1 to 7" },
      { limit: 4, desc: "squares of numbers 1 to 4" },
      { limit: 6, desc: "squares of numbers 1 to 6" },
    ],
  },
  conditionals: [
    { age: 16, voting: 18, driving: 16, desc: "voting and driving eligibility" },
    { age: 21, voting: 18, driving: 16, desc: "adult privileges check" },
    { age: 15, voting: 18, driving: 16, desc: "teen privileges check" },
    { age: 25, voting: 18, driving: 16, desc: "full adult status" },
    { score: 95, desc: "excellent performance" },
    { score: 87, desc: "good performance" },
    { score: 76, desc: "average performance" },
    { score: 65, desc: "needs improvement" },
    { score: 45, desc: "failing grade" },
    { temp: 35, desc: "hot summer day" },
    { temp: 25, desc: "pleasant spring day" },
    { temp: 15, desc: "cool autumn day" },
    { temp: 5, desc: "cold winter day" },
    { temp: -5, desc: "freezing winter day" },
  ],
  functions: [
    { name: "greet_user", action: "print a greeting", output: "Hello, welcome!" },
    { name: "show_menu", action: "display a menu", output: "1. Start 2. Exit" },
    { name: "say_goodbye", action: "print farewell", output: "Thanks for using our app!" },
    { operation: "add", nums: [5, 3], desc: "addition function" },
    { operation: "multiply", nums: [4, 7], desc: "multiplication function" },
    { operation: "subtract", nums: [10, 4], desc: "subtraction function" },
    { operation: "divide", nums: [15, 3], desc: "division function" },
  ],
  dataStructures: [
    { items: ["apple", "banana", "orange"], operation: "append", new_item: "grape", desc: "fruit list" },
    { items: [1, 2, 3, 4], operation: "remove", new_item: 2, desc: "number list" },
    { items: ["red", "blue", "green"], operation: "insert", new_item: "yellow", desc: "color list" },
    { items: [10, 20, 30], operation: "extend", new_item: [40, 50], desc: "score list" },
    { data: { name: "Alice", age: 25 }, operation: "add", key: "city", value: "NYC", desc: "person info" },
    { data: { apple: 5, banana: 3 }, operation: "update", key: "apple", value: 7, desc: "fruit inventory" },
  ],
}

// Fallback challenges
const fallbackChallenges = {
  kids: {
    easy: [
      {
        id: "fallback_kids_1",
        title: "Help the 🐱 find the 🏠!",
        description: "Navigate through the grid to reach your goal!",
        type: "visual-blocks",
        difficulty: "easy",
        xp: 50,
        icon: "🐱",
        gameType: "movement",
        instructions: "Use the movement blocks to guide the cat to the house!",
        solution: ["move_right", "move_right", "move_down"],
        hints: ["Try moving towards the house!", "Plan your path step by step!"],
        visualElements: {
          character: "🐱",
          target: "🏠",
          obstacles: ["🌳"],
          grid: { width: 3, height: 3 },
          startPosition: { x: 0, y: 0 },
          targetPosition: { x: 2, y: 2 },
        },
      },
    ],
  },
  beginners: {
    easy: [
      {
        id: "fallback_beginner_1",
        title: "Print Statement Challenge",
        description: "Master Python syntax with this hands-on challenge",
        type: "syntax",
        difficulty: "easy",
        xp: 75,
        icon: "👋",
        language: "python",
        instructions: 'Write a program that prints "Hello, World!"',
        starterCode: "# Write your print statement here\n",
        solution: 'print("Hello, World!")',
        testCases: [{ input: "", expected: "Hello, World!" }],
        hints: ["Remember to use quotes for strings", "Use the print() function"],
      },
    ],
  },
}

// Challenge Generator Functions with duplicate prevention
export const generateKidsChallenge = (difficulty, type) => {
  try {
    console.log(`🎯 Generating UNIQUE kids challenge: ${type} - ${difficulty}`)
    const baseId = Date.now() + Math.random()

    let challenge
    let attempts = 0
    const maxAttempts = 10

    do {
      switch (type) {
        case "movement":
          challenge = generateMovementChallenge(difficulty, baseId + attempts)
          break
        case "sequence":
          challenge = generateSequenceChallenge(difficulty, baseId + attempts)
          break
        case "math":
          challenge = generateMathChallenge(difficulty, baseId + attempts)
          break
        case "pattern":
          challenge = generatePatternChallenge(difficulty, baseId + attempts)
          break
        default:
          challenge = generateMovementChallenge(difficulty, baseId + attempts)
      }
      attempts++
    } while (generatedChallenges.kids.has(challenge.title) && attempts < maxAttempts)

    if (challenge && !generatedChallenges.kids.has(challenge.title)) {
      generatedChallenges.kids.add(challenge.title)
      console.log(`✅ Generated unique kids challenge: ${challenge.title}`)
      return challenge
    }

    return fallbackChallenges.kids.easy[0]
  } catch (error) {
    console.error(`❌ Error generating kids challenge (${type}):`, error)
    return fallbackChallenges.kids.easy[0]
  }
}

export const generateBeginnerChallenge = (difficulty, type) => {
  try {
    console.log(`🎯 Generating UNIQUE beginner challenge: ${type} - ${difficulty}`)
    const baseId = Date.now() + Math.random()

    let challenge
    let attempts = 0
    const maxAttempts = 10

    do {
      switch (type) {
        case "syntax":
          challenge = generateSyntaxChallenge(difficulty, baseId + attempts)
          break
        case "loops":
          challenge = generateLoopChallenge(difficulty, baseId + attempts)
          break
        case "conditionals":
          challenge = generateConditionalChallenge(difficulty, baseId + attempts)
          break
        case "functions":
          challenge = generateFunctionChallenge(difficulty, baseId + attempts)
          break
        case "data-structures":
          challenge = generateDataStructureChallenge(difficulty, baseId + attempts)
          break
        default:
          challenge = generateSyntaxChallenge(difficulty, baseId + attempts)
      }
      attempts++
    } while (generatedChallenges.beginners.has(challenge.title) && attempts < maxAttempts)

    if (challenge && !generatedChallenges.beginners.has(challenge.title)) {
      generatedChallenges.beginners.add(challenge.title)
      console.log(`✅ Generated unique beginner challenge: ${challenge.title}`)
      return challenge
    }

    return fallbackChallenges.beginners.easy[0]
  } catch (error) {
    console.error(`❌ Error generating beginner challenge (${type}):`, error)
    return fallbackChallenges.beginners.easy[0]
  }
}

// Individual challenge generators (keeping existing logic but with more variety)
const generateMovementChallenge = (difficulty, id) => {
  try {
    const template = kidsTemplates.movement[0]
    const character = template.characters[Math.floor(Math.random() * template.characters.length)]
    const target = template.targets[Math.floor(Math.random() * template.targets.length)]
    const obstacle = template.obstacles[Math.floor(Math.random() * template.obstacles.length)]

    const gridSize = template.gridSizes[difficulty === "easy" ? 0 : difficulty === "medium" ? 1 : 2]

    const startPos = { x: 0, y: 0 }
    const targetPos = {
      x: Math.floor(Math.random() * gridSize.width),
      y: Math.floor(Math.random() * gridSize.height),
    }

    if (targetPos.x === 0 && targetPos.y === 0) {
      targetPos.x = gridSize.width - 1
      targetPos.y = gridSize.height - 1
    }

    const solution = []
    let currentX = startPos.x
    let currentY = startPos.y

    while (currentX !== targetPos.x || currentY !== targetPos.y) {
      if (currentX < targetPos.x) {
        solution.push("move_right")
        currentX++
      } else if (currentX > targetPos.x) {
        solution.push("move_left")
        currentX--
      } else if (currentY < targetPos.y) {
        solution.push("move_down")
        currentY++
      } else if (currentY > targetPos.y) {
        solution.push("move_up")
        currentY--
      }
    }

    return {
      id,
      title: `Help ${character} reach ${target}!`,
      description: `Navigate through the grid and avoid obstacles to reach your goal!`,
      type: "visual-blocks",
      difficulty,
      xp: difficulty === "easy" ? 50 : difficulty === "medium" ? 80 : 120,
      icon: character,
      gameType: "movement",
      instructions: `Use the movement blocks to guide ${character} to ${target}!`,
      solution,
      hints: [
        `Try moving towards the ${target}!`,
        `Watch out for obstacles like ${obstacle}!`,
        `Plan your path step by step!`,
      ],
      visualElements: {
        character,
        target,
        obstacles: [obstacle],
        grid: gridSize,
        startPosition: startPos,
        targetPosition: targetPos,
      },
    }
  } catch (error) {
    console.error("❌ Error in generateMovementChallenge:", error)
    return fallbackChallenges.kids.easy[0]
  }
}

const generateSequenceChallenge = (difficulty, id) => {
  try {
    const template = kidsTemplates.sequence[0]
    const theme = template.themes[Math.floor(Math.random() * template.themes.length)]
    const items = template[theme]

    const sequenceLength = difficulty === "easy" ? 3 : difficulty === "medium" ? 4 : 5
    const solution = []

    for (let i = 0; i < sequenceLength; i++) {
      solution.push(items[Math.floor(Math.random() * items.length)])
    }

    return {
      id,
      title: `${theme.charAt(0).toUpperCase() + theme.slice(1)} Sequence Game!`,
      description: `Click the ${theme} in the correct sequence to complete the challenge!`,
      type: "sequence",
      difficulty,
      xp: difficulty === "easy" ? 60 : difficulty === "medium" ? 90 : 130,
      icon: solution[0],
      gameType: "sequence",
      instructions: `Click the ${theme} in the right order!`,
      solution,
      hints: [`Look for the pattern in the ${theme}!`, `Try to remember the sequence!`, `Take your time!`],
      visualElements: {
        theme,
        items: items.slice(0, Math.min(8, items.length)),
        solution,
      },
    }
  } catch (error) {
    console.error("❌ Error in generateSequenceChallenge:", error)
    return fallbackChallenges.kids.easy[0]
  }
}

const generateMathChallenge = (difficulty, id) => {
  try {
    const template = kidsTemplates.math[0]
    const operation = template.operations[Math.floor(Math.random() * template.operations.length)]
    const range = template.ranges[difficulty === "easy" ? 0 : difficulty === "medium" ? 1 : 2]
    const theme = template.themes[Math.floor(Math.random() * template.themes.length)]

    const num1 = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min
    const num2 = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min

    let answer
    let questionText

    switch (operation) {
      case "+":
        answer = num1 + num2
        questionText = `${num1} + ${num2} = ?`
        break
      case "-":
        answer = Math.max(num1, num2) - Math.min(num1, num2)
        questionText = `${Math.max(num1, num2)} - ${Math.min(num1, num2)} = ?`
        break
      case "*":
        answer = num1 * num2
        questionText = `${num1} × ${num2} = ?`
        break
    }

    const wrongAnswers = []
    for (let i = 0; i < 3; i++) {
      let wrong = answer + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 5) + 1)
      if (wrong < 0) wrong = Math.abs(wrong)
      if (!wrongAnswers.includes(wrong) && wrong !== answer) {
        wrongAnswers.push(wrong)
      }
    }

    const allAnswers = [answer, ...wrongAnswers].sort(() => Math.random() - 0.5)

    return {
      id,
      title: `${theme} - Solve: ${questionText}`,
      description: `Solve the math problem to help complete the magical quest!`,
      type: "math-adventure",
      difficulty,
      xp: difficulty === "easy" ? 40 : difficulty === "medium" ? 70 : 100,
      icon: "✨",
      gameType: "math",
      instructions: `Choose the correct answer for: ${questionText}`,
      solution: [answer],
      hints: [`Try counting on your fingers!`, `Break the problem into smaller parts!`, `Double-check your answer!`],
      visualElements: {
        question: questionText,
        options: allAnswers,
        correctAnswer: answer,
        theme: theme.split(" ")[0],
      },
    }
  } catch (error) {
    console.error("❌ Error in generateMathChallenge:", error)
    return fallbackChallenges.kids.easy[0]
  }
}

const generatePatternChallenge = (difficulty, id) => {
  try {
    const template = kidsTemplates.pattern[0]
    const theme = template.themes[Math.floor(Math.random() * template.themes.length)]
    const items = template[theme]

    const patternLength = difficulty === "easy" ? 3 : difficulty === "medium" ? 4 : 5
    const solution = []

    for (let i = 0; i < patternLength; i++) {
      solution.push(items[Math.floor(Math.random() * items.length)])
    }

    return {
      id,
      title: `${theme.charAt(0).toUpperCase() + theme.slice(1)} Pattern Game!`,
      description: `Create a pattern using ${theme}!`,
      type: "pattern",
      difficulty,
      xp: difficulty === "easy" ? 50 : difficulty === "medium" ? 80 : 120,
      icon: solution[0],
      gameType: "pattern",
      instructions: `Click the ${theme} in the right order to create a pattern!`,
      solution,
      hints: [`Look for the pattern in the ${theme}!`, `Try to remember the sequence!`, `Take your time!`],
      visualElements: {
        theme,
        items: items.slice(0, Math.min(8, items.length)),
        solution,
      },
    }
  } catch (error) {
    console.error("❌ Error in generatePatternChallenge:", error)
    return fallbackChallenges.kids.easy[0]
  }
}

const generateSyntaxChallenge = (difficulty, id) => {
  try {
    const printData = beginnerTemplates.syntax.print[Math.floor(Math.random() * beginnerTemplates.syntax.print.length)]
    const variableData =
      beginnerTemplates.syntax.variables[Math.floor(Math.random() * beginnerTemplates.syntax.variables.length)]

    const challengeTypes = [
      {
        title: `Print Statement: ${printData.greeting} ${printData.name}`,
        instructions: `Write a program that prints "${printData.greeting}, ${printData.name}! ${printData.message}"`,
        starterCode: "# Write your print statement here\n",
        solution: `print("${printData.greeting}, ${printData.name}! ${printData.message}")`,
        expected: `${printData.greeting}, ${printData.name}! ${printData.message}`,
      },
      {
        title: `Variables: ${variableData.name}'s Profile`,
        instructions: `Create variables for name="${variableData.name}", age=${variableData.age}, city="${variableData.city}", hobby="${variableData.hobby}" and print them`,
        starterCode: "# Create variables and print them\n",
        solution: `name = "${variableData.name}"\nage = ${variableData.age}\ncity = "${variableData.city}"\nhobby = "${variableData.hobby}"\nprint(f"Name: {name}, Age: {age}, City: {city}, Hobby: {hobby}")`,
        expected: `Name: ${variableData.name}, Age: ${variableData.age}, City: ${variableData.city}, Hobby: ${variableData.hobby}`,
      },
    ]

    const challenge = challengeTypes[Math.floor(Math.random() * challengeTypes.length)]

    return {
      id,
      title: challenge.title,
      description: "Master Python syntax with this hands-on challenge",
      type: "syntax",
      difficulty,
      xp: difficulty === "easy" ? 75 : difficulty === "medium" ? 100 : 150,
      icon: "👋",
      language: "python",
      instructions: challenge.instructions,
      starterCode: challenge.starterCode,
      solution: challenge.solution,
      testCases: [{ input: "", expected: challenge.expected }],
      hints: ["Remember to use quotes for strings", "Check your syntax carefully", "Use print() to display output"],
    }
  } catch (error) {
    console.error("❌ Error in generateSyntaxChallenge:", error)
    return fallbackChallenges.beginners.easy[0]
  }
}

const generateLoopChallenge = (difficulty, id) => {
  try {
    const loopTypes = ["counting", "multiplication", "patterns", "squares"]
    const loopType = loopTypes[Math.floor(Math.random() * loopTypes.length)]
    const template = beginnerTemplates.loops[loopType]
    const data = template[Math.floor(Math.random() * template.length)]

    const challenges = {
      counting: {
        title: `Loop Challenge: ${data.desc}`,
        instructions: `Use a for loop to ${data.desc.toLowerCase()}`,
        solution:
          data.step === 1
            ? `for i in range(${data.start}, ${data.end + 1}):\n    print(i)`
            : data.step === -1
              ? `for i in range(${data.start}, ${data.end - 1}, -1):\n    print(i)`
              : `for i in range(${data.start}, ${data.end + 1}, ${data.step}):\n    print(i)`,
        expected:
          data.step === 1
            ? Array.from({ length: data.end - data.start + 1 }, (_, i) => data.start + i).join("\n")
            : data.step === -1
              ? Array.from({ length: data.start - data.end + 1 }, (_, i) => data.start - i).join("\n")
              : Array.from(
                  { length: Math.floor((data.end - data.start) / data.step) + 1 },
                  (_, i) => data.start + i * data.step,
                ).join("\n"),
      },
      multiplication: {
        title: `Loop Challenge: ${data.desc} (1 to ${data.limit})`,
        instructions: `Print the ${data.desc} from 1 to ${data.limit} using a for loop`,
        solution: `for i in range(1, ${data.limit + 1}):\n    print(f"${data.table} x {i} = {${data.table} * i}")`,
        expected: Array.from(
          { length: data.limit },
          (_, i) => `${data.table} x ${i + 1} = ${data.table * (i + 1)}`,
        ).join("\n"),
      },
      patterns: {
        title: `Loop Challenge: ${data.desc}`,
        instructions: `Create a ${data.desc} using nested loops`,
        solution: `for i in range(1, ${data.rows + 1}):\n    print("${data.pattern}" * i)`,
        expected: Array.from({ length: data.rows }, (_, i) => data.pattern.repeat(i + 1)).join("\n"),
      },
      squares: {
        title: `Loop Challenge: Print ${data.desc}`,
        instructions: `Use a for loop to print the ${data.desc}`,
        solution: `for i in range(1, ${data.limit + 1}):\n    print(f"{i} squared is {i * i}")`,
        expected: Array.from({ length: data.limit }, (_, i) => `${i + 1} squared is ${(i + 1) * (i + 1)}`).join("\n"),
      },
    }

    const challenge = challenges[loopType]

    return {
      id,
      title: challenge.title,
      description: "Master loops with this programming challenge",
      type: "loops",
      difficulty,
      xp: difficulty === "easy" ? 120 : difficulty === "medium" ? 150 : 200,
      icon: "🔄",
      language: "python",
      instructions: challenge.instructions,
      starterCode: "# Write your loop here\n",
      solution: challenge.solution,
      testCases: [{ input: "", expected: challenge.expected }],
      hints: ["Use range() for counting", "Don't forget the colon and indentation", "Test with small numbers first"],
    }
  } catch (error) {
    console.error("❌ Error in generateLoopChallenge:", error)
    return fallbackChallenges.beginners.easy[0]
  }
}

const generateConditionalChallenge = (difficulty, id) => {
  try {
    const data = beginnerTemplates.conditionals[Math.floor(Math.random() * beginnerTemplates.conditionals.length)]

    let challenge
    if (data.age !== undefined) {
      challenge = {
        title: `Conditional: Age ${data.age} - ${data.desc}`,
        instructions: `Write a program that checks if age ${data.age} can vote (18+) and drive (16+)`,
        starterCode: `age = ${data.age}\n# Write your if-elif-else statements here\n`,
        solution: `age = ${data.age}\nif age >= 18:\n    print("Can vote and drive")\nelif age >= 16:\n    print("Can drive but cannot vote")\nelse:\n    print("Cannot vote or drive")`,
        expected:
          data.age >= 18 ? "Can vote and drive" : data.age >= 16 ? "Can drive but cannot vote" : "Cannot vote or drive",
      }
    } else if (data.score !== undefined) {
      challenge = {
        title: `Conditional: Grade ${data.score} - ${data.desc}`,
        instructions: `Write a program that assigns a letter grade for score ${data.score}`,
        starterCode: `score = ${data.score}\n# Write your if-elif-else statement here\n`,
        solution: `score = ${data.score}\nif score >= 90:\n    print("Grade: A")\nelif score >= 80:\n    print("Grade: B")\nelif score >= 70:\n    print("Grade: C")\nelif score >= 60:\n    print("Grade: D")\nelse:\n    print("Grade: F")`,
        expected:
          data.score >= 90
            ? "Grade: A"
            : data.score >= 80
              ? "Grade: B"
              : data.score >= 70
                ? "Grade: C"
                : data.score >= 60
                  ? "Grade: D"
                  : "Grade: F",
      }
    } else {
      challenge = {
        title: `Conditional: ${data.temp}°C - ${data.desc}`,
        instructions: `Write a program that gives clothing advice for temperature ${data.temp}°C`,
        starterCode: `temperature = ${data.temp}\n# Write your if-elif-else statement here\n`,
        solution: `temperature = ${data.temp}\nif temperature > 30:\n    print("Wear shorts and t-shirt")\nelif temperature > 20:\n    print("Wear light jacket")\nelif temperature > 10:\n    print("Wear warm jacket")\nelse:\n    print("Wear heavy coat and gloves")`,
        expected:
          data.temp > 30
            ? "Wear shorts and t-shirt"
            : data.temp > 20
              ? "Wear light jacket"
              : data.temp > 10
                ? "Wear warm jacket"
                : "Wear heavy coat and gloves",
      }
    }

    return {
      id,
      title: challenge.title,
      description: challenge.instructions,
      type: "conditionals",
      difficulty,
      xp: difficulty === "easy" ? 100 : difficulty === "medium" ? 130 : 180,
      icon: "🤔",
      language: "python",
      instructions: challenge.instructions,
      starterCode: challenge.starterCode,
      solution: challenge.solution,
      testCases: [{ input: "", expected: challenge.expected }],
      hints: [
        "Use if, elif, and else statements",
        "Remember the colon (:) after conditions",
        "Check your indentation carefully",
      ],
    }
  } catch (error) {
    console.error("❌ Error in generateConditionalChallenge:", error)
    return fallbackChallenges.beginners.easy[0]
  }
}

const generateFunctionChallenge = (difficulty, id) => {
  try {
    const data = beginnerTemplates.functions[Math.floor(Math.random() * beginnerTemplates.functions.length)]

    let challenge
    if (data.name) {
      challenge = {
        title: `Function: ${data.name}`,
        instructions: `Create a function called ${data.name} that will ${data.action}`,
        solution: `def ${data.name}():\n    print("${data.output}")\n\n${data.name}()`,
        expected: data.output,
      }
    } else {
      challenge = {
        title: `Function: ${data.desc}`,
        instructions: `Create a function that performs ${data.operation} on ${data.nums[0]} and ${data.nums[1]}`,
        solution:
          data.operation === "add"
            ? `def add_numbers(a, b):\n    return a + b\n\nresult = add_numbers(${data.nums[0]}, ${data.nums[1]})\nprint(result)`
            : data.operation === "multiply"
              ? `def multiply_numbers(a, b):\n    return a * b\n\nresult = multiply_numbers(${data.nums[0]}, ${data.nums[1]})\nprint(result)`
              : data.operation === "subtract"
                ? `def subtract_numbers(a, b):\n    return a - b\n\nresult = subtract_numbers(${data.nums[0]}, ${data.nums[1]})\nprint(result)`
                : `def divide_numbers(a, b):\n    return a / b\n\nresult = divide_numbers(${data.nums[0]}, ${data.nums[1]})\nprint(result)`,
        expected:
          data.operation === "add"
            ? (data.nums[0] + data.nums[1]).toString()
            : data.operation === "multiply"
              ? (data.nums[0] * data.nums[1]).toString()
              : data.operation === "subtract"
                ? (data.nums[0] - data.nums[1]).toString()
                : (data.nums[0] / data.nums[1]).toString(),
      }
    }

    return {
      id,
      title: challenge.title,
      description: `Master functions with this programming challenge`,
      type: "functions",
      difficulty,
      xp: difficulty === "easy" ? 120 : difficulty === "medium" ? 150 : 200,
      icon: "⚙️",
      language: "python",
      instructions: challenge.instructions,
      starterCode: "# Write your function here\n",
      solution: challenge.solution,
      testCases: [{ input: "", expected: challenge.expected }],
      hints: ["Define the function using def", "Use return to send back a value", "Test with different parameters!"],
    }
  } catch (error) {
    console.error("❌ Error in generateFunctionChallenge:", error)
    return fallbackChallenges.beginners.easy[0]
  }
}

const generateDataStructureChallenge = (difficulty, id) => {
  try {
    const data = beginnerTemplates.dataStructures[Math.floor(Math.random() * beginnerTemplates.dataStructures.length)]

    let challenge
    if (data.items) {
      challenge = {
        title: `List Operations: ${data.desc}`,
        instructions: `Work with a ${data.desc} - ${data.operation} "${data.new_item}"`,
        solution:
          data.operation === "append"
            ? `items = ${JSON.stringify(data.items)}\nitems.append("${data.new_item}")\nprint(items)`
            : data.operation === "remove"
              ? `items = ${JSON.stringify(data.items)}\nitems.remove(${data.new_item})\nprint(items)`
              : data.operation === "insert"
                ? `items = ${JSON.stringify(data.items)}\nitems.insert(1, "${data.new_item}")\nprint(items)`
                : `items = ${JSON.stringify(data.items)}\nitems.extend(${JSON.stringify(data.new_item)})\nprint(items)`,
        expected:
          data.operation === "append"
            ? JSON.stringify([...data.items, data.new_item])
            : data.operation === "remove"
              ? JSON.stringify(data.items.filter((item) => item !== data.new_item))
              : data.operation === "insert"
                ? JSON.stringify([data.items[0], data.new_item, ...data.items.slice(1)])
                : JSON.stringify([...data.items, ...data.new_item]),
      }
    } else {
      challenge = {
        title: `Dictionary Operations: ${data.desc}`,
        instructions: `Work with ${data.desc} - ${data.operation} ${data.key}: ${data.value}`,
        solution:
          data.operation === "add"
            ? `data = ${JSON.stringify(data.data)}\ndata["${data.key}"] = "${data.value}"\nprint(data)`
            : `data = ${JSON.stringify(data.data)}\ndata["${data.key}"] = ${data.value}\nprint(data)`,
        expected: JSON.stringify({ ...data.data, [data.key]: data.value }),
      }
    }

    return {
      id,
      title: challenge.title,
      description: `Master data structures with this programming challenge`,
      type: "data-structures",
      difficulty,
      xp: difficulty === "easy" ? 120 : difficulty === "medium" ? 150 : 200,
      icon: "📦",
      language: "python",
      instructions: challenge.instructions,
      starterCode: "# Write your data structure code here\n",
      solution: challenge.solution,
      testCases: [{ input: "", expected: challenge.expected }],
      hints: [
        "Use square brackets for lists",
        "Use curly braces for dictionaries and sets",
        "Test with different values!",
      ],
    }
  } catch (error) {
    console.error("❌ Error in generateDataStructureChallenge:", error)
    return fallbackChallenges.beginners.easy[0]
  }
}
