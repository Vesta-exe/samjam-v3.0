import React from 'react'
import {Form, Input, Button, TextArea, Header, Icon, Select, Loader} from 'semantic-ui-react'
import baseUrl from '../../../utils/baseUrl'
import fetch from 'isomorphic-unfetch'
import {useRouter} from 'next/router'
import Link from 'next/link'

const typeOptions = [
    {key: 'Positive', text: 'Positive', value: 'Positive'},
    {key: 'Negative', text: 'Negative', value: 'Negative'},
    {key: 'Sick', text: 'Sick', value: 'Sick'},
    {key: 'Cashhandling', text: 'Cash Handling', value: 'Cash Handling'},
]
const positiveOptions = [
    {key: 'AchievedSalesTarget', text: 'Achieved Sales Target', value: 'Achieved Sales Target'},
    {key: 'ExceptionalSalesResults', text: 'Exceptional Sales Results', value: 'Exceptional Sales Results'},
    {key: 'PositiveWorkPerformance', text: 'Positive Work Performance', value: 'Positive Work Performance'},
    {key: 'PositvieLeadershipSkills', text: 'Positvie Leadership Skills', value: 'Positvie Leadership Skills'},
    {key: 'PositiveTeamworkSkills', text: 'Positive Teamwork Skills', value: 'Positive Teamwork Skills'},
]

const negativeOptions = [
    {key: 'AbandonmentofShift', text: 'Abandonment of Shift', value: 'Abandonment of Shift'},
    {key: 'Bullying', text: 'Bullying', value: 'Bullying'},
    {key: 'DestructionDamage of Property', text: 'Destruction/Damage of Property', value: 'Destruction/Damage of Property'},
    {key: 'Harassment', text: 'Harassment', value: 'Harassment'},
    {key: 'Fighting', text: 'Fighting', value: 'Fighting'},
    {key: 'GroomingPresentation', text: 'Grooming/Presentation', value: 'Grooming/Presentation'},
    {key: 'Insubordination', text: 'Insubordination', value: 'Insubordination'},
    {key: 'IntimidatingThreating Others', text: 'Intimidating/Threating Others', value: 'Intimidating/Threating Others'},
    {key: 'IntoxicatedonShift', text: 'Intoxicated on Shift', value: 'Intoxicated on Shift'},
    {key: 'Late', text: 'Late', value: 'Late'},
    {key: 'LeavingWorkEarly', text: 'Leaving Work Early', value: 'Leaving Work Early'},
    {key: 'Lessthan3hrsNotice', text: 'Less than 3hrs Notice', value: 'Less than 3hrs Notice'},
    {key: 'NegativeLeadershipSkills', text: 'Negative Leadership Skills', value: 'Negative Leadership Skills'},
    {key: 'NegativeTeamworkSkills', text: 'Negative Teamwork Skills', value: 'Negative Teamwork Skills'},
    {key: 'NegligenceinthePerformanceofDuties', text: 'Negligence in the Performance of Duties', value: 'Negligence in the Performance of Duties'},
    {key: 'PoorWorkPerformance', text: 'Poor Work Performance', value: 'Poor Work Performance'},
    {key: 'PossessionofAlcohol', text: 'Possession of Alcohol', value: 'Possession of Alcohol'},
    {key: 'PossessionofFirearmsExplosives etc', text: 'Possession of Firearms/Explosives etc', value: 'Possession of Firearms/Explosives etc'},
    {key: 'PossessionofIllegalSubstances', text: 'Possession of Illegal Substances', value: 'Possession of Illegal Substances'},
    {key: 'PostingAlteringMaterialonNoticeBoards', text: 'Posting/Altering Material on Notice Boards', value: 'Posting/Altering Material on Notice Boards'},
    {key: 'RefusingtoPerformDutiesImplicitylytotheJob', text: 'Refusing to Perform Duties Implicityly to the Job', value: 'Refusing to Perform Duties Implicityly to the Job'},
    {key: 'Rudeness', text: 'Rudeness', value: 'Rudeness'},
    {key: 'SexualHarassment', text: 'Sexual Harassment', value: 'Sexual Harassment'},
    {key: 'SleepingonShift', text: 'Sleeping on Shift', value: 'Sleeping on Shift'},
    {key: 'TakingUnauthorisedBreaks', text: 'Taking Unauthorised Breaks', value: 'Taking Unauthorised Breaks'},
    {key: 'Theft', text: 'Theft', value: 'Theft'},
    {key: 'UndertheInfluenceofAlcohol', text: 'Under the Influence of Alcohol', value: 'Under the Influence of Alcohol'},
    {key: 'UndertheInfluenceofIllegalSubstances', text: 'Under the Influence of Illegal Substances', value: 'Under the Influence of Illegal Substances'},
    {key: 'UseofProfaneLanguage', text: 'Use of Profane Language', value: 'Use of Profane Language'},
    {key: 'VerbalAbuse', text: 'Verbal Abuse', value: 'Verbal Abuse'},
    {key: 'WilfullyandKnowinglyMakingFalseStatements', text: 'Wilfully and Knowingly Making False Statements', value: 'Wilfully and Knowingly Making False Statements'},
    {key: 'WilfullyViolatingSafteyRules/Practices', text: 'Wilfully Violating Saftey Rules Practices', value: 'Wilfully Violating Saftey Rules Practices'},
]

