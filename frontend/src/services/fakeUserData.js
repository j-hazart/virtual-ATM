const users = [
  {
    id: 1,
    firstname: "John",
    lastname: "Doe",
    accountNumber: 12312312312,
    solde: 12500,
    cards: [
      {
        number: 1234123412341234,
        pin: 1234,
        attempt: 4,
      },
      {
        number: 6789678967896789,
        pin: 1234,
        attempt: 4,
      },
    ],
    history: [
      {
        id: 1,
        type: "depot",
        from: null,
        to: null,
        date: "01/01/2000",
        amount: 1000,
      },
      {
        id: 2,
        type: "retrait",
        from: null,
        to: null,
        date: "01/01/2000",
        amount: 200,
      },
      {
        id: 3,
        type: "virement",
        from: 14725836914,
        to: 12312312312,
        date: "01/01/2000",
        amount: 500,
      },
      {
        id: 4,
        type: "virement",
        from: 12312312312,
        to: 14725836914,
        date: "01/01/2000",
        amount: 150,
      },
    ],
  },
  {
    id: 2,
    firstname: "Michel",
    lastname: "Durant",
    accountNumber: 14725836914,
    solde: 500,
    cards: [
      {
        number: 1111222233334444,
        pin: 1234,
        attempt: 4,
      },
    ],
    history: [
      {
        id: 3,
        type: "virement",
        from: 14725836914,
        to: 12312312312,
        date: "01/01/2000",
        amount: 500,
      },
    ],
  },
];

export default users;
