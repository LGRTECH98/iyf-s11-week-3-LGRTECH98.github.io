const nameFor = (id) => ({ 1: "Amina", 2: "Brian" }[id] || "Unknown");

// =====================
// PART B - PROMISES
// =====================

function getUser(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!userId) {
        reject(new Error("Missing userId"));
      } else {
        resolve({
          id: userId,
          name: nameFor(userId),
        });
      }
    }, 400);
  });
}

function getOrders(user) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 101, amount: 20 },
        { id: 102, amount: 35 },
      ]);
    }, 400);
  });
}

function getOrderTotal(orders) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const total = orders.reduce((sum, order) => sum + order.amount, 0);
      resolve(total);
    }, 400);
  });
}

// Promise chaining

let savedUser;

getUser(1)
  .then((user) => {
    savedUser = user;
    return getOrders(user);
  })
  .then((orders) => {
    return getOrderTotal(orders);
  })
  .then((total) => {
    console.log(`B: ${savedUser.name} spent $${total}`);
  })
  .catch((err) => {
    console.error("B error:", err.message);
  });

// =====================
// PART C - ASYNC/AWAIT
// =====================

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

// =====================
// BONUS - Promise.all()
// =====================

Promise.all([getUser(1), getUser(2)])
  .then(([user1, user2]) => {
    console.log(user1.name, user2.name);
  })
  .catch((err) => {
    console.error(err.message);
  });