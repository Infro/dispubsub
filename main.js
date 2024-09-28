var orderDetails = localStorage.getItem("orderDetails") || '[]';
orderDetails = JSON.parse(orderDetails);
orderDetails.push(Object.fromEntries(new URLSearchParams(location.search)));

//jQuery onReady
$(function() {
    const orderDetailsTable2 = document.getElementById("orderDetails");
    orderDetails.forEach(order => {
        const row = document.createElement("tr");
        row.className = "clickToOrder";
        row.innerHTML = `
            <td>${order.orderExecutionType}</td>
            <td>${order.orderPurchaseType}</td>
            <td>${order.symbol}</td>
            <td>${order.strikePrice}</td>
            <td>${order.price}</td>
            <td>${order.quantity}</td>
            <td>${order.quantity * order.price * order.leverage}</td>
            <td>${(order.expiration ? order.expiration.substring(0,10) : "")}</td>
        `;
        row.data = order;
        orderDetailsTable2.appendChild(row);
    });

    $('#orderDetails tr.clickToOrder').click(function (el) {
        const order = this.data.fullOrder;
        // copy order to clipboard
        // Url decode the order
        order = decodeURIComponent(order);
        navigator.clipboard.writeText(order);
        if (localStorage.getItem("infrotrade") === "true") {
            window.location.href = "infrotrade://order/" + order;
        }
    });
});
