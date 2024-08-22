import styled from "styled-components"
import ClientsList from "../components/Container"

const HomeContainer = styled.div`
    max-width: 1200px;
    margin: 30px auto;
    text-align: center;
`

export default function Home(){
    return(
        <HomeContainer>
           <ClientsList/>
        </HomeContainer>
    )
}