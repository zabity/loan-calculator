// UI vars
const form      = document.querySelector('#loan-form');

const amount    = document.querySelector('#amount');
const interest  = document.querySelector('#interest');
const years     = document.querySelector('#years');

const monthlyPayment     = document.querySelector('#monthly-payment');
const totalPayment       = document.querySelector('#total-payment');
const totalInterest      = document.querySelector('#total-interest');

// listen for submit
// we don't want to fire the calculate() right away because of loading animation
form.addEventListener('submit', function(e){
    // hide results (if not then during second calculation both things would be visible)
    document.getElementById('results').style.display = 'none';
    
    //show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculate, 2000);

    e.preventDefault();
});


// calculate function
function calculate(){
    // vars for loan calculations
        // amount as decimal number:
        const principal             = parseFloat(amount.value);                 //parseFloat for decimals
        // calculated interest
        const calculatedInterest    = parseFloat(interest.value) / 100 / 12;
        // calculated payments
        const calculatedPayments    = parseFloat(years.value) * 12;

    // compute monthly payments
    const x         = Math.pow(1 + calculatedInterest, calculatedPayments);     //Math.potęga(liczba, potęga)
    const monthly   = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)){
        //show results
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value   = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value  = ((monthly * calculatedPayments) - principal).toFixed(2);

        //show them really and hide loading
        document.getElementById('loading').style.display = 'none';
        document.getElementById('results').style.display = 'block';
    } else {
        //call the error function
        showError("Check your shit...");
    }
}

// error message function
function showError(error){
    //hide other stuff
    document.getElementById('loading').style.display = 'none';
    document.getElementById('results').style.display = 'none';

    // create a div
    const errorDiv = document.createElement('div');

    //get elements for 
    const card      = document.querySelector('.card');
    const results   = document.querySelector('#results');

    // add class (according to bootstrap)
    errorDiv.className = 'alert alert-danger';

    // create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //insert error above results, below calculate button
    card.insertBefore(errorDiv, results);

    // clear error after 3 seconds
    setTimeout(clearError, 3000);
}

// clear error function
function clearError(){
    document.querySelector('.alert').remove();
}




//------------------------------------------------------------------------------------------------------------
/* podsumowanie

parseFloat(x)       :zamienia x na liczbę dziesiętną
Math.pow(x,y)       :podnosi x do potęgi y
isFinite(x)         :sprawdza czy x jest liczbą skoczoną

x.toFixed(y)        :zapisuje x w postaci dziesiętnej do y miejsca po przecinku

someParent.inserBefore(x,y)   :wsadza x w DOM przed y w obrębie parenta

setTimeOut(x,y)     :odpala funkcję x po upływie y sekund (podaje się w milisekundach, 1sek = 1000)
*/