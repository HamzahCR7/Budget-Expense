class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }
  submitBudgetForm(){
    // console.log("hello");
    const value=this.budgetInput.value;
    if(value===''||value<0){
      this.budgetFeedback.classList.add('showItem');
      this.budgetFeedback.innerHTML=`<p>Value Cannot be Empty or Less than 0`;
     self=this;
      setTimeout(function(){
        self.budgetFeedback.classList.remove('showItem');
      },3000);
    }
    else{
      this.budgetAmount.innerText=value;
      this.budgetInput.value='';
      this.showBalance();
    }
  }
  showBalance(){
    const total=this.totalExpense();
    const balances=parseInt(this.budgetAmount.innerText)-total;
    this.balanceAmount.innerHTML=balances;
    if(balances<0){
      this.balance.classList.remove('showGreen','ShowBlack');
      this.balance.classList.add('showRed');
    }
    else{
      this.balance.classList.remove('showRed');
      this.balance.classList.add('showGreen','showBlack');
    }
  }

showExpense(){
  const expenseValue=this.expenseInput.value;
  const expenseAmount=this.amountInput.value;
  if(expenseValue===''|| expenseAmount===''||expenseAmount<0){
    this.expenseFeedback.classList.add('showItem');
    this.expenseFeedback.innerHTML=`<p>AMount or value cannot be null or negative</p>`;
    let self=this;
    setTimeout(function(){
      self.expenseFeedback.classList.remove('showItem')
    },3000);

  }
  else{
    this.amount=parseInt(this.amountInput.value);
    this.expenseInput.value="";
    this.amountInput.value="";
    let expense={
      id:this.itemID,
      title:expenseValue,
      amount:this.amount,
    }
    this.itemID++;
    this.itemList.push(expense);
    this.addExpense(expense);
    this.showBalance();
  }
}
addExpense(expense){
  const div=document.createElement('div');
  div.classList.add('expense');
  div.innerHTML=`   <div class="expense-item d-flex justify-content-between align-items-baseline">

  <h6 class="expense-title mb-0 text-uppercase list-item">${expense.title}</h6>
  <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

  <div class="expense-icons list-item">

   <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
    <i class="fas fa-edit"></i>
   </a>
   <a href="#" class="delete-icon" data-id="${expense.id}">
    <i class="fas fa-trash"></i>
   </a>
  </div>
 </div>
`;
this.expenseList.appendChild(div);

}

  totalExpense(){
    let total=0;
    if(this.itemList.length>0){
total=this.itemList.reduce(function(acc,cur){
  console.log(`The total is ${acc} and the amount is ${cur.amount}`);
  acc+=cur.amount;
  return acc;
},0)
    }
    this.expenseAmount.textContent=total;
    return total;
  }
editExpense(element){
  let id=parseInt(element.dataset.id);
  console.log(id);
for(var i=this.itemList.length;i>0;i--){
    let parent=element.parentElement.parentElement.parentElement;
  console.log(parent);

  this.expenseList.removeChild(parent)
 
  
  let expense=this.itemList.filter(function(item){
    return item.id===id;
  });
  this.expenseInput.value=expense[0].title;
  this.amountInput.value=expense[0].amount;
  let temp=this.itemList.filter(function(item){
    return item.id !== id;
  })
  this.itemList=temp;
  this.showBalance();
}
 

}
deleteExpense(element){
  let id=parseInt(element.dataset.id);
  console.log(id);
for(var i=this.itemList.length;i>0;i--){
    let parent=element.parentElement.parentElement.parentElement;
  console.log(parent);

  this.expenseList.removeChild(parent)
  let temp=this.itemList.filter(function(item){
    return item.id !== id;
  })
  this.itemList=temp;
  this.showBalance();
}
}


  }
  class Storage{
    static showDetails(expense){
      localStorage.setItem('expense',JSON.stringify('expense'));
    }
  }

function eventListeners(){
const budgetForm=document.getElementById('budget-form');
const expenseForm=document.getElementById('expense-form');
const expenseList=document.getElementById('expense-list');
//new Instance
const ui=new UI();


//budget form
budgetForm.addEventListener('submit',function(event){
  event.preventDefault();
  ui.submitBudgetForm();

})


//expense from submit
expenseForm.addEventListener('submit',function(event){
  event.preventDefault();
  ui.showExpense();

})


//expense list
expenseList.addEventListener('click',function(event){
if(event.target.parentElement.classList.contains('edit-icon')){
  console.log(event.target.parentElement);
  ui.editExpense(event.target.parentElement);
}
else if(event.target.parentElement.classList.contains('delete-icon')){
console.log(event.target.parentElement.parentElement.parentElement);
ui.deleteExpense(event.target.parentElement)
// event.target.parentElement.parentElement.parentElement.remove('delete-icon')
}
})
}
document.addEventListener('DOMContentLoaded',function(){

eventListeners();
Storage.showDetails(expense);
})