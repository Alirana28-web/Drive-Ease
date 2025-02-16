import React, { useContext, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { RentContext } from '../Context/Context';
import { FiSearch } from 'react-icons/fi';
import { BsFillCarFrontFill, BsListUl, BsGridFill } from 'react-icons/bs';

const Pricing = () => {
  const { pricingData } = useContext(RentContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [viewMode, setViewMode] = useState('table');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get unique categories
  const categories = useMemo(() => {
    return ['all', ...new Set(pricingData.map(item => item.category))];
  }, [pricingData]);

  // Handle sorting, filtering, and search
  const sortedAndFilteredData = useMemo(() => {
    let filteredData = [...pricingData];

    // Filter by search term
    if (searchTerm) {
      filteredData = filteredData.filter(item =>
        item.carName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filteredData = filteredData.filter(item => item.category === selectedCategory);
    }

    // Sort by selected key
    if (sortConfig.key) {
      filteredData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredData;
  }, [pricingData, searchTerm, sortConfig, selectedCategory]);

  // Sort configuration
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // View change button styling
  const getButtonStyle = (mode) =>
    `p-2 rounded-lg ${
      viewMode === mode ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
    }`;

  return (
    <motion.div
      id="pricing"
      className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-16 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.1 },
        },
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div className="text-center mb-12" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Transparent Pricing</h1>
          <p className="text-lg text-gray-600">Choose from our competitive rates for every journey</p>
        </motion.div>

        {/* Controls */}
        <motion.div className="bg-white rounded-2xl shadow-xl p-6" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search cars..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            {/* View Mode */}
            <div className="flex gap-2">
              <button onClick={() => setViewMode('table')} className={getButtonStyle('table')}>
                <BsListUl className="text-xl" />
              </button>
              <button onClick={() => setViewMode('grid')} className={getButtonStyle('grid')}>
                <BsGridFill className="text-xl" />
              </button>
            </div>
          </div>

          {/* Table or Grid View */}
          {viewMode === 'table' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th
                      className="px-6 py-4 text-left cursor-pointer hover:bg-gray-100"
                      onClick={() => requestSort('carName')}
                    >
                      <div className="flex items-center gap-2">
                        Car Name
                      </div>
                    </th>
                    <th
                      className="px-6 py-4 text-left cursor-pointer hover:bg-gray-100"
                      onClick={() => requestSort('category')}
                    >
                      <div className="flex items-center gap-2">
                        Category
                      </div>
                    </th>
                    <th
                      className="px-6 py-4 text-left cursor-pointer hover:bg-gray-100"
                      onClick={() => requestSort('hourlyPrice')}
                    >
                      <div className="flex items-center gap-2">
                        Hourly Price
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedAndFilteredData.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">{item.carName}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <span className="font-semibold">{item.hourlyPrice}</span>
                          <span className="text-gray-500">/hr</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedAndFilteredData.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <BsFillCarFrontFill className="text-3xl text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-lg">{item.carName}</h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
                    <span>Rs</span>
                    {item.hourlyPrice}
                    <span className="text-sm text-gray-500 font-normal">/hr</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Data Found */}
          {sortedAndFilteredData.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No cars found matching your criteria</p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Pricing;
