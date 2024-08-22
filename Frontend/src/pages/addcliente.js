import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  padding: 20px;
  max-width: 500px;
  margin: 30px auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  h2{
    text-align:center;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const AddCliente = () => {
  const [nome, setNome] = useState('');
  const [cidade, setCidade] = useState('');
  const [cargo, setCargo] = useState('');
  const [idade, setIdade] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newClient = { nome, cidade, cargo, idade };

    fetch('http://localhost:8000/clientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newClient),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Cliente adicionado com sucesso:', data);
        // Limpar o formulário após o envio
        setNome('');
        setCidade('');
        setCargo('');
        setIdade('');
      })
      .catch((error) => {
        console.error('Erro ao adicionar cliente:', error);
      });
  };

  return (
    <FormContainer>
      <h2>Adicionar Novo Cliente</h2>
      <Form onSubmit={handleSubmit}>
        <Label>Nome:</Label>
        <Input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <Label>Cidade:</Label>
        <Input
          type="text"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          required
        />

        <Label>Cargo:</Label>
        <Input
          type="text"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
          required
        />

        <Label>Idade:</Label>
        <Input
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          required
        />

        <Button type="submit">Adicionar Cliente</Button>
      </Form>
    </FormContainer>
  );
};

export default AddCliente;
