import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import GroupBystatus from './components/GroupBystatus';
import GroupByUser from './components/GroupByUser';
import GroupByPriority from './components/GroupByPriority';
import Menu_Dots from './components/icons_FEtask/3 dot menu.svg'
import Add_Img from './components/icons_FEtask/add.svg'
import UserIcon from './components/icons_FEtask/User.png'
import Urgent_Priority_Color from './components/icons_FEtask/SVG - Urgent Priority colour.svg'
import HighPriorityIcon from './components/icons_FEtask/Img - High Priority.svg'
import MediumPriorityIcon from './components/icons_FEtask/Img - Medium Priority.svg'
import LowPriorityIcon from './components/icons_FEtask/Img - Low Priority.svg'
import No_Priority from './components/icons_FEtask/No-priority.svg'
import BacklogIcon from './components/icons_FEtask/Backlog.svg'
import TodoIcon from './components/icons_FEtask/To-do.svg'
import In_Progress from './components/icons_FEtask/in-progress.svg'
import DoneIcon from './components/icons_FEtask/Done.svg'
import Display from './components/icons_FEtask/Display.svg'
import Cancelled from './components/icons_FEtask/Cancelled.svg'

function App() {
  const [ticketData, setTicketData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedGrouping, setSelectedGrouping] = useState('Status');
  const [sortMethod, setSortMethod] = useState('Priority'); // State for sorting method

  // Fetch data function
  async function fetchData() {
    try {
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      const data_fetched = await response.json();
      console.log(data_fetched);
      setTicketData(data_fetched.tickets);
      setUserData(data_fetched.users);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }

  // Call fetchData on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Function to get unique priorities
  const getUniquePriorities = (tickets) => {
    const priorities = [...new Set(tickets.map(ticket => ticket.priority))];
    return priorities.sort((a, b) => b - a); // Sort by priority (descending)
  };

  // Function to get unique statuses
  const getUniqueStatuses = (tickets) => {
    const statuses = [...new Set(tickets.map(ticket => ticket.status))];
    return statuses;
  };

  // Function to get unique users
  const getUniqueUsers = (users) => {
    return users || [];
  };

  // Sorting function based on the selected sort method
  const sortTickets = (tickets) => {
    return tickets.sort((a, b) => {
      if (sortMethod === 'Priority') {
        return b.priority - a.priority; // Sort by priority descending
      } else if (sortMethod === 'Title') {
        return a.title.localeCompare(b.title); // Sort by title ascending
      }
      return 0;
    });
  };

  // Function to get title for the priority tag
  const getTitleForTag = (priority) => {
    switch (priority) {
      case 4:
        return "Urgent";
      case 3:
        return "High";
      case 2:
        return "Medium";
      case 1:
        return "Low";
      default:
        return "No priority";
    }
  };
  const getIconForTag = (priority) => {
    switch (priority) {
      case 4:
        return Urgent_Priority_Color; // Replace with your actual urgent priority icon
      case 3:
        return HighPriorityIcon; // Replace with your actual high priority icon
      case 2:
        return MediumPriorityIcon; // Replace with your actual medium priority icon
      case 1:
        return LowPriorityIcon; // Replace with your actual low priority icon
      default:
        return No_Priority; // Replace with a default tag icon if necessary
    }
  };
  const getIconForTitle = (status_of_id) => {
    switch (status_of_id) {
      case 'In progress':
        return In_Progress; // Replace with your actual backlog icon
      case 'Backlog':
        return BacklogIcon; // Replace with your actual todo icon
      case 'Done':
        return DoneIcon; // Replace with your actual done icon
      case 'Cancelled':
        return Cancelled; // Replace with your actual cancelled icon
      default:
        return TodoIcon; // Replace with a default icon if necessary
    }
  };
  console.log("ticketData.priority");
  console.log(ticketData);
  const uniquePriorities = ticketData ? getUniquePriorities(ticketData) : [];
  const uniqueStatuses = ticketData ? getUniqueStatuses(ticketData) : [];
  const uniqueUsers = userData ? getUniqueUsers(userData) : [];

  return (
    <div className="App">
      <Navbar
        selectGrouping={selectedGrouping}
        setSelectGrouping={setSelectedGrouping}
        sortMethod={sortMethod} // Pass the sort method to Navbar
        setSortMethod={setSortMethod} // Allow Navbar to change sorting method
      />

      <h1>{selectedGrouping}</h1>
     
      {loading ? (
        <div>Loading...</div>
      ) : (
        ticketData && (
          <>
            {selectedGrouping === 'Priority' ? (
              <div className="priority-columns">
                {uniquePriorities.map((priority) => (
                  <div className="priority-column" key={priority}>
                     <div className="card-header">
                      <span className="user-name"><span className="priority-icon">
                          <img src={getIconForTag(priority)} alt="Priority Icon" />
                        </span> {getTitleForTag(priority)} </span>
                      <span className="card-count">{priority}</span>
                      <div className="card-actions">
                          <button className="add-button"><img src={Add_Img} alt="Add Icon" /></button>
                          <button className="more-button"><img src={Menu_Dots} alt="Menu Icon" /></button>
                      </div>
                      </div>

                    {sortTickets(ticketData.filter(ticket => ticket.priority === priority)).map((ticket) => {
                      const user = userData ? userData.find(u => u.id === ticket.userId) : null;
                      return (
                        <GroupByPriority
                          key={ticket.id}
                          id={ticket.id}
                          title={ticket.title}
                          tag={ticket.tag[0]}
                          userId={ticket.userId}
                          status_of_id={ticket.status}
                          priority={ticket.priority}
                          username={user ? user.name : "Unknown User"}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            ) : selectedGrouping === 'Status' ? (
              <div className="status-columns">
                {uniqueStatuses.map((status) => (
                  <div className="status-column" key={status}>
                    <div className="card-header">
                      <span className="user-name"><span className="priority-icon">
                          <img src={getIconForTitle(status)} alt="Priority Icon" />
                        </span> {status} </span>
                        <span className="card-count">
                        {ticketData.priority}
                        </span>
                      <div className="card-actions">
                          <button className="add-button"><img src={Add_Img} alt="Add Icon" /></button>
                          <button className="more-button"><img src={Menu_Dots} alt="Menu Icon" /></button>
                      </div>
                      </div>
                    {sortTickets(ticketData.filter(ticket => ticket.status === status)).map((ticket) => {
                      const user = userData ? userData.find(u => u.id === ticket.userId) : null;
                      
                      return (
                        <GroupBystatus
                          key={ticket.id}
                          id={ticket.id}
                          title={ticket.title}
                          tag={ticket.tag[0]}
                          userId={ticket.userId}
                          status_of_id={ticket.status}
                          priority={ticket.priority}
                          username={user ? user.name : "Unknown User"}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            ) : selectedGrouping === 'User' ? (
              <div className="user-columns">
                {uniqueUsers.map((user) => (
                  <div className="user-column" key={user.id}>
                    <h3>{user.name}</h3>
                    {sortTickets(ticketData.filter(ticket => ticket.userId === user.id)).map((ticket) => (
                      <GroupByUser
                        key={ticket.id}
                        id={ticket.id}
                        title={ticket.title}
                        tag={ticket.tag[0]}
                        userId={ticket.userId}
                        status_of_id={ticket.status}
                        priority={ticket.priority}
                        username={user.name}
                      />
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <div>Unknown grouping</div>
            )}
          </>
        )
      )}
    </div>
  );
}

export default App;



// import React, { useState, useEffect } from 'react';
// import './App.css';
// import Navbar from './components/Navbar';
// import GroupBystatus from './components/GroupBystatus';
// import GroupByUser from './components/GroupByUser';
// import GroupByPriority from './components/GroupByPriority';

// function App() {
//   const [ticketData, setTicketData] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedGrouping, setSelectedGrouping] = useState('Status'); // State for selected grouping

//   // Fetch data function
//   async function fetchData() {
//     try {
//       const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
//       const data_fetched = await response.json();
//       console.log(data_fetched);
//       setTicketData(data_fetched.tickets); // Set tickets
//       setUserData(data_fetched.users); // Set users
//       setLoading(false); // Update loading state
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setLoading(false); // Update loading state in case of error
//     }
//   }

//   // Call fetchData on component mount
//   useEffect(() => {
//     fetchData();
//   }, []); // Empty dependency array to run once on mount

//   // Function to get unique priorities
//   const getUniquePriorities = (tickets) => {
//     const priorities = [...new Set(tickets.map(ticket => ticket.priority))];
//     return priorities.sort((a, b) => b - a); // Sort by priority (descending)
//   };

//   // Get tickets by priority
//   const groupTicketsByPriority = (priority, tickets) => {
//     return tickets.filter(ticket => ticket.priority === priority);
//   };

//   // Function to get unique statuses
//   const getUniqueStatuses = (tickets) => {
//     const statuses = [...new Set(tickets.map(ticket => ticket.status))];
//     return statuses;
//   };

//   // Get tickets by status
//   const groupTicketsByStatus = (status, tickets) => {
//     return tickets.filter(ticket => ticket.status === status);
//   };

//   // Function to get unique users
//   const getUniqueUsers = (users) => {
//     return users || [];
//   };

//   // Get tickets by user
//   const groupTicketsByUser = (userId, tickets) => {
//     return tickets.filter(ticket => ticket.userId === userId);
//   };

//   const getTitleForTag = (priority) => {
//     switch (priority) {
//       case 4:
//         return "Urgent";
//       case 3:
//         return "High";
//       case 2:
//         return "Medium";
//       case 1:
//         return "Low";
//       default:
//         return "No priority";
//     }
//   };

//   const uniquePriorities = ticketData ? getUniquePriorities(ticketData) : [];
//   const uniqueStatuses = ticketData ? getUniqueStatuses(ticketData) : [];
//   const uniqueUsers = userData ? getUniqueUsers(userData) : [];

//   return (
//     <div className="App">
//       <Navbar selectGrouping={selectedGrouping} setSelectGrouping={setSelectedGrouping} />

//       <h1>{selectedGrouping}</h1>
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         ticketData && (
//           <>
//             {selectedGrouping === 'Priority' ? (
//               <div className="priority-columns">
//                 {/* Grouping by priority */}
//                 {uniquePriorities.map((priority) => (
//                   <div className="priority-column" key={priority}>
//                     <h3>{getTitleForTag(priority)}</h3>
//                     {groupTicketsByPriority(priority, ticketData).map((ticket) => {
//                       const user = userData ? userData.find(u => u.id === ticket.userId) : null;
//                       return (
//                         <GroupByPriority
//                           key={ticket.id}
//                           id={ticket.id}
//                           title={ticket.title}
//                           tag={ticket.tag[0]}
//                           userId={ticket.userId}
//                           status_of_id={ticket.status}
//                           priority={ticket.priority}
//                           username={user ? user.name : "Unknown User"}
//                         />
//                       );
//                     })}
//                   </div>
//                 ))}
//               </div>
//             ) : selectedGrouping === 'Status' ? (
//               <div className="status-columns">
//                 {/* Grouping by status */}
//                 {uniqueStatuses.map((status) => (
//                   <div className="status-column" key={status}>
//                     <h3>{status}</h3>
//                     {groupTicketsByStatus(status, ticketData).map((ticket) => {
//                       const user = userData ? userData.find(u => u.id === ticket.userId) : null;
//                       return (
//                         <GroupBystatus
//                           key={ticket.id}
//                           id={ticket.id}
//                           title={ticket.title}
//                           tag={ticket.tag[0]}
//                           userId={ticket.userId}
//                           status_of_id={ticket.status}
//                           priority={ticket.priority}
//                           username={user ? user.name : "Unknown User"}
//                         />
//                       );
//                     })}
//                   </div>
//                 ))}
//               </div>
//             ) : selectedGrouping === 'User' ? (
//               <div className="user-columns">
//                 {/* Grouping by user */}
//                 {uniqueUsers.map((user) => (
//                   <div className="user-column" key={user.id}>
//                     <h3>{user.name}</h3>
//                     {groupTicketsByUser(user.id, ticketData).map((ticket) => (
//                       <GroupByUser
//                         key={ticket.id}
//                         id={ticket.id}
//                         title={ticket.title}
//                         tag={ticket.tag[0]}
//                         userId={ticket.userId}
//                         status_of_id={ticket.status}
//                         priority={ticket.priority}
//                         username={user.name}
//                       />
//                     ))}
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               // Default case (if any)
//               <div>Unknown grouping</div>
//             )}
//           </>
//         )
//       )}
//     </div>
//   );
// }

// export default App;
