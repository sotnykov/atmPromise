const userData = {
  USD: 1000,
  EUR: 900,
  UAH: 15000,
  BIF: 20000,
  AOA: 100
};

const bankData = {
  USD: {
    max: 3000,
    min: 100,
    img: '💵'
  },
  EUR: {
    max: 1000,
    min: 50,
    img: '💶'
  },
  UAH: {
    max: 0,
    min: 0,
    img: '💴'
  },
  GBP: {
    max: 10000,
    min: 100,
    img: '💷'
  }
};

function getMoney() {
  return new Promise((resolve, reject) => {
    const askBalance = confirm('To view the card balance?');

    if (askBalance) {
      let userCurrency;
      do {
        userCurrency = prompt('Enter currency (USD, EUR, UAH, BIF, AOA):');
      } while (!userData[userCurrency]);

      console.log(`The balance is: ${userData[userCurrency]} ${userCurrency}`);
      resolve();
    } else {
      let userWithdrawal;
      do {
        userWithdrawal = prompt('Enter the currency to withdraw (USD, EUR, UAH, BIF, AOA):');
      } while (!userData[userWithdrawal] || !bankData[userWithdrawal] || bankData[userWithdrawal].max === 0);

      let withdrawalAmount;
      do {
        withdrawalAmount = parseFloat(prompt(`Enter the withdrawal amount (maximum ${bankData[userWithdrawal].max} ${userWithdrawal}):`));
      } while (withdrawalAmount > bankData[userWithdrawal].max || withdrawalAmount > userData[userWithdrawal]);

      if (withdrawalAmount < bankData[userWithdrawal].min) {
        console.log(`The amount entered is less than the available amount. Minimum withdrawal amount: ${bankData[userWithdrawal].min} ${userWithdrawal}`);
      } else {
        userData[userWithdrawal] -= withdrawalAmount;
        console.log(`Here's your money ${withdrawalAmount} ${userWithdrawal} ${bankData[userWithdrawal].img}`);
      }
      resolve();
    }
  }).then(() => {
    console.log('Thank you, have a good day 😊');
  }).catch(() => {
    console.log('Operation rejected');
  });
}

getMoney();