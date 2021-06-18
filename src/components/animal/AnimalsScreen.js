import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  animalsByTypeLoading,
  animalsByStatusLoading,
  animalsByStatusAndTypeLoading,
  regMilk,
  regWeight,
  typeClearActive,
  typeSetActive,
  TypesLoading,
  animalSetActive,
  searchSetActive,
  animalClearActive,
  changeStatus,
  deleteRegisterWeight,
  deleteRegisterMilk,
  deleteRegisterCalving
} from '../../actions/AnimalAction';
import Swal from 'sweetalert2';
import { uiOpenModalAnimal } from '../../actions/UIAction';
import { Link } from 'react-router-dom';
import { ModalAnimal } from './ModalAnimal';
import moment from 'moment';
import UploadImgProfile from './UploadImgProfile';
import RegisterCalving from './RegisterCalving';
import ChangeNextDueDate from './ChangeNextDueDate';

import MaterialTable from 'material-table';
import { TableIcons, TableLocalization, TableOptions } from '../../helpers/TableInit';

import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import PostAddIcon from '@material-ui/icons/PostAdd';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export const AnimalsScreen = () => {
  const dispatch = useDispatch();

  const { animals, animalsTypes, currentType } = useSelector((state) => state.animal);

  useEffect(() => {
    dispatch(TypesLoading());
    dispatch(animalsByTypeLoading());
  }, [dispatch]);

  const registerMilk = async (animalID) => {
    const { value: formValues } = await Swal.fire({
      title: 'Registrar litros de leche',
      html:
        ` <label className="text-gray-700 text-bold">Litros</label>` +
        '<input id="swal-inputMilk" class="swal2-input">',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, registrar',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        return document.getElementById('swal-inputMilk').value;
      }
    });

    if (formValues) {
      dispatch(regMilk(animalID, formValues, moment(new Date()).format('YYYY-MM-DD')));
    }
  };

  const registerWeight = async (animalID) => {
    const { value: formValues } = await Swal.fire({
      title: 'Registrar peso',
      html:
        ` <label className="text-gray-700 text-bold">Peso</label> <br/>` +
        '<input id="swal-input1Weight" type="number" class="swal2-input"> <br/>' +
        ` <label className="text-gray-700 text-bold">Observaciones</label> <br/>` +
        '<input id="swal-inputObs" type="textarea" class="swal2-input">',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, registrar',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1Weight').value,
          document.getElementById('swal-inputObs').value
        ];
      }
    });

    if (formValues) {
      dispatch(regWeight(animalID, formValues, moment(new Date()).format('YYYY-MM-DD')));
    }
  };

  const regAnimal = () => {
    dispatch(typeClearActive());
    dispatch(animalClearActive());
    dispatch(uiOpenModalAnimal());
  };

  const editAnimal = (animal) => {
    dispatch(typeSetActive(animal.type._id));
    animal.daughter_of && dispatch(searchSetActive(animal.daughter_of));
    dispatch(animalSetActive(animal));
    dispatch(uiOpenModalAnimal());
  };

  const setTypeActive = (typeID) => {
    dispatch(typeClearActive);
    dispatch(typeSetActive(typeID));
    dispatch(animalsByTypeLoading(typeID));
  };

  const oneDeleteWeight = (animalId, weightId) => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'El peso no se podra recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#A0A0A0',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        dispatch(deleteRegisterWeight(animalId, weightId));
      }
    });
  };

  const oneDeleteMilk = (animalId, milkId) => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'El registro de leche no se podra recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#A0A0A0',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        dispatch(deleteRegisterMilk(animalId, milkId));
      }
    });
  };

  const oneDeleteCalving = (animalId, calvingId) => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'El parto no se podra recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#A0A0A0',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        dispatch(deleteRegisterCalving(animalId, calvingId));
      }
    });
  };

  return (
    <>
      <div className="container px-4 py-4 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <Link
          to="/herramientas"
          className="inline-flex justify-center items-center px-1 rounded-lg"
        >
          <i className="fas fa-arrow-circle-left text-blue-600 text-2xl hover:text-blue-800 "></i>
          <span className="text-xl text-blue-600 hover:underline ml-1">Herramientas</span>
        </Link>

        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center md:flex md:space-x-4 space-y-2 md:space-y-0">
          <Link
            to="/ganado-detallado"
            className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
            type="button"
            style={{ transition: 'all .15s ease' }}
          >
            Cambiar vista
          </Link>
          <button
            className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
            type="button"
            style={{ transition: 'all .15s ease' }}
            onClick={() => regAnimal()}
          >
            Registrar
          </button>
          <Link
            to="/tipos-de-ganado"
            className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
            type="button"
            style={{ transition: 'all .15s ease' }}
          >
            Tipos
          </Link>

          <button
            onClick={() =>
              dispatch(
                currentType
                  ? animalsByStatusAndTypeLoading(currentType._id, 'FINCA')
                  : animalsByStatusLoading('FINCA')
              )
            }
            className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
            style={{ transition: 'all .15s ease' }}
          >
            <span>En finca</span>
          </button>

          <button
            onClick={() =>
              dispatch(
                currentType
                  ? animalsByStatusAndTypeLoading(currentType._id, 'ELIMINADO')
                  : animalsByStatusLoading('ELIMINADO')
              )
            }
            className="bg-green-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-4 py-2 rounded-2xl shadow transform hover:scale-110 motion-reduce:transform-none mr-1 mb-1"
            style={{ transition: 'all .15s ease' }}
          >
            <span>De baja</span>
          </button>

        </nav>
        <Link to="/dietas" className="inline-flex justify-center items-center px-1 rounded-lg">
          <span className="text-xl text-blue-600 hover:underline mr-1"> Dietas</span>
          <i className="fas fa-arrow-circle-right text-blue-600 text-2xl hover:text-blue-800"></i>
        </Link>
      </div>

      <div className="flex flex-col text-center w-full mt-4 mb-4">
        <h2 className="text-sm text-green-500 tracking-widest font-medium title-font mb-1">
          Listar por:
        </h2>

        <div>
          <select
            onChange={(e) => setTypeActive(e.target.value)}
            name="types"
            className="bg-gray-200 text-gray-900 font-semibold  py-1 px-1 rounded-lg inline-flex  group-hover:bg-green-700 group-hover:text-white uppercase"
          >
            {animalsTypes.map((option) => (
              <option
                key={option._id}
                value={option._id}
                className="bg-gray-300 text-gray-700 font-semibold"
              >
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <MaterialTable
        title="GANADO"
        icons={TableIcons}
        localization={TableLocalization}
        columns={[
          { title: 'Placa', field: 'plate_number', editable: 'never' },

          {
            title: 'Color',
            field: 'plate_color',
            editable: 'never',
            render: (rowData) => (
              <span
                className={`bg-gray-200 rounded-full px-3 py-1 mt-2 mb-2 inline-block text-center`}
                style={{ color: rowData.plate_color }}
              >
                <i className="fas fa-tint"></i>
              </span>
            )
          },
          {
            title: 'Estado',
            field: 'status',
            lookup: { FINCA: 'FINCA', ELIMINADO: 'ELIMINADO', SUBASTA: 'SUBASTA' }
          },
          { title: 'Categoría', field: 'type.name', editable: 'never' },
          { title: 'Ingreso', field: 'date_admission', type: 'date', editable: 'never' },
          {
            title: 'Peso inicial(KG)',
            field: 'starting_weight',
            editable: 'never',
            type: 'numeric'
          },
          { title: 'Raza', field: 'race', editable: 'never' },
          { title: 'Nombre', field: 'name', editable: 'never' },
          {
            title: 'Madre',
            field: 'daughter_of.plate_number',
            editable: 'never',
            render: (rowData) => (
              <>
                {rowData.daughter_of ? (
                  <span>{rowData.daughter_of.plate_number}</span>
                ) : (
                  <i className="fas fa-ban"></i>
                )}
              </>
            )
          },
          {
            title: 'Registro',
            field: '',
            editable: 'never',
            render: (rowData) => (
              <>
                {rowData.photo_register ? (
                  <a className="ml-auto mr-2 hover:underline" href={rowData.photo_register}>
                    <i className="fas fa-cloud-download-alt"></i>
                  </a>
                ) : (
                  <i className="fas fa-ban"></i>
                )}
              </>
            )
          },
          {
            title: 'Prx parto',
            field: 'next_due_date',
            editable: 'never',
            render: (rowData) => (
              <>
                {rowData.next_due_date ? (
                  <>
                    <span className="whitespace-nowrap">
                      {rowData.next_due_date} <ChangeNextDueDate animal={rowData} />
                    </span>
                  </>
                ) : (
                  <i className="fas fa-ban"></i>
                )}
              </>
            )
          },
          { title: 'Edad', field: 'age', editable: 'never' },
          { title: 'Origen', field: 'place_origin', editable: 'never' }
        ]}
        data={animals}
        cellEditable={{
          onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
            return new Promise((resolve, reject) => {
              dispatch(changeStatus(rowData._id, newValue));
              setTimeout(resolve, 1000);
            });
          }
        }}
        actions={[
          (rowData) => ({
            icon: EditIcon,
            tooltip: 'Editar datos',
            hidden: rowData.status === 'INACTIVO',
            onClick: (event) => editAnimal(rowData)
          })
        ]}
        detailPanel={[
          (rowData) => ({
            icon: VisibilityIcon,
            tooltip: 'Ver imagen',
            render: (rowData) => {
              return <UploadImgProfile animal={rowData} />;
            }
          }),
          (rowData) => ({
            icon: FitnessCenterIcon,
            tooltip: 'Registro de peso',
            render: (rowData) => {
              return (
                <>
                  <button
                    onClick={() => registerWeight(rowData._id)}
                    className="bg-blue-500 text-white font-bold uppercase text-sm px-4 py-2 rounded-2xl hover:bg-blue-400 mr-1 mb-1"
                    type="button"
                    style={{ transition: 'all .15s ease' }}
                  >
                    Registrar peso
                  </button>
                  <MaterialTable
                    title="PESOS REGISTRADOS"
                    icons={TableIcons}
                    localization={TableLocalization}
                    columns={[
                      { title: 'Fecha', field: 'date', type: 'date' },
                      { title: 'Peso', field: 'weight' },
                      { title: 'Observaciones', field: 'observations' }
                    ]}
                    data={rowData.weight}
                    actions={[
                      {
                        icon: DeleteForeverIcon,
                        tooltip: 'Eliminar registro',
                        onClick: (event, rowData2) => oneDeleteWeight(rowData._id, rowData2._id)
                      }
                    ]}
                    options={{
                      headerStyle: { background: 'black', color: 'white' },
                      rowStyle: {
                        color: '#1F3A8A'
                      },
                      pageSizeOptions: [5, 10, 30, 50, 100],
                      pageSize: 5,
                      exportButton: true
                    }}
                  />
                </>
              );
            }
          }),
          (rowData) => ({
            icon: ImportContactsIcon,
            tooltip: 'Registro de leche',
            hidden: rowData.type.gender === 'Macho',
            render: (rowData) => {
              return rowData.type.gender === 'Hembra' ? (
                <>
                  <button
                    onClick={() => registerMilk(rowData._id)}
                    className="bg-blue-500 text-white font-bold uppercase text-sm px-4 py-2 rounded-2xl hover:bg-blue-400 mr-1 mb-1"
                    type="button"
                    style={{ transition: 'all .15s ease' }}
                  >
                    Registrar litros
                  </button>
                  <MaterialTable
                    title="REGISTRO DE LECHE"
                    icons={TableIcons}
                    localization={TableLocalization}
                    columns={[
                      { title: 'Fecha de registro', field: 'registration_date', type: 'date' },
                      { title: 'Litros', field: 'liters' }
                    ]}
                    data={rowData.milk}
                    actions={[
                      {
                        icon: DeleteForeverIcon,
                        tooltip: 'Eliminar registro',
                        onClick: (event, rowData2) => oneDeleteMilk(rowData._id, rowData2._id)
                      }
                    ]}
                    options={{
                      headerStyle: { background: 'black', color: 'white' },
                      rowStyle: {
                        color: '#1F3A8A'
                      },
                      pageSizeOptions: [5, 10, 30, 50, 100],
                      pageSize: 5,
                      exportButton: true
                    }}
                  />
                </>
              ) : (
                <span className="ml-2 text-gray-400 whitespace-nowrap italic">
                  - ( No valido ) -
                </span>
              );
            }
          }),
          (rowData) => ({
            icon: PostAddIcon,
            tooltip: 'Registro de partos',
            hidden: rowData.type.gender === 'Macho',
            render: (rowData) => {
              return rowData.type.gender === 'Hembra' ? (
                <>
                  <RegisterCalving currentAnimal={rowData} />
                  <MaterialTable
                    title="REGISTRO DE PARTOS"
                    icons={TableIcons}
                    localization={TableLocalization}
                    columns={[
                      { title: 'Fecha de registro', field: 'date', type: 'date' },
                      { title: 'Complicaciones', field: 'complications' }
                    ]}
                    data={rowData.calving}
                    actions={[
                      {
                        icon: DeleteForeverIcon,
                        tooltip: 'Eliminar registro',
                        onClick: (event, rowData2) => oneDeleteCalving(rowData._id, rowData2._id)
                      }
                    ]}
                    options={{
                      headerStyle: { background: 'black', color: 'white' },
                      rowStyle: {
                        color: '#1F3A8A'
                      },
                      pageSizeOptions: [5, 10, 30, 50, 100],
                      pageSize: 5,
                      exportButton: true
                    }}
                  />
                </>
              ) : (
                <span className="ml-2 text-gray-400 whitespace-nowrap italic">
                  - ( No valido ) -
                </span>
              );
            }
          })
        ]}
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
        options={TableOptions}
      />

      <ModalAnimal />
    </>
  );
};
