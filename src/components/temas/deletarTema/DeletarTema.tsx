
import React, { useEffect, useState } from 'react'
import {Box, Card, CardActions, CardContent, Button, Typography} from '@material-ui/core';
import './DeletarTema.css';
import { useHistory, useParams } from 'react-router-dom';
import { buscaId, deleteId } from '../../../services/Service';
import Temas from '../../../models/Temas';
import {toast} from 'react-toastify';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';


function DeletarTema() {
    let history = useHistory();
    const { id } = useParams<{id: string}>();
    
    const token = useSelector<TokenState, TokenState["tokens"]>(
      (state)=> state.tokens
  );
  const [temas, setTema] = useState<Temas>()

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
        buscaId(`/temas/${id}`, setTema, {
            headers: {
              'Authorization': token
            }
          })
        }

        function sim() {
            history.push('/temas')
            deleteId(`/temas/${id}`, {
              headers: {
                'Authorization': token
              }
            });
              toast.success('Tema deletado com sucesso', {
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
            history.push('/temas')
          }
          
  return (
    <>
      <Box m={2}>
        <Card variant="outlined">
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar esse tema?
              </Typography>
              <Typography color="textSecondary">
                {temas?.descricao}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
              <Box mx={2}>
                <Button onClick={sim} variant="contained" className="marginLeft" size='large' color="primary">
                  Sim
                </Button>
              </Box>
              <Box mx={2}>
                <Button  onClick={nao} variant="contained" size='large' color="secondary">
                  Não
                </Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
export default DeletarTema;