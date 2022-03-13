import React from 'react';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import './Footer.css'

import {Typography, Box, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';

function Footer() {

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state)=> state.tokens
    );

    var footerComponent;

    if(token !== ''){
        footerComponent = <Grid container direction="row" justifyContent="center" alignItems="center">
        <Grid alignItems="center" item xs={12}>
            <Box className='box1'>
                <Box paddingTop={1} display="flex" alignItems="center" justifyContent="center">
                    <Typography variant="h5" align="center" gutterBottom className='txt'>Siga-me nas redes sociais </Typography>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="center">
                    <a href="https://www.facebook.com/thatipiress/" target="_blank">
                        <FacebookIcon  className='fb' />
                    </a>
                    <a href="https://instagram.com/thatipiresss" target="_blank">
                        <InstagramIcon className='ig' />
                    </a>
                    <a href="https://www.linkedin.com/in/thatipiresss/" target="_blank">
                        <LinkedInIcon className='lk' />
                    </a>
                    <a href="https://github.com/thatipiresss" target="_blank">
                        <GitHubIcon className='git' />
                    </a>
                </Box>
            </Box>
            <Box className='box2'>
                <Box paddingTop={1}>
                    <Typography variant="subtitle2" align="center" gutterBottom className='txt' > Todos os direitos reservados à Thatiane Camargo © 2022 </Typography>
                </Box>
            </Box>
        </Grid>
    </Grid>
    }

    return (
        <>
            {footerComponent}
        </>
    )
}

export default Footer;