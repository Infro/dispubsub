var orderDetails = localStorage.getItem("orderDetails") || '[]';
orderDetails = JSON.parse(orderDetails);
orderDetails.push(Object.fromEntries(new URLSearchParams(location.search)));
// localStorage.setItem("orderDetails", JSON.stringify(orderDetails));


// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('service.js')
//             .then(registration => {
//                 console.log('Service Worker registered with scope:', registration.scope);
//             })
//             .catch(error => {
//                 console.error('Service Worker registration failed:', error);
//             });
//     });
// }

// Notification.requestPermission().then((stat) => {
//     console.log(stat);
//     new Notification("test");
//     alert("notification sent");
// });
// alert("notification requested");

//jQuery onReady
state = {};

$(function() {
    const orderDetailsTable = document.getElementById("orderDetails");
    const infroTrade = document.getElementById("infroTrade");
    const autoinfroTrade = document.getElementById("autoinfroTrade");
    const autoscale = document.getElementById("autoscale");
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
            <td>${(order.expiration ? order.expiration.substring(0,10) : undefined)}</td>
        `;
        row.data = order;
        orderDetailsTable.appendChild(row);
        if (localStorage.getItem("autoinfroTrade") === "true") {
            window.location.href = "infrotrade://order/" + order.fullOrder;
        }
    });

    $('#orderDetails tr.clickToOrder').click(function (el) {
        var order = this.data.fullOrder;
        // copy order to clipboard
        // Url decode the order
        order = decodeURIComponent(order);
        navigator.clipboard.writeText(order);
        if (localStorage.getItem("infroTrade") === "true") {
            window.location.href = "infrotrade://order/" + order;
        }
    });

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        const key = checkbox.id; // Assuming each checkbox has a unique ID
        checkbox.checked = localStorage.getItem(key) === 'true';

        checkbox.addEventListener('change', () => {
            localStorage.setItem(key, checkbox.checked);
            state[key] = checkbox.checked;
        });
    });

    const inputBoxes = document.querySelectorAll('input[type="number"]');

    inputBoxes.forEach(input => {
        const key = input.id; // Assuming each input has a unique ID
        input.value = localStorage.getItem(key) || '';

        input.addEventListener('input', () => {
            localStorage.setItem(key, input.value);
        });
    });
});
