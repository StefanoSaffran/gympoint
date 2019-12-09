import React, { useState, useEffect } from 'react';

import { confirmAlert } from 'react-confirm-alert';
import { MdAdd, MdCheckCircle } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';

import Loading from '~/components/Loading';
import Pagination from '~/components/Pagination';
import api from '~/services/api';
import history from '~/services/history';

import { Container, MembershipList } from './styles';

export default function Memberships() {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const textAlignStyle = {
    textAlign: 'center',
  };

  const loadMemberships = async () => {
    try {
      const { data } = await api.get('memberships', {
        params: { page },
      });

      setTotalPages(Math.ceil(data.count / 10));
      setMemberships(
        data.memberships.map(m => ({
          ...m,
          start_date: m.plan
            ? format(parseISO(m.start_date), "d 'de' MMMM 'de' yyyy", {
                locale: pt,
              })
            : '',
          end_date: m.plan
            ? format(parseISO(m.end_date), "d 'de' MMMM 'de' yyyy", {
                locale: pt,
              })
            : '',
          active: !m.plan ? false : m.active,
        }))
      );
    } catch (err) {
      toast.error(
        (err.response && err.response.data.error) ||
          'Erro de comunicação com o servidor'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMemberships();
  }, [page]); //eslint-disable-line

  const handleEdit = (studentId, active) => {
    if (active) {
      toast.error('Matrículas ativas não podem ser alteradas');
      return;
    }
    history.push(`memberships/${studentId}`);
  };

  const handleDelete = membership => {
    confirmAlert({
      title: 'Confirme a exclusão',
      message: `Deseja remover a matricula do aluno ${membership.student.name} ?`,
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await api.delete(`memberships/${membership.student_id}`);
              setMemberships(memberships.filter(m => m.id !== membership.id));
              toast.success('Matricula excluida com sucesso');
            } catch (err) {
              toast.error(err.response.data.error);
            }
          },
        },
        {
          label: 'No',
          onClick: () => '',
        },
      ],
    });
  };

  return (
    <Container>
      {loading ? (
        <Loading type="spinner" />
      ) : (
        <>
          <div>
            <h1>Gerenciando matrículas</h1>
            <div>
              <button
                type="button"
                onClick={() => history.push('memberships/new')}
              >
                <MdAdd size={18} />
                <span>CADASTRAR</span>
              </button>
            </div>
          </div>
          {!memberships.length ? (
            <p>Nenhuma matrícula encontrada...</p>
          ) : (
            <>
              <MembershipList>
                <li>
                  <strong>ALUNO</strong>
                  <strong style={textAlignStyle}>PLANO</strong>
                  <strong style={textAlignStyle}>INÍCIO</strong>
                  <strong style={textAlignStyle}>TÉRMINO</strong>
                  <strong style={textAlignStyle}>ATIVA</strong>
                </li>
                {memberships.map(membership => (
                  <li key={membership.id}>
                    <span>{membership.student.name}</span>
                    <span style={textAlignStyle}>
                      {membership.plan ? membership.plan.title : 'sem plano'}
                    </span>
                    <span style={textAlignStyle}>{membership.start_date} </span>
                    <span style={textAlignStyle}>{membership.end_date}</span>
                    <span style={textAlignStyle}>
                      <MdCheckCircle
                        size={18}
                        color={membership.active ? '#42cb59' : '#ddd'}
                      />
                    </span>
                    <div>
                      <button
                        type="button"
                        className="edit-button"
                        onClick={() =>
                          handleEdit(membership.student_id, membership.active)
                        }
                      >
                        editar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(membership)}
                      >
                        apagar
                      </button>
                    </div>
                  </li>
                ))}
              </MembershipList>
              <Pagination
                page={page}
                totalPages={totalPages}
                setPage={setPage}
              />
            </>
          )}
        </>
      )}
    </Container>
  );
}
