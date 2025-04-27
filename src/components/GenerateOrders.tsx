// import html2pdf from 'html2pdf.js';
// import logo from '../assets/logo.png';
// import { useSelector } from 'react-redux';
// import { selectCurrentOrders } from '../redux/slices/orderSlice';
// const GenerateOrder = ({selectedItems}) => {
//     const orders = useSelector(selectCurrentOrders);
//     // console.log(orders)
//     const getSelectedOrders = (selectedItems, orders) => {
//         return orders.filter(order => selectedItems.has(order._id));
//     };
//     const selectedOrders = getSelectedOrders(selectedItems, orders);

//     console.log(selectedOrders); // This will log only the selected orders

//     function splitOrdersByCartLimit(orders, cartLimit) {
//         const newOrders = [];
        
//         orders.forEach(order => {
//             if (order.cart.length <= cartLimit) {
//                 newOrders.push(order);
//             } else {
//                 let remainingCart = [...order.cart];
//                 while (remainingCart.length > cartLimit) {
//                     newOrders.push({
//                         ...order,
//                         cart: remainingCart.splice(0, cartLimit)
//                     });
//                 }
//                 if (remainingCart.length) {
//                     newOrders.push({
//                         ...order,
//                         cart: remainingCart
//                     });
//                 }
//             }
//         });
        
//         return newOrders;
//     }
    
