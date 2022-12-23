import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import Typography from "@mui/material/Typography";
import MailIcon from "@mui/icons-material/Mail";
import CancelScheduleSendIcon from "@mui/icons-material/CancelScheduleSend";
import Label from "@mui/icons-material/Label";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import InfoIcon from "@mui/icons-material/Info";
import ForumIcon from "@mui/icons-material/Forum";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Button, Modal } from "react-bootstrap";
import LogoutIcon from "@mui/icons-material/Logout";
import { Tooltip, IconButton } from "@mui/material";
import axios from "axios";
import PolicyIcon from "@mui/icons-material/Policy";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightRegular,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)",
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "inherit",
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

function StyledTreeItem(props) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: "inherit", flexGrow: 1 }}
          >
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

export default function GmailTreeView() {
  let navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const closeModal = () => {
    setModal(false);
  };

  const userId = sessionStorage.getItem("userId");
  const refreshToken = sessionStorage.getItem("refreshtoken");

  const formSubmit = () => {
    axios
      .post(`http://localhost:8080/api/auth/logout`, {
        userId,
        refreshToken,
      })
      .then((res) => {
        sessionStorage.clear();
        closeModal();
        navigate("/");
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Tooltip title="Logout">
        <Button
          variant="danger"
          style={{ float: "right", margin: "1rem 2rem 0 0" }}
        >
          <LogoutIcon
            style={{ cursor: "pointer" }}
            onClick={() => setModal(true)}
          />
        </Button>
      </Tooltip>
      <div>
        <TreeView
          aria-label="gmail"
          defaultExpanded={["3"]}
          defaultCollapseIcon={<ArrowDropDownIcon />}
          defaultExpandIcon={<ArrowRightIcon />}
          defaultEndIcon={<div style={{ width: 24 }} />}
          sx={{
            height: "auto",
            flexGrow: 1,
            maxWidth: "90%",
            overflowY: "auto",
            marginTop: "1rem",
          }}
        >
          <StyledTreeItem
            nodeId="1"
            labelText="Policy Serving Modules"
            labelIcon={PolicyIcon}
          >
            <StyledTreeItem
              style={{ marginLeft: "1rem" }}
              nodeId="2"
              labelText="FreeLook Cancellation"
              labelIcon={CancelScheduleSendIcon}
            >
              <StyledTreeItem
                style={{ marginLeft: "1rem" }}
                nodeId="3"
                labelText="Non ULIP"
                labelIcon={CancelScheduleSendIcon}
              >
                <StyledTreeItem
                  style={{ marginLeft: "2rem" }}
                  nodeId="4"
                  labelText="Client Details PAS"
                  labelIcon={ArrowCircleRightIcon}
                  color="#1a73e8"
                  bgColor="#e8f0fe"
                  onClick={() => (location = "clientDetailPas")}
                />
                <StyledTreeItem
                  style={{ marginLeft: "2rem" }}
                  nodeId="5"
                  labelText="Policy Details PAS"
                  labelIcon={ArrowCircleRightIcon}
                  color="#e3742f"
                  bgColor="#fcefe3"
                  onClick={() => (location = "policyDetailPas")}
                />
                <StyledTreeItem
                  style={{ marginLeft: "2rem" }}
                  nodeId="6"
                  labelText="Cover Details PAS"
                  labelIcon={ArrowCircleRightIcon}
                  color="#3c8039"
                  bgColor="#e6f4ea"
                  onClick={() => (location = "coverDetailPas")}
                />
                <StyledTreeItem
                  style={{ marginLeft: "2rem" }}
                  nodeId="7"
                  labelText="Transaction Details PAS"
                  labelIcon={ArrowCircleRightIcon}
                  color="#3c8039"
                  bgColor="#e6f4ea"
                  onClick={() => (location = "Transaction")}
                />
                <StyledTreeItem
                  style={{ marginLeft: "2rem" }}
                  nodeId="8"
                  labelText="Payout Result"
                  labelIcon={ArrowCircleRightIcon}
                  color="#a250f5"
                  bgColor="#f3e8fd"
                  onClick={() => (location = "purpleDetails")}
                />
                <StyledTreeItem
                  style={{ marginLeft: "2rem" }}
                  nodeId="9"
                  labelText=" Quality Checking"
                  labelIcon={ArrowCircleRightIcon}
                  color="#3c8039"
                  bgColor="#e6f4ea"
                  onClick={() => (location = "screen")}
                />
              </StyledTreeItem>

              <StyledTreeItem
                style={{ marginLeft: "1rem" }}
                nodeId="10"
                labelText="ULIP"
                labelIcon={CancelScheduleSendIcon}
              >
                <StyledTreeItem
                  style={{ marginLeft: "2rem" }}
                  nodeId="11"
                  labelText="Fund Details PAS"
                  labelIcon={ArrowCircleRightIcon}
                  color="#3c8039"
                  bgColor="#e6f4ea"
                  onClick={() => (location = "fundDetailsPas")}
                />

                <StyledTreeItem
                  style={{ marginLeft: "2rem" }}
                  nodeId="12"
                  labelText="IPCA Fund Details"
                  labelIcon={ArrowCircleRightIcon}
                  color="#3c8039"
                  bgColor="#e6f4ea"
                  onClick={() => (location = "purpleFundDetails")}
                />
                <StyledTreeItem
                  style={{ marginLeft: "2rem" }}
                  nodeId="13"
                  labelText="IPCA NAV"
                  labelIcon={ArrowCircleRightIcon}
                  color="#3c8039"
                  bgColor="#e6f4ea"
                  onClick={() => (location = "purpleNav")}
                />
              </StyledTreeItem>

              <StyledTreeItem
                style={{ marginLeft: "1rem" }}
                nodeId="14"
                labelText="Master Tables"
                labelIcon={PolicyIcon}
              >
                <StyledTreeItem
                  style={{ marginLeft: "2rem" }}
                  nodeId="15"
                  labelText="Mortality Rates"
                  labelIcon={ArrowCircleRightIcon}
                  color="#e3742f"
                  bgColor="#fcefe3"
                  onClick={() => (location = "mortalityRates")}
                />
                <StyledTreeItem
                  style={{ marginLeft: "2rem" }}
                  nodeId="16"
                  labelText="Medical Details"
                  labelIcon={ArrowCircleRightIcon}
                  color="#a250f5"
                  bgColor="#f3e8fd"
                  onClick={() => (location = "medicalDetails")}
                />
                <StyledTreeItem
                  style={{ marginLeft: "2rem" }}
                  nodeId="17"
                  labelText="Stamp Duty Master"
                  labelIcon={ArrowCircleRightIcon}
                  color="#3c8039"
                  bgColor="#e6f4ea"
                  onClick={() => (location = "stamDutyMaster")}
                />

                <StyledTreeItem
                  style={{ marginLeft: "2rem" }}
                  nodeId="18"
                  labelText="Mortality Flag Master"
                  labelIcon={ArrowCircleRightIcon}
                  color="#3c8039"
                  bgColor="#e6f4ea"
                  onClick={() => (location = "mortFlagMaster")}
                />
              </StyledTreeItem>

              <StyledTreeItem
                style={{ marginLeft: "1rem" }}
                nodeId="19"
                labelText="MIS"
                labelIcon={ArrowCircleRightIcon}
                color="#e3742f"
                bgColor="#fcefe3"
                onClick={() => (location = "mis")}
              />
            </StyledTreeItem>
            <StyledTreeItem
              style={{ marginLeft: "1rem" }}
              nodeId="20"
              labelText="Surrender Module"
              labelIcon={CancelScheduleSendIcon}
            >
              <StyledTreeItem
                style={{ marginLeft: "1rem" }}
                nodeId="21"
                labelText="Non ULIP"
                labelIcon={CancelScheduleSendIcon}
              >
                <StyledTreeItem
                  style={{ marginLeft: "2rem" }}
                  nodeId="22"
                  labelText="Surrender Client"
                  labelIcon={ArrowCircleRightIcon}
                  color="#3c8039"
                  bgColor="#e6f4ea"
                  onClick={() => (location = "surrenderClient")}
                />
                <StyledTreeItem
                  style={{ marginLeft: "2rem" }}
                  nodeId="23"
                  labelText="Surrender Policy"
                  labelIcon={ArrowCircleRightIcon}
                  color="#3c8039"
                  bgColor="#e6f4ea"
                  onClick={() => (location = "surrenderPolicy")}
                />
                <StyledTreeItem
                  style={{ marginLeft: "2rem" }}
                  nodeId="24"
                  labelText="Surrender Cover"
                  labelIcon={ArrowCircleRightIcon}
                  color="#3c8039"
                  bgColor="#e6f4ea"
                  onClick={() => (location = "surrenderCover")}
                />
                <StyledTreeItem
                  style={{ marginLeft: "2rem" }}
                  nodeId="25"
                  labelText="Surrender Transaction"
                  labelIcon={ArrowCircleRightIcon}
                  color="#3c8039"
                  bgColor="#e6f4ea"
                  onClick={() => (location = "surrenderTransaction")}
                />
                <StyledTreeItem
                  style={{ marginLeft: "2rem" }}
                  nodeId="26"
                  labelText="Surrender Payout Result"
                  labelIcon={ArrowCircleRightIcon}
                  color="#3c8039"
                  bgColor="#e6f4ea"
                  onClick={() => (location = "IPCASurrender")}
                />
              </StyledTreeItem>
              <StyledTreeItem
                style={{ marginLeft: "1rem" }}
                nodeId="27"
                labelText="Master Tables"
                labelIcon={PolicyIcon}
              >
                <StyledTreeItem
                  style={{ marginLeft: "2rem" }}
                  nodeId="28"
                  labelText="GSV Factor"
                  labelIcon={ArrowCircleRightIcon}
                  color="#e3742f"
                  bgColor="#fcefe3"
                  onClick={() => (location = "gsvFactor")}
                />
                <StyledTreeItem
                  style={{ marginLeft: "2rem" }}
                  nodeId="29"
                  labelText="SSV Factor"
                  labelIcon={ArrowCircleRightIcon}
                  color="#a250f5"
                  bgColor="#f3e8fd"
                  onClick={() => (location = "ssvFactor")}
                />
                <StyledTreeItem
                  style={{ marginLeft: "2rem" }}
                  nodeId="30"
                  labelText="Bonus Rates"
                  labelIcon={ArrowCircleRightIcon}
                  color="#3c8039"
                  bgColor="#e6f4ea"
                  onClick={() => (location = "bonusRate")}
                />

                <StyledTreeItem
                  style={{ marginLeft: "2rem" }}
                  nodeId="31"
                  labelText="GSV Cash Value"
                  labelIcon={ArrowCircleRightIcon}
                  color="#3c8039"
                  bgColor="#e6f4ea"
                  onClick={() => (location = "gsvCashValue")}
                />
              </StyledTreeItem>
            </StyledTreeItem>

            <StyledTreeItem
              style={{ marginLeft: "1rem" }}
              nodeId="32"
              labelText="UIN Master"
              labelIcon={ArrowCircleRightIcon}
              color="#3c8039"
              bgColor="#e6f4ea"
              onClick={() => (location = "uinMaster")}
            ></StyledTreeItem>
          </StyledTreeItem>
        </TreeView>
      </div>
      <Modal show={modal} onHide={closeModal} size="sm">
        <Modal.Header closeButton> </Modal.Header>

        <Modal.Body>
          Are you sure you want to log out ?
          <br />
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => formSubmit()}>
            {" "}
            Yes{" "}
          </Button>
          <Button variant="danger" onClick={() => closeModal()}>
            {" "}
            No{" "}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
