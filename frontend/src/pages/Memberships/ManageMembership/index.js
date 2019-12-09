import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import NumberFormat from 'react-number-format';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { MdKeyboardArrowLeft, MdSave } from 'react-icons/md';
import { addMonths, parseISO } from 'date-fns';

import Loading from '~/components/Loading';
import history from '~/services/history';
import api from '~/services/api';
import colors from '~/styles/colors';

import { Container, Header, Student, Info } from './styles';

export default function ManageMembership() {
  const [membership, setMembership] = useState({});
  const [students, setStudents] = useState({});
  const [plans, setPlans] = useState({});
  const [loading, setLoading] = useState(true);
  const { studentId } = useParams();

  useEffect(() => {
    if (studentId) {
      const getMembership = async () => {
        const { data } = await api.get(`/memberships/${studentId}`);

        await setMembership({
          ...data,
          start_date: data.plan ? parseISO(data.start_date) : '',
          end_date: data.plan ? parseISO(data.end_date) : '',
        });
      };

      getMembership();
    }
  }, [studentId]);

  useEffect(() => {
    if (!studentId) {
      const loadStudents = async () => {
        const { data } = await api.get('students');

        setStudents(data);
      };

      loadStudents();
    }
  }, [studentId]);

  useEffect(() => {
    const loadPlans = async () => {
      const { data } = await api.get('plans');

      setPlans(data);
      setLoading(false);
    };

    loadPlans();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      if (studentId) {
        const data = {
          start_date: membership.start_date,
          plan_id: membership.plan_id,
        };

        await api.put(`memberships/${studentId}`, { ...data });

        toast.success('Matrícula atualizada com sucesso');
        history.push('/memberships');
      } else {
        const data = {
          start_date: membership.start_date,
          plan_id: membership.plan_id,
          student_id: membership.student_id,
        };

        await api.post('memberships', { ...data });

        toast.success('Matrícula realizada com sucesso');
        history.push(`/memberships/${membership.student_id}`);
      }
    } catch (err) {
      toast.error(
        (err.response && err.response.data.error) ||
          'Erro de comunicação com o servidor'
      );
    } finally {
      setLoading(false);
    }
  };

  const customStyles = {
    option: (styles, state) => ({
      ...styles,
      cursor: state.isDisabled ? 'not-allowed' : 'pointer',
      fontWeight: 'normal',
    }),
    control: (styles, state) => ({
      ...styles,
      border: `1px solid ${colors.border}`,
      boxShadow: state.isFocused && `1px solid ${colors.border}`,
      '&:hover': {
        border: `1px solid ${colors.border}`,
      },
      borderRadius: '4px',
      display: 'flex',
      width: '100%',
      height: '45px',
      marginTop: '7px',
      fontWeight: 'normal',
    }),
    placeholder: styles => ({
      ...styles,
      fontWeight: 'normal',
    }),
  };

  return (
    <Container>
      {loading ? (
        <Loading type="spinner" />
      ) : (
        <>
          <Header>
            <h1>
              {studentId ? 'Edição de matrícula' : 'Cadastro de matrícula'}
            </h1>
            <div>
              <button
                type="button"
                onClick={() => history.push('/memberships')}
              >
                <MdKeyboardArrowLeft size={20} color="#fff" />
                <span>VOLTAR</span>
              </button>
              <button type="submit" form="form-memberships">
                <MdSave size={20} color="#fff" />
                <span>SALVAR</span>
              </button>
            </div>
          </Header>
          <form id="form-memberships" onSubmit={handleSubmit}>
            <Student>
              <span>ALUNO </span>
              <Select
                isDisabled={studentId}
                styles={customStyles}
                options={students}
                multiple={false}
                name="name"
                placeholder="Buscar aluno"
                getOptionValue={student => student.id}
                getOptionLabel={student => student.name}
                value={membership ? membership.student : ''}
                onChange={e =>
                  setMembership({
                    ...membership,
                    student_id: e.id,
                    student: e,
                  })
                }
              />
            </Student>
            <Info>
              <span>
                PLANO
                <Select
                  styles={customStyles}
                  options={plans}
                  multiple={false}
                  name="plan"
                  placeholder="Buscar plano"
                  value={membership ? membership.plan : ''}
                  getOptionLabel={plan => plan.title}
                  onChange={e =>
                    setMembership({
                      ...membership,
                      plan_id: e.id,
                      plan: e,
                      price: (e.price * e.duration * 100) / 100,
                    })
                  }
                />
              </span>
              <span>
                DATA DE INÍCIO
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  name="start_date"
                  autoComplete="off"
                  placeholder="Escolha a data"
                  selected={membership ? membership.start_date : ''}
                  onChange={date => {
                    if (!membership.plan) {
                      toast.error('Favor selecionar um plano!');
                      return;
                    }
                    setMembership({
                      ...membership,
                      start_date: date,
                      end_date: addMonths(date, membership.plan.duration),
                    });
                  }}
                />
              </span>
              <span>
                DATA DE TÉRMINO
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  name="end_date"
                  disabled
                  placeholder="Data de termino"
                  selected={membership ? membership.end_date : ''}
                />
              </span>
              <span>
                VALOR FINAL
                <NumberFormat
                  thousandSeparator="."
                  decimalSeparator=","
                  fixedDecimalScale={2}
                  prefix="R$ "
                  suffix=".00"
                  name="price"
                  value={membership ? membership.price : ''}
                  disabled
                />
              </span>
            </Info>
          </form>
        </>
      )}
    </Container>
  );
}
