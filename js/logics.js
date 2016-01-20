// JavaScript Document
$(document).ready(function(){
				var sum = 0;			 
				function subTotal() {
					$('#orderTable tr').each(function() {
						if (!this.rowIndex) return;
  						var price = $(this).find("td").eq(3).html().match(/\d+/); 
						var priceDigit = parseFloat(price);
						sum += priceDigit; 
					});
   				}
				
				function process() {
					$("#subtotal").text('\u20ac' + parseFloat(sum, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, 	"$1,").toString());
					var vat = sum *20 / 100;
					$("#vat").text('\u20ac' + parseFloat(vat, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
					var total = sum + vat;
					$("#totalCost").text('\u20ac' + parseFloat(total, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
					sum = 0;
   				}
				
				$(".trash").click(function(){
					$(this).closest('tr').remove();
					subTotal();
					process();				
					
    			});
				
				$(".comboPlus").click(function(){
					var value = $(this).parent().parent().find(".quantity").val();
					value = parseFloat(value) + 1;
					if(value >= 10){
						value = 10;
					}
					$(this).parent().parent().find(".quantity").val(value);
					var price = $(this).closest('tr').find(".price").text().match(/\d+/);
					var totalPrice = value * parseFloat(price);
					$(this).closest('tr').find(".totalPrice").text('\u20ac' + parseFloat(totalPrice, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
					subTotal();
					process();
				});
				
				$(".comboMinus").click(function(){
					var value = $(this).parent().parent().find(".quantity").val();
					value = parseFloat(value) - 1;
					if(value <= 1){
						value = 1;
					}
					$(this).parent().parent().find(".quantity").val(value);
					var price = $(this).closest('tr').find(".price").text().match(/\d+/);
					var totalPrice = value * parseFloat(price);
					$(this).closest('tr').find(".totalPrice").text('\u20ac' + parseFloat(totalPrice, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
					subTotal();
					process();
				});
	});