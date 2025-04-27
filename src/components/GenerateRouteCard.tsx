import html2pdf from 'html2pdf.js';
import logo from '../assets/logo.png';
import { useSelector } from 'react-redux';
import { selectCurrentOrders } from '../redux/slices/orderSlice';
import { objectCollector } from '../utils/objectCollector';
import { toast } from 'react-toastify';
const GenerateRouteCard = ({selectedItems}) => {
    const orders = useSelector(selectCurrentOrders);
    // console.log(orders)
    const getSelectedOrders = (selectedItems, orders) => {
        return orders.filter(order => selectedItems.has(order._id));
    };
    const selectedOrders = getSelectedOrders(selectedItems, orders);

    function groupOrders(orders) {
        return Object.values(
            orders.reduce((acc, order) => {
                // Extract only the date part (ignoring time)
                const createdAtDate = order.createdAt.split("T")[0]; // Assuming ISO format (YYYY-MM-DDTHH:MM:SS)
                const deliveryDateOnly = order.deliveryDate.split("T")[0];
    
                // Create a unique key based on common fields
                const key = `${order.createdBy}-${order.customerDetails.route}-${deliveryDateOnly}-${createdAtDate}`;
    
                // If the key doesn't exist, initialize an array
                if (!acc[key]) {
                    acc[key] = [];
                }
    
                // Push the order into the correct group
                acc[key].push(order);
    
                return acc;
            }, {})
        );
    }

    const mergedCart = selectedOrders.flatMap(order => order.cart);

    console.log(mergedCart);
    const uniqueCategories = objectCollector(objectCollector(mergedCart, "product"),"category");

    
    const downloadPDF = () =>{


const invoices = Array.from(groupOrders(selectedOrders), (element,index) => {
    return Object.values(`
    <div style="
        page-break-before: always;
        width: 95%;
        margin: auto;
        padding: 10px;
        background-color: #fff;
        border: 1px solid #ddd;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        font-size: 0.80em;
    ">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; font-size: 0.85em; padding: 5px 0;">
            <div style="width: 35px; height: 35px; background-color: #ddd; border-radius: 50%; display: flex; justify-content: center; align-items: center; padding: 4px;"><img src=${logo} alt="Girl in a jacket" width="500" height="600"></div>
        <div style="text-align: center;">
        <h1 style="font-family: Arial, sans-serif; font-size: 1.1em; margin: 0; color: #333;"><strong>ROUTE CARD</strong></h1>
        <p>${element[0].customerDetails.route}</p>
        </div>
            <div style="text-align: right;">
                <div><strong>Sattar Enterprises</strong></div>
                <div>Kolo Road Hafizabad</div>
                <div>Phone: +92 340 4646799</div>
            </div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.80em; margin: 5px 0;">
            <div>
                <p><strong>Order Booker:</strong> ${element[0].userDetails.name}</p>
                </div>
                <div>
                <p><strong>Booking Date:</strong> ${new Date(element[0].createdAt).toLocaleDateString('en-GB')}</p>
                <p><strong>Delivery Date:</strong> ${new Date(element[0].deliveryDate).toLocaleDateString('en-GB')}</p>
            </div>
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 0.90em;">
            <thead>
                <tr>
                    <th style="padding: 5px; border: 1px solid #ddd; background-color: #f4f4f4;">#</th>
                    <th style="padding: 5px; border: 1px solid #ddd; background-color: #f4f4f4;">Order no.</th>
                    <th style="padding: 5px; border: 1px solid #ddd; background-color: #f4f4f4;">Business Name</th>
                    <th style="padding: 5px; border: 1px solid #ddd; background-color: #f4f4f4;">Name</th>
                    <th style="padding: 5px; border: 1px solid #ddd; background-color: #f4f4f4;">Address</th>
                    <th style="padding: 5px; border: 1px solid #ddd; background-color: #f4f4f4;">Total Items</th>
                    <th style="padding: 5px; border: 1px solid #ddd; background-color: #f4f4f4;">Price</th>
                </tr>
            </thead>
            <tbody>

            ${element.map((order, index) => `
                <tr>
                    <td style="padding: 5px; border: 1px solid #ddd;">${index + 1}</td>
                    <td style="padding: 5px; border: 1px solid #ddd;">${order.orderNumber}</td>
                    <td style="padding: 5px; border: 1px solid #ddd;">${order.customerDetails.businessName}</td>
                    <td style="padding: 5px; border: 1px solid #ddd;">${order.customerDetails.name}</td>
                    <td style="padding: 5px; border: 1px solid #ddd;">${order.customerDetails.address}</td>
                    <td style="padding: 5px; border: 1px solid #ddd;">${order.cart.reduce((sum, item) => sum + item.qty, 0)}</td>
                    <td style="padding: 5px; border: 1px solid #ddd;">${order.price - order.discount}</td>
                </tr>
            `).join('')}
            
                
            </tbody>
        </table>
<p><strong>Summary:</strong></p>
<table style="width: 100%; border-collapse: collapse; font-size: 0.90em;">
    <thead>
        <tr>
        ${uniqueCategories.map((category) => `
            <th style="padding: 5px; border: 1px solid #ddd; background-color: #f4f4f4;">${category}</th>
        `).join('')}
        </tr>
    </thead>
    <tbody>
    <tr style="text-align: center;">
    ${uniqueCategories.map((uniqueCategory) => `
        <td style="padding: 5px; border: 1px solid #ddd;">
            ${element.flatMap(order => order.cart)
                .filter(item => item.product?.category === uniqueCategory)
                .reduce((sum, item) => sum + item.qty, 0)}
        </td>
    `).join('')}
    </tr>
    </tbody>
</table>

<p><strong>Product Breakdown:</strong></p>
<table style="width: 100%; border-collapse: collapse; font-size: 0.90em; margin-top: 10px;">
    <thead>
        <tr>
            <th style="padding: 5px; border: 1px solid #ddd; background-color: #f4f4f4;">Category</th>
            <th style="padding: 5px; border: 1px solid #ddd; background-color: #f4f4f4;">Product</th>
            <th style="padding: 5px; border: 1px solid #ddd; background-color: #f4f4f4;">Total Qty</th>
        </tr>
    </thead>
    <tbody>
    ${uniqueCategories.map(category => {
        const productsInCategory = 
        // mergedCart
        element.flatMap(order => order.cart)
            .filter(item => item.product?.category === category)
            .reduce((acc, item) => {
                acc[item.product?.name] = (acc[item.product?.name] || 0) + item.qty;
                return acc;
            }, {});

        return Object.entries(productsInCategory).map(([productName, qty]) => `
            <tr>
                <td style="padding: 5px; border: 1px solid #ddd;">${category}</td>
                <td style="padding: 5px; border: 1px solid #ddd;">${productName}</td>
                <td style="padding: 5px; border: 1px solid #ddd;">${qty}</td>
            </tr>
        `).join('');
    }).join('')}
    </tbody>
</table>

        <div style="text-align: right; font-size: 0.90em; margin-top: 5px;">
            <div>Subtotal: PKR ${element.reduce((sum,item)=>sum+item.price,0)}</div>
            <div>Total Discounts: PKR ${-element.reduce((sum,item)=>sum+item.discount,0)}</div>
            <div style="font-weight: bold;">Expected Total Cash: PKR ${element.reduce((sum,item)=>sum+item.price,0)-element.reduce((sum,item)=>sum+item.discount,0)}</div>
        </div>
        <div style="text-align: center; font-size: 0.7em; color: #888; margin-top: 5px;">
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
    filename: `Route Cards ${new Date(Date.now()).toLocaleDateString('en-GB')}.pdf`,
    image: { type: "jpeg", quality: 0.95 }, 
    html2canvas: { scale: 2 },
    jsPDF: { unit: "px", format: [794, 1123], orientation: "portrait" }
  };

  html2pdf()
    .from(orderHTML)
    .set(options)
    .save()
    .then(toast.success('PDF generated successfully'))
    .catch((error: any) => {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF.");
    });
    }
    return(
        <>
        <button onClick={downloadPDF}>Click to generate Route Cards</button>
        </>
    )
};

export default GenerateRouteCard;