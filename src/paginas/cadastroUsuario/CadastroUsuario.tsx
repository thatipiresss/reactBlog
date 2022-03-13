import React, {useState, useEffect, ChangeEvent} from 'react';
import {useHistory} from 'react-router-dom';
import User from '../../models/User';
import { cadastroUsuario } from '../../services/Service';
import './CadastroUsuario.css';
import Container from '@mui/material/Container';
import { Grid, Box, Typography, Button, TextField } from '@material-ui/core';
import {Link } from 'react-router-dom';
import {toast} from 'react-toastify';


function CadastroUsuario(){
    let history = useHistory();
    const [confirmarSenha, setConfirmarSenha] = useState<String>("")
    const [user, setUser] = useState<User>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
        })

    const [userResult, setUserResult] = useState<User>(
        {
            id: 0,
            nome: '',
            usuario:'',
            senha:'',
        })
    
    useEffect(() =>{
        if(userResult.id != 0){
            history.push("/login")

        }
    }, [userResult])

    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>){
        setConfirmarSenha(e.target.value)
    }

    function updatedModel(e: ChangeEvent<HTMLInputElement>){

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    async function onSubmit(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault()
        if(confirmarSenha == user.senha){
            cadastroUsuario('/usuarios/cadastrar', user, setUserResult)
                toast.success('Cadastro realizado com sucesso!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true, //se colocar o mouse em cima, segurar o alerta
              draggable: false, //mover a notificação de local
              theme: 'colored', //como o alerta deve ser exibido  
              progress: undefined,
            });
        }else{
                toast.error('Dados inválidos! Verifique se confirmou a senha corretamente, ou, se já tem um cadastro conosco!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true, //se colocar o mouse em cima, segurar o alerta
              draggable: false, //mover a notificação de local
              theme: 'colored', //como o alerta deve ser exibido  
              progress: undefined,
            });
        }
    }
    return(
        <Grid container direction='row' justifyContent='center' alignItems='center' className= 'caixa'>
           
            <Grid item xs={6}>
                <Box margin={5}>
                <form onSubmit={ onSubmit}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='txt2'>Faça seu cadastro!</Typography>
                        <TextField value={user.nome} onChange={updatedModel} id='nome' label='nome' variant='outlined' name='nome' margin='normal' fullWidth />
                        <TextField value={user.usuario} onChange={updatedModel} id='usuario' label='usuário' variant='outlined' name='usuario' margin='normal' fullWidth />
                        <TextField value={user.senha} onChange={updatedModel} id='senha' label='senha' variant='outlined' name='senha' margin='normal'  type='password' fullWidth />
                        <TextField value={confirmarSenha} onChange={confirmarSenhaHandle} id='confirmarSenha' label='confirmarSenha' variant='outlined' name='confirmarSenha' margin='normal'   type='password' fullWidth />
                        <Box marginTop={2} textAlign='center'>
                                    
                        <Button  type='submit' variant='contained' className='btCadastrar'>
                                    Cadastrar
                        </Button>
                        <Link to='/login' className='text-decorator-none'>
                            <Button variant='contained' className='btCancelar'>
                                    Cancelar
                            </Button>
                        </Link>
                          
                            
                           
                        </Box>
                    </form>
                </Box>
                
            </Grid>
            <Grid item xs={6} className='imagem2'></Grid>

        </Grid>
    );
}

export default CadastroUsuario;

