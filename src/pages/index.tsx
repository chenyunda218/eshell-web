import { Outlet, useNavigate } from "react-router-dom";
import Banner from "../components/banner";
import Hamburger from "../components/hamburger";
import { useDispatch, useSelector } from "react-redux";
import { close } from "../store/sidebar";
import React, { useEffect } from "react";
import DatePicker from "../components/date-picker";
import { Dashboard } from "../api/models";
import { apiClient } from "../api/client";
import { setDashboards } from "../store/dashboard";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { ListSubheader, List, ListItemButton, ListItemIcon, ListItemText, Collapse, Drawer, Divider, IconButton } from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SendIcon from '@mui/icons-material/Send';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import LogoutIcon from '@mui/icons-material/Logout';
import useLogout from "../hooks/logout";

import "../App.css";
import "./index.css";

function Root() {
  const opened = useSelector((state: any) => state.sidebar.opened) as boolean;
  const [open, setOpen] = React.useState(true);
  const logout = useLogout();
  const handleClick = () => {
    setOpen(!open);
  };
  const token = useSelector((state: any) => state.token.token) as string;
  const nav = useNavigate();
  const dispatch = useDispatch();
  const dashboards = useSelector((state: any) => state.dashboard.dashboards) as Dashboard[];
  useEffect(() => {
    apiClient.listDashboard().then((res: any) => {
      dispatch(setDashboards(res.data))
    })
  }, [])
  useEffect(() => {
    if (!token) {
      nav("/login")
    }
  }, [token]);
  return (
    <div style={{ height: "100%" }}>
      <div className="header">
        <Hamburger></Hamburger>
        <Banner></Banner>
        <DatePicker></DatePicker>
      </div>
      <div style={{ paddingTop: 48, height: `calc(100% - 6px)` }}>
        <Outlet></Outlet>
      </div>
      <Drawer
        anchor={"left"}
        open={opened}
        onClose={() => {
          dispatch(close());
        }}
      >
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader id="nested-list-subheader" style={{ display: "flex" }}>
              <Hamburger></Hamburger>
              <Banner></Banner>
            </ListSubheader>
          }
        >
          <ListItemButton>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Sent mail" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {dashboards && dashboards.map((dashboard, index) => {
                return <ListItemButton
                  onClick={() => {
                    dispatch(close());
                    nav(`/dashboard/${dashboard.id}`);
                  }}
                  key={dashboard.id} sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary={dashboard.name} />
                </ListItemButton>
              })}
              <ListItemButton onClick={() => {
                dispatch(close());
                nav("/dashboard/create");
              }} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <DashboardCustomizeIcon />
                </ListItemIcon>
                <ListItemText primary={"Create dashboard"} />
              </ListItemButton>
            </List>
          </Collapse>
          <Divider />
          <ListItemButton onClick={logout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Drawer>
    </div>
  );
}

export default Root;
