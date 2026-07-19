// LESSON 11 — SOLUTION
// Callbacks → Promises + chaining → Async/await
// Run with: node lesson-11-solution.js

// Shared name lookup (so parallel fetches show different users)
const nameFor = (id) => ({ 1: "Amina", 2: "Brian" }[id] || "Unknown");

// =====================================
// PART A — Callbacks (the starting point; note the nesting)
// =====================================

function getUserCb(userId, cb) {
  setTimeout(() => {
    if (!userId) return cb(new Error("Missing userId"));
    cb(null, { id: userId, name: nameFor(userId) });
  }, 400);
}

function getOrdersCb(user, cb) {
  setTimeout(() => cb(null, [
    { id: 101, amount: 20 },
    { id: 102, amount: 35 }
  ]), 400);
}

function getOrderTotalCb(orders, cb) {
  setTimeout(() => cb(null,
    orders.reduce((s, o) => s + o.amount, 0)
  ), 400);
}

getUserCb(1, (err, user) => {
  if (err) return console.error("A error:", err.message);

  getOrdersCb(user, (err, orders) => {
    if (err) return console.error("A error:", err.message);

    getOrderTotalCb(orders, (err, total) => {
      if (err) return console.error("A error:", err.message);

      console.log(`A: ${user.name} spent $${total}`);
    });
  });
});

// =====================================
// PART B — Promises + chaining
// =====================================

function getUser(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!userId) return reject(new Error("Missing userId"));
      resolve({ id: userId, name: nameFor(userId) });
    }, 400);
  });
}

function getOrders(user) {
  return new Promise((resolve) => {
    setTimeout(() => resolve([
      { id: 101, amount: 20 },
      { id: 102, amount: 35 }
    ]), 400);
  });
}

function getOrderTotal(orders) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(orders.reduce((s, o) => s + o.amount, 0));
    }, 400);
  });
}

// Teaching point: chaining loses intermediate values,
// so we capture 'user' in an outer variable.
// Async/await (Part C) makes this juggling unnecessary.

let chainedUser;

getUser(1)
  .then((user) => {
    chainedUser = user;
    return getOrders(user);
  })
  .then((orders) => getOrderTotal(orders))
  .then((total) =>
    console.log(`B: ${chainedUser.name} spent $${total}`)
  )
  .catch((err) =>
    console.error("B error:", err.message)
  );

// =====================================
// PART C — Async/await
// =====================================

async function checkout(userId) {
  try {
    const user = await getUser(userId);
    const orders = await getOrders(user);
    const total = await getOrderTotal(orders);

    console.log(`C: ${user.name} spent $${total}`);
  } catch (err) {
    console.error("C error:", err.message);
  }
}

checkout(1);

// =====================================
// BONUS — Parallel with Promise.all
// =====================================

async function twoUsers() {
  const [u1, u2] = await Promise.all([
    getUser(1),
    getUser(2)
  ]);

  console.log("BONUS parallel:", u1.name, "&", u2.name);
}

twoUsers();