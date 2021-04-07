import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  contractNoContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  contractDateContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  contractDate: {
    fontSize: 12,
    fontStyle: "bold",
  },
  label: {
    width: 120,
  },
});

const ContractNumber = ({ contract }) => (
  <Fragment>
    <View style={styles.contractNoContainer}>
      <Text style={styles.label}>Contrato:</Text>
      <Text
        style={styles.contractDate}
      >{`     ${contract.contract_number}`}</Text>
    </View>
    <View style={styles.contractDateContainer}>
      <Text style={styles.label}>Fecha inicial: </Text>
      <Text>{contract.date_admission}</Text>
    </View>
    <View style={styles.contractDateContainer}>
      <Text style={styles.label}>Fecha de expiracion: </Text>
      <Text>{contract.dispatch_date}</Text>
    </View>
  </Fragment>
);

export default ContractNumber;
