export const snippets = {
  // ======================
  // JAVASCRIPT
  // ======================
  javascript: {
    // EASY
    basics: [
      {
        id: "js-basic-1",
        code: `const sum = (a, b) => a + b;`
      },
      {
        id: "js-basic-2",
        code: `const isEven = (n) => n % 2 === 0;`
      },
      {
        id: "js-basic-3",
        code: `const greet = (name) => \`Hello, \${name}\`;`
      }
    ],

    // MEDIUM
    functions: [
      {
        id: "js-fn-1",
        code: `function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}`
      },
      {
        id: "js-fn-2",
        code: `const throttle = (fn, limit) => {
  let waiting = false;
  return (...args) => {
    if (!waiting) {
      fn(...args);
      waiting = true;
      setTimeout(() => (waiting = false), limit);
    }
  };
}`
      }
    ],

    // HARD
    async: [
      {
        id: "js-async-1",
        code: `async function fetchUser(id) {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json();
}`
      },
      {
        id: "js-async-2",
        code: `async function retry(fn, attempts) {
  try {
    return await fn();
  } catch (e) {
    if (attempts <= 1) throw e;
    return retry(fn, attempts - 1);
  }
}`
      }
    ]
  },

  // ======================
  // RUST
  // ======================
  rust: {
    // EASY
    basics: [
      {
        id: "rs-basic-1",
        code: `fn add(a: i32, b: i32) -> i32 {
    a + b
}`
      },
      {
        id: "rs-basic-2",
        code: `fn is_even(n: i32) -> bool {
    n % 2 == 0
}`
      }
    ],

    // MEDIUM
    recursion: [
      {
        id: "rs-rec-1",
        code: `fn factorial(n: u32) -> u32 {
    match n {
        0 => 1,
        _ => n * factorial(n - 1),
    }
}`
      },
      {
        id: "rs-rec-2",
        code: `fn fibonacci(n: u32) -> u32 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}`
      }
    ],

    // HARD (mapped via async category in difficultyMap)
    async: [
      {
        id: "rs-async-1",
        code: `async fn fetch_data() -> Result<String, ()> {
    Ok(String::from("data"))
}`
      }
    ]
  },

  // ======================
  // SOLIDITY
  // ======================
  solidity: {
    // EASY
    basics: [
      {
        id: "sol-basic-1",
        code: `uint256 public totalSupply;`
      },
      {
        id: "sol-basic-2",
        code: `mapping(address => uint256) public balanceOf;`
      }
    ],

    // MEDIUM (mapped through recursion bucket)
    recursion: [
      {
        id: "sol-rec-1",
        code: `function square(uint256 x) public pure returns (uint256) {
    return x * x;
}`
      }
    ],

    // HARD
    erc20: [
      {
        id: "sol-erc20-1",
        code: `function transfer(address to, uint256 amount) public returns (bool) {
    balanceOf[msg.sender] -= amount;
    balanceOf[to] += amount;
    return true;
}`
      },
      {
        id: "sol-erc20-2",
        code: `function approve(address spender, uint256 amount) public returns (bool) {
    allowance[msg.sender][spender] = amount;
    return true;
}`
      }
    ]
  }
};
