import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { MdKeyboardArrowLeft, MdSave } from 'react-icons/md';
import * as Yup from 'yup';

import Loading from '~/components/Loading';
import history from '~/services/history';
import api from '~/services/api';
import HeightInput from '~/components/HeightInput';
import { Container, Header } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Campo Nome é obrigatório'),
  email: Yup.string()
    .email('Digite um email valido')
    .required('Campo E-mail é obrigatório'),
  age: Yup.number().required('Campo idade é obrigatório'),
  weight: Yup.number()
    .required('Campo peso é obrigatório')
    .positive('Campo peso precisa ser positivo')
    .max(250, 'Peso máximo 250 kilos'),
  height: Yup.number()
    .required('Campo Altura é obrigatório')
    .positive('Campo Altura precisa ser positivo')
    .max(2.5, 'Altura máxima 2.5 metros'),
});

export default function ManageStudent() {
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setLoading(true);
      const getStudent = async () => {
        const response = await api.get(`/students/${id}`);

        setStudent(response.data);
        setLoading(false);
      };

      getStudent();
    }
  }, [id]);

  const handleStore = async data => {
    setLoading(true);
    try {
      const res = await api.post('students', { ...data });

      toast.success('Aluno cadastrado com sucesso');
      history.push(`/students/${res.data.id}`);
    } catch (err) {
      toast.error(
        (err.response && err.response.data.error) ||
          'Erro de comunicação com o servidor'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async data => {
    setLoading(true);
    try {
      await api.put(`students/${id}`, { ...data });

      toast.success('Aluno atualizado com sucesso');
      history.push(`/students`);
    } catch (err) {
      toast.error(
        (err.response && err.response.data.error) ||
          'Erro de comunicação com o servidor'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {loading ? (
        <Loading type="spinner" />
      ) : (
        <>
          <Header>
            <h1>{id ? 'Edição de aluno' : 'Cadastro de aluno'}</h1>
            <div>
              <button type="button" onClick={() => history.push('/students')}>
                <MdKeyboardArrowLeft size={20} color="#fff" />
                <span>VOLTAR</span>
              </button>
              <button type="submit" form="form-students">
                <MdSave size={20} color="#fff" />
                <span>SALVAR</span>
              </button>
            </div>
          </Header>
          <Form
            schema={schema}
            onSubmit={id ? handleUpdate : handleStore}
            initialData={student}
            id="form-students"
          >
            <div>
              <label>NOME COMPLETO</label>
              <Input id="name" name="name" placeholder="Nome do aluno" />
              <label>ENDEREÇO DE E-MAIL</label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="exemplo@email.com"
              />
            </div>
            <div className="infoStudent-second">
              <label>
                IDADE
                <Input id="age" name="age" type="number" placeholder="20" />
              </label>
              <label>
                PESO (em kg)
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  placeholder="80.0"
                  step="00.1"
                />
              </label>
              <label>
                ALTURA (em metros)
                <HeightInput name="height" />
              </label>
            </div>
          </Form>
        </>
      )}
    </Container>
  );
}
