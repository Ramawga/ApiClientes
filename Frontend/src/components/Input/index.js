import styled from "styled-components"

const Input = styled.input`
    order: 1px solid #FFF;
    border: 1px solid #FFF;
    padding: 20px 10px;
    border-radius: 10px;
    max-width: 400px;
    width: 100%;
    color: black;
    font-size: 18px;
    margin-bottom: 30px;
    outline: none;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    &::placeholder {
        color: #ccc;
        font-size: 16px;
    }
`
const InputPesquisa = ({ searchTerm, setSearchTerm }) => {
    return (
      <Input
        type="text"
        placeholder="Pesquisar pelo nome do cliente..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    );
  };
  
  export default InputPesquisa;

