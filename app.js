//BUDGET CONTROLLER
let budgetController = (function() {

    let Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // let allExpenses = [];
    // let allIncomes = [];
    // let totalExpenses = 0;

    let data = {
        allItems: {
            expense: [],
            income: []
        },
        totals: {
            expense: 0,
            income: 0
        }
    };

    return {
        addItem: function(type, des, val) {
            let newItem;

            //Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }


            //Create new item based
            if ( type === 'expense' ) {
                newItem = new Expense(ID, des, val);
            } else if ( type === 'income' ){
                newItem = new Income(ID, des, val);
            }

            data.allItems[type].push(newItem);

            // return new element
            return newItem;

        },

        testing: function(){
            console.log(data);
        },
    };

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

        addListItem: function(obj, type) {
              var html, newHtml, element;
              //Create HTMl string with placeholder text
              element = DOMStrings.container;

              if (type === 'income') {
                html =
                  '<div class="panel__item panel__item-income" id="income-%id%"><div class="panel__item__details"><div class="panel__item__details-name">%desc%</div></div><div class="panel__item__value"><div class="panel__item__value-number">%value%</div></div><button class="item__delete--btn"><svg class="icon icon-cross"><use xlink:href="#icon-cross"></use></svg></button></div>';
              } else if (type === 'expense') {
                html =
                  '<div class="panel__item panel__item-expense" id="expense-%id%"><div class="panel__item__details"><div class="panel__item__details-name">%desc%</div></div><div class="panel__item__value"><div class="panel__item__value-number">%value%</div><div class="panel__item__value-percentage">5%</div></div><button class="item__delete--btn"> <svg class="icon icon-cross"><use xlink:href="#icon-cross"></use></svg></button></div>';
              }

              //Replace Placeholder text with data
              newHtml = html.replace('%id%', obj.id);
              newHtml = newHtml.replace('%desc%', obj.description);
              newHtml = newHtml.replace('%value%', obj.value);

              //Insert the HTML into the DOM
              document.querySelector(element).insertAdjacentHTML('afterbegin', newHtml);
            },

        getDOMString: function(){
            return DOMStrings;
        }
    }

})();


//GLOBAL APP CONTROLLER
let controller = (function(budgetCtrl, UICtrl){

    let setupEventListeners = function(){

        let DOM = UICtrl.getDOMString();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(e) {

            if ( e.keyCode === 13 || e.which === 13 ) {
                ctrlAddItem();
            }

        });
    };



    let ctrlAddItem = function() {
        let input, newItem;
        //1. get the field input data
        input = UICtrl.getInput();

        //2. Add the item
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        // 3. Add the item to the UI
        UICtrl.addListItem(newItem, input.type);


    };

    return {
        init: function() {
            console.log('application nas started.');
            setupEventListeners();
        }
    };




})(budgetController, UIController);

controller.init();
