import React, { useState, useRef, useEffect, useCallback } from "react";
import { useTheme } from "@mui/material/styles";
import {
    Fade,
    Button,
    ClickAwayListener,
    Paper,
    Popper,
    List,
    ListItemText,
    ListItemIcon,
    ListItemButton,
} from "@mui/material";
import { FaUserCircle, FaUser, FaCalendarAlt } from "react-icons/fa";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { logout } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/authContext";

const ProfileSection = () => {
    const { t } = useTranslation();
    const { setUser } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = useCallback(() => {
        setOpen((prevOpen) => !prevOpen);
    }, []);

    const handleClose = useCallback((event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    }, []);

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    const handleLogout = () => {
        const callApiLogout = async () => {
            try {
                await logout();
                setUser(null);
                navigate("/");
            } catch (err) {
                console.error(err);
            }
        };
        callApiLogout();
    };

    return (
        <>
            <Button
                sx={{ minWidth: { sm: 50, xs: 35 } }}
                ref={anchorRef}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                aria-label="Profile"
                onClick={handleToggle}
                color="inherit"
            >
                <FaUserCircle className="icon" />
            </Button>
            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                modifiers={[
                    {
                        name: "offset",
                        options: {
                            offset: [0, 10],
                        },
                    },
                    {
                        name: "preventOverflow",
                        options: {
                            altAxis: true,
                        },
                    },
                ]}
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <List
                                    sx={{
                                        width: "100%",
                                        maxWidth: 350,
                                        minWidth: 250,
                                        backgroundColor:
                                            theme.palette.background.paper,
                                        pb: 0,
                                        borderRadius: "10px",
                                    }}
                                >
                                    <Link
                                        to={"/profile"}
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit",
                                        }}
                                    >
                                        <ListItemButton aria-label="Profile">
                                            <ListItemIcon>
                                                <FaUser />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={t("Profile")}
                                            />
                                        </ListItemButton>
                                    </Link>
                                    <Link
                                        to={"/my_booking"}
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit",
                                        }}
                                    >
                                        <ListItemButton aria-label="My booking">
                                            <ListItemIcon>
                                                <FaCalendarAlt />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={t("My booking")}
                                            />
                                        </ListItemButton>
                                    </Link>
                                    <ListItemButton
                                        aria-label="Logout"
                                        onClick={handleLogout}
                                    >
                                        <ListItemIcon>
                                            <RiLogoutBoxRFill />
                                        </ListItemIcon>
                                        <ListItemText primary={t("Logout")} />
                                    </ListItemButton>
                                </List>
                            </ClickAwayListener>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </>
    );
};

export default ProfileSection;
