const Transaction = require('../models/Transaction');
const Budget = require('../models/Budget');
const Category = require('../models/Category');


// exports.showDashboard = async (req, res) => {
//     try {
//         console.log(" Dashboard controller started");
//         const userId = req.user.id;
        
//         const page = req.query.page || 1; 
//         const limit = 5;
//         const skip = (page - 1) * limit;

//         const totalTransactions = await Transaction.countDocuments({ user: userId });
//         const totalPages = Math.ceil(totalTransactions / limit);
        
//         const transactions = await Transaction.find({ user: userId })
//             .populate('category')
//             .sort({ date: -1 })
//             .skip(skip)
//             .limit(limit);
        
//         let totalIncome = 0;
//         let totalExpense = 0;
//         const categoryTotals = {};

     
//         const allTransactions = await Transaction.find({ user: userId }).populate('category');

//         allTransactions.forEach((transaction) => {
//             const categoryName = transaction.category?.name || 'Other';
//             const amount = transaction.amount || 0;

//             if (transaction.type === 'income') {
//                 totalIncome += amount;
//                   if (!categoryTotals[categoryName]) {
//                     categoryTotals[categoryName] = 0;
//                 }
//                 categoryTotals[categoryName] += amount;
            
//             } else {
//                 totalExpense += amount;
              
//                 if (!categoryTotals[categoryName]) {
//                     categoryTotals[categoryName] = 0;
//                 }
//                 categoryTotals[categoryName] += amount;
//             }
//         });

//         console.log("DEBUG: Rendering dashboard with data...");
//         res.render('dashboard', {
//             user: req.user,
//             transactions,
//             totalIncome,
//             totalExpense,
//             balance: totalIncome - totalExpense,
//             chartLabels: Object.keys(categoryTotals),
//             chartValues: Object.values(categoryTotals),
//             currentPage: page,
//             totalPages: totalPages,
//             hasNextPage: page < totalPages,
//             hasPrevPage: page > 1
//         });

//     } catch (err) {
//         console.error('DEBUG: Dashboard Error:', err);
//         res.redirect('/login');
//     }
// };


exports.showDashboard=async(req,res)=>{
try {
    const userId=req.user.id;
    const page =req.query.page || 1;
    const limit =5;
    const total = await Transaction.countDocuments({userId});
    const totalPages= Math.ceil(total/limit)

     const transactions =await Transaction.find({user:userId}).populate('category').skip((page-1)*limit).limit(limit)
     console.log('transactions',transactions);
     
     const allTranstion=await Transaction.find({user:userId}).populate('category')
      let totalIncome=0;
      let totalExpense=0;
      let chat={};
      allTranstion.forEach((all)=>{
        if(all.type=="income"){
            totalIncome += all.amount
        }
        else{
            totalExpense +=all.amount;
        }
        let categoryname= all.category.name
        if(!chat[categoryname]){
  chat[categoryname]=0
        }
          chat[categoryname] +=all.amount   
      })
     
    
    res.render('dashboard', {
            user: req.user,
            transactions,
            totalIncome,
            totalExpense,
            balance: totalIncome - totalExpense,
            chartLabels: Object.keys(chat),
            chartValues: Object.values(chat),
            currentPage: page,
            totalPages: totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
        });

    } catch (err) {
        console.error('DEBUG: Dashboard Error:', err);
        res.redirect('/login');
    }
};