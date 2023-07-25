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
    type: "depot",
    userFrom: "12345678901",
    userTo: "12345678901",
    amount: 500,
  },
  {
    type: "retrait",
    userFrom: "12345678901",
    userTo: "12345678901",
    amount: 250,
  },
  {
    type: "virement",
    userFrom: "12345678901",
    userTo: "98765432109",
    amount: 300,
  },
  {
    type: "virement",
    userFrom: "98765432109",
    userTo: "12345678901",
    amount: 50,
  },
  {
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