//     const downloadPDF = () =>{
// //         const boxes = Array.from({ length: 10 }, () => `
// // <div style="
// //     width: 100%; 
// //     height: 561.5px; 
// //     padding: 8px 0px;
// //     overflow: auto;
// //     background-color: #f9f9f9;
// //     font-family: 'Courier New', monospace;
// // ">
// //     <div style="
// //         width: 95%;
// //         margin: auto;
// //         padding: 10px;
// //         background-color: #fff;
// //         border: 1px solid #ddd;
// //         box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
// //         font-size: 0.75em;
// //     ">
// //         <div style="display: flex; justify-content: space-between; align-items: flex-start; font-size: 0.85em; padding: 5px 0;">
// //             <div style="width: 35px; height: 35px; background-color: #ddd; border-radius: 50%; display: flex; justify-content: center; align-items: center; padding: 4px;"><img src=${logo} alt="Girl in a jacket" width="500" height="600"></div>
// //             <h1 style="font-family: Arial, sans-serif; font-size: 1.1em; margin: 0; color: #333;"><strong>INVOICE</strong></h1>
// //             <div style="text-align: right;">
// //                 <div>Sattar Enterprises</div>
// //                 <div>Kolo Road Hafizabad</div>
// //                 <div>Phone: +92 340 4646799</div>
// //             </div>
// //         </div>
// //         <div style="display: flex; justify-content: space-between; font-size: 0.75em; margin: 5px 0;">
// //             <div>
// //                 <p><strong>Customer:</strong> Dani</p>
// //                 <p><strong>Contact:</strong> 03157642387</p>
// //                 <p><strong>Address:</strong> Vanike</p>
// //                 <p><strong>Order Booker:</strong> Abdullah</p>
// //             </div>
// //             <div>
// //                 <p><strong>Booking Date:</strong> 2025-01-22</p>
// //                 <p><strong>Delivery Date:</strong> 2025-01-25</p>
// //                 <p><strong>Delivery Date:</strong> 2025-01-25</p>
// //                 <p><strong>Previous Dues:</strong> Rs. 150</p>
// //             </div>
// //         </div>
// //         <table style="width: 100%; border-collapse: collapse; font-size: 0.75em;">
// //             <thead>
// //                 <tr>
// //                     <th style="padding: 5px; border: 1px solid #ddd; background-color: #f4f4f4;">#</th>
// //                     <th style="padding: 5px; border: 1px solid #ddd; background-color: #f4f4f4;">Description</th>
// //                     <th style="padding: 5px; border: 1px solid #ddd; background-color: #f4f4f4;">Qty</th>
// //                     <th style="padding: 5px; border: 1px solid #ddd; background-color: #f4f4f4;">Unit Price</th>
// //                     <th style="padding: 5px; border: 1px solid #ddd; background-color: #f4f4f4;">Discount</th>
// //                     <th style="padding: 5px; border: 1px solid #ddd; background-color: #f4f4f4;">Total</th>
// //                 </tr>
// //             </thead>
// //             <tbody>
// //                 <tr><td style="padding: 5px; border: 1px solid #ddd;">1</td><td style="padding: 5px; border: 1px solid #ddd;">Service A</td><td style="padding: 5px; border: 1px solid #ddd;">2</td><td style="padding: 5px; border: 1px solid #ddd;">$100</td><td style="padding: 5px; border: 1px solid #ddd;">0</td><td style="padding: 5px; border: 1px solid #ddd;">$200</td></tr>
// //                 <tr><td style="padding: 5px; border: 1px solid #ddd;">1</td><td style="padding: 5px; border: 1px solid #ddd;">Service A</td><td style="padding: 5px; border: 1px solid #ddd;">2</td><td style="padding: 5px; border: 1px solid #ddd;">$100</td><td style="padding: 5px; border: 1px solid #ddd;">0</td><td style="padding: 5px; border: 1px solid #ddd;">$200</td></tr>
// //                 <tr><td style="padding: 5px; border: 1px solid #ddd;">1</td><td style="padding: 5px; border: 1px solid #ddd;">Service A</td><td style="padding: 5px; border: 1px solid #ddd;">2</td><td style="padding: 5px; border: 1px solid #ddd;">$100</td><td style="padding: 5px; border: 1px solid #ddd;">0</td><td style="padding: 5px; border: 1px solid #ddd;">$200</td></tr>
// //                 <tr><td style="padding: 5px; border: 1px solid #ddd;">1</td><td style="padding: 5px; border: 1px solid #ddd;">Service A</td><td style="padding: 5px; border: 1px solid #ddd;">2</td><td style="padding: 5px; border: 1px solid #ddd;">$100</td><td style="padding: 5px; border: 1px solid #ddd;">0</td><td style="padding: 5px; border: 1px solid #ddd;">$200</td></tr>
// //                 <tr><td style="padding: 5px; border: 1px solid #ddd;">1</td><td style="padding: 5px; border: 1px solid #ddd;">Service A</td><td style="padding: 5px; border: 1px solid #ddd;">2</td><td style="padding: 5px; border: 1px solid #ddd;">$100</td><td style="padding: 5px; border: 1px solid #ddd;">0</td><td style="padding: 5px; border: 1px solid #ddd;">$200</td></tr>
// //                 <tr><td style="padding: 5px; border: 1px solid #ddd;">1</td><td style="padding: 5px; border: 1px solid #ddd;">Service A</td><td style="padding: 5px; border: 1px solid #ddd;">2</td><td style="padding: 5px; border: 1px solid #ddd;">$100</td><td style="padding: 5px; border: 1px solid #ddd;">0</td><td style="padding: 5px; border: 1px solid #ddd;">$200</td></tr>
// //                 <tr><td style="padding: 5px; border: 1px solid #ddd;">1</td><td style="padding: 5px; border: 1px solid #ddd;">Service A</td><td style="padding: 5px; border: 1px solid #ddd;">2</td><td style="padding: 5px; border: 1px solid #ddd;">$100</td><td style="padding: 5px; border: 1px solid #ddd;">0</td><td style="padding: 5px; border: 1px solid #ddd;">$200</td></tr>
// //                 <tr><td style="padding: 5px; border: 1px solid #ddd;">1</td><td style="padding: 5px; border: 1px solid #ddd;">Service A</td><td style="padding: 5px; border: 1px solid #ddd;">2</td><td style="padding: 5px; border: 1px solid #ddd;">$100</td><td style="padding: 5px; border: 1px solid #ddd;">0</td><td style="padding: 5px; border: 1px solid #ddd;">$200</td></tr>
// //                 <tr><td style="padding: 5px; border: 1px solid #ddd;">1</td><td style="padding: 5px; border: 1px solid #ddd;">Service A</td><td style="padding: 5px; border: 1px solid #ddd;">2</td><td style="padding: 5px; border: 1px solid #ddd;">$100</td><td style="padding: 5px; border: 1px solid #ddd;">0</td><td style="padding: 5px; border: 1px solid #ddd;">$200</td></tr>
// //                 <tr><td style="padding: 5px; border: 1px solid #ddd;">1</td><td style="padding: 5px; border: 1px solid #ddd;">Service A</td><td style="padding: 5px; border: 1px solid #ddd;">2</td><td style="padding: 5px; border: 1px solid #ddd;">$100</td><td style="padding: 5px; border: 1px solid #ddd;">0</td><td style="padding: 5px; border: 1px solid #ddd;">$200</td></tr>
// //             </tbody>
// //         </table>
// //         <p><strong>Message:</strong> Give them a chocolate bar of worth 40 rupees</p>
// //         <div style="text-align: right; font-size: 0.75em; margin-top: 5px;">
// //             <div>Subtotal: PKR 350</div>
// //             <div>Tax (0%): PKR 0</div>
// //             <div>Discounts: PKR 0</div>
// //             <div style="font-weight: bold;">Grand Total: PKR 385</div>
// //         </div>
// //         <div style="text-align: center; font-size: 0.7em; color: #888; margin-top: 5px;">
// //             <p>Thank you for your business!</p>
// //             <p>If you have questions, contact us at support@company.com</p>
// //         </div>
// //     </div>
// // </div>

