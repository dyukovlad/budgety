//BUDGET CONTROLLER
let budgetController = (function() {


})();

//UI CONTROLLER
let UIController = (function(){

    let DOMStrings = {
        inputType: '#checkbox',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        budgetLabel: '.summary__budget',
        incomeLabel: '.secondary-panel__income-value',
        expensesLabel: '.secondary-panel__expenses-value',
        percentageLabel: '.secondary-panel__expenses-percentage',
        //incomeContainer: '.income__list',
        //expenseContainer: '.expenses__list',
        container: '.panel',
        expensesPercLabel: '.panel__item__value-percentage',
        dateLabel: '.summary__month'
     };

    return {
        getInput: function(){
            return {
                type: document.querySelector(DOMStrings.inputType).checked ? 'expense' : 'income',
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            }
        },

        getDOMString: function(){
            return DOMStrings;
        }
    }

})();


//GLOBAL APP CONTROLLER
let controller = (function(budgetCtrl, UICtrl){

    let DOM = UICtrl.getDOMString();

    let ctrlAddItem = function() {

        //1. get the field input data
        let input = UICtrl.getInput();
        console.log(input);
    }

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(e) {

        if ( e.keyCode === 13 || e.which === 13 ) {
            ctrlAddItem();
        }

    });


})(budgetController, UIController);
