import React, {useEffect, useState} from "react";
import {Button, Card, Cascader, CascaderProps, Form, List, message, Select, theme} from "antd";
import {Ticket} from "../models/models";
import {getAllTickets, updateTicketStatus} from "../utilities/utilities";
import TextArea from "antd/es/input/TextArea";
import DeleteTicket from "./DeleteTicket";


function AdminView() {
    const [tickets, setTickets] = useState<Ticket[]>([]);


    useEffect(() => {
        getAndSetAllTickets();
    }, []);

    const getAndSetAllTickets = () => {
        getAllTickets()
            .then((value) => {
                setTickets(value.tickets);
            }).catch(err => {
            message.error(err.message);
        })
    }

    const handleUpdateTicket = (data: { ticketId: number; status: string; adminResponse: string }) => {
        console.log(data, "onfinish")
        updateTicketStatus(data.ticketId, data.status, data.adminResponse)
            .then(() => {
                message.success({content: `Ticket #${data.ticketId} has been updated`, duration: 3} )
            }).catch(err => {
            message.error(err.message);
        })
    }

    const ticketStatuses: CascaderProps['options'] = [
        {
            value: 'new',
            label: 'New',
        },
        {
            value: 'in_progress',
            label: 'In Progress',
        },
        {
            value: 'resolved',
            label: 'Resolved',
        },
    ];

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <div
            style={{
                background: colorBgContainer,
                minHeight: "650px",
                padding: 24,
                borderRadius: borderRadiusLG,
            }}
        >
            <div>
                <div className={"font-semibold text-2xl"}>Tickets from all users (Admin View)</div>
                <List
                    style={{marginTop: 20}}
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 3,
                        lg: 3,
                        xl: 4,
                        xxl: 4,
                    }}
                    dataSource={tickets}
                    renderItem={(ticket) => (
                        <List.Item>
                            <Card
                                key={ticket.id}
                                title={ticket.firstName + " " + ticket.lastName + " (Ticket #" + ticket.id + ")"}
                                // extra={<Text>${ticket.issueDescription}</Text>}
                            >
                                <Form
                                    name={"admin_edit_ticket"}
                                    onFinish={handleUpdateTicket}
                                    initialValues={{
                                        ["ticketId"]: ticket.id,
                                        ["status"]: ticket.status,
                                        ["adminResponse"]: ticket.adminResponse
                                    }}
                                    labelCol={{span: 8}}
                                    wrapperCol={{span: 16}}
                                >
                                    <Form.Item
                                        label={<strong>Ticket ID</strong>}
                                        name={"ticketId"}
                                        style={{"display": "none"}}
                                    >
                                        {ticket.id}
                                    </Form.Item>
                                    <Form.Item
                                        label={<strong>Issue</strong>}
                                    >
                                        <>
                                            {ticket.issueDescription}
                                        </>
                                    </Form.Item>
                                    <Form.Item
                                        name={"status"}
                                        label={<strong>Status</strong>}
                                        rules={[{required: true, message: 'Please select a status'}]}
                                    >
                                        <Select options={ticketStatuses}/>
                                    </Form.Item>
                                    <Form.Item
                                        name={"adminResponse"}
                                        label={<span style={{ whiteSpace: 'normal' }}><strong>Admin Response</strong></span>}
                                    >
                                        <TextArea />
                                    </Form.Item>
                                    <Form.Item
                                        label={<strong>Updated At</strong>}
                                    >
                                        {(new Date(ticket.updatedAt)).toLocaleDateString("en-US", {timeZone: "America/New_York"})}
                                    </Form.Item>
                                    <Form.Item className={"pl-4"}>
                                        <div className={"flex flex-row gap-x-1 justify-between items-center"}>
                                        <Button htmlType={"submit"}>
                                            Update Ticket
                                        </Button>
                                        <DeleteTicket ticketId={ticket.id} getAllTickets={getAndSetAllTickets}/>
                                        </div>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        </div>


    );
}

export default AdminView;