// // `).join("");
// // font-family: 'Courier New', monospace;


// const invoices = Array.from(splitOrdersByCartLimit(selectedOrders,10), element => {
//     return Object.values(`
// <div style="
//     width: 100%; 
//     height: 561.5px; 
//     border-bottom: 1px solid black;
//     padding: 0;
//     overflow: auto;
//     background-color: #f9f9f9;
// ">
//     <div style="
//         width: 95%;
//         margin: auto;
//         padding: 10px;
//         background-color: #fff;
//         border: 1px solid #ddd;
//         box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
//         font-size: 0.75em;
//     ">
//         <div style="display: flex; justify-content: space-between; align-items: flex-start; font-size: 0.85em; padding: 5px 0;">
//         <div style="text-align: center; display: flex; justify-content: center; align-items: center; flex-direction: column;">
//         <div style="width: 45px; height: 45px; background-color: #ddd; border-radius: 50%; display: flex; justify-content: center; align-items: center; padding: 4px;"><img src=${logo} alt="OG" width="500" height="600"></div>
//         <p style="font-size: 8px">میں ہوں پاکستانی</p>
//         </div>
//         <div style="text-align: center;">
//                 <h1 style="font-family: Arial, sans-serif; font-size: 1.1em; margin: 0; color: #333;"><strong>SATTAR ENTERPRISES HAFIZABAD</strong></h1>
//         <h1 style="font-family: Arial, sans-serif; font-size: 1.1em; margin: 0; color: #333;"><strong>INVOICE OG-COLA</strong></h1>
//         <p>order no. <strong>${element.orderNumber}</strong></p>
//         </div>
//             <div style="text-align: right;">
//                 <div>Kolo Road Hafizabad</div>
//                 <div><strong>Contact Us</strong> +92 347 3919512</div>
//                 <div><strong>(For Services logding Complaints)</strong></div>
//             </div>
//         </div>
//         <div style="display: flex; justify-content: space-between; font-size: 0.80em; margin: 5px 0;">
//             <div>
//                 <p><strong>Business Name:</strong> ${element.customerDetails.businessName}</p>
//                 <p><strong>Customer:</strong> ${element.customerDetails.name}</p>
//                 <p><strong>Contact:</strong> ${element.customerDetails.contact}</p>
//                 <p><strong>Address:</strong> ${element.customerDetails.address}</p>
//                 </div>
//                 <div>
//                 <p><strong>Booking Date:</strong> ${new Date(element.createdAt).toLocaleString('en-GB')}</p>
//                 <p><strong>Delivery Date:</strong> ${new Date(element.deliveryDate).toLocaleDateString('en-GB')}</p>
//                 <p><strong>Order Booker:</strong> ${element.userDetails.name}</p>
//                 <p><strong>Previous Dues:</strong> PKR ${element.customerDetails?.udhar || 0}</p>
//             </div>
//         </div>
//         <table style="width: 100%; border-collapse: collapse; font-size: 0.80em;">
//             <thead>
//                 <tr>
//                     <th style="padding: 5px; border: 1px solid #ddd; background-color: #f4f4f4;">#</th>
//                     <th style="padding: 5px; border: 1px solid #ddd; background-color: #f4f4f4;">Description</th>
//                     <th style="padding: 5px; border: 1px solid #ddd; background-color: #f4f4f4;">Qty</th>
//                     <th style="padding: 5px; border: 1px solid #ddd; background-color: #f4f4f4;">Unit Price</th>
//                     <th style="padding: 5px; border: 1px solid #ddd; background-color: #f4f4f4;">Discount</th>
//                     <th style="padding: 5px; border: 1px solid #ddd; background-color: #f4f4f4;">Total</th>
//                 </tr>
//             </thead>
//             <tbody>

