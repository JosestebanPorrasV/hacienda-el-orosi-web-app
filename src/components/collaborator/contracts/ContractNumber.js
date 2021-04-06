import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  contractNoContainer: {
    flexDirection: "row",
    marginTop: 10,
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
    width: 60,
  },
});

const ContractNumber = ({ contract }) => (
  <Fragment>
    <View style={styles.contractNoContainer}>
      <Text style={styles.label}>Contrato:</Text>
      <Text
        style={styles.contractDate}
      >{`No_  ${contract.contract_number}`}</Text>
    </View>
    <View style={styles.contractDateContainer}>
      <Text style={styles.label}>Fecha: </Text>
      <Text>{contract.date_admission}</Text>
    </View>
  </Fragment>
);

export default ContractNumber;
