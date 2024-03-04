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
      <Content style={{padding: "40px 40px"}}>
          <div className={"flex flex-col gap-y-2"}>
              <div
                  style={{
                      background: colorBgContainer,
                      minHeight: 280,
                      padding: 24,
                      borderRadius: borderRadiusLG,
                  }}

                  className={"flex flex-row place-content-center"}
              >
                  <CreateTicketBox />
              </div>
              <div
                  style={{
                      background: colorBgContainer,
                      minHeight: 280,
                      padding: 24,
                      borderRadius: borderRadiusLG,
                  }}

                  className={"flex flex-row place-content-center"}
              >
                  <AllUserTickets/>
              </div>
          </div>
      </Content>
  )
}

export default UserView;