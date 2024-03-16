import CreateTicketBox from "./CreateTicketBox";
import React from "react";
import {Content} from "antd/es/layout/layout";
import {theme} from "antd";
import UserInfoToReviewTicket from "./UserInfoToReviewTicket";
import AllUserTickets from "./AllUserTickets";


function UserView() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

  return (
          <div className={"flex flex-col gap-y-2"}>
              <div className={"md:min-h-[280px] bg-white rounded-lg py-5 flex flex-row place-content-center"}>
                  <CreateTicketBox />
              </div>
              <div className={"md:min-h-[280px] bg-white rounded-lg py-5 flex flex-row place-content-center"}>
                  <AllUserTickets/>
              </div>
          </div>
  )
}

export default UserView;