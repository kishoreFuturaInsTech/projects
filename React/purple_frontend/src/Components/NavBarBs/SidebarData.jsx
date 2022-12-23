import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import BusinessIcon from "@mui/icons-material/Business";
import QuizIcon from "@mui/icons-material/Quiz";
import ArticleIcon from "@mui/icons-material/Article";

export const SidebarData = [
  {
    title: "Home",
    path: "/homepage",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "Address Details",
    path: "#",
    icon: <MapsHomeWorkIcon />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Address",
        path: "address",
        icon: <KeyboardDoubleArrowRightIcon />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Company Details",
    path: "#",
    icon: <BusinessIcon />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Company",
        path: "/company",
        icon: <KeyboardDoubleArrowRightIcon />,
      },
    ],
  },
];
