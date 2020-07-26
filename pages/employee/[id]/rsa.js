import React from 'react'
import Link from 'next/link'
import {Form, Input, Button, Header, Icon, Loader} from 'semantic-ui-react'
import baseUrl from '../../../utils/baseUrl'
import fetch from 'isomorphic-unfetch'
import {useRouter} from 'next/router'

function Rsa({employee}) {
    const isRsa = employee.rsa === ''

    const [form, setForm] = React.useState({
        rsa: employee.rsa,
        rsaExpiry: employee.rsaExpiry
    })
    const [isSubmitting, setIsSubmiting] = React.useState(false)
    const [errors, setErrors] = React.useState({})
    const router = useRouter()

    React.useEffect(() => {
        if(isSubmitting) {
            if (Object.keys(errors).length === 0) {
                updateRsa()
            }
            else {
                setIsSubmiting(false)
            }
        }  
    })

    const updateRsa = async () => {
        try {
            const res = await fetch(`${baseUrl}/api/employees/${router.query.id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            router.push(`/employee/${employee._id}`)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let errs = validate()
        setErrors(errs)
        setIsSubmiting(true)
    }

    const validate = () => {
        let err = {}

        if (!form.rsa) {
            err.rsa = 'RSA# is required'
        }
        if (!form.rsaExpiry) {
            err.rsaExpiry = 'Expiry is required'
        }
        return err
    }

    return (
        <>
            {!isRsa
                ? <Header as="h2" block>
                    <Icon.Group size="large">
                        <Icon name="martini glass" color="blue"/>
                        <Icon name="add" color="green" corner="bottom right"/>
                    </Icon.Group>
                    Edit RSA for {employee.name}
                </Header>
                : <Header as="h2" block>
                    <Icon.Group size="large">
                        <Icon name="martini glass" color="blue"/>
                        <Icon name="add" color="green" corner="bottom right"/>
                    </Icon.Group>
                    Add RSA for {employee.name}
                </Header>
            }
            {
                isSubmitting
                    ? <Loader active inline ='centered'/>
                    : <Form onSubmit={handleSubmit}>
                        <h3 className="form-required">All fields are required</h3>
                        <Form.Field
                            control={Input}
                            error={errors.rsa ? {content: 'Please enter a RSA#', pointing: 'below'} : null}
                            name="rsa"
                            label="RSA#"
                            placeholder= "RSA#"
                            value={form.rsa}
                            onChange={handleChange}
                        />
                        <Form.Field
                            control={Input}
                            error={errors.rsaExpiry ? {content: 'Please enter a Expiry', pointing: 'below'} : null}
                            name="rsaExpiry"
                            label="RSA Expiry"
                            placeholder="DD/MM/YYYY"
                            type="date"
                            value={form.rsaExpiry}
                            onChange={handleChange}
                        />
                        <Link href={`/employee/${employee._id}`}>
                            <Button color="red" icon labelPosition="left" floated="right">
                                <Icon name="cancel"/>
                                Cancel
                            </Button>
                        </Link>
                        <br/>
                        <br/>
                        <Form.Field
                            floated="right"
                            control={Button}
                            color="green"
                            icon="pencil alternate"
                            content="Submit"
                            type="submit"
                        />
                    </Form>
                }
            </>
        )
}

Rsa.getInitialProps = async ({query: {id}}) => {
    const employee = await fetch(`${baseUrl}/api/employees/${id}`)
    const {employeeData} = await employee.json()

    return {employee: employeeData}
}

export default Rsa