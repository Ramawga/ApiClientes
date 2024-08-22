import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Titulo = styled.h2`
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  border: none;

  &.save {
    background-color: #28a745;
    color: white;
  }

  &.cancel {
    background-color: #dc3545;
    color: white;
  }
`;

const ModalEdit = ({ isOpen, onClose, clientData, onSave }) => {
  const [nome, setNome] = useState('');
  const [cidade, setCidade] = useState('');
  const [cargo, setCargo] = useState('');
  const [idade, setIdade] = useState('');

  useEffect(() => {
    if (clientData) {
      setNome(clientData.nome);
      setCidade(clientData.cidade);
      setCargo(clientData.cargo);
      setIdade(clientData.idade);
    }
  }, [clientData]);

  const handleSave = () => {
    const updatedClient = {
      ...clientData,
      nome,
      cidade,
      cargo,
      idade,
    };
    onSave(updatedClient);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContainer>
        <Titulo>Editar Cliente</Titulo>
        <Label>Nome:</Label>
        <Input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <Label>Cidade:</Label>
        <Input
          type="text"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
        />

        <Label>Cargo:</Label>
        <Input
          type="text"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
        />

        <Label>Idade:</Label>
        <Input
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
        />

        <ButtonContainer>
          <Button className="cancel" onClick={onClose}>
            Cancelar
          </Button>
          <Button className="save" onClick={handleSave}>
            Salvar
          </Button>
        </ButtonContainer>
      </ModalContainer>
    </Overlay>
  );
};

export default ModalEdit;