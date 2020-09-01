import React from 'react'
import {Form, Input, Button, Header, Icon, Loader} from 'semantic-ui-react'
import baseUrl from '../../../../utils/baseUrl'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import {useRouter} from 'next/router'
import { useFetchUser } from '../../../../utils/user'
import Router from 'next/router'


function EditPositive({positiveData}) {

    const {user, loading} = useFetchUser()

    const positive = positiveData

    if (!user && !loading) {
        Router.push('/')
    }

    const [form, setForm] = React.useState({
        name: positive.name
    })
    const [isSubmitting, setIsSubmiting] = React.useState(false)
    const [errors, setErrors] = React.useState({})
    const router = useRouter()

    React.useEffect(() => {
        if(isSubmitting) {
            if (Object.keys(errors).length === 0) {
                updatePositive()
            }
            else {
                setIsSubmiting(false)
            }
        }  
    })

    const updatePositive = async () => {
        try {
            const res = await fetch(`${baseUrl}/api/positive/${router.query.id}`, {
                method: 'PUT',
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
        return err
    }

    return (
        <>
            <Header as="h2" block>
                <Icon name="add" color="green"/>
                Edit Positive Incident: {positive.name}
            </Header>
            {
                isSubmitting
                    ? <Loader active inline ='centered'/>
                    : <Form onSubmit={handleSubmit}>
                        <Form.Field
                            control={Input}
                            fluid
                            error={errors.name ? {content: 'Please enter a Positive Incident', pointing: 'below'} : null}
                            name="name"
                            label="Positive Incident Type"
                            placeholder= "Positive Incident Type"
                            value={form.name}
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
                        <Link href={'/admin'}>
                            <Button color="red" icon labelPosition="left" floated="right">
                                <Icon name="cancel"/>
                                Cancel
                            </Button>
                        </Link>
                    </Form>
            }        
        </>
    )
}

export async function getServerSideProps ({query: {id}}) {
    const positive = await fetch(`${baseUrl}/api/positive/${id}`)
    const {positiveData} = await positive.json()

    return {props: {positiveData}}
}

export default EditPositive