//                 ${element.cart.map((cart, index)=>{
//                     return(`
//                 <tr><td style="padding: 5px; border: 1px solid #ddd;">${index+1}</td><td style="padding: 5px; border: 1px solid #ddd;">${cart.product.name}(${cart.product.category})</td><td style="padding: 5px; border: 1px solid #ddd;">${cart.qty}</td><td style="padding: 5px; border: 1px solid #ddd;">${cart.product.price}</td><td style="padding: 5px; border: 1px solid #ddd;">${cart.product.discount}</td><td style="padding: 5px; border: 1px solid #ddd;">${cart.product.price*cart.qty-cart.product.discount*cart.qty}</td></tr>

//                         `)
//                 })}
                
//             </tbody>
//         </table>
//         <p><strong>Message:</strong> ${element.message}</p>
//         <div style="text-align: right; font-size: 0.8em; margin-top: 5px;">
//             <div>Subtotal: PKR ${element.price}</div>
//             <div>Tax (0%): PKR 0</div>
//             <div>Discounts: PKR ${element.discount}</div>
//             <div style="font-weight: bold;">Grand Total: PKR ${element.price-element.discount}</div>
//         </div>
//         <div style="text-align: center; font-size: 0.7em; color: #888; margin-top: 5px;">
//             <p>Thank you for your business!</p>
//         </div>
//     </div>
// </div>
// `)
// .join("")
// });
//         const orderHTML = 
//         `  <div style="
//     width: 778px; 
//     margin: 0px 8px;
//     display: flex; 
//     flex-direction: column; 
//     justify-content: space-between;">
//     ${invoices.join('')}
//     </div>`;

//   const options = {
//     margin: 0,  // No extra margin from html2pdf
//     filename: `Orders ${new Date(Date.now()).toLocaleDateString('en-GB')}.pdf`,
//     image: { type: "jpeg", quality: 0.95 }, 
//     html2canvas: { scale: 2 },
//     jsPDF: { unit: "px", format: [794, 1123], orientation: "portrait" }
//   };

//   html2pdf()
//     .from(orderHTML)
//     .set(options)
//     .save()
//     .catch((error: any) => {
//       console.error("Error generating PDF:", error);
//     //   toast.error("Failed to generate PDF.");
//     });
//     }
//     return(
//         <>
//         <button onClick={downloadPDF}>Click to generate Invoices</button>
//         </>
//     )
// };

// export default GenerateOrder;



