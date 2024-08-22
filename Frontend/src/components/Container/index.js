import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import InputPesquisa from "../Input"
import ModalEdit from '../ModalEdit';

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const ClientCard = styled.div`
  background-color: #f9f9f9;
  padding: 15px;
  margin: 10px 0;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ClientName = styled.h3`
  margin: 0;
  font-size: 1.5em;
`;

const ClientInfo = styled.div`
  margin: 5px 0;
  color: #555;
`;

const InfoText = styled.p`
  margin: 5px 0;
  color: #555;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 5px 10px;
  font-size: 0.9em;
  border-radius: 4px;
  cursor: pointer;
  border: none;

  &.edit {
    background-color: #ffc107;
    color: #fff;
  }

  &.delete {
    background-color: #dc3545;
    color: #fff;
  }
`;


const ClientsList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClients, setFilteredClients] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);

  //GET clientes
  useEffect(() => {
    const fetchClientsData = async () => {
      try {
        const response = await fetch('http://localhost:8000/clientes'); 
        if (!response.ok) {
          throw new Error('Erro ao buscar os dados dos clientes');
        }
        const data = await response.json();
        setClients(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClientsData();
  }, []);

  //GET clientes por nome
  useEffect(() => {
    setFilteredClients(
      clients.filter(client =>
        client.nome?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, clients]);

  //PUT CLIENTE
  const handleSave = (updatedClient) => {
    fetch(`http://localhost:8000/clientes/${updatedClient._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedClient),
    })
      .then((response) => response.json())
      .then((data) => {
        setClients(clients.map(client => (client._id === updatedClient._id ? data : client)));
        window.location.reload()
        console.log('Cliente atualizado com sucesso');
      })
      .catch((err) => {
        console.error('Erro ao atualizar o cliente', err);
      });
  };

  const handleEdit = (client) => {
    setCurrentClient(client);
    setIsModalOpen(true);
  };
  
  //DELETE cliente
 async function handleDelete(clientId){
    if (window.confirm('Você tem certeza que deseja excluir este cliente?')) {
      fetch(`http://localhost:8000/clientes/${clientId}`, {
        method: 'DELETE',
      })
        .then(() => {
          setClients(clients.filter(client => client._id !== clientId));
          console.log('Cliente excluído com sucesso');
        })
        .catch((err) => {
          console.error('Erro ao excluir o cliente', err);
        });
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  if (clients.length === 0) {
    return <p>Nenhum cliente encontrado</p>;
  }

  return (
    <Container>
      <h2>Lista de clientes</h2>
    <InputPesquisa searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    {filteredClients.map((client) => (
      <ClientCard key={client._id}>
        <ClientInfo>
          <ClientName>{client.nome}</ClientName>
          <InfoText><strong>Cidade:</strong> {client.cidade}</InfoText>
          <InfoText><strong>Cargo:</strong> {client.cargo}</InfoText>
          <InfoText><strong>Idade:</strong> {client.idade}</InfoText>
        </ClientInfo>
        <ButtonContainer>
          <Button className="edit" onClick={() => handleEdit(client)}>
            Editar
          </Button>
          <Button className="delete" onClick={() => handleDelete(client._id)}>
            Excluir
          </Button>
        </ButtonContainer>
      </ClientCard>
    ))}
    <ModalEdit
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        clientData={currentClient}
        onSave={handleSave}
      />
  </Container>
  );
};

export default ClientsList;



