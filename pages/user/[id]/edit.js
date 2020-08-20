import React from 'react'
import {Form, Input, Button, Header, Icon, Loader} from 'semantic-ui-react'
import baseUrl from '../../../utils/baseUrl'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import {useRouter} from 'next/router'
import { useFetchUser } from '../../../utils/user'
import Router from 'next/router'

function EditUser({user}) {

    const {user, loading} = useFetchUser()

    if (!user && !loading) {
        Router.push('/')
    }

    const [form, setForm] = React.useState({
        name: user.name,
        email: user.email,
    })
    const [isSubmitting, setIsSubmiting] = React.useState(false)
    const [errors, setErrors] = React.useState({})
    const router = useRouter()

    React.useEffect(() => {
        if(isSubmitting) {
            if (Object.keys(errors).length === 0) {
                updateEmployee()
            }
            else {
                setIsSubmiting(false)
            }
        }  
    })

    const updateEmployee = async () => {
        try {
            const res = await fetch(`${baseUrl}/api/users/${router.query.id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            router.push(`/user/${user._id}`)
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
        return err
    }

    return (
        <>
            <Header as="h2" block>
                <Icon name="edit" color="orange"/>
                Edit User {user.name}
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
                            value={form.name}
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
                            value={form.email}
                            onChange={handleChange}
                        />
                        <Link href={`/user/${user._id}`}>
                            <Button color="red" icon labelPosition="left" floated="right">
                                <Icon name="cancel"/>
                                Cancel
                            </Button>
                        </Link>
                        <Form.Field
                            floated="right"
                            control={Button}
                            color="green"
                            icon="edit"
                            content="Update"
                            type="submit"
                        />
                    </Form>
            }        
        </>
    )
}

EditUser.getInitialProps = async ({query: {id}}) => {
    const user = await fetch(`${baseUrl}/api/users/${id}`)
    const {userData} = await user.json()

    return {user: userData}
}

export default EditUser