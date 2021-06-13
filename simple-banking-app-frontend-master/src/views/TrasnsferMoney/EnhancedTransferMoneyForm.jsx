import { withFormik } from 'formik';
import { connect } from 'react-redux';
import { transferAmount } from '../../slices/customerSlice';
import TransferMoneyForm from './TransferMoneyForm';
import * as Yup from 'yup';

//constants

const EnhancedTransferMoneyForm = withFormik({
  mapPropsToValues: (props) => ({
    sentFrom: props.customer.customer._id,
    sentTo: '',
    amount: '',
    remark: '',
  }),
  validationSchema: Yup.object().shape({
    sentFrom: Yup.string().required(),
    sentTo: Yup.string().required(true, 'User is required!'),
    amount: Yup.number()
      .required('Amount to add is required!')
      .min(1, 'Min amount should be $1'),
    remark: Yup.string().notRequired(),
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    const { transferAmount, setOpenModal } = props;
    transferAmount(values);
    setOpenModal(false);
    console.log(values);
    setSubmitting(false);
  },
  displayName: 'TransferMoneyForm',
})(TransferMoneyForm);

const mapStateToProps = (state) => ({
  customer: state.customer,
});

export default connect(mapStateToProps, { transferAmount })(
  EnhancedTransferMoneyForm
);
