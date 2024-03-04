import React from 'react';
import CreateTicketBox from "../components/CreateTicketBox";
import LookupExistingTickets from "../components/LookupExistingTickets";
const Home = () => {
return (
    <>
        {/*<NavbarOld/>*/}
        <div className={"flex flex-col my-10 mx-4 align-middle"}>
            <div>
                <CreateTicketBox/>
            </div>
            <div>
                <hr/>
            </div>
            <div>
                <LookupExistingTickets/>
            </div>
        </div>
    </>
)
}

export default Home;