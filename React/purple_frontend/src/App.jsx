import { useState } from "react";
import React from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import UserLoginDetails from "./Components/LoginAndSignup/UserLoginDetails";
import Login from "./Components/LoginAndSignup/Login";
import Signup from "./Components/LoginAndSignup/Signup";
import Company from "./Components/Company/Company";
import Address from "./Components/Address/Address";
import UserGroup from "./Components/UserGroup/UserGroup";
import ContextProvider from "./Components/Contexts/StoreContext";
import Verification from "./Components/LoginAndSignup/Verification";
import ForgotPassword from "./Components/LoginAndSignup/ForgotPassword";
import NavBarBs from "./Components/NavBarBs/NavBarBs";
import { Breadcrumbs, CssBaseline } from "@mui/material";
import HomePage from "./Components/HomePage/HomePage";
import Transaction from "./Components/Transaction/Transaction";
import ClientDetailPas from "./Components/ClientDetailsPas/ClientDetailsPas";
import PolicyDetailPas from "./Components/PolicyDetailsPas/PolicyDetailsPas";
import MortalityRates from "./Components/MortalityRates/MortalityRates";
import PurpleDetails from "./Components/PurpleDetails/PurpleDetails";
import MedicalDetails from "./Components/MedicalDetails/MedicalDetails";
import CoverDetailPas from "./Components/CoverDetailPas/CoverDetailPas";
import Screen from "./Components/Screen/Screen";
import MIS from "./Components/Screen/MIS";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import QualityChecking from "./Components/Screen/QualityChecking";
import StampDutyMaster from "./Components/StamDutyMaster/StampDutyMaster";
import MortFlagMaster from "./Components/MortalityFlagMaster/MortFlagMaster";
import PurpleNav from "./Components/PurpleNav/PurpleNav";
import PurpleFundDetails from "./Components/PurpleFundDetails/PurpleFundDetails";
import FundDetailsPas from "./Components/FundDetailsPas/FundDetailsPas";
import SurrenderCoverDetails from "./Components/SurrenderCoverDetails/SurrenderCoverDetails";
import SurrenderPolicyDetails from "./Components/SurrenderPolicyDetails/SurrenderPolicyDetails";
import SurrenderTransactionPas from "./Components/SurrenderTransactionPas/SurrenderTransactionPas";
import SurrenderClientDetails from "./Components/SurrenderClientDetails/SurrenderClientDetails";
import IPCASurrender from "./Components/IPCASurrender/IPCASurrender";
import UinMaster from "./Components/UinMaster/UinMaster";
import Gsv from "./Components/Gsv/Gsv";
import SurrenderBC from "./Components/Service/SurrenderBC";
import SsvFactor from "./Components/SsvFactor/SsvFactor";
import GsvCashValue from "./Components/GsvCashValue/GsvCashValue";
import BonusRate from "./Components/BonusRate/BonusRate";

