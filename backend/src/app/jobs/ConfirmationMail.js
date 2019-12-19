import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class ConfirmationMail {
  get key() {
    return 'ConfirmationMail';
  }

  async handle({ data }) {
    const { membershipInfo } = data;

    await Mail.sendMail({
      to: `${membershipInfo.student.name} <${membershipInfo.student.email}>`,
      subject: 'Matricula realizada com sucesso',
      template: 'confirmation',
      context: {
        student: membershipInfo.student.name,
        start_date: format(
          parseISO(membershipInfo.start_date),
          "dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        ),
        id: membershipInfo.student.id,
        plan: membershipInfo.plan.title,
        price: membershipInfo.price,
        duration: format(
          parseISO(membershipInfo.end_date),
          "'Até dia' dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new ConfirmationMail();
