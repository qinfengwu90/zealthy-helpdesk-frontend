import {Notification, Ticket} from "../models/models";

const SERVER_ORIGIN = process.env.REACT_APP_API_ROOT;

const handleResponseStatus = (response: Response, errMsg: string) => {
    const { status, ok } = response;

    if (status === 401) {
        localStorage.removeItem("authToken"); // web storage
        window.location.reload();
        return;
    }

    if (!ok) {
        throw Error(errMsg);
    }
};

export const adminLogin = (credential: {email: string, password: string}) => {
    const loginUrl = `${SERVER_ORIGIN}/admins/login`;

    // call the api to login
    return fetch(loginUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credential)
    }).then((response) => {
        if (!response.ok) {
            throw Error('Fail to log in');
        }
        localStorage.setItem("adminEmail", credential.email);
        return response.json();
    }).then((token: {token:string}) => {
        localStorage.setItem('authToken', token.token);
    })
}

export const registerAdmin = (email: string, password: string, firstName: string, lastName: string) => {
    const url = `${SERVER_ORIGIN}/admins/register-admin`;

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ "adminEmail": email, "password": password, "firstName": firstName, "lastName": lastName})
    }).then((response) => {
        handleResponseStatus(response, 'Fail to register');
    })
}

export const changeAdminPassword = (email: string, oldPassword: string, newPassword: string) => {
    const url = `${SERVER_ORIGIN}/admins/change-password`;

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ "email": email, "oldPassword": oldPassword, "newPassword": newPassword })
    }).then((response) => {
        handleResponseStatus(response, 'Fail to change password');
    })
}

export async function getAllTickets(): Promise<{tickets: Ticket[]}> {
    const url = `${SERVER_ORIGIN}/admins/all-tickets`;

    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    }).then((response) => {
        handleResponseStatus(response, 'Fail to get tickets');
        return response.json();
    })

}

export const updateTicketStatus = (ticketId: number, status: string, adminResponse: string) => {
    const url = `${SERVER_ORIGIN}/admins/update-ticket-status`;
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ "ticketId": ticketId, "status": status, "adminResponse": adminResponse})
    }).then((response) => {
        handleResponseStatus(response, 'Fail to update ticket status');
    })
}

export async function getAllTicketsAndEmailUpdatesForUser(userEmail: string, lastName: string): Promise<{tickets: Ticket[], emails: Notification[]}> {
    const url = `${SERVER_ORIGIN}/users/all-tickets-and-email-updates`;

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "userEmail": userEmail, "lastName": lastName})
    }).then((response) => {
        // console.log(response.json());
        handleResponseStatus(response, 'Fail to get tickets');
        return response.json();
    })
}

export const createTicket = (email: string, description: string, firstName: string, lastName: string) => {
    const url = `${SERVER_ORIGIN}/users/create-ticket`;

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "userEmail": email, "issueDescription": description, "firstName": firstName, "lastName": lastName })
    }).then((response) => {
        handleResponseStatus(response, 'Fail to create ticket');
    })
}

export const editTicket = (email: string, ticketId: string, description: string) => {
    const url = `${SERVER_ORIGIN}/users/edit-ticket`;

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "email": email, "ticketId": ticketId, "issueDescription": description})
    }).then((response) => {
        handleResponseStatus(response, 'Fail to update ticket');
    })
}



export const deleteTicket = (ticketId: number) => {
    const url = `${SERVER_ORIGIN}/delete-ticket`;

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "ticketId": ticketId})
    }).then((response) => {
        handleResponseStatus(response, 'Fail to delete ticket');
    })
}

export const formatTicketStatus = (status: string) => {
    let newStatus = status.charAt(0).toUpperCase() + status.slice(1);
    return newStatus.replace(/_/g, ' ');
}