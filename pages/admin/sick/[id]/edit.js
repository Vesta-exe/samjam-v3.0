import React from 'react'
import {Form, Input, Button, Header, Icon, Loader} from 'semantic-ui-react'
import baseUrl from '../../../../utils/baseUrl'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import {useRouter} from 'next/router'

function EditSick({sick}) {
    const [form, setForm] = React.useState({
        name: sick.name
    })
    const [isSubmitting, setIsSubmiting] = React.useState(false)
    const [errors, setErrors] = React.useState({})
    const router = useRouter()

    React.useEffect(() => {
        if(isSubmitting) {
            if (Object.keys(errors).length === 0) {
                updateSick()
            }
            else {
                setIsSubmiting(false)
            }
        }  
    })

    const updateSick = async () => {
        try {
            const res = await fetch(`${baseUrl}/api/sick/${router.query.id}`, {
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
                <Icon name="frown" color="olive"/>
                Edit Sick Incident: {sick.name}
            </Header>
            {
                isSubmitting
                    ? <Loader active inline ='centered'/>
                    : <Form onSubmit={handleSubmit}>
                        <Form.Field
                            control={Input}
                            fluid
                            error={errors.name ? {content: 'Please enter a Sick Incident', pointing: 'below'} : null}
                            name="name"
                            label="Sick Incident Type"
                            placeholder= "Sick Incident Type"
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

EditSick.getInitialProps = async ({query: {id}}) => {
    const sick = await fetch(`${baseUrl}/api/sick/${id}`)
    const {sickData} = await sick.json()

    return {sick: sickData}
}

export default EditSick