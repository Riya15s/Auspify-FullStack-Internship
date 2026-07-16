const Expense = require("../models/Expense");

const getDashboard = async (req, res) => {
  try {
    const expenses = await Expense.find({
      user: req.user.id,
    });

    let totalIncome = 0;
    let totalExpense = 0;

    expenses.forEach((item) => {
      if (item.type === "Income") {
        totalIncome += item.amount;
      } else {
        totalExpense += item.amount;
      }
    });

    const balance = totalIncome - totalExpense;

    res.status(200).json({
      success: true,
      dashboard: {
        totalIncome,
        totalExpense,
        balance,
        totalTransactions: expenses.length,
      },
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getDashboard,
};