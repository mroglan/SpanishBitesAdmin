import {Box, TextField, FormGroup} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {SuccessButton} from '../items/buttons'
import {Form, Formik, Field, useField, ErrorMessage, FormikHelpers} from 'formik'
import * as Yup from 'yup'
import {useState} from 'react'
import axios from 'axios'

const useStyles = makeStyles(theme => ({
    textField: {
        minWidth: 300,
        '&$textFieldError fieldset': {
            borderColor: theme.palette.error.main + ' !important'
        },
    },
    inputLabel: {
        '&$inputLabelError': {
            color: theme.palette.error.main
        }
    },
    helperText: {
        '&$helperTextError': {
            color: theme.palette.error.main
        }
    },
    inputLabelError: {},
    textFieldError: {},
    helperTextError: {}
}))

interface Props {
    onSuccess: () => void;
}

interface Values {
    username: string;
    password: string;
}

const initialValues = {
    username: '',
    password: '',
}

const FormikTextField = (props) => {
    const [field, meta] = useField({
        name: props.name,
        type: props.type || 'text'
    })
    return (
        <Field {...props} variant="outlined" color="secondary" {...field} as={TextField} error={meta.error && meta.touched ? true : false}
        helperText={meta.touched && meta.error ? meta.error : ''} />
    )
}

export default function LoginForm({onSuccess}:Props) {

    const handleSubmit = async (values:Values, actions:FormikHelpers<Values>) => {
        try {
            const {data, status} = await axios({
                method: 'POST',
                url: '/api/login',
                data: JSON.stringify(values)
            })
            onSuccess()
        } catch(e) {
            if(e.response.status === 500) {
                return
            }
            const msg = e.response.data.msg
            if(msg === 'Username not found' || msg === 'User is not verified') {
                actions.setFieldError('username', msg)
            }
            if(msg === 'Incorrect Password') {
                actions.setFieldError('password', msg)
            }
            actions.setSubmitting(false)
        }
    }

    const classes = useStyles()
    return (
        <Formik validationSchema={Yup.object({
            username: Yup.string().required('Username is Required'),
            password: Yup.string().required('Password is Required')
        })} initialValues={initialValues} onSubmit={(values, actions) => handleSubmit(values, actions)}>
            {({isSubmitting, isValidating}) => (
                <Form>
                    <Box my={2}>
                        <FormGroup>
                            <FormikTextField name="username" label="Username" InputProps={{classes: {
                                root: classes.textField,
                                error: classes.textFieldError
                            }}} InputLabelProps={{classes: {
                                root: classes.inputLabel,
                                error: classes.inputLabelError
                            }}} FormHelperTextProps={{classes: {
                                root: classes.helperText,
                                error: classes.helperTextError
                            }}} />
                        </FormGroup>
                    </Box>
                    <Box my={2}>
                        <FormGroup>
                            <FormikTextField name="password" label="Password" type="password" InputProps={{classes: {
                                root: classes.textField,
                                error: classes.textFieldError
                            }}} InputLabelProps={{classes: {
                                root: classes.inputLabel,
                                error: classes.inputLabelError
                            }}} FormHelperTextProps={{classes: {
                                root: classes.helperText,
                                error: classes.helperTextError
                            }}} />
                        </FormGroup>
                    </Box>
                    <Box my={2} textAlign="center">
                        <SuccessButton type="submit" variant="outlined"
                        disabled={isSubmitting || isValidating} >
                            Login
                        </SuccessButton>
                    </Box>
                </Form>
            )}
        </Formik>
    )
}