import React from "react";
import ScanningActivity from "../../components/dashboard/scanning-activity";
import TopTanVictimHost from "../../components/dashboard/top-tan-victim-host";
import ScanningActivityByCountry from "../../components/dashboard/scanning-ctivity-by-country";
import SignatureSource from "../../components/dashboard/signature-source";
import AllowedIntrusionAttempts from "../../components/dashboard/allowed-intrusion-attempts";
import BlockedIntrusionAttempts from "../../components/dashboard/blocked-intrusion-attempts";
import CriticalSeverityAlerts from "../../components/dashboard/critical-severity-alerts";
import HighServerityAlerts from "../../components/dashboard/high-serverity-alerts";
import MediumSeverityAlerts from "../../components/dashboard/medium-severity-alerts";
import LowServerityAlerts from "../../components/dashboard/low-severity-alerts";
import InformationalServerityAlerts from "../../components/dashboard/informational-severity-alerts";

const Dashboard: React.FC = () => {
  return (
    <div>
      <BlockedIntrusionAttempts />
      {/* <AllowedIntrusionAttempts />
      <CriticalSeverityAlerts />
      <HighServerityAlerts />
      <MediumSeverityAlerts />
      <LowServerityAlerts />
      <InformationalServerityAlerts />
      <ScanningActivity />
      <TopTanVictimHost />
      <ScanningActivityByCountry />
      <SignatureSource /> */}
    </div>
  );
};
export default Dashboard;
