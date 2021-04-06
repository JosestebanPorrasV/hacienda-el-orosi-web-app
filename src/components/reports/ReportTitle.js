import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
   
    titleContainer:{
        flexDirection: 'row',
        marginTop: 1,
    },
    reportTitle:{
        color: '#065f46',
        letterSpacing: 4,
        fontSize: 15,
        textAlign: 'center',
        textTransform: 'uppercase',
    }
  });


  const ReportTitle = ({title}) => (
    <View style={styles.titleContainer}>
        <Text style={styles.reportTitle}>{title}</Text>
    </View>
  );
  
  export default ReportTitle