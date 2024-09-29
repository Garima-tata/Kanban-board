import React from 'react'
import './Groupby.css'
import Menu_Dots from './icons_FEtask/3 dot menu.svg'
import Add_Img from './icons_FEtask/add.svg'
import BacklogIcon from './icons_FEtask/Backlog.svg'
import LowPriorityIcon from './icons_FEtask/Img - Low Priority.svg'
import MediumPriorityIcon from './icons_FEtask/Img - Medium Priority.svg'
import HighPriorityIcon from './icons_FEtask/Img - High Priority.svg'
import No_Priority from './icons_FEtask/No-priority.svg'
import TodoIcon from './icons_FEtask/To-do.svg'
import In_Progress from './icons_FEtask/in-progress.svg'
import DoneIcon from './icons_FEtask/Done.svg'
import Display from './icons_FEtask/Display.svg'
import Cancelled from './icons_FEtask/Cancelled.svg'
import Urgent_Priority_Color from './icons_FEtask/SVG - Urgent Priority colour.svg'
import Urgent_Priority_Grey from './icons_FEtask/SVG - Urgent Priority grey.svg'
import UserIcon from './icons_FEtask/User.png'

const GroupBystatus = ({ id, title, tag, userId, status_of_id, priority , username}) => {
  
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
      
      const getIconForTag = (priority) => {
        switch (priority) {
          case 4:
            return Urgent_Priority_Color; 
          case 3:
            return HighPriorityIcon;
          case 2:
            return MediumPriorityIcon; // Replace with your actual medium priority icon
          case 1:
            return LowPriorityIcon; // Replace with your actual low priority icon
          default:
            return No_Priority; // Replace with a default tag icon if necessary
        }
      };
      
    return (
    <div>
           <div className="card">
           
                <div className="card-body">
                <div className="card-title"><span className="priority-icon">
                    <img src={UserIcon} alt="Priority Icon" />
                  </span>{id}</div>
                <div className="card-description">{title}</div>
                <div className="card-footer">
                    <span className="priority-icon">
                    <img src={getIconForTag(priority)} alt="Priority Icon" />
                    </span>
                    {tag && <span className="request-type">{tag}</span>}
                </div>
                </div>

        </div>

    </div>
  )
}

export default GroupBystatus