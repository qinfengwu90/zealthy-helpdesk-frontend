import {useEffect, useState} from "react";
import {Notification, Ticket} from "../models/models";
import UserInfoToReviewTicket from "./UserInfoToReviewTicket";
import UserExistingTickets from "./UserExistingTickets";
import {getAllTicketsAndEmailUpdatesForUser} from "../utilities/utilities";


function AllUserTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [emails, setEmails] = useState<Notification[]>([]);
  const [correctUserInfoEntered, setCorrectUserInfoEntered] = useState(false);

  useEffect(() => {
      let userEmail = localStorage.getItem('userEmail');
      let userLastName = localStorage.getItem('userLastName');
      if (userEmail && userLastName) {
          getAllTicketsAndEmailUpdatesForUser(userEmail, userLastName)
              .then((value) => {
                  onSuccess(value.tickets, value.emails)
              }).catch(err => {
              console.log(err);
          })
      }
    }, []);

  const onSuccess = (retrievedTickets: Ticket[], retrievedEmails: Notification[]) => {
      setCorrectUserInfoEntered(!correctUserInfoEntered)
      if (retrievedTickets !== null) {
        setTickets([...retrievedTickets]);
      }
      if (retrievedEmails !== null) {
            setEmails([...retrievedEmails]);
      }
  }

  const onLogout = () => {
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userLastName');
        setCorrectUserInfoEntered(false);
  }

  return (
      <>
      {!correctUserInfoEntered ? <UserInfoToReviewTicket onSuccess={onSuccess}/> : <UserExistingTickets tickets={tickets} emails={emails} onLogout={onLogout}/>}
      </>
  );
}

export default AllUserTickets;