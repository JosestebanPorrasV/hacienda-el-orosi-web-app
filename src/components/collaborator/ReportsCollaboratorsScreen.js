import React, { Fragment } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { useSelector } from "react-redux";

import {
  Page,
  Document,
  Image,
  StyleSheet,
  View,
  Text,
} from "@react-pdf/renderer";
import ReportTitle from "../reports/ReportTitle";
import logo from "../../assets/mainLogo.png";

const borderColor = "#064e3b";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: 100,
    height: 150,
  },
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 1,
    borderColor: "#064e3b",
  },

  container: {
    flexDirection: "row",
    borderBottomColor: "#064e3b",
    backgroundColor: "#064e3b",
    color: "#FFFFFF",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
  },
  row: {
    flexDirection: "row",
    borderBottomColor: "#064e3b",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
  },
  titleContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  reportTitle: {
    fontSize: 10,
    textAlign: "center",
    textTransform: "uppercase",
  },
  name: {
    width: "16%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  surname: {
    width: "16%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  document_id: {
    width: "16%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  date_admission: {
    width: "16%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  dispatch_date: {
    width: "16%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  job: {
    width: "16%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
});

export const ReportsCollaboratorScreen = () => {
  const { collaborators, collaboratorsState } = useSelector(
    (state) => state.collaborator
  );

  let dateNow = new Date();
  return (
    <div>
      <Fragment>
        <PDFViewer className="w-full h-screen">
          <Document>
            <Page size="A4" style={styles.page}>
              <Image style={styles.logo} src={logo} />
              <View style={styles.titleContainer}>
                <Text style={styles.reportTitle}>
                  {"Fecha actual: " +
                    dateNow.getDate() +
                    "-" +
                    (dateNow.getMonth() + 1) +
                    "-" +
                    dateNow.getFullYear()}
                </Text>
              </View>
              <ReportTitle
                title={`Reporte de colaboradores ${
                  collaboratorsState === "Activo" ? "activos" : "Inactivos"
                }`}
              />

              <View style={styles.tableContainer}>
                <View style={styles.container}>
                  <Text style={styles.name}>Nombre</Text>
                  <Text style={styles.surname}>Apellido </Text>
                  <Text style={styles.document_id}>Cedula</Text>
                  <Text style={styles.job}>Trabajo</Text>
                  <Text style={styles.date_admission}>Inicio </Text>
                  <Text style={styles.dispatch_date}>Finaliza</Text>
                </View>
                {collaborators.map((collaborator) => (
                  <View style={styles.row} key={collaborator.document_id}>
                    <Text style={styles.name}>{collaborator.name}</Text>
                    <Text style={styles.surname}>{collaborator.surname}</Text>
                    <Text style={styles.document_id}>
                      {collaborator.document_id}
                    </Text>
                    <Text style={styles.job}>{collaborator.job.name}</Text>
                    <Text style={styles.document_id}>
                      {collaborator.date_admission}
                    </Text>
                    <Text style={styles.dispatch_date}>
                      {collaborator.dispatch_date}
                    </Text>
                  </View>
                ))}
              </View>
            </Page>
          </Document>
        </PDFViewer>
      </Fragment>
    </div>
  );
};
