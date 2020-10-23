import React, { FormEvent, useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import { Container, Title, Form, Repositorios, Error } from './styles';

import api from '../../services/api';
import { Link } from 'react-router-dom';

interface Repository {
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    };
}

const Dashboard: React.FC = () => {
    const [inputError, setInputError] = useState('');
    const [name, setName] = useState('');

    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storagedRepositories = localStorage.getItem(
            '@GithubExplorer:repositories',
        );

        if (storagedRepositories) {
            return JSON.parse(storagedRepositories);
        } else {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(
            '@GithubExplorer:repositories',
            JSON.stringify(repositories),
        );
    }, [repositories]);

    async function handleAddRepository(
        event: FormEvent<HTMLFormElement>,
    ): Promise<void> {
        event.preventDefault();

        if (!name) {
            setInputError('Digite o autor/nome do repositório!');
            return;
        }

        try {
            const response = await api.get(`repos/${name}`);
            const repository = response.data;
            setRepositories([...repositories, repository]);
            setName('');
            setInputError('');
        } catch (error) {
            setInputError('Erro na busca por esse repositório');
        }
    }

    return (
        <Container>
            <img src={logo} alt="logo github explorer" />
            <Title>Explore repositórios no Github</Title>

            <Form hasError={!!inputError} onSubmit={handleAddRepository}>
                <input
                    type="text"
                    placeholder="Digite o nome do repositório"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit">Pesquisar</button>
            </Form>

            {inputError && <Error>{inputError}</Error>}

            <Repositorios>
                {repositories.map((repository) => (
                    <Link to={`/repositorios/${repository.full_name}`} key={repository.full_name}>
                        <img
                            src={repository.owner.avatar_url}
                            alt={repository.owner.login}
                        />

                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>

                        <FiChevronRight size={20} />
                    </Link>
                ))}
            </Repositorios>
        </Container>
    );
};

export default Dashboard;
