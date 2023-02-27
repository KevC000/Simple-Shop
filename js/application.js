
$(document).ready(function () {

    var prices = [3.00, 3.50, 4.00, 2.00, 2.00, 2.00];
    var totals = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
    var total = 0;
    //when cancel button clicked
    $(document).on('click', '.cancel-item-button', function () {
        var index = $('.cancel-item-button').index(this);
        $('.menu-item')[index].remove();
        $('.menu-item-cost')[index].remove();
        $('.quantity-column')[index].remove();
        $('.menu-item-total')[index].remove();

        prices.splice(index, 1);
        totals.splice(index, 1);
        updateTotal()
    });


    $(document).on('change', '.menu-item-quantity', function () {
        var index = $('.menu-item-quantity').index(this);
        var val = $(this).val();

        updateItemTotal(index, val)
        updateTotal();
    });

    $(document).on('click', '#create-button', function () {

        if (!$('#new-item-input').val()) {
            alert('Fill out item name!');
            return;
        } else {
            var item = $('#new-item-input').val();
            var cost = parseFloat($('#new-item-cost').val());
            prices.push(cost);
            totals.push(0.0);

            $('#menu').append('<h4 class="item menu-item">' + item + '</h4>');
            $('#costs').append('<h4 class="item menu-item-cost">$' + cost.toFixed(2) + '</h4>');
            $('#quantities').append('<div class="item quantity-column"><input type="number" min="0" class="menu-item-quantity" step="1" value="0"><button class="cancel-item-button">cancel</button></div>');
            $('#totals').append('<h4 class="item menu-item-total">$0.00</h4>');

            $('#new-item-input').val("");
            $('#new-item-cost').val(0.00.toFixed(2));
        }
    })


    var updateTotal = function () {
        total = totals.reduce((a, b) => {
            return a + b;
        }, 0);
        document.getElementById('total-price').innerHTML = "$" + total.toFixed(2);
    }

    var updateItemTotal = function (index, val) {
        var price = prices[index];
        var quantity = parseInt(val);
        var cost = price * quantity;
        totals[index] = cost;
        $('.menu-item-total').eq(index).html("$" + totals[index].toFixed(2));
    }
})