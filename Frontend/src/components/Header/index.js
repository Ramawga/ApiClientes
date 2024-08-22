import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const HeaderContainer = styled.header`
    background-color: #FFF;
    display: flex;
    justify-content: center;
`
const linkStyle = {
    textDecoration: "none",
    color: "black",
  };

const Opcoes = styled.ul`
    display: flex;
`
const Opcao = styled.li`
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
    padding: 0 5px;
    cursor: pointer;
    min-width: 120px;
`

function Header() {
    return (
        <HeaderContainer>
            <Opcoes>
                <Link style={linkStyle} to={"/"}><Opcao><p>PESQUISA</p></Opcao></Link>
                <Link style={linkStyle} to={"/addcliente"}><Opcao><p>ADICIONAR CLIENTE</p></Opcao></Link>
            </Opcoes>
        </HeaderContainer>
    )
}

export default Header