import html2pdf from 'html2pdf.js';
import logo from '../assets/logo.png';
import { useSelector } from 'react-redux';
import { selectCurrentOrders } from '../redux/slices/orderSlice';
import { paginator } from '../utils/paginator';
import { toast } from 'react-toastify';
const GenerateOrder = ({selectedItems}) => {
    const orders = useSelector(selectCurrentOrders);
    // console.log(orders)
    const getSelectedOrders = (selectedItems, orders) => {
        return orders.filter(order => selectedItems.has(order._id));
    };
    const selectedOrders = getSelectedOrders(selectedItems, orders);

    console.log(selectedOrders); // This will log only the selected orders

    function splitOrdersByCartLimit(orders, cartLimit) {
        const newOrders = [];
        
        orders.forEach(order => {
            if (order.cart.length <= cartLimit) {
                newOrders.push(order);
            } else {
                let remainingCart = [...order.cart];
                while (remainingCart.length > cartLimit) {
                    newOrders.push({
                        ...order,
                        cart: remainingCart.splice(0, cartLimit)
                    });
                }
                if (remainingCart.length) {
                    newOrders.push({
                        ...order,
                        cart: remainingCart
                    });
                }
            }
        });
        
        return newOrders;
    }
    
    const downloadPDF = (selectedOrders) =>{

const invoices = Array.from(splitOrdersByCartLimit(selectedOrders,10), element => {
    return Object.values(`
<div style="
    width: 100%; 
    height: 561.5px; 
    border-bottom: 1px solid black;
    padding: 0;
    overflow: auto;
    background-color: #f9f9f9;
">
    <div style="
        width: 95%;
        margin: auto;
        padding: 10px;
        background-color: #fff;
        border: 1px solid #ddd;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        font-size: 0.75em;
    ">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; font-size: 0.85em; padding: 5px 0;">
        <div style="text-align: center; display: flex; justify-content: center; align-items: center; flex-direction: column;">
        <div style="width: 45px; height: 45px; background-color: #ddd; border-radius: 50%; display: flex; justify-content: center; align-items: center; padding: 4px;"><img src=${logo} alt="OG" width="500" height="600"></div>
        <p style="font-size: 8px">Be Pakistani Buy Pakistani</p>
        </div>
        <div style="text-align: center;">
                <h1 style="font-family: Arial, sans-serif; font-size: 1.1em; margin: 0; color: #333;"><strong>SATTAR ENTERPRISES HAFIZABAD</strong></h1>
        <h1 style="font-family: Arial, sans-serif; font-size: 1.1em; margin: 0; color: #333;"><strong>INVOICE MASTER-COLA</strong></h1>
        <p>order no. <strong>${element.orderNumber}</strong></p>
        </div>
            <div style="text-align: right;">
                <div>Kolo Road Hafizabad</div>
                <div><strong>Contact Us</strong> +92 347 3919512</div>
                <div><strong>(For Services logding Complaints)</strong></div>
            </div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.80em; margin: 5px 0;">
            <div>
                <p><strong>Business Name:</strong> ${element.customerDetails.businessName}</p>
                <p><strong>Customer:</strong> ${element.customerDetails.name}</p>
                <p><strong>Contact:</strong> ${element.customerDetails.contact}</p>
                <p><strong>Address:</strong> ${element.customerDetails.address}</p>
                </div>
                <div>
                <p><strong>Booking Date:</strong> ${new Date(element.createdAt).toLocaleString('en-GB')}</p>
                <p><strong>Delivery Date:</strong> ${new Date(element.deliveryDate).toLocaleDateString('en-GB')}</p>
                <p><strong>Order Booker:</strong> ${element.userDetails.name}</p>
                <p><strong>Previous Dues:</strong> PKR ${element.customerDetails?.udhar || 0}</p>
            </div>
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 0.80em;">
            <thead>
                <tr>
                    <th style="padding: 5px; border: 1px solid #ddd; background-color: #f4f4f4;">#</th>
                    <th style="padding: 5px; border: 1px solid #ddd; background-color: #f4f4f4;">Description</th>
                    <th style="padding: 5px; border: 1px solid #ddd; background-color: #f4f4f4;">Qty</th>
                    <th style="padding: 5px; border: 1px solid #ddd; background-color: #f4f4f4;">Unit Price</th>
                    <th style="padding: 5px; border: 1px solid #ddd; background-color: #f4f4f4;">Discount</th>
                    <th style="padding: 5px; border: 1px solid #ddd; background-color: #f4f4f4;">Total</th>
                </tr>
            </thead>
            <tbody>

                ${element.cart.map((cart, index)=>{
                    return(`
                <tr><td style="padding: 5px; border: 1px solid #ddd;">${index+1}</td><td style="padding: 5px; border: 1px solid #ddd;">${cart.product.name}(${cart.product.category})</td><td style="padding: 5px; border: 1px solid #ddd;">${cart.qty}</td><td style="padding: 5px; border: 1px solid #ddd;">${cart.product.price}</td><td style="padding: 5px; border: 1px solid #ddd;">${cart.product.discount}</td><td style="padding: 5px; border: 1px solid #ddd;">${cart.product.price*cart.qty-cart.product.discount*cart.qty}</td></tr>

                        `)
                })}
                
            </tbody>
        </table>
        <p><strong>Message:</strong> ${element.message}</p>
        <div style="text-align: right; font-size: 0.8em; margin-top: 5px;">
            <div>Subtotal: PKR ${element.price}</div>
            <div>Tax (0%): PKR 0</div>
            <div>Discounts: PKR ${element.discount}</div>
            <div style="font-weight: bold;">Grand Total: PKR ${element.price-element.discount}</div>
        </div>
        <div style="text-align: center; font-size: 0.7em; color: #888; margin-top: 5px;">
            <p>Thank you for your business!</p>
        </div>
    </div>
</div>
`)
.join("")
});
        const orderHTML = 
        `  <div style="
    width: 778px; 
    margin: 0px 8px;
    display: flex; 
    flex-direction: column; 
    justify-content: space-between;">
    ${invoices.join('')}
    </div>`;

  const options = {
    margin: 0,  // No extra margin from html2pdf
    filename: `Orders ${new Date(Date.now()).toLocaleDateString('en-GB')}.pdf`,
    image: { type: "jpeg", quality: 0.95 }, 
    html2canvas: { scale: 2 },
    jsPDF: { unit: "px", format: [794, 1123], orientation: "portrait" }
  };

  html2pdf()
    .from(orderHTML)
    .set(options)
    .save()
    .catch((error: any) => {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF.");
    });
    }

    const downloadPDFHandler = () =>{
        const splittedArray = paginator(selectedOrders,30);
        for(let splits of splittedArray){
            downloadPDF(splits);
        };
        toast.success("All Invoices generated successfully");
    }
    return(
        <>
        <button onClick={downloadPDFHandler}>Click to generate Invoices</button>
        </>
    )
};

export default GenerateOrder;