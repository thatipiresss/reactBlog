import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {AppBar, Tab, Tabs, Box, Typography} from '@material-ui/core';
import {TabContext, TabPanel} from '@material-ui/lab';

import ListaPostagem from '../listaPostagens/ListaPostagens';
import './TabPostagem.css';

function TabPostagem(){

    const [value, setValue] = useState('1')
    function handleChange(event: React.ChangeEvent<{}>, newValue: string){
        setValue(newValue);
    }

    return(
        <>
            <TabContext value ={value}> 
                <AppBar position='static'> 
                    <Tabs centered indicatorColor='secondary' onChange={handleChange}>
                        <Tab label='Todas as Postagems' value='1'/>
                        <Tab label='Sobre nós' value='2'/>
                    </Tabs>
                </AppBar>
                <TabPanel value='1'>
                    <Box display='flex' flexWrap='wrap' justifyContent='center'>
                        <ListaPostagem/>
                    </Box>
                </TabPanel>
                <TabPanel value='2'>
                    <Typography variant='h5' gutterBottom color= 'textPrimary' component='h5'align='center' className='titulo'>Sobre nós</Typography>
                    <Typography variant='body1' gutterBottom color='textPrimary' align='justify'>Lorem ipsum dolor, sit amet consectetur 
                    adipisicing elit. Laudantium nostrum aperiam commodi pariatur consequatur voluptatum repellendus et praesentium hic 
                    tempora?
                    <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sed ratione sint libero nemo nihil, velit modi officiis id aliquam 
                        dolor totam beatae ex iste dicta obcaecati. Illo, explicabo vitae!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur nostrum similique laborum magnam distinctio nihil nesciunt,
                        rerum modi facere libero quibusdam? Quia assumenda beatae saepe, quibusdam cum atque dignissimos similique!</p></Typography>
                </TabPanel>

            </TabContext>
        </>
    );

}

export default  TabPostagem;