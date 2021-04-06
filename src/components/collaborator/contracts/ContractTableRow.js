import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
  },
  key: {
    width: "50%",
    textAlign: "left",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8,
  },
  value: {
    width: "50%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
  },
});

const ContractTableRow = ({ type, contract }) => {
  return (
    <Fragment>
      {type === "Collaborator" && (
        <>
          <View style={styles.row}>
            <Text style={styles.key}>Nombre</Text>
            <Text
              style={styles.value}
            >{`${contract.name} ${contract.surname}`}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>Cedula</Text>
            <Text style={styles.value}>{contract.document_id}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>Nacionalidad</Text>
            <Text style={styles.value}>{contract.nationality}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>Dirección</Text>
            <Text style={styles.value}>{contract.direction}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>Numero Telefono #1</Text>
            <Text style={styles.value}>{contract.tel}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>Numero Telefono #2</Text>
            <Text style={styles.value}>{contract.cel}</Text>
          </View>
        </>
      )}
      {type === "Job" && (
        <>
          <View style={styles.row}>
            <Text style={styles.key}>Nombre</Text>
            <Text style={styles.value}>{contract.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>Descripcion</Text>
            <Text style={styles.value}>{contract.description}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>Horas de trabajo al dia</Text>
            <Text style={styles.value}>{contract.work_hours}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>Precio del dia</Text>
            <Text style={styles.value}>
              {new Intl.NumberFormat("en-EN").format(contract.price_day)} Colones
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>Precio de la hora exra</Text>
            <Text style={styles.value}>
              {new Intl.NumberFormat("en-EN").format(
                contract.price_extra_hours
              )} Colones
            </Text>
          </View>
        </>
      )}
    </Fragment>
  );
};

export default ContractTableRow;
