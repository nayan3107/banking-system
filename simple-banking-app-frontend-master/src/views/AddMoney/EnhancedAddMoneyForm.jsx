import { withFormik } from 'formik';
import { connect } from 'react-redux';
import { addAmount } from '../../slices/customerSlice';
import AddMoneyForm from './AddMoneyForm';
import * as Yup from 'yup';

//constants

const EnhancedAddMoneyForm = withFormik({
  mapPropsToValues: (props) => ({
    sentFrom: props.customer.customer._id,
    amount: '',
    remark: '',
  }),
  validationSchema: Yup.object().shape({
    sentFrom: Yup.string().required(),
    amount: Yup.number()
      .required('Amount to add is required!')
      .min(1, 'Min amount should be $1'),
    remark: Yup.string().notRequired(),
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    const { addAmount, setOpenModal } = props;
    addAmount(values);
    setOpenModal(false);
    console.log(values);
    setSubmitting(false);
  },
  displayName: 'AddMoneyForm',
})(AddMoneyForm);

const mapStateToProps = (state) => ({
  customer: state.customer,
});

export default connect(mapStateToProps, { addAmount })(EnhancedAddMoneyForm);
