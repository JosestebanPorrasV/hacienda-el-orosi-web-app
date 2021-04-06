import React from "react";
import { Page, Document, Image, StyleSheet } from "@react-pdf/renderer";
import ContractNumber from "./ContractNumber";
import Information from "../../reports/Information";
import ReportThankYouMsg from "../../reports/ReportThankYouMsg";
import ReportTitle from "../../reports/ReportTitle";

import logo from "../../../assets/mainLogo.png";
import Firms from "../../reports/Firms";
import ContractItemsTable from "./ContractItemsTable";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: 90,
    height: 150,
  },
});

const ContractPDF = ({ contract }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image style={styles.logo} src={logo} />
      <ReportTitle title={"Contrato"} />
      <ContractNumber contract={contract} />
      <Information />
      <ContractItemsTable contract={contract} />

      <Firms />
      <ReportThankYouMsg />
    </Page>
  </Document>
);

export default ContractPDF;
