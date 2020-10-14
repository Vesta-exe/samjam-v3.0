import React from 'react'
import Link from 'next/link'
import {Form, Input, Button, Header, Icon, Loader} from 'semantic-ui-react'
import baseUrl from '../../../utils/baseUrl'
import fetch from 'isomorphic-unfetch'
import {useRouter} from 'next/router'
import { useFetchUser } from '../../../utils/user'
import Router from 'next/router'

function Wwcc({employeeData}) {

    const {user, loading} = useFetchUser()

    const employee = employeeData

    if (!user && !loading) {
        Router.push('/')
    }

    const isWwcc = employee.wwcc === ''

    const [form, setForm] = React.useState({
        rsa: employee.wwcc,
        rsaExpiry: employee.wwccExpiry
    })
    const [isSubmitting, setIsSubmiting] = React.useState(false)
    const [errors, setErrors] = React.useState({})
    const router = useRouter()

    React.useEffect(() => {
        if(isSubmitting) {
            if (Object.keys(errors).length === 0) {
                updateWwcc()
            }
            else {
                setIsSubmiting(false)
            }
        }  
    })

    const updateWwcc = async () => {
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

        if (!form.wwcc) {
            err.wwcc = 'WWCC# is required'
        }
        if (!form.wwccExpiry) {
            err.wwccExpiry = 'Expiry is required'
        }
        return err
    }

    return (
        <>
            {!isWwcc
                ? <Header as="h2" block>
                    <Icon.Group size="large">
                        <Icon name="child" color="teal"/>
                        <Icon name="add" color="green" corner="bottom right"/>
                    </Icon.Group>
                        Edit WWCC for {employee.name}
                </Header>
                : <Header as="h2" block>
                    <Icon.Group size="large">
                        <Icon name="child" color="teal"/>
                        <Icon name="add" color="green" corner="bottom right"/>
                    </Icon.Group>
                        Add WWCC for {employee.name}
                </Header>
            }
            {
                isSubmitting
                    ? <Loader active inline ='centered'/>
                    : <Form onSubmit={handleSubmit}>
                        <h3 className="form-required">All fields are required</h3>
                        <Form.Field
                            control={Input}
                            error={errors.wwcc ? {content: 'Please enter a WWCC#', pointing: 'below'} : null}
                            name="wwcc"
                            label="WWCC#"
                            placeholder= "WWCC#"
                            value={form.wwcc}
                            onChange={handleChange}
                        />
                        <Form.Field
                            control={Input}
                            error={errors.wwccExpiry ? {content: 'Please enter a Expiry', pointing: 'below'} : null}
                            name="wwccExpiry"
                            label="WWCC Expiry"
                            placeholder="DD/MM/YYYY"
                            type="date"
                            value={form.wwccExpiry}
                            onChange={handleChange}
                        />
                        <Link href={`/employee/${employee._id}`}>
                            <Button color="red" icon labelPosition="left" floated="right" aria-label="Cancel">
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
                            aria-label="Submit"
                        />
                    </Form>
                }
            </>
        )
}

export async function getServerSideProps ({query: {id}}) {
    const employee = await fetch(`${baseUrl}/api/employees/${id}`)
    const {employeeData} = await employee.json()

    return {props: {employeeData}}
}

export default Wwcc