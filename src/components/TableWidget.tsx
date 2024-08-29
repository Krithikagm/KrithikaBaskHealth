import React, { useState } from 'react';

interface Transaction {
  id: number;
  user: string;
  amount: string;
  date: string;
}

interface Product {
  id: string;
  name: string;
  sales: number;
}

interface TableWidgetProps {
  tableType: 'recentTransactions' | 'topProducts';
  data: {
    dashboardData: {
      tables: {
        recentTransactions: Transaction[];
        topProducts: Product[];
      };
    };
  };
  className?: string;
}

type TableStyle = 'style1' | 'style2' | 'style3';

const isTransaction = (item: Transaction | Product): item is Transaction => {
  return (item as Transaction).user !== undefined;
};

const TableWidget: React.FC<TableWidgetProps> = ({ tableType, data, className }) => {
  const [tableStyle, setTableStyle] = useState<TableStyle>('style1');

  const tableData = data.dashboardData.tables[tableType];

  const getBackgroundStyle = () => {
    switch (tableStyle) {
      case 'style1':
        return 'bg-gray-900 border border-gray-700';
      case 'style2':
        return 'bg-gradient-to-r from-gray-800 to-gray-600 border border-orange-400';
      case 'style3':
        return 'bg-gradient-to-r from-gray-700 to-gray-500 border border-blue-400';
      default:
        return 'bg-gray-900 border border-gray-700';
    }
  };

  const getHeaderStyle = () => {
    switch (tableStyle) {
      case 'style1':
        return 'bg-gray-700 text-gray-300';
      case 'style2':
        return 'bg-orange-500 text-white';
      case 'style3':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-700 text-gray-300';
    }
  };

  return (
    <div className={`shadow-2xl rounded-xl p-8 transition-all duration-500 transform hover:scale-105 ${className}`}>
      <h2 className="text-3xl font-bold text-white mb-6">
        {tableType === 'recentTransactions' ? 'Recent Transactions' : 'Top Products'}
      </h2>
      
      <div className="flex justify-center mb-6">
        <button
          className={`mr-4 px-6 py-3 rounded-full font-semibold transition duration-300 shadow-lg ${
            tableStyle === 'style1' ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300 hover:bg-green-700 hover:text-white'
          }`}
          onClick={() => setTableStyle('style1')}
        >
          Style 1
        </button>
        <button
          className={`mr-4 px-6 py-3 rounded-full font-semibold transition duration-300 shadow-lg ${
            tableStyle === 'style2' ? 'bg-orange-600 text-white' : 'bg-gray-600 text-gray-300 hover:bg-orange-700 hover:text-white'
          }`}
          onClick={() => setTableStyle('style2')}
        >
          Style 2
        </button>
        <button
          className={`px-6 py-3 rounded-full font-semibold transition duration-300 shadow-lg ${
            tableStyle === 'style3' ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300 hover:bg-blue-700 hover:text-white'
          }`}
          onClick={() => setTableStyle('style3')}
        >
          Style 3
        </button>
      </div>

      <table className={`min-w-full ${getBackgroundStyle()} text-white rounded-lg overflow-hidden`}>
        <thead>
          <tr className={`${getHeaderStyle()} text-left`}>
            {tableType === 'recentTransactions' ? (
              <>
                <th className="py-3 px-4 border-b border-gray-600">User</th>
                <th className="py-3 px-4 border-b border-gray-600">Amount</th>
                <th className="py-3 px-4 border-b border-gray-600">Date</th>
              </>
            ) : (
              <>
                <th className="py-3 px-4 border-b border-gray-600">Product Name</th>
                <th className="py-3 px-4 border-b border-gray-600">Sales</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {tableData?.map((item, index) => (
            <tr key={index} className="hover:bg-gray-700 transition duration-200">
              {isTransaction(item) ? (
                <>
                  <td className="py-3 px-4 border-b border-gray-700">{item.user}</td>
                  <td className="py-3 px-4 border-b border-gray-700">{item.amount}</td>
                  <td className="py-3 px-4 border-b border-gray-700">{item.date}</td>
                </>
              ) : (
                <>
                  <td className="py-3 px-4 border-b border-gray-700">{item.name}</td>
                  <td className="py-3 px-4 border-b border-gray-700">{item.sales}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableWidget;
