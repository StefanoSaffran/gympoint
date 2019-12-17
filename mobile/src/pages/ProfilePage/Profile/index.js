import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import Background from '~/components/Background';
import {
  Container,
  MembershipInfo,
  Title,
  StudentName,
  StudentEmail,
  Label,
  Name,
  Email,
  Plan,
  PlanTitle,
  Membership,
  Active,
  Until,
  LogoutButton,
} from './styles';
import { signOut } from '~/store/modules/student/actions';

export default function Profile() {
  const profile = useSelector(state => state.student.profile);
  const membership = useSelector(state => state.student.membership);

  const formattedDate = formatDistance(
    parseISO(membership.end_date),
    new Date(),
    {
      addSuffix: true,
      locale: pt,
    }
  );

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(signOut());
  };

  return (
    <Background>
      <Container>
        <MembershipInfo>
          <Title>Perfil</Title>
          <StudentName>
            <Label>Aluno:</Label>
            <Name>{profile.name}</Name>
          </StudentName>
          <StudentEmail>
            <Label>Email:</Label>
            <Email>{profile.email}</Email>
          </StudentEmail>
          <Membership>
            <Label>Ativa:</Label>
            {membership.active ? (
              <Active>
                <Icon name="check-circle" size={20} color="#42cb59" />
                <Until>{`expira ${formattedDate}`}</Until>
              </Active>
            ) : (
              <Icon name="check-circle" size={20} color="#ddd" />
            )}
          </Membership>
          <Plan>
            <Label>Plano:</Label>
            <PlanTitle>{membership.plan.title}</PlanTitle>
          </Plan>

          <LogoutButton onPress={handleLogout}>Logout</LogoutButton>
        </MembershipInfo>
      </Container>
    </Background>
  );
}
