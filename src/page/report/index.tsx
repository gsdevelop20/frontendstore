import * as React from 'react';
import { styled } from '@mui/material/styles';
import { DataGrid, GridColDef, GridRowsProp, GridToolbar} from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
import { useEffect, useState } from "react"
import API from "../../api";

interface dataprops {
  productid: number
  productname: string,
  productcategory: string,
  quantity: string,
  total: string
}

const StyledBox = styled('div')(({ theme }) => ({
  
  width: '100%',
  '& .MuiDataGrid-cell--editing': {
    backgroundColor: 'rgb(255,215,115, 0.19)',
    color: '#1a3e72',
    '& .MuiInputBase-root': {
      height: '100%',
    },
  },
  '& .Mui-error': {
    backgroundColor: `rgb(126,10,15, ${theme.palette.mode === 'dark' ? 0 : 0.1})`,
    color: theme.palette.error.main,
  },
}));

export function Report() {
  const [row, setRow] = useState<GridRowsProp[]>([])
  var userid: String = localStorage.getItem("userid") ?? '0'
  
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50, type: 'number', },
    {
      field: 'productname',
      headerName: 'Produto',
      type: 'string',
      width: 580,
      editable: false,
    },
    {
      field: 'productcategory',
      headerName: 'Categoria',
      type: 'string',
      width: 320,
      editable: false,
    },
    {
      field: 'salequantity',
      headerName: 'Quantidade de vendas',
      type: 'number',
      width: 180,
      editable: false,
    },
    {
      field: 'total',
      headerName: 'Total (R$)',
      type: 'number',
      width: 180,
      editable: false,
    },
  ];

  useEffect(() => {
    API.seleReport(userid)
      .then(Response => Response.json())
      .then((data: dataprops[]) => {
  
        console.log(data)
        var columnsdata: GridRowsProp[] = []

        data.map((item) => (
          columnsdata.push({
            id: item.productid,
            productname: item.productname.toUpperCase(),
            productcategory: item.productcategory.toUpperCase(),
            salequantity: item.quantity,
            total: item.total
          })
        ))
  
        setRow(columnsdata)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className='container mx-auto mt-32 bg-white p-10'>
      <h1 className='mb-4 font-bold'>Relatório de vendas</h1>
      <StyledBox>
        <DataGrid slots={{ toolbar: GridToolbar }} density="comfortable" localeText={ptBR.components.MuiDataGrid.defaultProps.localeText} rows={row} columns={columns} editMode="row" />
      </StyledBox>
    </div>
  );
}