const cashhandlingOptions = [
    {key: 'LargeNegativeVariance', text: 'Large Negative Variance', value: 'Large Negative Variance'},
    {key: 'LargePositiveVariance', text: 'Large Positive Variance', value: 'Large Positive Variance'},
    {key: 'MissingRefundReceipts', text: 'Missing Refund Receipts', value: 'Missing Refund Receipts'},
    {key: 'MissingStaffReceipts', text: 'Missing Staff Receipts', value: 'Missing Staff Receipts'},
    {key: 'ProcessingErrors', text: 'Processing Errors', value: 'Processing Errors'},
]
const sickOptions = [
    {key: 'LeavingWorkEarlySick', text: 'Leaving Work Early Sick', value: 'Leaving Work Early Sick'},
    {key: 'Sick', text: 'Sick', value: 'Sick'},
]

function EditPerformance({performance}) {
    const [form, setForm] = React.useState({
        manager: performance.manager,
        employee: performance.employee,
        date: performance.date,
        type: performance.type,
        incident: performance.incident,
        description: performance.description,
        followupManger: performance.followupManager,
        followupDescription: performance.followupDescription
    })
    const [isSubmitting, setIsSubmiting] = React.useState(false)
    const [errors, setErrors] = React.useState({})
    const router = useRouter()

    const isPositive = form.type === 'Positive'
    const isNegative = form.type === 'Negative'
    const isSick = form.type === 'Sick'
    const isCashhandling = form.type === 'Cash Handling'

    React.useEffect(() => {
        if(isSubmitting) {
            if (Object.keys(errors).length === 0) {
                createPerformance()
            }
            else {
                setIsSubmiting(false)
            }
        }  
    })

    const createPerformance = async () => {
        try {
            const res = await fetch(`${baseUrl}/api/performance`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            router.push("/performance")
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
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let errs = validate()
        setErrors(errs)
        setIsSubmiting(true)
    }

    const validate = () => {
        let err = {}

        if (!form.manager) {
            err.manager = 'Manager is required'
        }
        if (!form.employee) {
            err.employee = 'Employee is required'
        }
        if (!form.date) {
            err.date = 'Date is required'
        }
        if (!form.type) {
            err.type = 'Type is required'
        }
        if (!form.incident) {
            err.incident = 'Incident Type is required'
        }
        if (!form.description) {
            err.description = 'Description is required'
        }
        return err
    }

    return (
        <>
            <Header as="h2" block>
                <Icon name="add" color="green"/>
                Add New Performance Note
            </Header>
            {
                isSubmitting
                    ? <Loader active inline ='centered'/>
                    : <Form onSubmit={handleSubmit}>
                        <h3 className="form-required">All fields are required</h3>
                            <Form.Field
                                control={Input}
                                error={errors.manager ? {content: 'Please enter a Manager', pointing: 'below'} : null}
                                name="manager"
                                label="Manager"
                                placeholder= "Manager"
                                value={performance.manager}
                                onChange={handleChange}
                            />
                            <Form.Field
                                control={Input}
                                error={errors.employee ? {content: 'Please enter a Employee', pointing: 'below'} : null}
                                name="employee"
                                label="Employee"
                                placeholder="Employee"
                                value={performance.employee}
                                onChange={handleChange}
                            />
                            <Form.Field
                                control={Input}
                                error={errors.date ? {content: 'Please enter a date', pointing: 'below'} : null}
                                name="date"
                                label="Date"
                                placeholder= "Date"
                                type="date"
                                value={performance.date}
                                onChange={handleChange}
                            />
                            <Form.Field
                                control={Select}
                                label="Type"
                                name="type"
                                options={typeOptions}
                                placeholder="Type"
                                value={performance.type}
                                onChange={handleSelectChange}
                            />
                            {isPositive &&
                                <Form.Field
                                    control={Select}
                                    label="Incident"
                                    name="incident"
                                    options={positiveOptions}
                                    placeholder="Incident"
                                    value={performance.incident}
                                    onChange={handleSelectChange}
                                />
                            }
                            {isNegative &&
                                <Form.Field
                                    control={Select}
                                    label="Incident"
                                    name="incident"
                                    options={negativeOptions}
                                    placeholder="Incident"
                                    value={performance.incident}
                                    onChange={handleSelectChange}
                                />
                            }
                            {isSick &&
                                <Form.Field
                                    control={Select}
                                    label="Incident"
                                    name="incident"
                                    options={sickOptions}
                                    placeholder="Incident"
                                    value={performance.incident}
                                    onChange={handleSelectChange}
                                />
                            }
                            {isCashhandling &&
                                <Form.Field
                                    control={Select}
                                    label="Incident"
                                    name="incident"
                                    options={cashhandlingOptions}
                                    placeholder="Incident"
                                    value={performance.incident}
                                    onChange={handleSelectChange}
                                />
                            }
                            <Form.Field
                                control={TextArea}
                                error={errors.description ? {content: 'Please enter a Description', pointing: 'below'} : null}
                                name="description"
                                label="Description"
                                placeholder="Description"
                                value={performance.description}
                                onChange={handleChange}
                            />
                            <Form.Field
                                control={Input}
                                name="followupManager"
                                label="Followup Manager"
                                placeholder="Followup Manager"
                                value={performance.followupManager}
                                onChange={handleChange}
                            />
                            <Form.Field
                                control={TextArea}
                                name="followupDescription"
                                label="Followup Description"
                                placeholder="Followup Description"
                                value={performance.followupDescription}
                                onChange={handleChange}
                            />
                            <Link href='/performance'>
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

EditPerformance.getInitialProps = async ({query: {id}}) => {
    const res = await fetch(`${baseUrl}/api/performance/${id}`)
    const {data} = await res.json()

    return {performance: data}
}

export default EditPerformance