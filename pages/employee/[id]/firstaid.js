import React from 'react'
import Link from 'next/link'
import {Form, Input, Button, Header, Icon, Loader} from 'semantic-ui-react'
import baseUrl from '../../../utils/baseUrl'
import fetch from 'isomorphic-unfetch'
import {useRouter} from 'next/router'

function Firstaid({employee}) {
    const [form, setForm] = React.useState({
        rsa: employee.firstaid,
        rsaExpiry: employee.firstaidExpiry
    })
    const [isSubmitting, setIsSubmiting] = React.useState(false)
    const [errors, setErrors] = React.useState({})
    const router = useRouter()

    React.useEffect(() => {
        if(isSubmitting) {
            if (Object.keys(errors).length === 0) {
                updateFirstaid()
            }
            else {
                setIsSubmiting(false)
            }
        }  
    })

    const updateFirstaid = async () => {
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

        if (!form.firstaid) {
            err.firstaid = 'First Aid# is required'
        }
        if (!form.firstaidExpiry) {
            err.firstaidExpiry = 'Expiry is required'
        }
        return err
    }

    return (
        <>
            <Header as="h2" block>
                <Icon.Group size="large">
                    <Icon name="medkit" color="green"/>
                    <Icon name="add" color="green" corner="bottom right"/>
                </Icon.Group>
                Add First Aid for {employee.name}
            </Header>
            {
                isSubmitting
                    ? <Loader active inline ='centered'/>
                    : <Form onSubmit={handleSubmit}>
                        <h3 className="form-required">All fields are required</h3>
                        <Form.Field
                            control={Input}
                            error={errors.firstaid ? {content: 'Please enter a First Aid#', pointing: 'below'} : null}
                            name="firstaid"
                            label="First Aid#"
                            placeholder= "First Aid#"
                            value={form.firstaid}
                            onChange={handleChange}
                        />
                        <Form.Field
                            control={Input}
                            error={errors.firstaidExpiry ? {content: 'Please enter a Expiry', pointing: 'below'} : null}
                            name="firstaidExpiry"
                            label="First Aid Expiry"
                            placeholder="DD/MM/YYYY"
                            value={form.firstaidExpiry}
                            onChange={handleChange}
                        />
                        <Link href={`/employee/${employee._id}`}>
                            <Button color="red" icon labelPosition="left" floated="right">
                                <Icon name="cancel"/>
                                Cancel
                            </Button>
                        </Link>
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

Firstaid.getInitialProps = async ({query: {id}}) => {
    const res = await fetch(`${baseUrl}/api/employees/${id}`)
    const {data} = await res.json()

    return {employee: data}
}

export default Firstaid