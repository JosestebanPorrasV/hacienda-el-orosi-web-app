import React, { Fragment } from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import ContractPDF from "./ContractPDF";
import { useSelector } from "react-redux";
export const Contract = () => {
  const { currentCollaborator } = useSelector((state) => state.collaborator);

  return (
    <div>

<PDFDownloadLink document={<ContractPDF contract={currentCollaborator}  />} fileName={`Contrato_No:${currentCollaborator.contract_number }` }>
  {({ blob, url, loading, error }) => (loading ? 'Cargando documento...' : 'Descargar ahora!')}
</PDFDownloadLink>

      <Fragment>
        <PDFViewer className="w-full h-screen">
          <ContractPDF contract={currentCollaborator} />
        </PDFViewer>
      </Fragment>
    </div>
  );
};
