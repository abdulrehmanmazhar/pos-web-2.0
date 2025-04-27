
import Filter from "../components/Filter";
import {BarChart, LineChart, DonutChart, MultiLineChart} from "../components/Charts";
function Home() {
  // toast.success('working')
  // return (
  //   <div className="p-4 ">
  //     {/* Outer container for scroll */}
  //     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-auto ">
  //       {/* Best Selling Products */}
  //       <div className="col-span-1 md:col-span-2 xl:col-span-2 bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 p-4 rounded-lg shadow-lg border border-gray-200 min-w-[300px]">
  //         <h2 className="text-lg font-semibold mb-2">Stock Values</h2>
  //         {/* <Filter/> */}

  //         <div className="h-[300px] w-[100%] bg-white rounded-lg p-2">
  //           {/* Replace with your charting component */}
  //           {/* <MultiLineChart key="unique-bar-chart-id-6"/> */}
  //         </div>
  //       </div>

  //       {/* Sales Share Over Time */}
  //       {/* <div className="col-span-1 md:col-span-1 xl:col-span-1 bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 p-4 rounded-lg shadow-lg border border-gray-200 min-w-[300px]">
  //         <h2 className="text-lg font-semibold mb-2">Sales Share Over Time</h2>

  //         <div className="h-[300px] w-[100%] bg-white rounded-lg p-2">

  //         </div>
  //       </div> */}

  //       {/* Order Frequency */}
  //       <div className="col-span-1 md:col-span-2 xl:col-span-1 bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 p-4 rounded-lg shadow-lg border border-gray-200 min-w-[300px]">
  //         <h2 className="text-lg font-semibold mb-2">Order Frequency</h2>
  //         {/* <Filter/> */}

  //         <div className="h-[300px] w-[100%] bg-white rounded-lg p-2">
  //           {/* Replace with your charting component */}
  //           {/* <LineChart key="unique-bar-chart-id-3"/> */}
  //         </div>
  //       </div>

  //       {/* Stock Values */}
  //       <div className="col-span-1 md:col-span-1 xl:col-span-1 bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 p-4 rounded-lg shadow-lg border border-gray-200 min-w-[300px]">
  //         <h2 className="text-lg font-semibold mb-2">Transactions Over Time</h2>
  //         {/* <Filter/> */}

  //         <div className="h-[300px] w-[100%] bg-white rounded-lg p-2">
  //           {/* Replace with your charting component */}
  //           {/* <MultiLineChart key="unique-bar-chart-id-4"/> */}
  //         </div>
  //       </div>



  //       {/* Transactions Over Time */}
  //       <div className="col-span-1 md:col-span-2 xl:col-span-2 bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 p-4 rounded-lg shadow-lg border border-gray-200 min-w-[300px]">
  //         <h2 className="text-lg font-semibold mb-2">Stock Values</h2>
  //         {/* <Filter/> */}

  //         <div className="h-[300px] w-[100%] bg-white rounded-lg p-2">
  //           {/* Replace with your charting component */}
  //           {/* <MultiLineChart key="unique-bar-chart-id-6"/> */}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="p-4 ">
      {/* Outer container for scroll */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-auto ">
        {/* Best Selling Products */}
        <div className="col-span-1 md:col-span-1 xl:col-span-1 bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 p-4 rounded-lg shadow-lg border border-gray-200 min-w-[300px]">
          <h2 className="text-lg font-semibold mb-2">Top 5 Best Selling Products</h2>
            <Filter/>
          <div className="h-[300px] w-[100%] bg-white rounded-lg p-2">
            {/* Replace with your charting component */}
            <BarChart key="unique-bar-chart-id-1"/>

          </div>
        </div>

        {/* Sales Share Over Time */}
        <div className="col-span-1 md:col-span-1 xl:col-span-1 bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 p-4 rounded-lg shadow-lg border border-gray-200 min-w-[300px]">
          <h2 className="text-lg font-semibold mb-2">Sales Share Over Time</h2>
          <Filter/>

          <div className="h-[300px] w-[100%] bg-white rounded-lg p-2">
            {/* Replace with your charting component */}
            <DonutChart key="unique-bar-chart-id-2"/>
          </div>
        </div>

        {/* Order Frequency */}
        <div className="col-span-1 md:col-span-2 xl:col-span-1 bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 p-4 rounded-lg shadow-lg border border-gray-200 min-w-[300px]">
          <h2 className="text-lg font-semibold mb-2">Order Frequency</h2>
          <Filter/>

          <div className="h-[300px] w-[100%] bg-white rounded-lg p-2">
            {/* Replace with your charting component */}
            <LineChart key="unique-bar-chart-id-3"/>
          </div>
        </div>

        {/* Stock Values */}
        <div className="col-span-1 md:col-span-1 xl:col-span-1 bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 p-4 rounded-lg shadow-lg border border-gray-200 min-w-[300px]">
          <h2 className="text-lg font-semibold mb-2">Transactions Over Time</h2>
          <Filter/>

          <div className="h-[300px] w-[100%] bg-white rounded-lg p-2">
            {/* Replace with your charting component */}
            <MultiLineChart key="unique-bar-chart-id-4"/>
          </div>
        </div>



        {/* Transactions Over Time */}
        <div className="col-span-1 md:col-span-2 xl:col-span-2 bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 p-4 rounded-lg shadow-lg border border-gray-200 min-w-[300px]">
          <h2 className="text-lg font-semibold mb-2">Stock Values</h2>
          <Filter/>

          <div className="h-[300px] w-[100%] bg-white rounded-lg p-2">
            {/* Replace with your charting component */}
            <MultiLineChart key="unique-bar-chart-id-6"/>
          </div>
        </div>
      </div>
    </div>
  );


}

export default Home