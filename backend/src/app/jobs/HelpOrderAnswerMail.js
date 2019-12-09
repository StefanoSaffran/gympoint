import Mail from '../../lib/Mail';

class HelpOrderAnswerMail {
  get key() {
    return 'HelpOrderAnswerMail';
  }

  async handle({ data }) {
    const { order } = data;

    await Mail.sendMail({
      to: `${order.student.name} <${order.student.email}>`,
      subject: 'Resposta para seu pedido na GymPoint',
      template: 'help-order-answer',
      context: {
        student: order.student.name,
        question: order.question,
        answer: order.answer,
      },
    });
  }
}

export default new HelpOrderAnswerMail();
