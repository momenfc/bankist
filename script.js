'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2021-03-14T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
  ],
  currency: 'USD',
  locale: 'pt-PT',
};
const account5 = {
  owner: 'Momen Nasser',
  movements: [730, 900, -700, 250, -90, 420, -300],
  interestRate: 1.3,
  pin: 5555,

  movementsDates: [
    '2021-02-26T17:01:17.194Z',
    '2021-03-01T14:11:59.604Z',
    '2021-03-04T10:17:24.185Z',
    '2021-01-28T23:36:17.929Z',
    '2021-03-09T09:15:04.904Z',
    '2021-03-11T07:42:02.383Z',
    '2021-03-12T21:31:17.178Z',
  ],
  currency: 'EGP',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4, account5];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
const containerUsers = document.querySelector('.overlay');
const users = document.querySelector('.users');

/////////////////////////////////////////////////
// Functions

const formateMovementDate = function (date, local) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'TODAY';
  if (daysPassed === 1) return 'YASTERDAY';
  if (daysPassed < 7) return `${daysPassed} DAYS AGO`;

  return new Intl.DateTimeFormat(local).format(date);
};

// NUMBERS FORMAT FUNCTION
const numFormat = (acc, num) => {
  const local = acc.local;
  const options = {
    style: 'currency',
    currency: acc.currency,
  };
  return new Intl.NumberFormat('en-US', options).format(num);
};

const displayMovmints = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  const movements = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formateMovementDate(date, acc.local);

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${numFormat(acc, mov)}</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const createUsernames = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const displayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = numFormat(acc, acc.balance);
};

const displaySummary = function (acc) {
  const valueIn = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumIn.textContent = numFormat(acc, valueIn);

  const valueOut = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumOut.textContent = numFormat(acc, valueOut);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(mov => mov >= 1)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumInterest.textContent = numFormat(acc, interest);
};

const displayUsers = () => {
  containerUsers.style.opacity = 1;
  let output = '';
  accounts.forEach(acc => {
    output += `
      <div class="user">
        <span class="name">${acc.username}</span>
        <span class="pin">${acc.pin}</span>
      </div>
    `;
  });
  users.innerHTML = output;
};
displayUsers();

// UPDATE UI
const updateUI = function (acc) {
  displayMovmints(acc);
  displayBalance(acc);
  displaySummary(acc);
};

//////////////////////////////////////////
let currentAccount;

// SET TIMER FUNC
let time = 180;
let timer;
const tric = function () {
  let minutes = String(Math.trunc(time / 60)).padStart(2, 0);
  let seconds = String(time % 60).padStart(2, 0);
  labelTimer.textContent = `${minutes}:${seconds}`;
  if (time === 0) {
    containerApp.style.opacity = 0;
    displayUsers();
  }
  time--;
};

const setNewTimer = function () {
  clearInterval(timer);
  time = 180;
  tric();
  timer = setInterval(tric, 1000);
};

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcom back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };
    const local = currentAccount.locale;
    labelDate.textContent = new Intl.DateTimeFormat(local, options).format(now);

    // CLEAR INPUTS
    inputLoginUsername.value = inputLoginPin.value = '';

    // HIDE USERS
    containerUsers.style.opacity = 0;

    // CLEAR FOUCAS INPUT
    inputLoginPin.blur();
    containerApp.style.opacity = 1;

    // UPDATE UI
    updateUI(currentAccount);
  }

  // set timer to logout
  setNewTimer();
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  // CLEAR INPUTS
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();

  if (
    amount > 0 &&
    receiverAccount &&
    currentAccount.balance > amount &&
    receiverAccount.username !== currentAccount.username
  ) {
    //DOING TRANSFER
    currentAccount.movements.push(-amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAccount.movements.push(amount);
    receiverAccount.movementsDates.push(new Date().toISOString());

    // set timer to logout
    setNewTimer();

    //UPDATE UI
    updateUI(currentAccount);
  } else {
    console.log('transfer Not valied');
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(acc => acc.pin === currentAccount.pin);
    accounts.splice(index, 1);

    //  HIDE UI
    containerApp.style.opacity = 0;
  } else {
    console.log('Not confirm');
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amountRequest = Number(inputLoanAmount.value);

  if (
    amountRequest > 0 &&
    currentAccount.movements.some(mov => mov >= amountRequest * 0.1)
  ) {
    // ADD LOAN REQUEST
    currentAccount.movements.push(amountRequest);
    currentAccount.movementsDates.push(new Date().toISOString());

    // set timer to logout
    setNewTimer();

    //UPDATE UI
    updateUI(currentAccount);
    // CLEARE INPUT
    inputLoanAmount.value = '';
    inputLoanAmount.blur();
  } else {
    console.log('Not Valid');
  }
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovmints(currentAccount, !sorted);
  sorted = !sorted;
});
