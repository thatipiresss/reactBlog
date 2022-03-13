import React, {useEffect, useState} from 'react';
import {Box, Card, CardContent, Typography, CardActions, Button} from '@material-ui/core';
import './DeletarPostagem.css';
import {useHistory, useParams} from 'react-router-dom';
import Postagem from '../../../models/Postagens';
import { buscaId, deleteId } from '../../../services/Service';
import {toast} from 'react-toastify';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';


function DeletarPostagem(){

    let history = useHistory();
    const { id } = useParams<{id: string}>();
    const [post, setPosts] = useState<Postagem>()
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state)=> state.tokens
    );
    

    useEffect(() => {
        if (token == "") {
                toast.error('Você precisa estar logado', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true, //se colocar o mouse em cima, segurar o alerta
                draggable: false, //mover a notificação de local
                theme: 'colored', //como o alerta deve ser exibido  
                progress: undefined,
            });
            history.push("/login")
    
        }
    }, [token])

    useEffect(() =>{
        if(id !== undefined){
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        buscaId(`/postagens/${id}`, setPosts, {
            headers: {
              'Authorization': token
            }
          })
        }

        function sim() {
            history.push('/postagens')
            deleteId(`/postagens/${id}`, {
              headers: {
                'Authorization': token
              }
            });
            toast.success('Postagem deletada com sucesso', {
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
        
          function nao() {
            history.push('/postagens')
          }

    return (
        <>
            <Box m={2}>
                <Card variant='outlined'></Card>
                    <CardContent>
                        <Box justifyContent='center'>
                            <Typography color='textSecondary' gutterBottom>
                                Deseja deletar essa postagem?
                            </Typography>
                            <Typography color='textSecondary'>
                                {post?.titulo}
                            </Typography>
                        </Box>
                    </CardContent>
              <CardActions>
                <Box display='flex' justifyContent='start' ml={1.0} mb={2}>
                    <Box mx={2}>            
                        <Button onClick={sim} variant='contained' className='marginLeft' size='large' color='primary'>
                            Sim
                        </Button>
                    </Box>
                    <Box mx={2}>
                        <Button onClick={nao} variant='contained' size='large' color='secondary'>
                            Nãoo
                        </Button>
                    </Box>
                </Box>
                </CardActions>
            </Box>
        </>
    )
}

export default DeletarPostagem;