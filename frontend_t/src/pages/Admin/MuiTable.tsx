import Box from '@mui/material/Box';
import {
  DataGrid,
  GridApi,
  GridColDef,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import {
  DataGridPro,
  GridActionsCellItem,
  GridColumns,
  GridEventListener,
  GridRenderCellParams,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
  GridRowsProp,
  GridToolbarContainer,
  MuiEvent,
} from '@mui/x-data-grid-pro';
import React, { useState } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import Client from '../../services/types';

interface Props {
  allClients: Client[];
}

export default function MuiTable({ allClients }: Props) {
  const handleClick = (cellValues: Client) => {
    navigate(`/EditClient/${cellValues.id}`);
  };
  const navigate = useNavigate();

  const columns: GridColumns = [
    {
      field: 'pc_name',
      headerName: 'Client Name',
      width: 300,
    },
    {
      field: 'ip_address',
      headerName: 'IP-Adresse',
      width: 200,
    },
    {
      field: 'is_expo_client',
      headerName: 'AusstellungsClient',
      type: 'boolean',
      width: 200,
    },

    {
      field: 'Bearbeiten',
      width: 200,
      renderCell: (cellValues) => {
        return (
          <button
            className="btn btn-link"
            onClick={(event) => {
              handleClick(cellValues.row);
            }}
          >
            <BiEditAlt size="2.5em" />
          </button>
        );
      },
    },
  ];

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={allClients}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </Box>
  );
}
