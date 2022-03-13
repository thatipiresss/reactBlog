import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Box, Card, CardActions, CardContent, Button, Typography} from '@material-ui/core';
import Temas from '../../../models/Temas';
import './ListaTemas.css';
import {useHistory} from 'react-router-dom';
import {busca} from '../../../services/Service';
import {toast} from 'react-toastify';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { getListItemSecondaryActionClassesUtilityClass } from '@mui/material';


function ListaTema(){
    const [temas, setTema] = useState<Temas[]>([])
    const token = useSelector<TokenState, TokenState["tokens"]>(
    (state)=> state.tokens
);
    let history = useHistory();

    useEffect(()=>{
        if (token == ''){
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
            
            history.push('/login')
        }
    }, [token])

    async function getTemas(){
        await busca('/temas', setTema, {
            headers: {
                'Authorization':token
            }
        })
    }

    useEffect(() => {
        getTemas()
    }, [temas.length])
    return(
        <>
        {
            temas.map(temas => ( 
            <Box m={2}>
                <Card variant='outlined'>
                    <CardContent>
                        <Typography color='textSecondary' gutterBottom>
                            Tema
                        </Typography>
                        <Typography variant='h5' component='h2'>
                          {temas.descricao}
                        </Typography>
                    </CardContent>
                <CardActions>
                    <Box display='flex' justifyContent='center' mb={1.5}>
                        <Link to= {`/formularioTemas/${temas.id}`} className= 'text-decorator-none'>
                        <Box mx={1}>
                            <Button variant='contained' className= 'marginLeft' size='small' color='primary'>
                                Atualizar
                            </Button>        
                        </Box>
                        </Link>
                        <Link to= {`/deletarTemas/${temas.id}`} className='text-decorator-none'>
                            <Box mx={1}>
                                <Button variant='contained' size='small' color='secondary'>
                                    Deletar
                                </Button>
                            </Box>
                        </Link>     
                    </Box>   
                </CardActions>
                </Card>
            </Box>
        ))}
        
        </>
    );

}

export default  ListaTema;