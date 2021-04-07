import React, { Fragment } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import ContractPDF from "./ContractPDF";
import { useSelector } from "react-redux";
export const Contract = () => {
  const { currentCollaborator } = useSelector((state) => state.collaborator);

  return (
    <div>
      <Fragment>
        <PDFViewer className="w-full h-screen">
          <ContractPDF contract={currentCollaborator} />
        </PDFViewer>
      </Fragment>
    </div>
  );
};
