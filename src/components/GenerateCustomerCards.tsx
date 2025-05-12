import html2pdf from 'html2pdf.js';
import logo from '../assets/logo.png';
import { useSelector } from 'react-redux';
import { selectCurrentOrders } from '../redux/slices/orderSlice';
import { paginator } from '../utils/paginator';
import { toast } from 'react-toastify';
import { selectCurrentCustomers } from '../redux/slices/customersSlice';

type Props = {
    selectedItems: string[];
}

const GenerateCustomerCards = ({selectedItems}: Props) => {
        const customers = useSelector(selectCurrentCustomers);
    // console.log(orders)
    const getSelectedCustomers = (selectedItems, customers) => {
        return customers.filter(order => selectedItems.has(order._id));
    };
    const selectedCustomers = getSelectedCustomers(selectedItems, customers);

    // console.log(selectedCustomers);

        const downloadPDF = (selectedCustomers) =>{

const invoices = `
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
        <h1 style="font-family: Arial, sans-serif; font-size: 1.1em; margin: 0; color: #333;"><strong>CUSTOMERS MASTER-COLA</strong></h1>
        </div>
            <div style="text-align: right;">
                <div>Kolo Road Hafizabad</div>
                <div><strong>Contact Us</strong> +92 347 3919512</div>
                <div><strong>(For Services logding Complaints)</strong></div>
            </div>
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 0.80em;">
            <thead>
                <tr>
                    <th style="padding: 5px; border: 1px solid #ddd; background-color: #f4f4f4;">#</th>
                    <th style="padding: 5px; border: 1px solid #ddd; background-color: #f4f4f4;">Name</th>
                    <th style="padding: 5px; border: 1px solid #ddd; background-color: #f4f4f4;">Business Name</th>
                    <th style="padding: 5px; border: 1px solid #ddd; background-color: #f4f4f4;">Contact</th>
                    <th style="padding: 5px; border: 1px solid #ddd; background-color: #f4f4f4;">Address</th>
                    <th style="padding: 5px; border: 1px solid #ddd; background-color: #f4f4f4;">Route</th>
                </tr>
            </thead>
            <tbody>

                ${selectedCustomers.map((cart, index)=>{
                    return(`
                <tr><td style="padding: 5px; border: 1px solid #ddd;">${index+1}</td><td style="padding: 5px; border: 1px solid #ddd;">${cart.name}</td><td style="padding: 5px; border: 1px solid #ddd;">${cart.businessName}</td><td style="padding: 5px; border: 1px solid #ddd;">${cart.contact}</td><td style="padding: 5px; border: 1px solid #ddd;">${cart.address}</td><td style="padding: 5px; border: 1px solid #ddd;">${cart.route}</td></tr>

                        `)
                })}
                
            </tbody>
        </table>
        <div style="text-align: center; font-size: 0.7em; color: #888; margin-top: 5px;">
            <p>Have a good day!</p>
        </div>
    </div>
`

;
        const orderHTML = 
        `  <div style="
    width: 778px; 
    margin: 0px 8px;
    display: flex; 
    flex-direction: column; 
    justify-content: space-between;">
    ${invoices}
    </div>`;

  const options = {
    margin: 0,  // No extra margin from html2pdf
    filename: `Customers ${new Date(Date.now()).toLocaleDateString('en-GB')}.pdf`,
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
        const splittedArray = paginator(selectedCustomers,280);
        for(let splits of splittedArray){
            downloadPDF(splits);
        };
        toast.success("All Customers Card generated successfully");
    }
  return (
            <button onClick={downloadPDFHandler}>Click to generate Customer Cards</button>

  )
}

export default GenerateCustomerCards;