import React from 'react'
import Link from 'next/link'
import {Form, Input, Button, Header, Icon, Select, Loader} from 'semantic-ui-react'
import baseUrl from '../../../utils/baseUrl'
import fetch from 'isomorphic-unfetch'
import {useRouter} from 'next/router'
import { useFetchUser } from '../../../utils/user'
import Router from 'next/router'

//TODO: Find way to upload image and save to database with form may have to do an indivdual edit after employee created

const employmentOptions = [
    {key: 'Casual', text: 'Casual', value: 'Casual'},
    {key: 'Part-Time', text: 'Part-Time', value: 'Part-Time'},
    {key: 'Full-Time', text: 'Full-Time', value: 'Full-Time'},
    {key: 'Salary', text: 'Salary', value: 'Salary'},
]

const stateOptions = [
    {key: 'NSW', text: 'NSW', value: 'NSW'},
    {key: 'VIC', text: 'VIC', value: 'VIC'},
    {key: 'TAS', text: 'TAS', value: 'TAS'},
    {key: 'QLD', text: 'QLD', value: 'QLD'},
    {key: 'SA', text: 'SA', value: 'SA'},
    {key: 'NT', text: 'NT', value: 'NT'},
    {key: 'WA', text: 'WA', value: 'WA'},
    {key: 'ACT', text: 'ACT', value: 'ACT'},
]
const studyOptions = [
    {key: 'None', text: 'None', value: 'None'},
    {key: 'Year 10', text: 'Year 10', value: 'Year 10'},
    {key: 'Year 11', text: 'Year 11', value: 'Year 11'},
    {key: 'Year 12', text: 'Year 12', value: 'Year 12'},
    {key: 'TAFE', text: 'TAFE', value: 'TAFE'},
    {key: 'UNI', text: 'UNI', value: 'UNI'},
]

const areaOptions = [
    {key: 'Yes', text: 'Yes', value: 'Yes'},
    {key: 'No', text: 'No', value: 'No'}
]

