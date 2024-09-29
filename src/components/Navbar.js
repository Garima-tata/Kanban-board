import React, { useState } from 'react';
import './Navbar.css';
import Display from './icons_FEtask/Display.svg';
import Down from './icons_FEtask/down.svg';
const Navbar = ({ selectGrouping, setSelectGrouping, setSortMethod }) => {
  const [showMainDropdown, setShowMainDropdown] = useState(false);
  const [showDropdownOne, setShowDropdownOne] = useState(false);
  const [showDropdownTwo, setShowDropdownTwo] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState('Priority'); // Updated to reflect sort method

  const toggleMainDropdown = () => setShowMainDropdown(!showMainDropdown);
  const toggleDropdownOne = () => setShowDropdownOne(!showDropdownOne);
  const toggleDropdownTwo = () => setShowDropdownTwo(!showDropdownTwo);

  const handleGroupingSelect = (option) => {
    setSelectGrouping(option); // Update the selected grouping in the App component
    setShowDropdownOne(false); 
  };

  const handleOrderSelect = (option) => {
    setSelectedOrder(option);
    setSortMethod(option); // Pass the selected sorting method to App
    setShowDropdownTwo(false); 
  };

  // Define the grouping and ordering options
  const groupingOptions = ['Status', 'User', 'Priority'].filter(
    (option) => option !== selectGrouping
  );

  // Sorting options: Priority (descending) and Title (ascending)
  const orderOptions = ['Priority', 'Title'].filter(
    (option) => option !== selectedOrder
  );

  return (
    <nav className="navbar">
      <button className="navbar-button" onClick={toggleMainDropdown}>
      <img src={Display} alt="Icon" className="button-icon" />
        Options
        <img src={Down} alt="Icon" className="button-icon" onClick={toggleMainDropdown}/>
      </button>

      {showMainDropdown && (
        <div className="main-dropdown">
          <div className="dropdown-group">
            <div className="dropdown-header">
              Grouping
              <div onClick={toggleDropdownOne} className="drop-under-drop">
                <button className="dropdown-item">{selectGrouping}<img src={Down} alt="Icon" className="button-icon" onClick={toggleDropdownOne}/></button>
                {showDropdownOne && (
                  <div className="dropdown-content">
                    {groupingOptions.map((option) => (
                      <button
                        key={option}
                        className="dropdown-item"
                        onClick={() => handleGroupingSelect(option)}
                      >
                        {option}
                        
                      </button>
                    ))}
                    
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="dropdown-group">
            <div className="dropdown-header">
              Ordering
              <div onClick={toggleDropdownTwo} className="drop-under-drop">
                <button className="dropdown-item">{selectedOrder}<img src={Down} alt="Icon" className="button-icon" onClick={toggleDropdownTwo}/></button>
                {showDropdownTwo && (
                  <div className="dropdown-content">
                    {orderOptions.map((option) => (
                      <button
                        key={option}
                        className="dropdown-item"
                        onClick={() => handleOrderSelect(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


// import React, { useState } from 'react';
// import './Navbar.css';

// const Navbar = ({ selectGrouping, setSelectGrouping }) => {
//   const [showMainDropdown, setShowMainDropdown] = useState(false);
//   const [showDropdownOne, setShowDropdownOne] = useState(false);
//   const [showDropdownTwo, setShowDropdownTwo] = useState(false);
  
//   const [selectedPriority, setSelectedPriority] = useState('Urgent');

//   const toggleMainDropdown = () => setShowMainDropdown(!showMainDropdown);
//   const toggleDropdownOne = () => setShowDropdownOne(!showDropdownOne);
//   const toggleDropdownTwo = () => setShowDropdownTwo(!showDropdownTwo);

//   const handleGroupingSelect = (option) => {
//     setSelectGrouping(option); // Update the selected grouping in the App component
//     setShowDropdownOne(false); 
//   };

//   const handlePrioritySelect = (option) => {
//     setSelectedPriority(option);
//     setShowDropdownTwo(false); 
//   };

//     // Define the grouping and priority options
//     const groupingOptions = ['Status', 'User', 'Priority'].filter(
//         (option) => option !== selectGrouping
//       );
//       const priorityOptions = ['Urgent', 'High', 'Medium', 'Low', 'No priority'].filter(
//         (option) => option !== selectedPriority
//       );
//   return (
//     <nav className="navbar">
//       <button className="navbar-button" onClick={toggleMainDropdown}>
//         Options
//       </button>

//       {showMainDropdown && (
//         <div className="main-dropdown">
//           <div className="dropdown-group">
//             <div className="dropdown-header">
//               Grouping: 
//               <div onClick={toggleDropdownOne} className="drop-under-drop">
//                 <button className="dropdown-item">{selectGrouping}</button>
//                 {showDropdownOne && (
//                   <div className="dropdown-content">
//                     {groupingOptions.map((option) => (
//                       <button
//                         key={option}
//                         className="dropdown-item"
//                         onClick={() => handleGroupingSelect(option)}
//                       >
//                         {option}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="dropdown-group">
//             <div className="dropdown-header">
//               Ordering: 
//               <div onClick={toggleDropdownTwo} className="drop-under-drop">
//                 <button className="dropdown-item">{selectedPriority}</button>
//                 {showDropdownTwo && (
//                   <div className="dropdown-content">
//                     {priorityOptions.map((option) => (
//                       <button
//                         key={option}
//                         className="dropdown-item"
//                         onClick={() => handlePrioritySelect(option)}
//                       >
//                         {option}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
