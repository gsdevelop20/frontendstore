import * as React from 'react';
import { styled } from '@mui/material/styles';
import { DataGrid, GridColDef, GridRowsProp, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import { Select, MenuItem } from '@mui/material';
import { ptBR } from '@mui/x-data-grid/locales';
import { useEffect, useState } from "react"
import API from "../../api";

interface dataprops {
    ordernumber: number
    productname: string,
    productcategory: string,
    quantity: string,
    subtotal: string,
    paymentstatus: string,
    orderdate: string
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

export function ReportOrder() {
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
            width: 180,
            editable: false,
        },
        {
            field: 'salequantity',
            headerName: 'Quantidade',
            type: 'number',
            width: 120,
            editable: false,
        },
        {
            field: 'subtotal',
            headerName: 'Total (R$)',
            type: 'number',
            width: 130,
            editable: false,
        },
        {
            field: 'paymentstatus',
            headerName: 'Estatus do pedido',
            width: 300,
            renderCell: (params: GridRenderCellParams) => (
                <Select
                    value={params.value}
                    onChange={(event) => handleSelectChange(params.id as number, event.target.value as string)}
                    fullWidth
                >
                    <MenuItem value="PAGAMENTO PENDENTE">PAGAMENTO PENDENTE</MenuItem>
                    <MenuItem value="CONCLUÍDO">CONCLUÍDO</MenuItem>
                </Select>
            ),
        },
        {
            field: 'orderdate',
            headerName: 'Data do pedido',
            type: 'string',
            width: 180,
            editable: false,
        },

    ];

    const handleSelectChange = (id: number, value: string) => {
        // Atualizar os dados da linha correspondente
        const rowToUpdate = row.find(row => row.id === id);
        if (rowToUpdate) {
            rowToUpdate.paymentstatus = value;

            let status = ''
            if(value == 'PAGAMENTO PENDENTE'){
                status = 'pendent'
            }else if(value == 'CONCLUÍDO'){
                status = 'finished'
            }

            updatePaymentStatus(id, status)
            update_report()
            console.log(`Row ${id} updated to ${value}`);
        }
    };


    function update_report(){
        API.orderReport(userid)
            .then(Response => Response.json())
            .then((data: dataprops[]) => {

                console.log(data)
                var columnsdata: GridRowsProp[] = []

                data.map((item) => (
                    columnsdata.push({
                        id: item.ordernumber,
                        productname: item.productname.toUpperCase(),
                        productcategory: item.productcategory.toUpperCase(),
                        salequantity: item.quantity,
                        subtotal: item.subtotal,
                        paymentstatus: item.paymentstatus,
                        orderdate: item.orderdate,
                    })
                ))

                setRow(columnsdata)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function updatePaymentStatus(rowid: number, status: string){
        API.updateStatus(rowid, status)
    }

    useEffect(() => {
        update_report()
    }, [])

    return (
        <div className='container mx-auto mt-32 bg-white p-10'>
            <h1 className='mb-4 font-bold'>Relatório de pedidos</h1>
            <StyledBox>
                <DataGrid slots={{ toolbar: GridToolbar }}  density="comfortable" localeText={ptBR.components.MuiDataGrid.defaultProps.localeText} rows={row} columns={columns} editMode="row" />
            </StyledBox>
        </div>
    );
}