function App() {
  const { pathname } = useLocation();
  const [count, setCount] = useState(0);

  return (
    <div>
      <CssBaseline />
      <ContextProvider>
        {/* <ResponsiveAppBar /> */}
        {pathname !== "/" &&
          pathname !== "/signup" &&
          pathname !== "/verify" &&
          pathname != "/forgotPassword" && <NavBarBs />}

        {pathname !== "/" &&
          pathname !== "/signup" &&
          pathname !== "/homepage" &&
          pathname !== "/verify" &&
          pathname != "/forgotPassword" &&
          pathname != "/logindetails" &&
          pathname != "/company" &&
          pathname != "/userGroup" &&
          pathname != "/address" &&
          pathname != "/screen" &&
          pathname != "/mortalityRates" &&
          pathname != "/medicalDetails" &&
          pathname != "/surrenderPolicy" &&
          pathname != "/surrenderClient" &&
          pathname != "/surrenderCover" &&
          pathname != "/surrenderTransaction" &&
          pathname != "/IPCASurrender" &&
          pathname != "/gsvFactor" &&
          pathname != "/uinMaster" &&
          pathname != "/ssvFactor" &&
          pathname != "/gsvCashValue" &&
          pathname != "/bonusRate" && (
            <div style={{ float: "left", marginLeft: "5rem" }}>
              <Stack spacing={2}>
                <Breadcrumbs
                  separator="›"
                  aria-label="breadcrumb"
                  fontSize="medium"
                  fontWeight="bold"
                >
                  <Link href="clientDetailPas">Client</Link>
                  <Link href="policyDetailPas">Policy</Link>
                  <Link href="coverDetailPas">Cover</Link>
                  <Link href="transaction">Transaction</Link>
                  <Link href="purpleDetails">Payout Result</Link>
                  <Link href="mis">MIS</Link>
                </Breadcrumbs>
              </Stack>
            </div>
          )}

        {pathname === "/surrenderClient" && <SurrenderBC />}
        {pathname === "/surrenderPolicy" && <SurrenderBC />}
        {pathname === "/surrenderCover" && <SurrenderBC />}
        {pathname === "/surrenderTransaction" && <SurrenderBC />}
        {pathname === "/IPCASurrender" && <SurrenderBC />}
        {pathname === "/uinMaster" && <SurrenderBC />}
        {pathname === "/gsvFactor" && <SurrenderBC />}
        {pathname === "/ssvFactor" && <SurrenderBC />}
        {pathname === "/gsvCashValue" && <SurrenderBC />}
        {pathname === "/bonusRate" && <SurrenderBC />}
        <br></br>

        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/homepage" element={<HomePage />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/logindetails" element={<UserLoginDetails />} />
          <Route exact path="/company" element={<Company />} />
          <Route exact path="/address" element={<Address />} />
          <Route exact path="/userGroup" element={<UserGroup />} />
          <Route exact path="/verify" element={<Verification />} />
          <Route exact path="/forgotPassword" element={<ForgotPassword />} />
          <Route exact path="/transaction" element={<Transaction />} />
          <Route exact path="/clientDetailPas" element={<ClientDetailPas />} />
          <Route exact path="/policyDetailPas" element={<PolicyDetailPas />} />
          <Route exact path="/coverDetailPas" element={<CoverDetailPas />} />
          <Route exact path="/purpleDetails" element={<PurpleDetails />} />
          <Route exact path="/medicalDetails" element={<MedicalDetails />} />
          <Route exact path="/mortalityRates" element={<MortalityRates />} />
          <Route exact path="/screen" element={<Screen />} />
          <Route exact path="/mis" element={<MIS />} />
          <Route exact path="/qualityChecking" element={<QualityChecking />} />
          <Route exact path="/stamDutyMaster" element={<StampDutyMaster />} />
          <Route exact path="/mortFlagMaster" element={<MortFlagMaster />} />
          <Route exact path="/fundDetailsPas" element={<FundDetailsPas />} />
          <Route exact path="/purpleNav" element={<PurpleNav />} />
          <Route
            exact
            path="/purpleFundDetails"
            element={<PurpleFundDetails />}
          />
          <Route
            exact
            path="/surrenderClient"
            element={<SurrenderClientDetails />}
          />
          <Route
            exact
            path="/surrenderPolicy"
            element={<SurrenderPolicyDetails />}
          />
          <Route
            exact
            path="/surrenderCover"
            element={<SurrenderCoverDetails />}
          />
          <Route
            exact
            path="/surrenderTransaction"
            element={<SurrenderTransactionPas />}
          />
          <Route exact path="/IPCASurrender" element={<IPCASurrender />} />

          <Route exact path="/uinMaster" element={<UinMaster />} />
          <Route exact path="/gsvFactor" element={<Gsv />} />
          <Route exact path="/ssvFactor" element={<SsvFactor />} />
          <Route exact path="/gsvCashValue" element={<GsvCashValue />} />
          <Route exact path="/bonusRate" element={<BonusRate />} />

          {/* <Route exact path="/edituser" element={<UserDetailsEdit />} />  */}
        </Routes>
      </ContextProvider>
    </div>
  );
}

export default App;
