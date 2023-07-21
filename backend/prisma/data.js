const users = [
  {
    accountNumber: "12345678901",
    firstname: "John",
    lastname: "Doe",
  },
  {
    accountNumber: "98765432109",
    firstname: "Jane",
    lastname: "Smith",
  },
];
const cards = [
  {
    cardNumber: "1111222233334444",
    userAccountNumber: "12345678901",
  },
  {
    cardNumber: "9999888877776666",
    userAccountNumber: "98765432109",
  },
];

const bankOperations = [
  {
    id: 1,
    type: "depot",
    userFrom: "12345678901",
    userTo: "12345678901",
    amount: 500,
  },
  {
    id: 2,
    type: "retrait",
    userFrom: "12345678901",
    userTo: "12345678901",
    amount: 250,
  },
  {
    id: 3,
    type: "virement",
    userFrom: "12345678901",
    userTo: "98765432109",
    amount: 300,
  },
  {
    id: 4,
    type: "virement",
    userFrom: "98765432109",
    userTo: "12345678901",
    amount: 50,
  },
  {
    id: 5,
    type: "depot",
    userFrom: "98765432109",
    userTo: "98765432109",
    amount: 750,
  },
];

module.exports = {
  users,
  cards,
  bankOperations,
};