function EditEmployee({employee}) {

    const {user, loading} = useFetchUser()

    if (!user && !loading) {
        Router.push('/')
    }

    const [form, setForm] = React.useState({
        name: employee.name,
        dob: employee.dob,
        startDate: employee.startDate,
        employment: employee.employment,
        kronos: employee.kronos,
        pos: employee.pos,
        phone: employee.phone,
        email: employee.email,
        address: employee.address,
        suburb: employee.suburb,
        postcode: employee.postcode,
        state: employee.state,
        emergencyContact: employee.emergencyContact,
        emergencyPhone: employee.emergencyPhone,
        study: employee.study,
        CB: employee.CB,
        TO: employee.TO,
        GC: employee.GC,
        FLR: employee.FLR,
        INT: employee.INT,
        VJR: employee.VJR,
        CBTL: employee.CBTL,
        TOTL: employee.TOTL,
        GCMOD: employee.GCMOD,
        FLRTL: employee.FLRTL,
        INTTL: employee.INTTL,
        VJRTL: employee.VJRTL,
        MOD: employee.MOD
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


    const handleSelectChange = (e, data) => {
        setForm({
            ...form,
            [data.name]: data.value
        })
        console.log(form)
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
        if (!form.kronos) {
            err.email = 'Kronos # is required'
        }
        if (!form.pos) {
            err.email = 'POS # is required'
        }
        if (!form.dob) {
            err.dob = 'D.O.B. is required'
        }
        if (!form.phone) {
            err.phone = 'Phone is required'
        }
        if (!form.address) {
            err.address = 'Address is required'
        }
        if (!form.suburb) {
            err.suburb = 'Suburb is required'
        }
        if (!form.state) {
            err.state = 'State is required'
        }
        if (!form.postcode) {
            err.postcode = 'Post Code is required'
        }
        if (!form.emergencyContact) {
            err.emergencyContact = 'Emergency Contact is required'
        }
        if (!form.emergencyPhone) {
            err.emergencyPhone = 'Emergnecy Phone is required'
        }
        if (!form.startDate) {
            err.startDate = 'Start Date is required'
        }
        if (!form.employment) {
            err.employment = 'Employment is required'
        }
        if (!form.study) {
            err.study = 'Study is required'
        }
        return err
    }

    return (
        <>
            <Header as="h2" block>
                <Icon name="edit" color="orange"/>
                Edit {employee.name}
            </Header>
            {
                isSubmitting
                    ? <Loader active inline ='centered'/>
                    : <Form onSubmit={handleSubmit}>
                        <h3 className="form-required">All fields are required</h3>
                        <Form.Group widths="equal">
                            <Form.Field
                                control={Input}
                                error={errors.name ? {content: 'Please enter a name', pointing: 'below'} : null}
                                name="name"
                                label="Name"
                                placeholder= "Name"
                                value={form.name}
                                onChange={handleChange}
                            />
                            <Form.Field
                                control={Input}
                                error={errors.dob ? {content: 'Please enter a D.O.B.', pointing: 'below'} : null}
                                name="dob"
                                label="D.O.B"
                                placeholder="DD/MM/YYYY"
                                type="date"
                                value={form.dob}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Field
                                control={Input}
                                error={errors.email ? {content: 'Please enter a email', pointing: 'below'} : null}
                                name="email"
                                label="Email"
                                placeholder= "Email"
                                value={form.email}
                                onChange={handleChange}
                            />
                            <Form.Field
                                control={Input}
                                error={errors.phone ? {content: 'Please enter a phone number', pointing: 'below'} : null}
                                name="phone"
                                label="Phone"
                                placeholder= "Phone"
                                value={form.phone}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Field
                                control={Input}
                                error={errors.address ? {content: 'Please enter a address', pointing: 'below'} : null}
                                name="address"
                                label="Address"
                                placeholder= "Address"
                                value={form.address}
                                onChange={handleChange}
                            />
                            <Form.Field
                                control={Input}
                                error={errors.suburb ? {content: 'Please enter a suburb', pointing: 'below'} : null}
                                name="suburb"
                                label="Suburb"
                                placeholder= "Suburb"
                                value={form.suburb}
                                onChange={handleChange}
                            />
                            <Form.Field
                                control={Select}
                                error={errors.state ? {content: 'Please select a state', pointing: 'below'} : null}
                                label="State"
                                name="state"
                                options={stateOptions}
                                placeholder="State"
                                value={form.state}
                                onChange={handleSelectChange}
                            />
                            <Form.Field
                                control={Input}
                                error={errors.postcode ? {content: 'Please enter a postcode', pointing: 'below'} : null}
                                name="postcode"
                                label="Post Code"
                                placeholder= "Post Code"
                                value={form.postcode}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Field
                                control={Input}
                                error={errors.emergencyContact ? {content: 'Please enter a emergency contact', pointing: 'below'} : null}
                                name="emergencyContact"
                                label="Emergency Contact Name"
                                placeholder= "Emergency Contact Name"
                                value={form.emergencyContact}
                                onChange={handleChange}
                            />
                            <Form.Field
                                control={Input}
                                name="emergencyPhone"
                                error={errors.emergencyPhone ? {content: 'Please enter a emergency phone', pointing: 'below'} : null}
                                label="Emergency Contact Phone"
                                placeholder= "Emergency Contact Phone"
                                value={form.emergencyPhone}
                                onChange={handleChange}
                            />
                            <Form.Field
                                control={Input}
                                error={errors.startDate ? {content: 'Please enter a start date', pointing: 'below'} : null}
                                name="startDate"
                                label="Start Date"
                                placeholder= "DD/MM/YYYY"
                                type="date"
                                value={form.startDate}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Field
                                control={Select}
                                error={errors.employment ? {content: 'Please select employment type', pointing: 'below'} : null}
                                label="Employment"
                                name="employment"
                                options={employmentOptions}
                                placeholder="Employment"
                                value={form.employment}
                                onChange={handleSelectChange}
                            />
                            <Form.Field
                                control={Select}
                                error={errors.study ? {content: 'Please select study type', pointing: 'below'} : null}
                                label="Study"
                                name="study"
                                options={studyOptions}
                                placeholder="Study"
                                value={form.study}
                                onChange={handleSelectChange}
                            />
                            <Form.Field
                                control={Input}
                                name="kronos"
                                label="Kronos #"
                                placeholder="Kronos #"
                                value={form.kronos}
                                onChange={handleChange}
                            />
                            <Form.Field
                                control={Input}
                                name="pos"
                                label="POS #"
                                placeholder="POS #"
                                value={form.pos}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <h3><strong>Trained Areas</strong></h3>
                        <Form.Group widths="equal">
                            <Form.Field
                                control={Select}
                                label="Candy Bar"
                                name="CB"
                                options={areaOptions}
                                placeholder="Select"
                                value={form.CB}
                                onChange={handleSelectChange}
                            />
                            <Form.Field
                                control={Select}
                                label="Ticket Office"
                                name="TO"
                                options={areaOptions}
                                placeholder="Select"
                                value={form.TO}
                                onChange={handleSelectChange}
                            />
                            <Form.Field
                                control={Select}
                                label="Gold Class"
                                name="GC"
                                options={areaOptions}
                                placeholder="Select"
                                value={form.GC}
                                onChange={handleSelectChange}
                            />
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Field
                                control={Select}
                                label="Usher"
                                name="FLR"
                                options={areaOptions}
                                placeholder="Select"
                                value={form.FLR}
                                onChange={handleSelectChange}
                            />
                            <Form.Field
                                control={Select}
                                label="Intencity"
                                name="INT"
                                options={areaOptions}
                                placeholder="Select"
                                value={form.INT}
                                onChange={handleSelectChange}
                            />
                            <Form.Field
                                control={Select}
                                label="VJunior"
                                name="VJR"
                                options={areaOptions}
                                placeholder="Select"
                                value={form.VJR}
                                onChange={handleSelectChange}
                            />
                        </Form.Group>
                        <h3><strong>Team Leader</strong></h3>
                        <Form.Group widths="equal">
                            <Form.Field
                                control={Select}
                                label="Candy Bar"
                                name="CBTL"
                                options={areaOptions}
                                placeholder="Select"
                                value={form.CBTL}
                                onChange={handleSelectChange}
                            />
                            <Form.Field
                                control={Select}
                                label="Ticket Office"
                                name="TOTL"
                                options={areaOptions}
                                placeholder="Select"
                                value={form.TOTL}
                                onChange={handleSelectChange}
                            />
                            <Form.Field
                                control={Select}
                                label="Gold Class"
                                name="GCMOD"
                                options={areaOptions}
                                placeholder="Select"
                                value={form.GCMOD}
                                onChange={handleSelectChange}
                            />
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Field
                                control={Select}
                                label="Usher"
                                name="FLRTL"
                                options={areaOptions}
                                placeholder="Select"
                                value={form.FLRTL}
                                onChange={handleSelectChange}
                            />
                            <Form.Field
                                control={Select}
                                label="Intencity"
                                name="INTTL"
                                options={areaOptions}
                                placeholder="Select"
                                value={form.INTTL}
                                onChange={handleSelectChange}
                            />
                            <Form.Field
                                control={Select}
                                label="VJunior"
                                name="VJRTL"
                                options={areaOptions}
                                placeholder="Select"
                                value={form.VJRTL}
                                onChange={handleSelectChange}
                            />
                        <Form.Group widths="equal">
                            <Form.Field
                                control={Select}
                                label="MOD"
                                name="MOD"
                                options={areaOptions}
                                placeholder="Select"
                                value={form.MOD}
                                onChange={handleSelectChange}
                            />
                        </Form.Group>
                        </Form.Group>
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

export async function getServerSideProps ({query: {id}}) {
    const employee = await fetch(`${baseUrl}/api/employees/${id}`)
    const {employeeData} = await employee.json()

    return {employee: employeeData}
}

export default EditEmployee