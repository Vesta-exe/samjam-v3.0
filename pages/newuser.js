import React from 'react'
import {Form, Input, Button, Image, Header, Icon, Select, Loader} from 'semantic-ui-react'
import baseUrl from '../utils/baseUrl'
import fetch from 'isomorphic-unfetch'
import {useRouter} from 'next/router'
import { useFetchUser } from '../utils/user'
import Router from 'next/router'

function NewUser() {

    const {user, loading} = useFetchUser()

    if (!user && !loading) {
        Router.push('/')
    }

    const [form, setForm] = React.useState({
        name: '',
        email: '',
        password: ''
    })
    const [isSubmitting, setIsSubmiting] = React.useState(false)
    const [errors, setErrors] = React.useState({})
    const router = useRouter()

    React.useEffect(() => {
        if(isSubmitting) {
            if (Object.keys(errors).length === 0) {
                createEmployee()
            }
            else {
                setIsSubmiting(false)
            }
        }  
    })

    const createEmployee = async () => {
        try {
            const res = await fetch(`${baseUrl}/api/users`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            router.push("/admin")
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

        if (!form.name) {
            err.name = 'Name is required'
        }
        if (!form.email) {
            err.email = 'Email is required'
        }
        if (!form.password) {
            err.password = 'Password is required'
        }
        return err
    }

    return (
        <>
            <Header as="h2" block>
                <Icon name="add" color="green"/>
                Add New User
            </Header>
            {
                isSubmitting
                    ? <Loader active inline ='centered'/>
                    : <Form onSubmit={handleSubmit}>
                        <h3 className="form-required">All fields are required</h3>
                        <Form.Field
                            control={Input}
                            fluid
                            error={errors.name ? {content: 'Please enter a name', pointing: 'below'} : null}
                            name="name"
                            label="Name"
                            placeholder= "Name"
                            onChange={handleChange}
                        />
                        <Form.Field
                            control={Input}
                            fluid
                            error={errors.email ? {content: 'Please enter a valid email', pointing: 'below'} : null}
                            name="email"
                            label="Email"
                            placeholder= "Eamil"
                            type="email"
                            onChange={handleChange}
                        />
                        <Form.Field
                            control={Input}
                            fluid
                            error={errors.password ? {content: 'Please enter a password', pointing: 'below'} : null}
                            name="password"
                            label="Password"
                            placeholder= "Password"
                            type="password"
                            onChange={handleChange}
                        />
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

export default NewUser