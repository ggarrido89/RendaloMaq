import React, { Fragment, useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { Container, TextField } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';


export default function MaqTable() {
    const [maqList, setMaqList] = useState([]);
    const [maq, setMaq] = useState({});
    const [msg,setMsg]=useState("");
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const res = await axios.get(
            'http://localhost:3000/maq',
        );
        const { data } = res;
        setMaqList(data);
    }
    const save = (e) => {
        if (maq._id) {
            axios.put(`http://localhost:3000/maq/${maq._id}`, maq)
                .then(res => {
                    loadData();
                    setMsg("GUARDADO CORRECTAMENTE")
                    setOpen(true);
                })
                .catch(err => console.log(err));

        } else {
            axios.post(`http://localhost:3000/maq`, maq)
                .then(res => {
                    loadData();
                    setMsg("GUARDADO CORRECTAMENTE")
                    setOpen(true);
                })
                .catch(err => console.log(err));
        }
        setMaq({});
        e.preventDefault();
    }
    const deleteMaq = (maqId) => {
        if (window.confirm("el equipo se eliminará de forma permanente. Desea Continuar?")) {
            axios.delete(`http://localhost:3000/maq/${maqId}`, maq)
                .then(res => {
                    loadData();
                    setMsg("ELIMINADO CORRECTAMENTE")
                    setOpen(true);
                })
                .catch(err => console.log(err));
        }
    }
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMaq({ ...maq, [name]: value });
    }

    return (
        <Container maxWidth="lg">
                <Grid container spacing={3} direction="row" >
                    {!maq._id ? (
                        <Fragment>
                            <Grid item xs={12} sm={3}>
                                <TextField id="outlined-basic" /* variant="outlined" */ size="small" onChange={handleChange} fullWidth name="marca" value={maq.marca} label="Marca"   />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField id="outlined-basic" /* variant="outlined" */ size="small" onChange={handleChange} fullWidth name="modelo" value={maq.modelo} label="Modelo"   />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField id="outlined-basic" /* variant="outlined" */ size="small" onChange={handleChange} fullWidth name="tipo" value={maq.tipo} label="Tipo"   />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <TextField id="outlined-basic" /* variant="outlined" */ size="small" onChange={handleChange} fullWidth name="patente" value={maq.patente} label="Patente"   />
                            </Grid>
                        </Fragment>
                    ) : (
                            <Fragment>
                                <Grid item xs={12} sm={3}>
                                    <TextField id="outlined-basic" /* variant="outlined" */ size="small" onChange={handleChange} fullWidth name="horometro" value={maq.horometro} type="number" label="Horómetro"   />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField id="outlined-basic" /* variant="outlined" */ size="small" onChange={handleChange} fullWidth name="estado" value={maq.estado} label="Estado"   />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField id="outlined-basic" /* variant="outlined" */ size="small" onChange={handleChange} fullWidth name="mantencion" value={maq.mantencion} type="number" label="Última Mantención"   />
                                </Grid>
                            </Fragment>
                        )}
                    <Grid item xs={12} sm>
                        <IconButton size="small" color="primary" aria-label="save data" onClick={save}>
                            <SaveIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" aria-label="clear data" onClick={() => setMaq({})}>
                            <ClearAllIcon fontSize="small" />
                        </IconButton>
                    </Grid>
                </Grid>
            <h3>Equipos Disponibles</h3>
            {maqList.length ? (
                <TableContainer component={Paper}>
                    <Table aria-label="custom pagination table">
                        <TableBody>
                            {maqList.map((maqData, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        {maqData.marca}
                                    </TableCell>
                                    <TableCell align="right">
                                        {maqData.modelo}
                                    </TableCell>
                                    <TableCell align="right">
                                        {maqData.estado}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small" aria-label="edit data" onClick={() => setMaq(maqData)}>
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small" color="secondary" aria-label="delete data" onClick={() => deleteMaq(maqData._id)}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : null}
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                message={msg}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </Container>
    );
}
