import React from 'react'
import Link from 'next/link'
import {Form, Input, Button, Header, Icon, Loader} from 'semantic-ui-react'
import baseUrl from '../../../utils/baseUrl'
import fetch from 'isomorphic-unfetch'
import {useRouter} from 'next/router'
import { useFetchUser } from '../../../utils/user'
import Router from 'next/router'

function Firewarden({employee}) {

    const {user, loading} = useFetchUser()

    if (!user && !loading) {
        Router.push('/')
    }

    const isFirewarden = employee.firewarden === ''

    const [form, setForm] = React.useState({
        rsa: employee.firewarden,
        rsaExpiry: employee.firewardenExpiry
    })
    const [isSubmitting, setIsSubmiting] = React.useState(false)
    const [errors, setErrors] = React.useState({})
    const router = useRouter()

    React.useEffect(() => {
        if(isSubmitting) {
            if (Object.keys(errors).length === 0) {
                updateFirewarden()
            }
            else {
                setIsSubmiting(false)
            }
        }  
    })

    const updateFirewarden = async () => {
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

        if (!form.firewarden) {
            err.firewarden = 'Fire Warden# is required'
        }
        if (!form.firewardenExpiry) {
            err.firewardenExpiry = 'Expiry is required'
        }
        return err
    }

    return (
        <>
            {!isFirewarden
                ? <Header as="h2" block>
                    <Icon.Group size="large">
                        <Icon name="fire extinguisher" color="red"/>
                        <Icon name="add" color="green" corner="bottom right"/>
                    </Icon.Group>
                        Edit Fire Warden for {employee.name}
                </Header>
                : <Header as="h2" block>
                    <Icon.Group size="large">
                        <Icon name="fire extinguisher" color="red"/>
                        <Icon name="add" color="green" corner="bottom right"/>
                    </Icon.Group>
                        Add Fire Warden for {employee.name}
                </Header>
            }
            {
                isSubmitting
                    ? <Loader active inline ='centered'/>
                    : <Form onSubmit={handleSubmit}>
                        <h3 className="form-required">All fields are required</h3>
                        <Form.Field
                            control={Input}
                            error={errors.firewarden ? {content: 'Please enter a Fire Warden#', pointing: 'below'} : null}
                            name="firewarden"
                            label="Fire Warden#"
                            placeholder= "Fire Warden#"
                            value={form.firewarden}
                            onChange={handleChange}
                        />
                        <Form.Field
                            control={Input}
                            error={errors.firewardenExpiry ? {content: 'Please enter a Expiry', pointing: 'below'} : null}
                            name="firewardenExpiry"
                            label="Fire Warden Expiry"
                            placeholder="DD/MM/YYYY"
                            type="date"
                            value={form.firewardenExpiry}
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

Firewarden.getServerSideProps = async ({query: {id}}) => {
    const employee = await fetch(`${baseUrl}/api/employees/${id}`)
    const {employeeData} = await employee.json()

    return {employee: employeeData}
}

export default Firewarden