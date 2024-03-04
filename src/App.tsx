import React, {useEffect} from 'react';
import {Breadcrumb, Button, Layout, Menu, theme} from 'antd';
import './App.css';
import CreateTicketBox from "./components/CreateTicketBox";
import {LayoutOutlined} from "@ant-design/icons";
import AdminLogin from "./components/AdminLogin";
import UserView from "./components/UserView";
import AdminView from "./components/AdminView";
import AdminRegister from "./components/AdminRegister";
import ChangeAdminPassword from "./components/ChangeAdminPassword";


const {Header, Content, Footer} = Layout;

function App() {
    const [authed, setAuthed] = React.useState(false);

    useEffect(() => {
        const authToken = localStorage.getItem("authToken");
        setAuthed(authToken !== null)
        console.log(authed)
    }, []);

    const handleLogOut = () => {
        localStorage.removeItem("authToken");
        setAuthed(false);
    };

    const handleLoginSuccess = () => {
        setAuthed(true);
    };

    return (
        <Layout>
            <Header style={{display: "flex", alignItems: "center", justifyContent:"space-between"}}>
                <div className={"text-white font-semibold text-lg gap-x-1"}>
                    <div><LayoutOutlined /> Zealthy Help Desk Ticketing System</div>
                </div>
                <div>
                    {authed ?
                        <>
                            <ChangeAdminPassword />
                            <AdminRegister />
                            <Button
                                shape={"round"}
                                onClick={handleLogOut}
                                style={{ marginRight: '20px', background: "white"}}
                            >Log out</Button>
                        </>
                        : <AdminLogin onLoginSuccess={handleLoginSuccess}/>}
                    </div>
            </Header>
            {authed ? <AdminView /> : <UserView />}
            <Footer>
                ©{new Date().getFullYear()} Qinfeng Wu
            </Footer>
        </Layout>
    );
}

export default App;
