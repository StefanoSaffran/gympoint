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

  const formattedDate = formatDistance(parseISO(profile.end_date), new Date(), {
    addSuffix: true,
    locale: pt,
  });

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(signOut());
  };

  return (
    <Background>
      <Container>
        <MembershipInfo>
          <Title>Profile</Title>
          <StudentName>
            <Label>Aluno:</Label>
            <Name>{profile.student.name}</Name>
          </StudentName>
          <StudentEmail>
            <Label>Email:</Label>
            <Email>{profile.student.email}</Email>
          </StudentEmail>
          <Membership>
            <Label>Ativa:</Label>
            {profile.active ? (
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
            <PlanTitle>{profile.plan.title}</PlanTitle>
          </Plan>

          <LogoutButton onPress={handleLogout}>Logout</LogoutButton>
        </MembershipInfo>
      </Container>
    </Background>
  );
}
